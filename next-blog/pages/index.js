import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";
import Head from "next/head";
import { getFeaturedPosts } from "../lib/post-utils";

function HomePage({ posts }) {
  return (
    <>
      <Head>
        <title>Sonia Blog</title>
        <meta
          name="description"
          content="This is a test blog website created with NextJS"
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
}

export async function getStaticProps(context) {
  const posts = getFeaturedPosts();

  return {
    props: {
      posts,
    },
    revalidate: 1800,
  };
}

export default HomePage;
