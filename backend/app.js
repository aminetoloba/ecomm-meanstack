const express = require("express");
const mongoose=require("mongoose");
const app = express();
const port = 3000;
const cors = require("cors");
const { verifyToken,isAdmin } = require("./middlewares/auth-middleware");

const categoryRoutes= require("./routes/category");
const brandRoutes= require("./routes/brand");
const orderRoutes= require("./routes/order");
const productRoutes = require("./routes/product");
const customerRoutes=require("./routes/customer");
const authRoutes= require("./routes/auth");


app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Server en cours d'exécution");
});
app.use("/category", categoryRoutes);
app.use("/brand",verifyToken,isAdmin, brandRoutes);
app.use("/orders",verifyToken,isAdmin, orderRoutes);
app.use("/product",verifyToken,isAdmin, productRoutes);
app.use("/customer",verifyToken, customerRoutes);
app.use("/auth",authRoutes);

async function connectDb(){
    await mongoose.connect("mongodb://localhost:27017",{
        dbName:"e-comm-store-db",
    })
    console.log("mongodb connected");
}
connectDb().catch((err)=>{
    console.error(err);
})
app.listen(port,()=>{
    console.log("Server en cours d'exécution sur le port",port);
})