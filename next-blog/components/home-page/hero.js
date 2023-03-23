import Image from "next/image";
import classes from "./hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          width={300}
          height={300}
          src="/images/site/me.jpg"
          alt="An image showing Sonia"
        />
      </div>
      <h1>Hi, I'm Sonia</h1>
      <p>
        Lose john poor same it case do year we. Full how way even the sigh.
        Extremely nor furniture fat questions now provision incommode preserved.
      </p>
    </section>
  );
}

export default Hero;
