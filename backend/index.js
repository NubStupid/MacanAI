const express = require("express");
const app = express();
const cors = require("cors");

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
    [33, null, null, 35, null, null, null, null],
];

const getAvailablePositionFromArray = (index) => {
    let indexedNeighbours = neighbors[index];
    let allAvailablePosition = indexedNeighbours.reduce((acc, n) => {
        if (n != null) acc.push(n);
        return acc;
    }, []);
    return allAvailablePosition;
};

const getAvailableAreaForMacan = (macan, uwongList, area, index) => {
    // console.log(area,index);
    if (area.length == 0) {
        let availablePositions = getAvailablePositionFromArray(macan);
        availablePositions = availablePositions.filter(
            (p) => !uwongList.includes(p)
        );
        if (availablePositions.length == 0) {
            return [];
        } else {
            return getAvailableAreaForMacan(
                macan,
                uwongList,
                availablePositions,
                0
            );
        }
    } else {
        let availablePositions = [];
        if (index != area.length) {
            availablePositions = getAvailablePositionFromArray(area[index]);
        }
        // console.log(area,index,area.length,availablePositions.length);
        if (availablePositions.length != 0) {
            availablePositions.map((p) => {
                if (!area.includes(p) && !uwongList.includes(p)) {
                    area.push(p);
                }
            });
        } else {
            if (index == area.length) {
                return area;
            }
        }
        return getAvailableAreaForMacan(macan, uwongList, area, index + 1);
    }
};

const getAllPossibleMakan = (macan, uwongList) => {
    const possibleMakan = neighbors[macan];
    let canMakan = [];
    possibleMakan.forEach((p, index) => {
        let uwongCount = 0;
        let traverse = p;
        let indexIfMacanAte;
        let eaten = [];
        while (traverse != null && uwongList.includes(traverse)) {
            uwongCount++;
            eaten.push(traverse);
            traverse = neighbors[traverse][index];
            if (traverse != null) indexIfMacanAte = traverse;
            if (traverse == null && uwongCount % 2 == 1) uwongCount++;
        }
        if (uwongCount % 2 == 1) {
            canMakan.push({
                index: p,
                eaten: eaten,
                total: uwongCount,
                indexToEat: indexIfMacanAte,
            });
        }
    });
    // console.log(canMakan);

    return canMakan;
};

const getBestAncam = (position, uwongList) => {
    const canAncam = getAllPossibleMakan(position, uwongList);
    if (canAncam.length != 0) {
        let max = 0;
        canAncam.map((c) => {
            if (c.total > max) max = c.total;
        });
        return max;
    } else {
        return 0;
    }
};

const howSafeToPlaceUwong = (position, uwongList, macan) => {
    const terancam = neighbors[position].includes(macan);
    if (terancam == true) {
        return -50;
    } else {
        const neigbour = neighbors[position]; 
        let maxSafeUnit = 0;
        neigbour.forEach((n, index) => {
            let traverse = n;
            let safeUnit = 0;
            while (traverse != null && uwongList.includes(traverse)) {
                safeUnit++;
                traverse = neighbors[traverse][index];
            }
            if (safeUnit > maxSafeUnit) maxSafeUnit = safeUnit;
        });
        return maxSafeUnit;
    }
};

// Memakan uwong yang tetangganya banyak
const bestSetupPhaseMacanEatUwong = (uwongList) => {
    let maxUwongConnected = 0;
    let uwongToEat = -1;
    uwongList.forEach((u) => {
        let neighboringUwong = 0;
        neighbors[u].forEach((n) => {
            if (uwongList.includes(n)) neighboringUwong++;
        });
        if (maxUwongConnected < neighboringUwong) {
            maxUwongConnected = neighboringUwong;
            uwongToEat = u;
        }
    });
    return uwongToEat;
};

// Meletakkan macan di tempat yang possible makan dan movesnya paling banyak
// Menghindari posisi di segitiga ujung kiri kanan karena memungkinkan lebih cepat terkepung
const bestSetupMacan = (uwongList) => {
    let pos,
        min = 1000000;
    for (let i = 0; i < 37; i++) {
        if (!uwongList.includes(i)) {
            let temp = 0;
            const canMakan = getAllPossibleMakan(i, uwongList);
            canMakan.forEach((c) => {
                temp -= c.total * 100;
            });
            const moves = macanPossibleMoves(i, uwongList);
            temp -= moves.length * 20;
            if (i < 6 || i > 30) temp += 100;
            if (temp < min) {
                min = temp;
                pos = i;
            } else if (temp == min) {
                if (Array.isArray(pos)) pos.push(i);
                else pos = [pos, i];
            }
        }
    }
    // Kalau ada lebih dari 1 kemungkinan tempat yang nilainya sama maka dipilih acak
    if (Array.isArray(pos)) {
        let len = pos.length;
        let index = parseInt(Math.random() * (len - 1));
        return pos[index];
    }
    return pos;
};

