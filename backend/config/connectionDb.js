// const mongoose=require("mongoose")

// const connectDb=async()=>(
//     await mongoose.connect(process.env.CONNECTION_STRING)
//     .then(()=>console.log("connected..."))
// )

// module.exports=connectDb
const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);

    console.log("connected...");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;