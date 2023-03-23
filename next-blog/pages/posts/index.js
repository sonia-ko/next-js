import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/post-utils";
import Head from "next/head";

function AllPostsPage({ posts }) {
  return (
    <>
      <Head>
        <title>My Blog</title>
        <meta name="description" content="A list of the blog posts" />
      </Head>
      <AllPosts posts={posts} />;
    </>
  );
}

export function getStaticProps() {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
  };
}

export default AllPostsPage;

// 1) Hero = > present
// 2) Featured