const bestSetupUwong = () => {
    // uwong akan selalu mencari tempat yang paling tertutup
    let index = [12, 14, 22, 24];
    let center = index[parseInt(Math.random() * 3)];
    return [...neighbors[center], center];
};

// Masang uwong yang tempatnya lebih tertutup
/**
 * @param {Array<number>} possibleUwongList - Array of uwong that "could" be placed for the setup phase
 * @return {number} The total area of uwong's possible threat. The greater the returns means the placement is more open
 */
const bestSetup9UwongPlaced = (possibleUwongList) => {
    let totalOpenArea = 0;
    let topLeftUwong = possibleUwongList.reduce((acc, n) => {
        if (acc > n) {
            console.log(n);
            return n;
        } else {
            return acc;
        }
    }, 100);
    let bottomRightUwong = possibleUwongList.reduce((acc, n) => {
        if (acc < n) {
            return n;
        } else {
            return acc;
        }
    }, 0);
    console.log(topLeftUwong, bottomRightUwong);

    let traverse;
    // left
    traverse = topLeftUwong;
    while (traverse != null && traverse != 8) {
        traverse = neighbors[traverse][1];
        if (traverse != null) totalOpenArea++;
    }
    // top
    traverse = topLeftUwong;
    while (traverse != null) {
        traverse = neighbors[traverse][3];
        if (traverse != null) totalOpenArea++;
    }
    // right
    traverse = bottomRightUwong;
    while (traverse != null && traverse != 28) {
        traverse = neighbors[traverse][6];
        if (traverse != null) totalOpenArea++;
    }
    // bottom
    traverse = bottomRightUwong;
    while (traverse != null) {
        traverse = neighbors[traverse][4];
        if (traverse != null) totalOpenArea++;
    }

    return totalOpenArea;
};

/**
 * Calculate SBE Unit
 * @param {Array<Number>} positions - The index of the moves to make, Array when not in setup phase
 * @param {Number} role - Roles of the moves that needs to be evaluated (0 for macan, 1 for uwong)
 * @param {Number} macan - Index of macan
 * @param {Array<Number>} uwongList - List of all uwong in the board
 * @param {boolean} setup - Descripting the phase of the game, if it's in setup phase, set the parameter to True
 * @return {number} The value of SBE Evaluation for a specific moves
 */

function calculateUnitSBE(
    positions,
    role,
    macan,
    unplacedUwong,
    uwongList,
    setup = false
) {
    // Default unit = 0
    let SBEunit = 0;
    let winCondition = "";
    // Specified Roles Evaluation
    if (role == 1) {
        // uwong
        if (setup == true) {
            // fase pasang 9 uwong, positions jadi penentu pasang uwongList
            SBEunit -= bestSetup9UwongPlaced(positions);
        } else {
            // uwongList harus dikurangi p klo misal array
            // positions.forEach((p,index)=>{
            //     howSafeToPlaceUwong(p,uwongList,macan)
            // })
            let howSafe = howSafeToPlaceUwong(positions, uwongList, macan);
            SBEunit += howSafe;
            console.log("How Safe to Move/Place:", howSafe);
        }
    } else {
        // macan
        if (setup == true) {
            // fase makan 3 uwong, pastikan bukan array
            if (positions == bestSetupPhaseMacanEatUwong(uwongList)) {
                SBEunit -= 20;
            } else {
                SBEunit -= 10;
            }
        } else {
            // Kalau array
            // const canMakan = getAllPossibleMakan(macan,uwongList)
            // const bestMakan = canMakan.reduce((acc,m)=>{
            //     if(positions.includes(m.index)){
            //         if(m.total > acc){
            //             return m.total
            //         }
            //     }else{
            //         return acc
            //     }
            // },0)
            // SBEunit -= bestMakan*100
            // const allPossibleAncam = positions.map((p)=> neighbors[p])
            // const bestAncam = allPossibleAncam.reduce((acc,a)=>{
            //     const totalAncam = getBestAncam(a,uwongList)
            //     if(totalAncam > acc){
            //         return totalAncam
            //     }else{
            //         return acc
            //     }
            // },0)
            const canMakan = getAllPossibleMakan(macan, uwongList);
            // console.log(canMakan);

            canMakan.forEach((c) => {
                if (c.indexToEat == positions) {
                    console.log("Macan makan ", c.total, " orang");

                    SBEunit -= c.total * 100;
                    // const moves = macanPossibleMoves(positions, uwongList);
                    // SBEunit -= (moves.length - 1) * 20;
                    // if(positions < 6 || positions > 30)
                    //     SBEunit += 100;
                }
            });
        }
    }

    // General Evaluation
    if (macan != null && uwongList != null) {
        let macanSpace;
        // macan
        if (role != 1)
            macanSpace = getAvailableAreaForMacan(
                macan,
                uwongList,
                [],
                0
            ).length;
        else
            macanSpace = getAvailableAreaForMacan(
                macan,
                [...uwongList, positions],
                [],
                0
            ).length;
        console.log("Macan's Space: ", macanSpace);

        SBEunit -= macanSpace * 5;
        if (macanSpace == 0) winCondition = "uwong";
        if (unplacedUwong.length + uwongList <= 14) winCondition = "macan";

        // console.log([...uwongList,positions]);

        let bestAncam;
        if (role == 1)
            bestAncam = getBestAncam(macan, [...uwongList, positions]);
        else bestAncam = getBestAncam(macan, uwongList);
        console.log("Best Ancam:", bestAncam);
        SBEunit -= bestAncam * 50;
    }

    // Win Condition
    if (winCondition == "macan") {
        SBEunit -= 100000;
    } else if (winCondition == "uwong") {
        SBEunit += 100000;
    }

    return SBEunit;
}

