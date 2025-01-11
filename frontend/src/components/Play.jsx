import { useEffect, useState } from "react"
import Arena from './Arena'
import PlayButton from './PlayButton'

function Play({setRoutes})
{
    const [turn, setTurn] = useState(1);
    const [AI, setAI] = useState(-1);
    const [ply, setPly] = useState(-1);
    const [unplacedUwong, setUnplacedUwong] = useState(21);
    const [message, setMessage] = useState("");
    const [uwongLives, setUwongLives] = useState(8);
    const [gameOver, setGameOver] = useState(false); 
    const [winner, setWinner] = useState(null);

    // Fungsi restart permainan
    const restartGame = () => {
        setTurn(1);
        setUnplacedUwong(21);
        setMessage("");
        setUwongLives(8);
        setGameOver(false);
        setAI(-1);
        setPly(-1);
        setWinner(null);
    }

    useEffect(() => {
        if (uwongLives <= 0) {
            setGameOver(true);
            setWinner(AI === 1 ? "AI" : "player"); 
        } else if (uwongLives >= 14) {
            setGameOver(true);
            setWinner(AI === 0 ? "AI" : "player"); 
        }
    }, [uwongLives]);

    return(
        <>
            {gameOver ? (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex flex-col justify-center items-center text-white">
                    <h1 className="text-6xl font-bold mb-10">
                        {winner === "player" 
                            ? "You Win! 🎉" 
                            : "Game Over! AI Wins! 🐯"}
                    </h1>
                    <div className="flex space-x-5">
                        <button className="bg-green-500 p-5 rounded-lg text-2xl hover:bg-green-600" onClick={restartGame}>
                            Restart
                        </button>
                        <button className="bg-red-500 p-5 rounded-lg text-2xl hover:bg-red-600" onClick={() => setRoutes("Menu")}>
                            Main Menu
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    {AI == -1 &&
                    <div className="text-center mt-72">
                        <h3 className="text-5xl font-bold mb-10">Choose your role</h3>
                        <button className="bg-blue-200 p-3 px-5 rounded-lg hover:bg-blue-300 text-xl font-semibold me-5" onClick={() => setAI(0)}>Uwong</button>
                        <button className="bg-red-200 p-3 px-5 rounded-lg hover:bg-red-300 text-xl font-semibold" onClick={() => setAI(1)}>Macan</button>
                    </div>}
                    {AI != -1 && ply == -1 && 
                    <div className="text-center mt-72">
                        <h3 className="text-5xl font-bold mb-10">Choose your level</h3>
                        <button className="bg-green-200 p-3 px-5 rounded-lg hover:bg-green-300 text-xl font-semibold me-5" onClick={() => setPly(1)}>Easy</button>
                        <button className="bg-green-200 p-3 px-5 rounded-lg hover:bg-green-300 text-xl font-semibold me-5" onClick={() => setPly(2)}>Medium</button>
                        <button className="bg-green-200 p-3 px-5 rounded-lg hover:bg-green-300 text-xl font-semibold" onClick={() => setPly(3)}>Hard</button>
                    </div>}
                    {AI != -1 && ply != -1 &&
                    <>
                        <div className="fixed left-0 w-80 h-full bg-gray-100 py-10 px-6 font-semibold text-xl">
                            <div className="font-bold text-3xl mb-7 text-center">🐯MacananAI🐯</div>
                            <div className="grid gap-4 text-center">
                                <div className="bg-green-300 p-5 rounded-lg">{message}</div>
                                <div className="my-1 p-3 bg-violet-300 border-2 rounded-lg grid grid-cols-3">
                                    <div className="text-center">
                                        Uwong<br />
                                        Lives
                                    </div>
                                    <div className="col-span-2 text-center my-auto py-2 ms-1 rounded-lg bg-pink-200">
                                        {
                                            uwongLives == 1 ? (
                                                "❤️‍🩹"
                                            ) : uwongLives > 1 && uwongLives <= 3 ? (
                                                "❤️‍🔥"
                                            ) : "❤️"
                                        }
                                        {uwongLives}
                                    </div>
                                </div>
                                <div className="flex w-full">
                                    <div className="bg-blue-300 p-3 rounded-lg me-3 w-full" style={turn % 2 ? {boxShadow: "0px 0px 15px rgb(255, 238, 0)"} : {}}>
                                        <div>Uwong</div>
                                        <div className="bg-white rounded-md py-5 text-2xl mt-2">{unplacedUwong}</div>
                                    </div>
                                    <div className="bg-red-300 p-3 rounded-lg w-full" style={turn % 2 == 0 ? {boxShadow: "0px 0px 15px rgb(255, 238, 0)"}: {}}>
                                        <div>Macan</div>
                                        <div className="bg-white rounded-md py-5 text-2xl mt-2">{turn > 2 ? "0" : "1"}</div>
                                    </div>
                                </div>
                                <div className="bg-yellow-300 p-5 rounded-lg" onClick={restartGame}>Restart</div>
                                <div className="bg-red-500 p-5 rounded-lg text-white" onClick={() => setRoutes("Menu")}>Exit</div>
                            </div>
                        </div>
                        <div id="arena" className="fixed top-52 left-96 ">
                            <Arena />
                            <PlayButton turn={turn} setTurn={setTurn} unplacedUwong={unplacedUwong} setUnplacedUwong={setUnplacedUwong} AI={AI} setMessage={setMessage} ply={ply} setUwongLives={setUwongLives} />
                        </div>
                    </>}
                </>
            )}
        </>
    )
}

export default Play;
