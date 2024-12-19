const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/test", async (req, res) => {
    return res.status(201).json({ message: "Hello !orld!" });
})

app.listen(3000, () => console.log("Listening on port 3000"));