const minimax = (
    ply,
    role,
    macan,
    uwongList,
    unplacedUwong,
    now,
    alpha = -1000000,
    beta = 10000000
) => {
    if (uwongList.length + unplacedUwong < 14) return -100000;
    if (macanPossibleMoves(macan, uwongList).length === 0) return 100000;

    if (ply === 0) {
        if (role) {
            return calculateUnitSBE(macan, 1, macan, unplacedUwong, uwongList);
        } else {
            return calculateUnitSBE(macan, 2, macan, unplacedUwong, uwongList);
        }
    }

    let bestMove = null;
    let SBE = role ? -1000000 : 1000000;

    if (role) {
        if (unplacedUwong > 0) {
            for (const p of uwongPossiblePlaced(macan, uwongList)) {
                let temp = minimax(
                    ply - 1,
                    !role,
                    macan,
                    [...uwongList, p],
                    unplacedUwong - 1,
                    now + 1,
                    alpha,
                    beta
                );
                if (temp > SBE) {
                    SBE = temp;
                    bestMove = {
                        macan: macan,
                        uwong: [...uwongList, p],
                        unplacedUwong: unplacedUwong - 1,
                    };
                }
                alpha = Math.max(alpha, SBE);
                if (beta <= alpha) break;
            }
        } else {
            for (const u of uwongList) {
                for (const p of uwongPossibleMoves(macan, uwongList, u)) {
                    let uwong = uwongList.filter((i) => i != u);
                    uwong.push(p);
                    let temp = minimax(
                        ply - 1,
                        !role,
                        macan,
                        uwong,
                        unplacedUwong,
                        now + 1,
                        alpha,
                        beta
                    );
                    if (temp > SBE) {
                        SBE = temp;
                        bestMove = {
                            macan: macan,
                            uwong: uwong,
                            unplacedUwong: unplacedUwong,
                        };
                    }
                    alpha = Math.max(alpha, SBE);
                    if (beta <= alpha) break;
                }
            }
        }
    } else {
        for (const p of macanPossibleMoves(macan, uwongList)) {
            let temp = minimax(
                ply - 1,
                !role,
                p,
                uwongList,
                unplacedUwong,
                now + 1,
                alpha,
                beta
            );
            if (temp < SBE) {
                SBE = temp;
                bestMove = {
                    macan: p,
                    uwong: uwongList,
                    unplacedUwong: unplacedUwong,
                };
            }
            beta = Math.min(beta, SBE);
            if (beta <= alpha) break;
        }
    }

    if (now === 0) return bestMove;
    return SBE;
};

const macanPossibleMoves = (macan, uwongList) => {
    const possibleMoves = neighbors[macan];
    let canMoves = [];
    possibleMoves.forEach((p, index) => {
        let uwongCount = 0;
        let traverse = p;
        while (traverse != null && uwongList.includes(traverse)) {
            uwongCount++;
            traverse = neighbors[traverse][index];
        }

        if (traverse != null && (uwongCount == 0 || uwongCount % 2 == 1))
            canMoves.push(traverse);
    });
    return canMoves;
};

