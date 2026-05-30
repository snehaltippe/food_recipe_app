// import axios from 'axios'
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// export default function AddFoodRecipe() {
//     const [recipeData, setRecipeData] = useState({})
//     const navigate = useNavigate()
//     const onHandleChange = (e) => {
//         let val = (e.target.name === "ingredients") ? e.target.value.split(",") : (e.target.name === "file") ? e.target.files[0] : e.target.value
//         setRecipeData(pre => ({ ...pre, [e.target.name]: val }))
//     }
//     const onHandleSubmit = async (e) => {
//         e.preventDefault()
//         console.log(recipeData)
//         await axios.post("http://localhost:5000/recipe", recipeData,{
//             headers:{
//                 'Content-Type':'multipart/form-data',
//                 'authorization':'bearer '+localStorage.getItem("token")
//             }
//         })  
//         //   .then(() => navigate("/"))//comment
//     }
//   //  this is comment
// //         headers:{
// //    'Content-Type':'application/json',
// //    'authorization':'bearer '+localStorage.getItem("token")

// //         }
// // })
//             // .then(() => navigate("/"))
//   //  }

//   //this is comment 
//     return (
//         <>
//             <div className='container'>
//                 <form className='form' onSubmit={onHandleSubmit}>
//                     <div className='form-control'>
//                         <label>Title</label>
//                         <input type="text" className='input' name="title" onChange={onHandleChange}></input>
//                     </div>
//                     <div className='form-control'>
//                         <label>Time</label>
//                         <input type="text" className='input' name="time" onChange={onHandleChange}></input>
//                     </div>
//                     <div className='form-control'>
//                         <label>Ingredients</label>
//                         <textarea type="text" className='input-textarea' name="ingredients" rows="5" onChange={onHandleChange}></textarea>
//                     </div>
//                     <div className='form-control'>
//                         <label>Instructions</label>
//                         <textarea type="text" className='input-textarea' name="instructions" rows="5" onChange={onHandleChange}></textarea>
//                     </div>
//                     <div className='form-control'>
//                         <label>Recipe Image</label>
//                         <input type="file" className='input' name="file" onChange={onHandleChange}></input>
//                     </div>
//                     <button type="submit">Add Recipe</button>
//                 </form>
//             </div>
//         </>
//     )
// }


// import axios from 'axios'
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// export default function AddFoodRecipe() {

//     const [recipeData, setRecipeData] = useState({})
//     const navigate = useNavigate()

//     const onHandleChange = (e) => {

//         let val = e.target.name === "ingredients"
//             ? e.target.value.split(",")
//             : e.target.value

//         setRecipeData(pre => ({
//             ...pre,
//             [e.target.name]: val
//         }))
//     }

//     const onHandleSubmit = async (e) => {

//         e.preventDefault()

//         console.log(recipeData)

//         try {

//             const res = await axios.post(
//                 "http://localhost:5000/recipe",
//                 recipeData,
          //  )
                // {
                //     headers: {
                //         'Content-Type': 'application/json',
                //         'authorization':
                //             'bearer ' + localStorage.getItem("token")
                //     }
                // }
            

    //         console.log(res.data)

    //         navigate("/")

    //     } catch (err) {

    //         console.log(err)

    //     }
    // }

//     return (
//         <>
//             <div className='container'>

//                 <form className='form' onSubmit={onHandleSubmit}>

//                     <div className='form-control'>
//                         <label>Title</label>
//                         <input
//                             type="text"
//                             className='input'
//                             name="title"
//                             onChange={onHandleChange}
//                         />
//                     </div>

//                     <div className='form-control'>
//                         <label>Time</label>
//                         <input
//                             type="text"
//                             className='input'
//                             name="time"
//                             onChange={onHandleChange}
//                         />
//                     </div>

//                     <div className='form-control'>
//                         <label>Ingredients</label>

//                         <textarea
//                             className='input-textarea'
//                             name="ingredients"
//                             rows="5"
//                             onChange={onHandleChange}
//                         />
//                     </div>

//                     <div className='form-control'>
//                         <label>Instructions</label>

//                         <textarea
//                             className='input-textarea'
//                             name="instructions"
//                             rows="5"
//                             onChange={onHandleChange}
//                         />
//                     </div>

