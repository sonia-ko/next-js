import Head from "next/head";
import Image from "next/image";
import EvenList from "@/components/events/event-list";
import styles from "@/styles/Home.module.css";
import { getFeaturedEvents } from "@/helpers/api-utils";

function Home(props) {
  return (
    <>
      <Head>
        <title>NextJS Events</title>
        <meta
          name="description"
          content="Find a lot of great events that will help you to evolve"
        />
      </Head>
      <main className={styles.main}>
        <EvenList items={props.featuredEvents} />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents: featuredEvents,
    },
    revalidate: 6000,
  };
}

export default Home;