const eatUwong = (now, pos, idx, uwong) => {
    if (!now) return { status: false, uwong };
    else if (now == pos) return { status: true, uwong };
    let temp = eatUwong(neighbors[now][idx], pos, idx, uwong);
    if (temp.status) {
        let uwongList = temp.uwong.filter((u) => u != now);
        return { status: true, uwong: uwongList };
    }
    return { status: false, uwong };
};

const uwongPossibleMoves = (macan, uwongList, index) => {
    let canMoves = [];
    neighbors[index].forEach((n) => {
        if (n && !uwongList.includes(n) && macan != n) canMoves.push(n);
    });
    return canMoves;
};

const uwongPossiblePlaced = (macan, uwongList) => {
    let canPlaced = [];
    for (let i = 0; i < 37; i++) {
        if (i != macan && !uwongList.includes(i)) canPlaced.push(i);
    }
    return canPlaced;
};

/**
 *
 * @param {Number} uwong
 * @param {Array<Number>} uwongList
 * @returns {Array<Number>}
 */
const getUpdatedUwongListIfUwongMoved = (uwong, uwongList) => {
    let updatedUwongList = uwongList.filter((u) => u != uwong);
    return updatedUwongList;
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/test/sbe", (req, res) => {
    // uwong move (success)
    // let toMove = {
    //     "index":12,
    //     "to":18
    // }
    // let dummUwongList = [6,7,8,9,10,11,12,13,14,15,24,29,20,17]
    // let dummMacan = 19
    // let updatedDummUwongList = getUpdatedUwongListIfUwongMoved(toMove.index,dummUwongList)
    // console.log(updatedDummUwongList);

    // const sbe = calculateUnitSBE(toMove.to,1,dummMacan,updatedDummUwongList)

    // macan move

    let macanMove = 28;
    let macan = 23;
    let dummUwongList = [4, 8, 13];
    const sbe = calculateUnitSBE(macanMove, 2, macan, dummUwongList);
    return res.status(200).json({ sbe: sbe });
});

app.get("/api/uwong/setup", (req, res) => {
    let dummUwongList = [6, 7, 8, 11, 12, 13, 16, 17, 18];
    let totalArea = bestSetup9UwongPlaced(dummUwongList);
    return res.json({ totalArea: totalArea });
});

app.get("/makan", (req, res) => {
    let dummList = [0, 3, 4, 5, 13, 18, 23, 6, 7];
    let dummMacan = 8;
    const getMakan = getAllPossibleMakan(dummMacan, dummList);
    return res.status(200).json({ makan: getMakan });
});

app.get("/area", (req, res) => {
    let dummList = [7, 13, 9, 12, 14];
    let dummMacan = 0;
    const area = getAvailableAreaForMacan(dummMacan, dummList, [], 0);
    return res.status(200).json({ area: area });
});

app.get("/test", async (req, res) => {
    let neighbour = getAvailablePositionFromArray(1);
    return res
        .status(201)
        .json({ message: "Hello world!", neighbors: neighbour });
});

app.post("/api/macan/moves", (req, res) => {
    const { macan, uwong } = req.body;
    const getMoves = macanPossibleMoves(macan, uwong);
    return res.status(200).json({ moves: getMoves });
});

app.post("/api/macan/eat", (req, res) => {
    const { macan, uwong, pos } = req.body;
    let eat = null;
    neighbors[macan].forEach((p, idx) => {
        if (p && !eat && uwong.includes(p)) {
            let temp = eatUwong(macan, pos, idx, uwong);
            if (temp.status) eat = temp.uwong;
        }
    });
    return res.status(200).json({ eat: eat });
});

app.post("/api/uwong/moves", (req, res) => {
    const { macan, uwong, index } = req.body;
    const getMoves = uwongPossibleMoves(macan, uwong, index);
    return res.status(200).json({ moves: getMoves });
});

app.post("/api/ai/move", (req, res) => {
    const { ply, role, macan, uwong, unplacedUwong } = req.body;
    const sbe = minimax(ply, role, macan, uwong, unplacedUwong, 0);
    return res.status(200).json({ data: sbe });
});

app.post("/api/ai/setup", (req, res) => {
    const { role, uwong } = req.body;
    if (role) {
        let uwong = bestSetupUwong();
        return res.json({ uwong });
    }
    let macan = bestSetupMacan(uwong);
    return res.json({ macan });
});

app.listen(3000, () => console.log("Listening on port 3000"));
