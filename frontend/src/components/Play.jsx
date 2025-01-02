import { useEffect, useState } from "react"
import Arena from './Arena'
import PlayButton from './PlayButton'

function Play({setRoutes})
{
    const [turn, setTurn] = useState(1);
    const [AI, setAI] = useState(-1);
    const [unplacedUwong, setUnplacedUwong] = useState(21);
    const [message, setMessage] = useState("");

    // useEffect(() => {
    //     setTurn(1);
    //     setUnplacedUwong(21);
    // }, [AI])

    return(
        <>
            {AI == -1 &&
            <div className="text-center mt-80">
                <h3 className="text-5xl font-bold mb-10">Choose your role</h3>
                <button className="bg-blue-200 p-3 px-5 rounded-lg hover:bg-blue-300 text-xl font-semibold me-5" onClick={() => setAI(0)}>Uwong</button>
                <button className="bg-red-200 p-3 px-5 rounded-lg hover:bg-red-300 text-xl font-semibold" onClick={() => setAI(1)}>Macan</button>
            </div>}
            {AI != -1 && 
            <>
                <div className="fixed left-0 w-80 h-full bg-gray-100 py-10 px-6 font-semibold text-xl">
                    <div className="font-bold text-3xl mb-7">MacananAI</div>
                    <div className="grid gap-4 text-center">
                        <div className="bg-green-300 p-5 rounded-lg">{message}</div>
                        <div className="flex w-full">
                            <div className="bg-blue-300 p-3 rounded-lg me-3 w-full" style={turn % 2 ? {boxShadow: "0px 0px 15px rgb(255, 238, 0)"} : {}}>
                                <div>Uwong</div>
                                <div className="bg-white rounded-md py-5 text-2xl mt-2">{unplacedUwong}</div>
                                <div>
                                </div>
                            </div>
                            <div className="bg-red-300 p-3 rounded-lg w-full" style={turn % 2 == 0 ? {boxShadow: "0px 0px 15px rgb(255, 238, 0)"}: {}}>
                                <div>Macan</div>
                                <div className="bg-white rounded-md py-5 text-2xl mt-2">{turn > 2 ? "0" : "1"}</div>
                            </div>
                        </div>
                        <div className="bg-yellow-300 p-5 rounded-lg" onClick={() => {
                            setTurn(0);
                            setUnplacedUwong(21);
                        }}>Restart</div>
                        <div className="bg-red-500 p-5 rounded-lg text-white" onClick={() => setRoutes("Menu")}>Exit</div>
                    </div>
                </div>
                <div id="arena" className="fixed top-52 left-96 ">
                    <Arena />
                    <PlayButton turn={turn} setTurn={setTurn} unplacedUwong={unplacedUwong} setUnplacedUwong={setUnplacedUwong} AI={AI} setMessage={setMessage} />
                </div>
            </>}
        </>
    )
}

export default Play