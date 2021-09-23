import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import { useSwipeable } from "react-swipeable";
import html2canvas from "html2canvas";

function Minigame() {
  const [gamePanel, setGamePanel] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  const [init, setInit] = useState([0, 0, 0]);

  const gameInit = (w, s) => {
    setInit([w, s, (w - s * 4) / 5]);
  };

  const progGame = (direction) => {
    let newGP = JSON.parse(JSON.stringify(gamePanel));
    //direction 0 : 왼쪽, 2: 오른쪽, 3: 위쪽, 1: 아래쪽
    let needLeft = false;
    if (direction % 2 != 0) {
      newGP = matrixRight(newGP);
      needLeft = true;
      direction -= 1;
    }
    for (let i = 0; i < newGP.length; i++) {
      const line = newGP[i];
      let newline = line.filter((e) => e != 0);
      if (newline.length > 1) {
        for (let j = 0; j < newline.length - 1; j++) {
          const impact_j = direction == 0 ? j : newline.length - j - 2;
          if (newline[impact_j] == newline[impact_j + 1]) {
            newline.splice(impact_j, 2, newline[impact_j] * 2);
          }
        }
      }
      const addZeroCount = 4 - newline.length;
      for (let j = 0; j < addZeroCount; j++) {
        direction == 0 ? newline.push(0) : newline.splice(0, 0, 0);
      }
      newGP[i] = newline;
    }
    if (needLeft) {
      newGP = matrixLeft(newGP);
    }
    return newGP;
  };

  const matrixRight = (matrix) => {
    return matrix[0].map((v, i) => matrix.map((row) => row[i]).reverse());
  };

  const matrixLeft = (matrix) => {
    return matrix[0].map((v, i) =>
      matrix.map((row) => row[matrix.length - 1 - i])
    );
  };

  const getZeroCount = (matrix) => {
    return matrix.reduce(
      (prev, cur) => prev + cur.filter((e) => e == 0).length,
      0
    );
  };

  const spawnRandom = (matrix) => {
    const zeroPoint = Math.floor(Math.random() * getZeroCount(matrix));
    let nowZero = -1;
    let workFinished = false;
    for (let i = 0; i < matrix.length; i++) {
      const line = matrix[i];
      for (let j = 0; j < line.length; j++) {
        const e = line[j];
        if (e == 0) {
          nowZero++;
        }
        if (nowZero == zeroPoint) {
          matrix[i][j] = 2;
          workFinished = true;
          break;
        }
      }
      if (workFinished) {
        break;
      }
    }
    // return matrix.map((v, i) =>
    //   v.map((vj, j) => {
    //     if (nowZero == zeroPoint && !workFinished) {
    //       console.log("22");
    //       workFinished = true;
    //       return 2;
    //     } else if (vj == 0 && !workFinished) {
    //       nowZero += 1;
    //       return vj;
    //     } else {
    //       return vj;
    //     }
    //   })
    // );

    // const zeroPoint = Math.floor(Math.random() * 4);
  };

  const [count, setCount] = useState(0);
  const [end, setEnd] = useState(false);

  const updateGamePanel = (direction) => {
    //애니메이션
    let newGamePanel = progGame(direction);
    let pass = false;
    for (let i = 0; i < gamePanel.length; i++) {
      const line = gamePanel[i];
      for (let j = 0; j < line.length; j++) {
        const e = line[j];
        if (newGamePanel[i][j] == 64) {
          setEnd(true);
        }
        if (e != newGamePanel[i][j]) {
          pass = true;
        }
      }
    }
    if (pass && !end) {
      spawnRandom(newGamePanel);
      setGamePanel(newGamePanel);
      setCount(count + 1);
    }
  };

  const keyDown = (e) => {
    switch (e.key) {
      case "ArrowUp":
        updateGamePanel(3);
        break;
      case "ArrowDown":
        updateGamePanel(1);
        break;
      case "ArrowLeft":
        updateGamePanel(0);
        break;
      case "ArrowRight":
        updateGamePanel(2);
        break;

      default:
        break;
    }
    e.preventDefault();
  };

  useEffect(() => {
    gameInit(
      document.getElementById("minigame_root").getBoundingClientRect().width,
      (document.getElementById("minigame_root").getBoundingClientRect().width *
        0.95) /
        4
    );
    let newGamePanel = progGame(0);
    spawnRandom(newGamePanel);
    setGamePanel(newGamePanel);
    // updateGamePanel(progGame(3));
  }, []);

  const [name, setName] = useState("");

  const handler = useSwipeable({
    onSwipedLeft: (e) => updateGamePanel(0),
    onSwipedUp: (e) => {
      updateGamePanel(3);
      // e.preventDefault();
    },
    onSwipedRight: (e) => updateGamePanel(2),
    onSwipedDown: (e) => updateGamePanel(1),
  });

  return (
    <div className="relative" id="minigame_root">
      <div className={`filter ${end ? "blur-sm" : ""}`}>
        <div className="flex flex-col mb-2">
          <div className="text-red-900">
            <h1 className="text-3xl text-center">
              <img src="/mini/64.png" className="h-14 m-auto" />
              빨리 되는 사람이 승자!
            </h1>
            <p className="text-xl text-center">
              PC : 클릭 후 방향키, 모바일 : 드래그
            </p>
            <p className="text-xl text-center">(2048게임)</p>
            <p className="text-xl text-center">움직인 횟수 : {count}</p>
          </div>
        </div>
        <div
          className="bg-red-300 relative rounded-lg m-auto"
          style={{
            width: `${init[0]}px`,
            height: `${init[0]}px`,
            touchAction: "none",
          }}
          onKeyDown={keyDown}
          tabIndex="0"
          {...handler}
        >
          {gamePanel.map((v, i) =>
            v.map((jv, j) => (
              <div
                className="absolute bg-red-400 rounded-lg p-2"
                style={{
                  left: `${init[2] * (j + 1) + init[1] * j}px`,
                  top: `${init[2] * (i + 1) + init[1] * i}px`,
                  width: `${init[1]}px`,
                  height: `${init[1]}px`,
                }}
                key={(i + 1) * (j + 1)}
              >
                {jv != 0 ? <img src={`/mini/${jv}.png`} /> : <div />}
              </div>
            ))
          )}
        </div>
      </div>
      <a
        onClick={(e) => {
          console.log("asd");
          e.target.style.opacity = "0";
          document.getElementById("minigame_root").style.width = "110%";
          document.getElementById("minigame_root").style.paddingTop = "12px";
          document.getElementById("minigame_root").style.paddingLeft = "8px";
          document.getElementById("minigame_root").style.paddingRight = "8px";
          document.getElementById("minigame_result_img").style.marginBottom =
            "-28px";
          html2canvas(document.getElementById("minigame_root"), {
            backgroundColor: "#ffd190",
            width: `${e.target.getBoundingClientRect().width + 20}`,
          }).then((canvas) => {
            let link = document.createElement("a");
            link.download = "ㅋㅅㅂㅊ.png";
            link.href = canvas.toDataURL();
            link.click();
            document.getElementById("minigame_root").style.width = "";
            document.getElementById("minigame_root").style.paddingTop = "";
            document.getElementById("minigame_root").style.paddingLeft = "";
            document.getElementById("minigame_root").style.paddingRight = "";
            document.getElementById("minigame_result_img").style.marginBottom =
              "";
            e.target.style.opacity = "1";
          });
        }}
      >
        <p className="text-right mt-3 text-lg text-red-900">
          사진으로 저장하기 (테스트)
        </p>
      </a>
      {end ? (
        <div
          className="absolute bg-red-300 p-5 w-11/12 rounded-2xl text-red-900"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {name == "" ? (
            <div>
              <h1 className="text-3xl mb-1">닉네임</h1>
              <input
                type="text"
                className="w-full rounded-2xl h-10 pl-4"
                placeholder="입력후 엔터!"
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    setName(e.target.value);
                  }
                }}
              />
            </div>
          ) : (
            <div>
              <h2>{count}번의 시도끝에...!</h2>
              <h1 className="text-xl">
                <span className="text-pink-700">{name}</span>...
              </h1>
              <div className="flex items-center justify-center">
                <img
                  id="minigame_result_img"
                  src="/mini/64.png"
                  className="h-14 float-left"
                />
                <h1 className="text-4xl text-center">가 되었습니다!</h1>
              </div>
              <h2 className="text-right">헤으응..</h2>
            </div>
          )}
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

export default Minigame;
