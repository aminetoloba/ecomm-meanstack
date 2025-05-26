const express = require("express");
const router=express.Router();
const Category = require("./../db/category");
const { 
    addCategory,
    updateCategory,
    deleteCategory,
    getCategories,
    getCategoryById
 } = require("../handlers/category-handler");
 const { verifyToken, isAdmin } = require("../middlewares/auth-middleware");

router.post("", verifyToken, isAdmin,async(req,res)=>{
    console.log("here");
    let model = req.body;
    let result =await addCategory(model)
    res.send(result);
});

router.get("",async(req,res)=>{
    let result = await getCategories();
    res.send(result);
});

router.get("/:id", async(req,res)=>{
    let id = req.params["id"];
    let result = await getCategoryById(id);
    res.send(result);
});

router.put("/:id", verifyToken, isAdmin, async(req,res)=>{
    let model = req.body;
    let id = req.params["id"];
    await updateCategory(id, model);
    res.send({message: "Updated"});
});
router.delete("/:id", verifyToken, isAdmin, async(req,res)=>{
    let id = req.params["id"];
    await deleteCategory(id);
    res.send({message: "Deleted"});
})

module.exports = router;
