import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGO_URL= process.env.MONGO_URL;

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(MONGO_URL).then(()=> console.log('DB connected')).catch((err)=> console.log(err));
const userSchema = new mongoose.Schema({
    username : String,
    password : String
});
const User = mongoose.model('User', userSchema);

app.listen(PORT, () => {
    console.log("Server Started!!!");
});

app.post('/login', async (req, res) => {
    try{
        const { username, password } = req.body;
        const user = new User({
        username : username,
        password : password
    });
    await user.save();
    res.send({"status": "success", "message": "Something went wrong!!!"});
    } catch(err){
        alert(err);
        res.send({"status": "failed", "message": "Server error"});
    };
});