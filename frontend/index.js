// ========================= SETUP VARIABLE =====================================
// ==============================================================================
// ==============================================================================
// ==============================================================================
// ==============================================================================
// ==============================================================================

// Array 2D 37x8 -> 37 nodes posisi arena x node tetangga 8 arah mata angin
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

// Variabel untuk menyimpan data player Uwong
let uwongList = []

// Variabel untuk mengatur view halaman

let page = "menu"
const arena = document.getElementById("arena")
const menu = document.getElementById("menu")
const messageContainer = document.getElementById("messageContainer")
const messageText = document.getElementById('messageText')

//variable semua button yang ada di arena
let arenaButtons = document.querySelectorAll(".playButton")

// ==============================================================================
// ==============================================================================
// ==============================================================================
// ==============================================================================
// ==============================================================================




// ========================= PLAY VARIABLE =====================================
// ==============================================================================
// ==============================================================================
// ==============================================================================
// ==============================================================================
// ==============================================================================


let gamePlayed = false;
let setupPhase = false;
let gamePhase = false;
// Variabel turn, boolean untuk 2 player. True = player 1, false = player 2
// let turn = true;
let turn = 0;
let setupUwongCount = 9
let hoveredButton = null;



// ==============================================================================
// ==============================================================================
// ==============================================================================
// ==============================================================================
// ==============================================================================


const getMessageHTML = (title = "", message = "") => {
    return `
        <div class="text-2xl text-center text-white font-semibold ${title != "" ? "pb-5" : ""}">${title}</div>
        <div class="text-lg text-white font-normal text-center">${message}</div>
    `
}

const showMessage = (title = "", message = "") => {
    messageContainer.style.opacity = 1
    messageText.innerHTML = getMessageHTML(title, message)
}

const hideMessage = () => {
    messageContainer.style.opacity = 0
    messageText.innerHTML = ""
}

hideMessage()



//toggle switch buat disable button menu
const menuInputHandler = () => {
    document.getElementById("playversus").disabled = !document.getElementById("playversus").disabled
}

// toggle switch buat disable button arena
const arenaInputHandler = () => {
    arenaButtons.forEach(b => {
        b.disabled = !b.disabled
    });
}

const select9Uwong = (index, hover = true) => {
    if(index == 12 || index == 14 || index == 22 || index == 24)
    {
        if(hover)
        {
            arenaButtons[index].classList.add("bg-red-200")
            neighbors[index].forEach((n) => {
                arenaButtons[n].classList.add("bg-red-200");
            })
        }
        else
        {
            arenaButtons[index].classList.remove("bg-red-200")
            neighbors[index].forEach((n) => {
                arenaButtons[n].classList.remove("bg-red-200");
            })
        }
    }
    else
    {
        if(hover)
        {
            arenaButtons[neighbors[neighbors[index][1]][3]].classList.add("bg-red-200");
            arenaButtons[neighbors[index][1]].classList.add("bg-red-200");
            arenaButtons[neighbors[index][3]].classList.add("bg-red-200");
            arenaButtons[neighbors[neighbors[index][1]][4]].classList.add("bg-red-200");
            arenaButtons[index].classList.add("bg-red-200")
            arenaButtons[neighbors[index][4]].classList.add("bg-red-200");
            arenaButtons[neighbors[neighbors[index][6]][3]].classList.add("bg-red-200");
            arenaButtons[neighbors[index][6]].classList.add("bg-red-200");
            arenaButtons[neighbors[neighbors[index][6]][4]].classList.add("bg-red-200");
        }
        else
        {
            arenaButtons[neighbors[neighbors[index][1]][3]].classList.remove("bg-red-200");
            arenaButtons[neighbors[index][1]].classList.remove("bg-red-200");
            arenaButtons[neighbors[index][3]].classList.remove("bg-red-200");
            arenaButtons[neighbors[neighbors[index][1]][4]].classList.remove("bg-red-200");
            arenaButtons[index].classList.remove("bg-red-200")
            arenaButtons[neighbors[index][4]].classList.remove("bg-red-200");
            arenaButtons[neighbors[neighbors[index][6]][3]].classList.remove("bg-red-200");
            arenaButtons[neighbors[index][6]].classList.remove("bg-red-200");
            arenaButtons[neighbors[neighbors[index][6]][4]].classList.remove("bg-red-200");
        }

    }
}

