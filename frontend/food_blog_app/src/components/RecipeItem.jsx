import React, { useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';

  export default function RecipeItem({allRecipes}) {
  // export default function RecipeItem() {

 //const [setAllRecipes] =useState()
 const [recipeData,setRecipeData] =useState([])
 useEffect(()=>{
  setRecipeData(allRecipes)
 },[allRecipes])

//    const recipes=useLoaderData()
   let path=window.location.pathname==="/myRecipe" ? true:false
  //  let favItems=JSON.parse(localStorage.getItem("fav")) ?? []
   let favItems=JSON.parse(localStorage.getItem("fav")) || []
   const [isFavRecipe,setIsFavRecipe]=useState(false)

   console.log(allRecipes)
  //  useEffect(()=>{
  //      setAllRecipes(recipes)
  //  },[recipes])

   const onDelete=async(id)=>{
     await axios.delete(`http://localhost:5000/recipe/${id}`)
     .then((res)=>console.log(res))
    // setAllRecipes(recipes=>recipes.filter(recipes=>recipes._id !==id ))
    alert("Recipe Deleted successfully")
    setRecipeData(prev=>prev.filter(recipe=>recipe._id !==id))
   }

    // const favRecipe =(item)=>{
    //   let filterItem =favItems.filter(recipe=>recipe._id !==item._id)
    //   favItems=favItems.filter(recipe=>recipe._id===item._id).length===0 ? [...favItems,items] :filterItem
    //   localStorage.setItem("fav",JSON.stringify(favItems))
    //   setIsFavRecipe(pre=>!pre)
    // }
    const favRecipe = (item) => {

    let updatedFavs

    const alreadyExists = favItems.some(
        recipe => recipe._id === item._id
    )

    if(alreadyExists){

        updatedFavs = favItems.filter(
            recipe => recipe._id !== item._id
        )

    }else{

        updatedFavs = [...favItems, item]
    }

    localStorage.setItem(
        "fav",
        JSON.stringify(updatedFavs)
    )

    setIsFavRecipe(!isFavRecipe)
}

  return (
 <>
 <div className="card-container">
  {
    recipeData?.map((item,index)=>{
      return(
        <div key={index} className='card'>
          <img
    src={
    item.coverImage
      ?item.coverImage.startsWith("http")?item.coverImage:` http://localhost:5000/images/${item.coverImage} `:" https://www.foodandwine.com/thmb/fjNakOY7IcuvZac1hR3JcSo7vzI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/FAW-recipes-pasta-sausage-basil-and-mustard-hero-06-cfd1c0a2989e474ea7e574a38182bbee.jpg"
       }
      width="120px"
      height="100px"
     />
           {/* <img src={`http://localhost:5000/images/${item.coverImage}`}   width="120px" height="100px" ></img> */}
            <div className="card-body">
              {/* <div className="title">{item.title.name}</div> */}
              <div className="title">{item.title}</div> 
               <div className="icons">
                 <div className="timer"><BsStopwatchFill />{item.time}</div>
                { (!path) ? <FaHeart onClick={()=>favRecipe(item)} 
                  style={{color:(favItems).some(res=>res._id===item._id) ?"red":""}} /> :
                 <div className='action'>
                   <Link to={`/editRecipe/${item._id}`} className="editIcon">  <FaEdit />
                   </Link>
                     <MdDelete onClick={()=>onDelete(item._id)} className='deleteIcon' />
                  </div>
                }
               </div>
            </div>
        </div>

      )
    })
  }
 </div>

 </>
  )
}
