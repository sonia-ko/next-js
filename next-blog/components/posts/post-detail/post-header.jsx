import classes from "./post-header.module.css";
import Image from "next/image";

function PostHeader({ title, image }) {
  return (
    <header className={classes.header}>
      <h1>{title}</h1>
      <Image alt={title} width={200} height={150} src={image} />
    </header>
  );
}

export default PostHeader;
