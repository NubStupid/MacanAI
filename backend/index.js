const express = require("express");
const app = express();
const cors = require("cors");

let uwongList = []
let macan
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

const getAvailablePositionFromArray = (index) => {
    let indexedNeighbours = neighbors[index]
    let allAvailablePosition = indexedNeighbours.reduce((acc,n)=>{
        if(n != null)acc.push(n)
        return acc
    },[])
    return allAvailablePosition
}

const setupUwong = (positions)=>{
    if(Array.isArray(positions)){
        if(positions.length == 9){
            for (let i = 0; i < positions.length; i++) {
                uwongList.push(positions[i])
            }
        }else{
            throw new Error(`Positions length in setup isn't valid with the regulation (9), actual posisitons length: ${positions.length}`)
        }
    }else{
        throw new Error("Positions in setup Uwong is not a valid data tpye")
    }
}

const setupMacan = (position) => {
    let macan = position
}




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/test", async (req, res) => {
    let neighbour = getAvailablePositionFromArray(1)
    return res.status(201).json({ message: "Hello world!",neighbors:neighbour });
})

app.listen(3000, () => console.log("Listening on port 3000"));