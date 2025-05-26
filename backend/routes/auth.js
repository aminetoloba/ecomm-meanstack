const express = require("express");
const { registerUser, loginUser } = require("../handlers/auth-handler");
const router = express.Router();
const { verifyToken } = require('../middlewares/auth-middleware');

router.post("/register", async (req, res) =>{
    let model = req.body;
    if(model.name && model.email && model.password){
        await registerUser(model);
        res.send({
            message:"User registered",
        });
    } else{
        res.status(400).json({
            error: "Veuillez fournir votre nom, votre adresse e-mail et votre mot de passe",
        });
    }
});

router.post("/login", async (req, res) =>{
    let model = req.body;
    if(model.email && model.password){
        const result = await loginUser(model);
        if(result){
            res.send(result);
        } else{
            res.status(400).json({
                error: "Votre adresse e-mail ou votre mot de passe est incorrect",
            });
        }
    } else{
        res.status(400).json({
            error: "Veuillez fournir votre adresse e-mail et votre mot de passe",
        });
    }

});


module.exports = router;