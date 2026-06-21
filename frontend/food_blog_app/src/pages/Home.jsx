import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RecipeItem from '../components/RecipeItem'
import { useLoaderData, useNavigate } from 'react-router-dom'
import  Modal   from '../components/Modal'
import InputForm from '../components/InputForm'


 export default function Home() {
   const navigate=useNavigate()
   const [isOpen,setIsOpen]=useState(false)

   const addRecipe=()=>{
    let token=localStorage.getItem("token")
    if(token)
    navigate("/addRecipe")
  else{
    setIsOpen(true)
  }
   }
   const allRecipes=useLoaderData()
  return (
    <>
   
    <section className="home">
        <div className="left">
            <h1>Food Recipe</h1>
            <h5>Discover delicious recipes from around the world with easy step-by-step cooking instructions made for every skill level. Explore healthy meals, quick snacks, and restaurant-style dishes all in one place. Save your favorite recipes, plan meals effortlessly, and turn everyday cooking into something exciting.</h5>
          
        <button onClick={addRecipe}> Share your Recipe</button>
          </div>
          
        <div className="right">
          <img src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700,636"
       alt="food Recipe"></img>

      
        </div>
    </section>
    <div className="bg">
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d4f6e8" fillOpacity="1" d="M0,192L34.3,181.3C68.6,171,137,149,206,160C274.3,171,343,213,411,224C480,235,549,213,617,176C685.7,139,754,85,823,101.3C891.4,117,960,203,1029,218.7C1097.1,235,1166,181,1234,170.7C1302.9,160,1371,192,1406,208L1440,224L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>
    
    </div>
     { (isOpen) && <Modal onClose={()=>setIsOpen(false)}><InputForm
        setIsOpen={()=>setIsOpen(false)}/></Modal>}
    <div className='recipe'>
       
    <RecipeItem allRecipes={allRecipes}/>
    </div>
    
    </>
  )
}
