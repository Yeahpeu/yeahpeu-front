import React, { useRef, useEffect, useState } from "react";
import PingPongAlert from "../../components/Modals/PingPongAlert";
import groom from "../../assets/pingpong/groom_icon.png";
import bride from "../../assets/pingpong/bride_icon.png";
import { useNavigate } from "react-router-dom";
const PingPong = () => {
  const navigate = useNavigate();
  const brideImage = new Image();
  brideImage.src = "/images/bride.png"; // 경로 맞게 조정

  const groomImage = new Image();
  groomImage.src = "/images/groom.png"; // 경로 맞게 조정

  const canvasRef = useRef(null);
  const paddleXRef = useRef(120);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [enemyScore, setEnemyScore] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [gameRunning, setGameRunning] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [enemyPaddleX, setEnemyPaddleX] = useState(120);

  const paddleWidth = 70;
  const paddleHeight = 70;

  const getInitialBallSpeed = () => {
    const speed = 13; // 기존보다 살짝 더 빠르게
    const deviation = (Math.random() * 90 - 25) * (Math.PI / 180); // -25도 ~ 25도 편차 추가
    const baseAngle =
      Math.random() < 0.5 ? (85 * Math.PI) / 180 : (-85 * Math.PI) / 180; // 85도 또는 -85도 (약간 기울임)
    const angle = baseAngle + deviation;

    return {
      x: speed * Math.cos(angle),
      y: speed * Math.sin(angle),
    };
  };

  useEffect(() => {
    if (gameOver || !gameRunning) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let { x: ballSpeedX, y: ballSpeedY } = getInitialBallSpeed();
    let enemyPaddleX = 120;
    let passCount = 0; // 공 주고받은 횟수

    const minYSpeed = 2; // 최소 Y축 속도 (각도 제한)

    const brideImage = new Image();
    brideImage.src = bride;

    const groomImage = new Image();
    groomImage.src = groom;

    // 부드러운 보간(LERP) 함수 추가
    const lerp = (start, end, t) => start + (end - start) * t;

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#EFB6C8";
      ctx.fillRect(0, canvas.height / 2 - 2, canvas.width, 4);

      // 공 이동
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      const ballRadius = 8;
      const speedIncrease = 0.02;

      // 좌우 벽 충돌 감지
      if (ballX - ballRadius <= 0 || ballX + ballRadius >= canvas.width) {
        ballSpeedX = -ballSpeedX;
        ballX = Math.max(
          ballRadius,
          Math.min(canvas.width - ballRadius, ballX)
        );
      }

      // **컴퓨터 AI 부드럽게 허둥대게 만들기**
      let reactionSpeed = 0.03; // 부드럽게 따라가는 속도
      let randomOffset = Math.sin(performance.now() / 500) * 30; // 좌우로 미끄러지는 효과

      let targetX = ballX - paddleWidth / 2 + randomOffset; // 목표 위치

      // LERP 적용하여 부드러운 이동
      enemyPaddleX = lerp(enemyPaddleX, targetX, reactionSpeed);

      // 패들 제한 범위 설정 (넘어가지 않도록)
      enemyPaddleX = Math.max(
        0,
        Math.min(canvas.width - paddleWidth, enemyPaddleX)
      );

      // 상대 패들 충돌 감지
      if (ballY - ballRadius <= paddleHeight) {
        if (
          ballX + ballRadius >= enemyPaddleX &&
          ballX - ballRadius <= enemyPaddleX + paddleWidth
        ) {
          ballSpeedY = -ballSpeedY;
          ballY = paddleHeight + ballRadius;
          ballSpeedX *= 1 + speedIncrease;
          ballSpeedY *= 1 + speedIncrease;
          passCount++;
        }
      }

      // 내 패들 충돌 감지
      if (ballY + ballRadius >= canvas.height - paddleHeight) {
        if (
          ballX + ballRadius >= paddleXRef.current &&
          ballX - ballRadius <= paddleXRef.current + paddleWidth
        ) {
          ballSpeedY = -ballSpeedY;
          ballY = canvas.height - paddleHeight - ballRadius;
          ballSpeedX *= 1 + speedIncrease;
          ballSpeedY *= 1 + speedIncrease;
          passCount++;
        }
      }

      // 패배 조건
      if (ballY >= canvas.height - 20) {
        updateScore("enemy");
      } else if (ballY <= 40) {
        updateScore("player");
      }

      // 캐릭터 & 공 렌더링
      ctx.save();
      ctx.drawImage(groomImage, enemyPaddleX, 0, paddleWidth, paddleHeight);
      ctx.drawImage(
        brideImage,
        paddleXRef.current,
        canvas.height - paddleHeight,
        paddleWidth,
        paddleHeight
      );
      ctx.restore();

      ctx.beginPath();
      ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#921A40";
      ctx.fill();
    };

    const interval = setInterval(gameLoop, 1000 / 60);
    return () => clearInterval(interval);
  }, [playerScore, enemyScore, gameOver, gameRunning]);

  useEffect(() => {
    if (countdown < 0) {
      setGameRunning(true);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const updateScore = (winner) => {
    if (winner === "player") {
      setPlayerScore((prev) => {
        if (prev + 1 >= 3) endGame("win");
        return prev + 1;
      });
    } else {
      setEnemyScore((prev) => {
        if (prev + 1 >= 3) endGame("lose");
        return prev + 1;
      });
    }
  };

  const endGame = (result) => {
    setGameOver(true);
    setGameResult(result);
    setAlertMessage(
      result === "win"
        ? "오늘은 강경하게 나가보죠!\n서운함을 차근히 말해봐요."
        : "상대방에게 사과해보는건 어떨까요?"
    );
  };

  const restartGame = () => {
    setPlayerScore(0);
    setEnemyScore(0);
    setGameOver(false);
    setAlertMessage("");
    setGameRunning(false);
    setCountdown(3);
    paddleXRef.current = (320 - paddleWidth) / 2; // 플레이어 패들
    setEnemyPaddleX((320 - paddleWidth) / 2); // 상대 패들
  };

  const handleMouseDown = () => setIsMouseDown(true);
  const handleMouseUp = () => setIsMouseDown(false);
  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const newX = e.clientX - rect.left;
    paddleXRef.current = Math.max(0, Math.min(240, newX - paddleWidth / 2));
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    const newX = touch.clientX - rect.left;
    paddleXRef.current = Math.max(0, Math.min(240, newX - paddleWidth / 2));
  };

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen bg-red-100 pt-4">
      {/* Header with clean, modern style */}
      <div className="mb-8 flex flex-col items-center space-y-2">
        <h1 className="text-2xl font-bold ">웨딩 핑퐁!</h1>
        <p className="text-sm text-gray-600">
          핑퐁 게임으로 오늘의 사과할 사람을 정해볼까요?
        </p>
      </div>

      {/* Score display with modern card style */}
      <div className="bg-white rounded-2xl shadow-md p-4 mb-6 w-[320px]">
        <div className="flex justify-between items-center px-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">나</p>
            <p className="text-xl font-bold text-[#921A40]">{playerScore}</p>
          </div>
          <div className="text-gray-300">vs</div>
          <div className="text-center">
            <p className="text-sm text-gray-500">상대</p>
            <p className="text-xl font-bold text-[#921A40]">{enemyScore}</p>
          </div>
        </div>
      </div>

      {/* Game canvas with soft shadow */}
      <div className="relative">
        {!gameRunning && countdown >= 0 && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <span className="text-4xl font-bold text-[#921A40] animate-pulse">
              {countdown > 0 ? countdown : "시작!"}
            </span>
          </div>
        )}
        <canvas
          ref={canvasRef}
          width={320}
          height={430}
          className="bg-white rounded-3xl shadow-lg"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        />
      </div>

      {/* Alert with matching style */}
      {alertMessage && (
        <PingPongAlert
          result={gameResult}
          message={alertMessage}
          onRestart={restartGame}
          onExit={() => navigate("/chat/mychat")}
          className="rounded-3xl shadow-lg bg-white"
        />
      )}
    </div>
  );
};

export default PingPong;
