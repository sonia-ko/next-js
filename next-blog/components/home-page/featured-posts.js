import classes from "./featured-posts.module.css";
import PostsGrig from "../posts/posts-grid";

function FeaturedPosts({ posts }) {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrig posts={posts} />
    </section>
  );
}

export default FeaturedPosts;
