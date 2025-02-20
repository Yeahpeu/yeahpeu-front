import JSConfetti from "js-confetti";

const confetti = () => {
  //HTML Canvas 요소를 생성하여 페이지에 추가
  const jsConfetti = new JSConfetti();

  jsConfetti.addConfetti({
    confettiColors: [
      "#FFD6E0", // 연한 핑크
      "#FFB3C2", // 귀여운 핑크
      "#FFAEC9", // 파스텔 핑크
      "#AEEEEE", // 파스텔 민트
      "#B2EBF2", // 연한 하늘색
      "#FFDD94", // 부드러운 옐로우
      "#FFC3A0", // 오렌지빛 피치색
    ],
    confettiRadius: 5,
    confettiNumber: 100,
    decay: 0.1,
    spread: 10,
    startVelocity: 60,
    origin: { x: 0.5, y: 0.8 },
  });



  // const handleClick = () => {
  //   jsConfetti.addConfetti({
  //     confettiColors: [
  //       "#ff0a54",
  //       "#ff477e",
  //       "#ff7096",
  //       "#ff85a1",
  //       "#fbb1bd",
  //       "#f9bec7",
  //     ],
  //     confettiRadius: 5,
  //     confettiNumber: 500,
  //   });
  // };
};

export default confetti;
