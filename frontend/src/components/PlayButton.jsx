import { useRef } from "react";
import client from "../client";

function PlayButton({turn, setTurn, unplacedUwong, setUnplacedUwong})
{
    const neighbors = [
        [null, null, null, null, 1, null, null, 3],
        [null, null, null, 0, 2, null, 4, null],
        [null, null, null, 1, null, 5, null, null],
        [0, null, null, null, 4, null, null, 8],
        [null, 1, null, 3, 5, null, 8, null],
        [null, null, 2, 4, null, 8, null, null],
        [null, null, null, null, 7, null, 11, 12],
        [null, null, null, 6, 8, null, 12, null],
        [3, 4, 5, 7, 9, 12, 13, 14],
        [null, null, null, 8, 10, null, 14, null],
        [null, null, null, 9, null, 14, 15, null],
        [null, 6, null, null, 12, null, 16, null],
        [6, 7, 8, 11, 13, 16, 17, 18],
        [null, 8, null, 12, 14, null, 18, null],
        [8, 9, 10, 13, 15, 18, 19, 20],
        [null, 10, null, 14, null, null, 20, null],
        [null, 11, 12, null, 17, null, 21, 22],
        [null, 12, null, 16, 18, null, 22, null],
        [12, 13, 14, 17, 19, 22, 23, 24],
        [null, 14, null, 18, 20, null, 24, null],
        [14, 15, null, 19, null, 24, 25, null],
        [null, 16, null, null, 22, null, 26, null],
        [16, 17, 18, 21, 23, 26, 27, 28],
        [null, 18, null, 22, 24, null, 28, null],
        [18, 19, 20, 23, 25, 28, 29, 30],
        [null, 20, null, 24, null, null, 30, null],
        [null, 21, 22, null, 27, null, null, null],
        [null, 22, null, 26, 28, null, null, null],
        [22, 23, 24, 27, 29, 31, 32, 33],
        [null, 24, null, 28, 30, null, null, null],
        [24, 25, null, 29, null, null, null, null],
        [null, null, 28, null, 32, 34, null, null],
        [null, 28, null, 31, 33, null, 35, null],
        [28, null, null, 32, null, null, null, 36],
        [null, null, 31, null, 35, null, null, null],
        [null, 32, null, 34, 36, null, null, null],
        [33, null, null, 35, null, null, null, null]
    ]

    const macan = useRef(-1);
    const uwong = useRef([]);
    let arenaButtons = document.querySelectorAll(".playButton")

    const renderButton = () => {
        arenaButtons.forEach(b => {
            b.classList.remove("border-black");
            b.classList.remove("border-2");
            b.classList.remove("bg-blue-300");
            b.classList.remove("bg-blue-200");
            b.classList.remove("bg-blue-100");
            b.classList.remove("bg-red-300");
            b.classList.remove("bg-red-200");
            b.classList.remove("bg-red-100");
            b.classList.add("bg-green-300");
            b.disabled = true;
        });
        if(macan.current != -1)
        {
            arenaButtons[macan.current].classList.remove("bg-green-300");
            arenaButtons[macan.current].classList.add("bg-red-300");
        }
        uwong.current.forEach(u => {
            arenaButtons[u].classList.remove("bg-green-300");
            arenaButtons[u].classList.add("bg-blue-300")
        });
    }

    const select9Uwong = (btn, hover = true) => {
        let index = btn.id.substring(3);
        
        if(index == 12 || index == 14 || index == 22 || index == 24)
        {
            if(hover)
            {
                arenaButtons[index].classList.add("bg-blue-200")
                neighbors[index].forEach((n) => {
                    arenaButtons[n].classList.add("bg-blue-200");
                })
            }
            else
            {
                arenaButtons[index].classList.remove("bg-blue-200")
                neighbors[index].forEach((n) => {
                    arenaButtons[n].classList.remove("bg-blue-200");
                })
            }
        }
        else
        {
            if(hover)
            {
                arenaButtons[neighbors[neighbors[index][1]][3]].classList.add("bg-blue-200");
                arenaButtons[neighbors[index][1]].classList.add("bg-blue-200");
                arenaButtons[neighbors[index][3]].classList.add("bg-blue-200");
                arenaButtons[neighbors[neighbors[index][1]][4]].classList.add("bg-blue-200");
                arenaButtons[index].classList.add("bg-blue-200")
                arenaButtons[neighbors[index][4]].classList.add("bg-blue-200");
                arenaButtons[neighbors[neighbors[index][6]][3]].classList.add("bg-blue-200");
                arenaButtons[neighbors[index][6]].classList.add("bg-blue-200");
                arenaButtons[neighbors[neighbors[index][6]][4]].classList.add("bg-blue-200");
            }
            else
            {
                arenaButtons[neighbors[neighbors[index][1]][3]].classList.remove("bg-blue-200");
                arenaButtons[neighbors[index][1]].classList.remove("bg-blue-200");
                arenaButtons[neighbors[index][3]].classList.remove("bg-blue-200");
                arenaButtons[neighbors[neighbors[index][1]][4]].classList.remove("bg-blue-200");
                arenaButtons[index].classList.remove("bg-blue-200")
                arenaButtons[neighbors[index][4]].classList.remove("bg-blue-200");
                arenaButtons[neighbors[neighbors[index][6]][3]].classList.remove("bg-blue-200");
                arenaButtons[neighbors[index][6]].classList.remove("bg-blue-200");
                arenaButtons[neighbors[neighbors[index][6]][4]].classList.remove("bg-blue-200");
            }
        }
    }

    const gameOver = () => {
        arenaButtons.forEach((b) => {
            b.classList.remove("border-black");
            b.classList.remove("border-2");
            b.classList.remove("bg-green-300");
            b.classList.remove("bg-blue-300");
            b.classList.remove("bg-blue-200");
            b.classList.remove("bg-blue-100");
            b.classList.remove("bg-red-300");
            b.classList.remove("bg-red-200");
            b.classList.remove("bg-red-100");
        })
    }

    const possibleMoves = async (btn, now = "macan") => {
        if(now == "macan")
        {
            let moves = await client.post(`/macan/moves`, {macan: macan.current, uwong: uwong.current});
            arenaButtons[macan.current].classList.add("border-black");
            arenaButtons[macan.current].classList.add("border-2");
            moves.data.moves.forEach((m) => {
                arenaButtons[m].classList.add("bg-red-100");
                arenaButtons[m].disabled = false;
            })
            if(moves.data.moves.length == 0)
                gameOver();
        }
        else
        {
            btn.classList.add("border-black");
            btn.classList.add("border-2");
            let moves = await client.post(`/uwong/moves`, {macan: macan.current, uwong: uwong.current, index: parseInt(btn.id.substring(3))});
            moves.data.moves.forEach((m) => {
                arenaButtons[m].classList.add("bg-blue-100");
                arenaButtons[m].disabled = false;
            })
        }
    }

    const eatUwong = (now, idx) => {
        if(!now)
            return false;
        else if(arenaButtons[now].className.includes("bg-red-200"))
            return true;
        if(eatUwong(neighbors[now][idx], idx) == true)
        {
            uwong.current = uwong.current.filter(u => u != now);
            return true;
        }
        return false;
    }

    const click = (btn) => {
        let index = parseInt(btn.id.substring(3));
        if(turn == 1)
        {
            let selectedButtons = document.querySelectorAll(".bg-blue-200");
            selectedButtons.forEach((b) => uwong.current.push(parseInt(b.id.substring(3))))
            renderButton();
            setUnplacedUwong(unplacedUwong - 9);
            setTurn(i => i + 1);
        }
        else if(turn == 2)
        {
            if(btn.className.includes("bg-red-200"))
            {   
                macan.current = parseInt(btn.id.substring(3));
                renderButton();
                setTurn(i => i + 1);
            }
        }
        else if(turn % 2)
        {
            if(unplacedUwong > 0)
            {
                uwong.current.push(parseInt(btn.id.substring(3)));
                renderButton();
                setUnplacedUwong(unplacedUwong - 1);
                setTurn(turn + 1);
                possibleMoves(btn);
            }
            else if(uwong.current.includes(index))
            {
                renderButton();
                possibleMoves(btn, "uwong")
            }
            else
            {
                document.querySelectorAll(".border-black").forEach((b) => uwong.current = uwong.current.filter(u => u != parseInt(b.id.substring(3))));
                uwong.current.push(parseInt(btn.id.substring(3)));
                renderButton();
                setTurn(turn + 1);
                possibleMoves(btn);
            }
        }
        else if(turn % 2 == 0)
        {
            let ketemu = false;
            neighbors[macan.current].forEach((n, idx) => {
                if(ketemu)
                    return;
                if(arenaButtons[n] == btn)
                    ketemu = true;
                else if(arenaButtons[n] && arenaButtons[n].className.includes("bg-blue-300"))
                    eatUwong(n, idx);
            })
            macan.current = parseInt(btn.id.substring(3));
            if(uwong.current.length + unplacedUwong < 14)
            {
                gameOver();
                return;
            }
            renderButton();
            setTurn(turn + 1);
        }
    }

    const hover = (btn) => {
        let index = parseInt(btn.id.substring(3));
        if(turn == 1 && ((index > 11 && index < 15) || (index > 16 && index < 20) || (index > 21 && index < 25)))
            select9Uwong(btn)
        else if(turn == 1)
            btn.disabled = true;
        else if(turn == 2)
        {
            if(!uwong.current.includes(index))
            {
                btn.classList.add("bg-red-200");
                btn.disabled = false;
            }
        }
        else if(turn % 2)
        {
            if(unplacedUwong > 0)
            {
                if(btn.className.includes("bg-green-300"))
                {
                    btn.disabled = false;
                    btn.classList.add("bg-blue-200");
                }
                else
                    btn.disabled = true;
            }
            else
            {   
                if(btn.className.includes("bg-blue-300") && !btn.className.includes("border-black"))
                {
                    btn.disabled = false;
                    btn.classList.add("bg-blue-200");
                }
                else if(btn.className.includes("bg-blue-100"))
                {
                    btn.disabled = false;
                    btn.classList.remove("bg-blue-100");
                    btn.classList.add("bg-blue-200");
                }
                else
                    btn.disabled = true;
            }
        }
        else if(turn % 2 == 0)
        {
            if(!btn.disabled)
            {
                btn.classList.remove("bg-red-100");
                btn.classList.add("bg-red-200");
            }
        }
    }

    const unhover = (btn) => {
        if(turn == 1)
            select9Uwong(btn, false)
        else if(turn == 2 && btn.className.includes("bg-red-200"))
            btn.classList.remove("bg-red-200");
        else if(turn == 2 && btn.className.includes("bg-green-300") && !btn.disabled)
        {
            btn.classList.remove("bg-green-300");
            btn.classList.add("bg-blue-300");
        }
        else if(turn % 2)
        {
            if(btn.className.includes("bg-blue-200"))
            {
                btn.classList.remove("bg-blue-200");
                if(unplacedUwong == 0 && !btn.className.includes("bg-blue-300"))
                    btn.classList.add("bg-blue-100");
            }
        }
        else if(turn % 2 == 0 && btn.className.includes("bg-red-200"))
        {
            btn.classList.remove("bg-red-200");
            btn.classList.add("bg-red-100");
        }
    }
    return(
        <>
            <button id="btn0" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[10px] left-[-30px] playButton"></button>
            <button id="btn1" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[170px] left-[-30px] playButton"></button>
            <button id="btn2" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[330px] left-[-30px] playButton"></button>
            <button id="btn3" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[81px] left-[50px]  playButton"></button>
            <button id="btn4" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[170px] left-[50px] playButton"></button>
            <button id="btn5" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[259px] left-[50px] playButton"></button>
            <button id="btn6" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[-30px] left-[150px] playButton"></button>
            <button id="btn7" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[70px] left-[150px] playButton"></button>
            <button id="btn8" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[170px] left-[150px] playButton"></button>
            <button id="btn9" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[270px] left-[150px] playButton"></button>
            <button id="btn10" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[370px] left-[150px] playButton"></button>
            <button id="btn11" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[-30px] left-[250px] playButton"></button>
            <button id="btn12" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[70px] left-[250px] playButton"></button>
            <button id="btn13" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[170px] left-[250px] playButton"></button>
            <button id="btn14" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[270px] left-[250px] playButton"></button>
            <button id="btn15" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[370px] left-[250px] playButton"></button>
            <button id="btn16" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[-30px] left-[350px] playButton"></button>
            <button id="btn17" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[70px] left-[350px] playButton"></button>
            <button id="btn18" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[170px] left-[350px] playButton"></button>
            <button id="btn19" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[270px] left-[350px] playButton"></button>
            <button id="btn20" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[370px] left-[350px] playButton"></button>
            <button id="btn21" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[-30px] left-[450px] playButton"></button>
            <button id="btn22" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[70px] left-[450px] playButton"></button>
            <button id="btn23" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[170px] left-[450px] playButton"></button>
            <button id="btn24" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[270px] left-[450px] playButton"></button>
            <button id="btn25" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[370px] left-[450px] playButton"></button>
            <button id="btn26" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[-30px] left-[550px] playButton"></button>
            <button id="btn27" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[70px] left-[550px] playButton"></button>
            <button id="btn28" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[170px] left-[550px] playButton"></button>
            <button id="btn29" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[270px] left-[550px] playButton"></button>
            <button id="btn30" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[370px] left-[550px] playButton"></button>
            <button id="btn31" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[81px] left-[650px] playButton"></button>
            <button id="btn32" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[170px] left-[650px] playButton"></button>
            <button id="btn33" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[259px] left-[650px] playButton"></button>
            <button id="btn34" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[10px] left-[730px] playButton"></button>
            <button id="btn35" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[170px] left-[730px] playButton"></button>
            <button id="btn36" onMouseEnter={(e) => hover(e.target)} onMouseLeave={(e) => unhover(e.target)} onClick={(e) => click(e.target)}
                className="z-0 absolute rounded-full bg-green-300 w-[60px] h-[60px] top-[330px] left-[730px] playButton"></button>
        </>
    )
}

export default PlayButton