import { useEffect, useState } from "react"
import Arena from './Arena'
import PlayButton from './PlayButton'

function Play()
{
    const [turn, setTurn] = useState(1);
    const [unplacedUwong, setUnplacedUwong] = useState(21);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if(turn % 2)
            setMessage("Player 1's Turn!");
        else
            setMessage("Player 2's Turn!");
    }, [turn])

    return(
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
                    <div className="bg-yellow-300 p-5 rounded-lg">Restart</div>
                    <div className="bg-red-500 p-5 rounded-lg text-white">Exit</div>
                </div>
            </div>
            <div id="arena" className="fixed top-52 left-96 ">
                <Arena />
                <PlayButton turn={turn} setTurn={setTurn} unplacedUwong={unplacedUwong} setUnplacedUwong={setUnplacedUwong} />
            </div>
        </>
    )
}

export default Play