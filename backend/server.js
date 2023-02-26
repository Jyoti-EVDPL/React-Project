//nodemailer = "nodemail
//remm sxme wjnm zzzw
const path = require('path');

require("dotenv").config();
const express = require("express");//
const bodyParser = require("body-parser");//
const passport = require("passport");
// const sequelize = require("./models/UserModel");//
// const sequelize = require("./models/UserImage");//
//const ctrl = require("./controller/methods");
const cors = require ("cors");
// const corsOptions ={
//   origin:'*', 
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200,
// }

const authRoutes = require("./routes/authenticationRouters")
const app = express();//
app.set("view engine","ejs")
// app.use(express.static("public"));//
app.use(passport.initialize());
app.use(bodyParser.json());//
app.use(express.urlencoded({ extended: true }));//
// app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(cors());

app.use(express.static(path.join(__dirname, 'resources'))); //for Image


app.use("/auth", authRoutes);
/////////////////////////////////////////////////////////////

// TO delete and create a new table
// const syncronization = async () => {
  // await sequelize.sync({ force: true });
  // console.log("Table created");
//   await sequelize.sync({ alter: true });
//   console.log("Table re-created");
// };
// syncronization();


// app.use((err, res, req) => {
//   console.log(err.stack);
//   res.status(500).send("Sometthing Broked");
// });

app.get("/", (req, res) => {
  res.status(200).send("Server is Running");
})
  .listen(process.env.PORT,()=> console.log("Server is running"));