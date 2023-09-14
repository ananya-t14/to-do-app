const {Router} = require("express")
const router = Router()
const userModel = require("../models/user.models")
const { hash, verifyHash } = require("../utils/auth")

router.get("/", (req, res) => {
    res.json({message: "Hello USER"})
})

router.post("/signup", async (req, res) => {
    try{
        console.log(req.body)
        const {name, username, password, email} = req.body
        if (!name || !username || !password || !email) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(404).json({ error: 'User already exists' });
        }
        const hashedpassword = await hash(password);
        const newUser = await userModel.create({
            name,
            username,
            password: hashedpassword,
            email,
        });
        return res.status(200).json({message: `Created user having ${email}`})
    }
    catch(e){
        console.log(e)
        return res.status(404).json({message: "User not found"})
    }
})

router.get("/:email", async (req, res) => {
    try{
        const {email} = req.params
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json({message: `Details for user having ${email}`, data: user})
    }
    catch(e){
        return res.status(404).json({message: "User not found"})
    }
})

router.put("/:email", (req, res) => {
    try{
        const {email} = req.params
        return res.status(200).json({message: `Update user having ${email}`})
    }
    catch(e){
        return res.status(404).json({message: "User not found"})
    }
})

router.delete("/:email", (req, res) => {
    try{
        const {email} = req.params
        return res.status(200).json({message: `Delete user having ${email}`})
    }
    catch(e){
        return res.status(404).json({message: "User not found"})
    }
})

module.exports = router