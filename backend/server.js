const express=require("express")
const app=express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const dotenv=require("dotenv").config()
const connectDb=require("./config/connectionDb")
const cors=require("cors")

const PORT=process.env.PORT || 3000
connectDb()

app.use(cors())
// app.use(express.static("/public"))
app.use('/images', express.static('public/images'))
// app.use('/images', express.static('public'))
app.use("/",require("./routes/user"))
app.use("/recipe",require("./routes/recipe"))

app.listen(PORT,(error)=>{
    console.log(`app is listening on port ${PORT}`);
})
