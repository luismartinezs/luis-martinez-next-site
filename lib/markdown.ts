import fs from "fs";
import matter, { GrayMatterFile } from "gray-matter";

export function getMarkdownContent(slug: string): { frontmatter: GrayMatterFile<string>['data']; content: string } {
  const fileName = fs.readFileSync(slug, "utf-8");
  const { data: frontmatter, content } = matter(fileName);

  return {
    frontmatter,
    content,
  };
}
