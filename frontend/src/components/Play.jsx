import { useEffect, useState } from "react"
import Arena from './Arena'
import PlayButton from './PlayButton'

function Play()
{
    const [turn, setTurn] = useState(1);
    const [message, setMessage] = useState("");

    const clickedButton = (btn) => {
        console.log(btn);
        
        // if(index.classList.contains("bg-red-200"))
        // {
        //     let selectedButtons = document.querySelectorAll(".bg-red-200");
        //     // console.log(selectedButtons);
        //     selectedButtons.forEach((b) => {
        //         b.classList.remove("bg-red-200");
        //         b.classList.add("bg-red-300");
        //         b.disabled = true;
        //         uwongList.push(b.innerHTML)
        //     })
        //     turn += 1;
        //     console.log(uwongList);
            
        // }

        // console.log(index);
        // console.log();
        // console.log(index.classList.includes("bg-red-200"));
    }

    useEffect(() => {

        if(turn % 2)
            setMessage("Player 1's Turn!");
        else
            setMessage("Player 2's Turn!");
        // setTurn(turn + 1)
    }, [turn])

    return(
        <>
            <div id="messageContainer" className="fixed bottom-0 w-[100vw] py-10">
              <div className="flex justify-center">
                  <div className="bg-blue-300 p-5 rounded-lg" id="messageText">
                        {message}
                  </div>
              </div>
            </div>
            <div id="arena" className="fixed top-52 left-96 ">
                <Arena />
                <PlayButton />
            </div>
        </>
    )
}

export default Play