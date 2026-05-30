const Recipes=require("../models/recipe")
const multer  = require('multer')


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.originalname
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })


const getRecipes= async(req,res)=>{
  const recipes=await Recipes.find()
  return res.json(recipes)
}

const getRecipe= async(req,res)=>{
    const recipe=await Recipes.findById(req.params.id)
    res.json(recipe)
}

const getMyRecipes = async (req,res) => {

    try{

        const recipes = await Recipes.find({
            createdBy:req.user.userId
        })

        res.json(recipes)

    }catch(err){

        res.status(500).json({
            message:"error"
        })
    }
}

// const addRecipe=async(req,res)=>{
//     console.log(req.body)
//     console.log(req.file)
//     console.log(req.user)
//     const {title,ingredients,instructions,time}=req.body;
//     const ingredients=(req.body.ingredients)
//     // const addRecipe = async(req,res)=>{
//     // console.log(req.body)

//     // const {title,ingredients,instructions,time}=req.body;

//     // console.log(title)
//     // console.log(ingredients)
//     // console.log(instructions)

   

//     if(!title || !ingredients || !instructions )
//         return res.json(
//     {
//         // res.json({message:"required fields cant be empty"})    
//         message:"required fields cant be empty"  
//     }
//         )
//     const newRecipe=await Recipes.create({
//         title,ingredients,instructions,time,coverImage:req.file.filename,
//         createdBy:req.user.id
//     })
//     return res.json(newRecipe)
// }
const addRecipe = async (req, res) => {

    console.log(req.body)
    console.log(req.file)

    try {

        const { title, instructions, time } = req.body

        const ingredients = JSON.parse(req.body.ingredients)

        if (!title || !ingredients || !instructions) {
            return res.json({
                message: "required fields cant be empty"
            })
        }

        const newRecipe = await Recipes.create({
            title,
            ingredients,
            instructions,
            time,
            coverImage: req.file ? req.file.filename :" https://www.foodandwine.com/thmb/fjNakOY7IcuvZac1hR3JcSo7vzI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/FAW-recipes-pasta-sausage-basil-and-mustard-hero-06-cfd1c0a2989e474ea7e574a38182bbee.jpg",
            createdBy: req.user?.userId
        })

        return res.json(newRecipe)

    } catch (err) {

        console.log(err)

        return res.status(500).json({
            message: "server error"
        })
    }
}
const editRecipe = async(req,res)=>{

   try{

      let recipe = await Recipes.findById(req.params.id)

      if(!recipe){
         return res.status(404).json({
            message:"Recipe not found"
         })
      }

      let ingredientsData

      try{
         ingredientsData = JSON.parse(req.body.ingredients)
      }
      catch{
         ingredientsData = req.body.ingredients
      }

      let coverImage = recipe.coverImage

      if(req.file){
         coverImage = req.file.filename
      }

      await Recipes.findByIdAndUpdate(
         req.params.id,
         {
            title:req.body.title,
            ingredients:ingredientsData,
            instructions:req.body.instructions,
            time:req.body.time,
            coverImage
         },
         {new:true}
      )

      res.json({
         message:"Recipe updated successfully"
      })

   }catch(err){

      console.log(err)

      return res.status(500).json({
         message:"error"
      })
   }
}
// const editRecipe=async(req,res)=>{
//    const {title,ingredients,instructions,time}=req.body
//    let recipe=await Recipes.findById(req.params.id)
//    try{
//         if(recipe){
//             let coverImage=req.file.filename ? req.file?.filename: recipe.coverImage
//            await Recipes.findByIdAndUpdate(req.params.id,{...req.body,coverImage},{new:true})
//              res.json({title,ingredients,instructions,time})
//         }
//     }
//     catch(err){
//         return res.status(404).json({message:"error"})
//     }

   
// }
const deleteRecipe=async(req,res)=>{
   try{
        await Recipes.deleteOne({_id:req.params.id})
        res.json({status:"ok"})
   }
   catch(err){
    return res.status(404).json({message:"error"})
   }
}

module.exports={getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,getMyRecipes,upload}