import fs from "fs";
import path from "path";

import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostsFiles() {
  return fs.readdirSync(postsDirectory);
}
export function getPostData(postId) {
  const postSlug = postId.replace(/\.md$/, "");
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const filecontent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(filecontent);

  const postData = {
    slug: postSlug,
    ...data,
    content: content,
  };

  return postData;
}

export function getAllPosts() {
  const postFiles = getPostsFiles();

  const allPosts = postFiles
    .map((postFile) => {
      return getPostData(postFile);
    })
    .sort((postA, postB) => (postA.date > postB.date ? -1 : 1));

  return allPosts;
}

export function getFeaturedPosts() {
  getAllPosts();

  const filteredPosts = getAllPosts().filter((post) => post.isFeatured);

  return filteredPosts;
}
