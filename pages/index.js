import Head from "next/head";
import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import styles from "../styles/index.module.scss";
import anime from "animejs";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  const [host, setHost] = useState("");
  useEffect(() => {
    setHost(window.location.hostname);
    anime({
      targets: document.getElementById("tx_chume").children,
      opacity: anime.stagger(0.06),
      delay: anime.stagger(70, { easing: "easeInCubic" }),
      duration: 800,
    });
    AOS.init({
      duration: 500,
    });
  }, []);

  return (
    <div className={styles.root}>
      <Head>
        <title>CHUME</title>
        <meta name="description" content="CHUME" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="m-auto flex flex-col gap-20 relative overflow-visible p-3">
        <div className="flex flex-col gap-3">
          <div className={styles.profile}>
            <video muted autoPlay loop className="relative z-20">
              <source src="/sL0z7TSX5os.webm" />
            </video>
            <div className="text-pink-900 text-6xl z-10" id="tx_chume">
              {[...Array(15)].map((x, i) => (
                <h1 key={i} style={{ opacity: 0 }}>
                  CHUME
                </h1>
              ))}
            </div>
            <svg
              viewBox="0 0 100 110"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-10 z-0 opacity-50"
              style={{ width: "200%", left: "-50%" }}
            >
              <circle cx="75" cy="20" r="20" fill="#eaff70" />
            </svg>
          </div>
          <h1
            className="text-pink-900 text-6xl text-right"
            id="profile_name"
            data-aos="fade-right"
          >
            츄메
            <span className="text-2xl">チュメ</span>
          </h1>
        </div>
        <div>
          <h1 className="text-red-900" data-aos="fade-right">
            CHUME
          </h1>
          <h2
            className="text-3xl text-red-900 leading-normal"
            data-aos="fade-right"
          >
            츄메는
          </h2>
          <p className="text-right text-3xl text-red-900" data-aos="fade-right">
            뿔을 잃어버려 <br />
            마법을 사용할 수 없게 된 <br />
            서큐버스 <br />
          </p>
        </div>
        <div>
          <h1 className="text-red-900" data-aos="fade-right">
            BIRTHDAY
          </h1>
          <h2
            className="text-3xl text-red-900 leading-normal"
            data-aos="fade-right"
          >
            이런 에치치한 츄메가 <br />
            탄생한 날<br />
          </h2>
          <p className="text-right text-3xl text-red-900" data-aos="fade-right">
            3월 14일
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <h1 className="text-purple-900" data-aos="fade-right">
              TWITCH
            </h1>
            <h2 className="text-purple-900 text-4xl" data-aos="fade-right">
              방송하는 곳
            </h2>
          </div>
          {host !== "" ? (
            <iframe
              src={`https://player.twitch.tv/?channel=succuvus_chume&parent=${host}`}
              className="w-full"
              style={{ aspectRatio: "16/9" }}
              data-aos="fade-right"
            ></iframe>
          ) : (
            <div />
          )}
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <h1 className="text-blue-500" data-aos="fade-right">
              TWITTER
            </h1>
            <h2 className="text-4xl text-blue-500" data-aos="fade-right">
              소중한 츄메이트와 <br />
              소통하는 곳
            </h2>
          </div>
          <a
            href="https://twitter.com/succuVus_chume"
            className="text-3xl text-right text-red-900"
            data-aos="fade-right"
          >
            @succuvus_chume
          </a>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <h1 className="text-pink-800" data-aos="fade-right">
              TAG
            </h1>
            <h2 className="text-4xl text-pink-800" data-aos="fade-right">
              에라이한 태그들
            </h2>
          </div>
          <p className="text-right text-2xl text-red-900" data-aos="fade-right">
            Live #Chume_Live
            <br /> Fan Art #Chume_Art <br />
            Sensitive #Bitchume
            <br /> Fan Name #츄메이트 #chumate
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <h1 className="text-red-700" data-aos="fade-right">
              YOUTUBE
            </h1>
            <h2 className="text-4xl text-red-700" data-aos="fade-right">
              열심히 만든 <br />
              영상들이 있는 곳
            </h2>
          </div>
          <a
            href="https://www.youtube.com/channel/UCJqC8ip5UD-dChfH07zy6uw"
            className="text-3xl text-right text-red-900"
            data-aos="fade-right"
          >
            츄메 チュメ Chume CH.
          </a>
        </div>
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl text-pink-800" data-aos="fade-right">
            Contact
          </h1>
          <p className="text-3xl text-right text-red-900" data-aos="fade-right">
            vtuber.chume@gmail.com
          </p>
        </div>
        <footer>
          <a href="./LICENSE.txt">
            <p className="text-right tracking-wide text-red-900">LICENSE</p>
          </a>
        </footer>
      </main>
    </div>
  );
}
