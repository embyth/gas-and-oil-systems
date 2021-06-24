import matter from "gray-matter";
import fs from "fs";
import path from "path";

const contentDirectory = path.join(process.cwd(), "content");

export const getContentFiles = () => fs.readdirSync(contentDirectory);

export const getContentData = (fileIdentifier) => {
  const contentSlug = fileIdentifier.replace(/\.md$/, "");
  const filePath = path.join(contentDirectory, `${contentSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return {
    slug: contentSlug,
    ...data,
    content,
  };
};