//                     <button type="submit">
//                         Add Recipe
//                     </button>

//                 </form>
//             </div>
//         </>
//     )
// }
//  return (
//         <>
//             <div className='container'>
//                 <form className='form' onSubmit={onHandleSubmit}>
//                     <div className='form-control'>
//                         <label>Title</label>
//                         <input type="text" className='input' name="title" onChange={onHandleChange}></input>
//                     </div>
//                     <div className='form-control'>
//                         <label>Time</label>
//                         <input type="text" className='input' name="time" onChange={onHandleChange}></input>
//                     </div>
//                     <div className='form-control'>
//                         <label>Ingredients</label>
//                         <textarea type="text" className='input-textarea' name="ingredients" rows="5" onChange={onHandleChange}></textarea>
//                     </div>
//                     <div className='form-control'>
//                         <label>Instructions</label>
//                         <textarea type="text" className='input-textarea' name="instructions" rows="5" onChange={onHandleChange}></textarea>
//                     </div>
//                     <div className='form-control'>
//                         <label>Recipe Image</label>
//                         <input type="file" className='input' name="file" onChange={onHandleChange}></input>
//                     </div>
//                     <button type="submit">Add Recipe</button>
//                 </form>
//             </div>
//         </>
//     )
// }



import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddFoodRecipe() {
     const[loading,setLoading]=useState(false)
    const [recipeData, setRecipeData] = useState({
        title: "",
        time: "",
        ingredients: [],
        instructions: "",
        file: null
    })

    const navigate = useNavigate()

    const onHandleChange = (e) => {

        let val

        if (e.target.name === "ingredients") {
            val = e.target.value.split(",")
        }
        else if (e.target.name === "file") {
            val = e.target.files[0]
        }
        else {
            val = e.target.value
        }

        setRecipeData((pre) => ({
            ...pre,
            [e.target.name]: val
        }))
    }

    const onHandleSubmit = async (e) => {

        e.preventDefault()
        if(loading) return 
         setLoading(true)

        const formData = new FormData()

        formData.append("title", recipeData.title)
        formData.append("time", recipeData.time)
        formData.append("instructions", recipeData.instructions)

        // recipeData.ingredients.forEach((item) => {
        //     formData.append("ingredients", item)
        // })
        formData.append("ingredients",
            JSON.stringify(recipeData.ingredients )
        )

        formData.append("file", recipeData.file)

        try {

            const res = await axios.post(
                "http://localhost:5000/recipe",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        authorization:
                            "bearer " + localStorage.getItem("token")
                    }
                }
            )

            console.log(res.data)
             alert("Recipe added successfully")
           // navigate("/")
           window.location.href="/"

        } catch (err) {
            setLoading(false)
            console.log(err)
        }
    }

    return (
        <>
            <div className='container'>

                <form className='form' onSubmit={onHandleSubmit}>

                    <div className='form-control'>
                        <label>Title</label>

                        <input
                            type="text"
                            className='input'
                            name="title"
                            value={recipeData.title}
                            onChange={onHandleChange}
                        />
                    </div>

                    <div className='form-control'>
                        <label>Time</label>

                        <input
                            type="text"
                            className='input'
                            name="time"
                            value={recipeData.time}
                            onChange={onHandleChange}
                        />
                    </div>

                    <div className='form-control'>
                        <label>Ingredients</label>

                        <textarea
                            className='input-textarea'
                            name="ingredients"
                            rows="5"
                            onChange={onHandleChange}
                        ></textarea>
                    </div>

                    <div className='form-control'>
                        <label>Instructions</label>

                        <textarea
                            className='input-textarea'
                            name="instructions"
                            rows="5"
                            value={recipeData.instructions}
                            onChange={onHandleChange}
                        ></textarea>
                    </div>

                    <div className='form-control'>
                        <label>Recipe Image</label>

                        <input
                            type="file"
                            className='input'
                            name="file"
                            onChange={onHandleChange}
                        />
                    </div>
{/* 
                    <button type="submit">
                        Add Recipe
                    </button> */}
                     <button type="submit"
                        disabled={loading}>
                        {loading ? "Adding...":"Add Recipes" }
                     </button>

                </form>

            </div>
        </>
    )
}