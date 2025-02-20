import React from "react";
import WeddingPingpong from "../molecules/GameMolecules/WeddingPingpong"; // 경로 확인!

const GamePage = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <WeddingPingpong /> {/* 핑퐁 게임 컴포넌트 렌더링 */}
        </div>
    );
};

export default GamePage;
