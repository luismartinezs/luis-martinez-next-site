"""Checks invariants on the built site in public/. Exits nonzero with a list of failures.

usage: python3 -I scripts/verify_output.py <public_dir> <legacy_urls_file>
"""
import re
import sys
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse

BASE = "https://www.webdevluis.com"
# Leftovers from the old stack or placeholders that must never appear in a URL or meta value.
# (Prose may legitimately mention them, so only attribute values are checked.)
FORBIDDEN = ["yourdomain.com", "storyblok", "cloudinary.com", "localhost", "127.0.0.1", "_next/"]


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""
        self.in_title = False
        self.meta = {}
        self.canonical = None
        self.refresh = None
        self.refs = []  # src/href values
        self.attr_values = []  # every src/href/content value, for the forbidden-string check
        self.h1 = 0

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "title":
            self.in_title = True
        elif tag == "h1":
            self.h1 += 1
        elif tag == "meta":
            key = a.get("name") or a.get("property")
            if key:
                self.meta[key] = a.get("content") or ""
            if (a.get("http-equiv") or "").lower() == "refresh":
                self.refresh = a.get("content")
        elif tag == "link" and a.get("rel") == "canonical":
            self.canonical = a.get("href")
        for attr in ("src", "href"):
            if a.get(attr):
                self.refs.append(a[attr])
        for attr in ("src", "href", "content", "srcset"):
            if a.get(attr):
                self.attr_values.append(a[attr])

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title += data


def local_path(public, ref):
    """Map a same-site URL to the file that must exist in public/, or None for external/anchor refs."""
    u = urlparse(ref)
    if u.scheme in ("mailto", "tel", "data", "javascript"):
        return None
    if u.netloc and not ref.startswith(BASE):
        return None
    path = unquote(u.path)
    if not path:
        return None
    target = public / path.lstrip("/")
    return target / "index.html" if path.endswith("/") else target


def main():
    public, legacy_file = Path(sys.argv[1]), Path(sys.argv[2])
    failures = []

    # 1. Every URL of the old site still resolves (page or alias redirect page).
    for line in legacy_file.read_text().splitlines():
        url = line.strip()
        if not url or url.startswith("#"):
            continue
        target = public / url.strip("/") / "index.html" if url != "/" else public / "index.html"
        if not target.exists():
            failures.append(f"legacy URL {url} has no {target.relative_to(public)}")

    # 2. Sitemap lists every rendered blog post and only canonical-host URLs.
    sitemap = ET.parse(public / "sitemap.xml").getroot()
    locs = {el.text for el in sitemap.iter() if el.tag.endswith("loc")}
    for post in (public / "blog").iterdir():
        if post.is_dir() and (post / "index.html").exists():
            if f"{BASE}/blog/{post.name}/" not in locs:
                failures.append(f"sitemap is missing /blog/{post.name}/")
    for loc in locs:
        if not loc.startswith(BASE + "/"):
            failures.append(f"sitemap URL on wrong host: {loc}")
    robots = (public / "robots.txt").read_text()
    if f"Sitemap: {BASE}/sitemap.xml" not in robots:
        failures.append("robots.txt does not point at the sitemap")
    if not (public / "atom.xml").exists():
        failures.append("atom.xml feed missing")

    # 3. Per-page invariants.
    pages = sorted(public.rglob("*.html"))
    for f in pages:
        rel = f.relative_to(public)
        p = Page()
        p.feed(f.read_text())
        for value in p.attr_values:
            for bad in FORBIDDEN:
                if bad in value.lower():
                    failures.append(f"{rel}: attribute value contains {bad!r}: {value[:80]}")
        if p.refresh:  # Zola alias redirect page
            continue
        if not p.title.strip():
            failures.append(f"{rel}: empty <title>")
        if not p.meta.get("description"):
            failures.append(f"{rel}: missing meta description")
        if rel.name == "index.html":
            parent = rel.parent.as_posix()
            expected = f"{BASE}/" if parent == "." else f"{BASE}/{parent}/"
            if p.canonical != expected:
                failures.append(f"{rel}: canonical {p.canonical!r} != {expected!r}")
        if not p.meta.get("og:image", "").startswith(BASE + "/"):
            failures.append(f"{rel}: og:image missing or not absolute")
        if p.h1 != 1:
            failures.append(f"{rel}: has {p.h1} <h1> elements, expected 1")
        for ref in p.refs:
            target = local_path(public, ref)
            if target is not None and not target.exists():
                failures.append(f"{rel}: broken local reference {ref}")

    # 4. Built JS and the service-worker retirement script are present.
    for required in ("js/site.js", "sw.js", "giallo-light.css", "giallo-dark.css", "_redirects"):
        if not (public / required).exists():
            failures.append(f"missing {required}")

    if failures:
        print(f"verify_output: {len(failures)} failure(s)")
        for msg in failures:
            print("  - " + msg)
        sys.exit(1)
    print(f"verify_output: ok ({len(pages)} HTML files, {len(locs)} sitemap URLs)")


main()
