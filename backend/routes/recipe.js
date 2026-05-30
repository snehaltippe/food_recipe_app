const express=require("express")
const { getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,getMyRecipes,upload } = require("../controller/recipe")
const verifyToken = require("../middleware/auth")
const router=express.Router()

router.get("/",getRecipes)
router.get("/myrecipes",verifyToken,getRecipes)   //get all the recipes
router.get("/:id",getRecipe) //get recipe by id
//router.post("/",upload.single('file'),verifyToken, addRecipe)  //add recipe
router.post("/",verifyToken,upload.single('file'),addRecipe)
router.put("/:id", upload.single("file"),editRecipe)  //edit recipe
router.delete("/:id",deleteRecipe)  //delete recipe

module.exports=router 