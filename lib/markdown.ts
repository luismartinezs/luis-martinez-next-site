import fs from "fs";
import matter from "gray-matter";

export function getMarkdownContent(slug: string) {
  const fileName = fs.readFileSync(slug, "utf-8");
  const { data: frontmatter, content } = matter(fileName);

  return {
    frontmatter,
    content,
  };
}
