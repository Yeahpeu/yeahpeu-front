import MyButton from "../common/MyButton";

const PingPongAlert = ({ result, message, onRestart, onExit }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="flex flex-col justify-center bg-white rounded-lg shadow-lg p-4 w-[85%] max-w-[300px] border">
                <p className="text-center text-2xl font-extrabold mb-2">
                    {result === "win" ? "You Win!" : "You Lose!"}
                </p>
                <p className="text-center mb-4 font-bold whitespace-pre-line">
                    {message}
                </p>
                <div className="flex justify-center w-full space-x-4">
                    {onRestart && (
                        <MyButton value="다시하기" color="abled" onClick={onRestart} />
                    )}
                    {onExit && (
                        <MyButton value="나가기" color="disabled" onClick={onExit} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default PingPongAlert;