// const clickedButton = (index) => {
//     console.log(index);
//     console.log();
//     if(index.classList.contains("bg-red-200"))
//     {
//         let selectedButtons = document.querySelectorAll(".bg-red-200");
//         // console.log(selectedButtons);
//         selectedButtons.forEach((b) => {
//             b.classList.remove("bg-red-200");
//             b.classList.add("bg-red-300");
//             b.disabled = true;
//             uwongList.push(b.innerHTML)
//         })
//         turn += 1;
//         console.log(uwongList);
        
//     }
//     // console.log(index.classList.includes("bg-red-200"));
// }

//Buat ngecek index dari seluruh button arena di dalam variabel arenaButtons

const renderUwongTest = () => {
    arenaButtons.forEach((b, index) => {
        b.innerHTML = index
        
        b.addEventListener('mouseenter', () => {
            if(turn == 1 && ((index > 11 && index < 15) || (index > 16 && index < 20) || (index > 21 && index < 25)))
                select9Uwong(index)
            else if(turn == 1)
                b.disabled = true;
            else if(turn > 1 && !b.classList.contains("bg-green-300"))
                b.disabled = false;
        });
    
        b.addEventListener('mouseleave', () => {
            select9Uwong(index, false);
        });
        b.addEventListener('click', () => {
            clickedButton(b);
        });
    })
}


const cleanUpUwong = () => {
    arenaButtons.forEach((b)=>{
        b.removeEventListener("mouseleave", () => {
            select9Uwong(index, false);
        })
        b.removeEventListener("click", () => {
            clickedButton(b);
        })
        b.removeEventListener("mouseenter", () => {
            if(turn == 1 && ((index > 11 && index < 15) || (index > 16 && index < 20) || (index > 21 && index < 25)))
                select9Uwong(index)
            else if(turn == 1)
                b.disabled = true;
            else if(turn > 1 && !b.classList.contains("bg-green-300"))
                b.disabled = false;
        })
    })
}


// Function untuk inti dari game playing
// const startGame = () => {
//     setTimeout(()=>{
//         if (turn == 1) {
//             if (setupPhase == true) {
//                 //Setup Uwong
//                 showMessage("Player 1's Turn!", `You have to place ${setupUwongCount} more Uwong!`)
//                 console.log("Player 1");
//                 renderUwongTest()
                
//             }else{
//                 turn++
//             }
//             // Switch turn
//         } else {
//             if (setupPhase == true) {
//                 // Setup macan
//                 console.log("Macan");
//                 cleanUpUwong()
//                 hideMessage()
//                 showMessage("Player 2's Turn!", "You have to eat 3 uwong first!")

                

//                 // setupPhase = false
//             }else{
//                 turn++
                
//             }
//             // Switch turn
//         }
//         // gamePlayed = false
//         if(gamePlayed == true){
//             startGame()
//         }
//     },200)
        
//         // while(turn == 1)
//         // {
//         //     console.log(arenaButtons);
//         //     // arenaButtonsfor.onmouseover((b) => {
//         //     //     console.log(b);
                
//         //     // })
//         // }
        
// }




//Function buat nunjukin skrng viewing apa, menu atau arenanya
// const renderPage = (status) => {
//     if (status == "menu") {
//         menu.style.opacity = 1
//         arena.style.opacity = 0
//     } else {
//         menu.style.opacity = 0
//         arena.style.opacity = 1
        
//         gamePlayed = true;
//         setupPhase = true;
//         turn = 1
//         startGame()
//     }
// }


// renderPage(page)
// Disable button arena karena setup awal
// arenaInputHandler()


//Function yang digunakan untuk switch mode playing dan mode menu
// const changePage = (setPage) => {
//     console.log("clicked");
//     page = setPage
//     menuInputHandler()
//     arenaInputHandler()
//     renderPage(page)
// }