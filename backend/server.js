// const express = require('express')
// const notes = require('./data/notes')
// const dotenv=require('dotenv')
// const DBconnect = require('./config/db')
// const  userRoute = require("./routes/userRoute")
// const  noteRoute = require("./routes/noteRoute")
// const { errorHandler, notFound } = require('./middlewares/errorMiddleware')
// const path=require("path")
// const app=express()
// const cors = require("cors");
// dotenv.config()
// DBconnect()
// app.use(express.json())
// app.get('/',(req,res)=>{
//     res.send("API is Running")
// })

// // app.get('/api/notes',(req,res)=>{
// //     res.json(notes)
// // })

// app.use("/api/users",userRoute)
// app.use("/api/notes",noteRoute)
// // This is For Deployment

// app.use(notFound)
// app.use(errorHandler)

// const PORT =process.env.PORT || 5000
// app.listen(PORT,console.log(`Your Server is  Running on PORT : ${PORT}`))
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const DBconnect = require("./config/db");
const userRoute = require("./routes/userRoute");
const noteRoute = require("./routes/noteRoute");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");

dotenv.config(); // Load environment variables

const app = express();

// ✅ Connect to Database
DBconnect();

// ✅ Middleware
app.use(express.json());

// ✅ Enable CORS (Allow frontend to communicate with backend)
app.use(
  cors({
    origin: "https://tourmaline-sprite-506392.netlify.app", // Your Netlify frontend URL
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
  })
);

// ✅ Base Route
app.get("/", (req, res) => {
  res.send("API is Running");
});

// ✅ Routes
app.use("/api/users", userRoute);
app.use("/api/notes", noteRoute);

// ✅ Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server is Running on PORT: ${PORT}`));
