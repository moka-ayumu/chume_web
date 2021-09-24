import Head from "next/head";
import { createRef, useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import styles from "../styles/index.module.scss";
import anime from "animejs";
import AOS from "aos";
import "aos/dist/aos.css";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import Minigame from "../components/Minigame";

export default function Home() {
  const [host, setHost] = useState("");
  const scrollableNodeRef = createRef();
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
    scrollableNodeRef.current.addEventListener("scroll", (e) => {
      AOS.refresh();
    });
  }, []);

  return (
    <div className={styles.root}>
      <Head>
        <title>CHUME</title>
        <meta
          name="description"
          content="서큐버스 츄메에 대해 자세히 알아보세요!"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@succuVus_chume" />
        <meta property="og:title" content="CHUME" />
        <meta
          property="og:description"
          content="서큐버스 츄메에 대해 자세히 알아보세요!"
        />
        <meta property="og:image" content="https://chume.moe/thumb.png" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="m-auto w-full">
        <SimpleBar
          style={{ maxHeight: "100vh" }}
          scrollableNodeProps={{ ref: scrollableNodeRef }}
          forceVisible="y"
        >
          <div className="relative overflow-x-hidden">
            <svg
              viewBox="0 0 40 40"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute z-0 opacity-50"
              style={{
                width: "500px",
                height: "550px",
                left: "50%",
                top: "10%",
                transform: "translate(-10%, -70%)",
                // left: "-50%",
              }}
              overflow="visible"
            >
              <circle cx="20" cy="20" r="17" fill="#eaff70" />
            </svg>
            <div className="m-auto w-full max-w-md">
              <div className="p-3 flex flex-col gap-20 relative">
                <div className="flex flex-col gap-3">
                  <div className={styles.profile}>
                    {/* <video muted autoPlay loop className="relative z-20">
                  <source src="/sL0z7TSX5os.webm" />
                </video> */}
                    <img
                      src="/chume_opt.png"
                      className="relative z-20 transform scale-100 ml-auto mr-auto mt-2 mb-2"
                    />
                    <div className="text-pink-900 text-6xl z-10" id="tx_chume">
                      {[...Array(15)].map((x, i) => (
                        <h1 key={i} style={{ opacity: 0 }}>
                          CHUME
                        </h1>
                      ))}
                    </div>
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
                  <p
                    className="text-right text-3xl text-red-900"
                    data-aos="fade-right"
                  >
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
                  <p
                    className="text-right text-3xl text-red-900"
                    data-aos="fade-right"
                  >
                    3월 14일
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div>
                    <h1 className="text-purple-900" data-aos="fade-right">
                      TWITCH
                    </h1>
                    <h2
                      className="text-purple-900 text-4xl"
                      data-aos="fade-right"
                    >
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
                    <h2
                      className="text-4xl text-blue-500"
                      data-aos="fade-right"
                    >
                      소중한 츄메이트와 <br />
                      소통하는 곳
                    </h2>
                  </div>
                  <a
                    href="https://twitter.com/succuVus_chume"
                    className="text-3xl text-right text-red-900"
                    data-aos="fade-right"
                  >
                    <p>@succuvus_chume</p>
                    <p className="text-xl">보러가기</p>
                  </a>
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <h1 className="text-pink-800" data-aos="fade-right">
                      TAG
                    </h1>
                    <h2
                      className="text-4xl text-pink-800"
                      data-aos="fade-right"
                    >
                      에라이한 태그들
                    </h2>
                  </div>
                  <p
                    className="text-right text-2xl text-red-900"
                    data-aos="fade-right"
                  >
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
                    <p>츄메 チュメ Chume CH.</p>
                    <p className="text-xl">보러가기</p>
                  </a>
                </div>
                <Minigame />
                <div className="flex flex-col gap-3">
                  <h1 className="text-4xl text-pink-800" data-aos="fade-right">
                    Contact
                  </h1>
                  <p
                    className="text-2xl text-right text-red-900"
                    data-aos="fade-right"
                  >
                    vtuber.chume@gmail.com
                  </p>
                </div>
                <footer>
                  <a href="./LICENSE.txt">
                    <p className="text-right tracking-wide text-red-900">
                      LICENSE
                    </p>
                  </a>
                </footer>
              </div>
            </div>
          </div>
        </SimpleBar>
      </main>
    </div>
  );
}
