const {Router} = require("express")

const router = Router()

router.get("/", (req, res) => {
    res.json({message: "Hello USER"})
})

router.get("/:email", (req, res) => {
    try{
        const {email} = req.params
        return res.status(200).json({message: `Details for user having ${email}`})
    }
    catch(e){
        return res.status(404).json({message: "User not found"})
    }
})

router.post("/:email", (req, res) => {
    try{
        const {email} = req.params
        return res.status(200).json({message: `Create user having ${email}`})
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