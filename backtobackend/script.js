import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import Users from "./userSchema.js"

const app = express();

const MONGOS_URI = "mongodb+srv://viranisahilcreativeinsight:bwtZz2Cwbnxko2uQ@learn.9wm4o.mongodb.net/Bhaibhai";

mongoose.connect(MONGOS_URI).then(() => {
    console.log("database connected");
}).catch((err) => {
    console.log(err, "Error connecting mongodb");
})

app.use(express.json())
app.use(cors())

app.post("/add-data", async (req, res) => {
    try {
        await Users.create(req.body)
        res.status(200).json({ message: "success..." })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.get("/get-data", async (req, res) => {
    try {
        const data = await Users.find();
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.delete("/delete-data/:id", async (req, res) => {
    try {
        const { id } = req.params
        await Users.findByIdAndDelete(id)
        res.status(200).json({ message: "success..." })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

app.put("/data-update/:id", async (req, res) => {
    try { 
        const {id} = req.params
        const dtaa = req.body
        await Users.findByIdAndUpdate(id, dtaa)
        res.status(200).json({message: "success..."})
    } catch (err) {
        res.status(500).json({ mesage: err.message })
    }
})

app.listen(3000, () => {
    console.log("server running at 3000")
})
