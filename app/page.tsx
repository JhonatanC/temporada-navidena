// import Image from "next/image";
{
  /* <Image
            src={BgHero}
            alt="Hero Image"
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          /> */
}
import BgHero from "./assets/bg-main.jpg";

export default function Home() {
  return (
    <div id="wrapper" className="">
      <header></header>
      <main className="">
        <div
          className="hero-image"
          style={{
            position: "relative",
            width: "100%",
            height: "600px",
            backgroundImage: `url(${BgHero.src})`,
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        ></div>
        <div id="box-steps">
          <div className="step-item"></div>
          <div className="step-item"></div>
          <div className="step-item"></div>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}
