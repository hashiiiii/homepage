import { getAllPosts, loadLocalPosts } from "../../lib/blog.ts";

export default async function () {
  const posts = await getAllPosts();
  const localPosts = (await loadLocalPosts()).filter((p) => p.published !== false);
  const allTags = [...new Set(posts.flatMap((p) => p.tags))].sort();

  return { posts, localPosts, allTags };
}
