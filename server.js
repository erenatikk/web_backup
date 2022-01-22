const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var Schema = mongoose.Schema;


const { MongoClient } = require("mongodb");

app.use(bodyParser.urlencoded({extended:true}));
var urldb = "mongodb+srv://eren_atik:zilean62@cluster0.u8mtu.mongodb.net/proje"
mongoose.connect(urldb,{useNewUrlParser:true,},{useUnifiedTopology:true},console.log("connected"),function(db,err){

});  
const projeSchema = new Schema( {
    email: { type:String , required: true },
    password: { type: String, required: true },
    adminpassword:{type:String}
    
    
})
const amountSchema =  new Schema({
    brand: {type:String},
    amount: {type:Number},
    priceperone: {type:Number},
    size : { type : Number}
})


const User = mongoose.model("User",projeSchema);
module.exports = User;

const Products = mongoose.model("Products" , amountSchema);
module.exports = Products;




app.get("/",function(req,res){
    res.sendFile(__dirname + "/register.html")
})
app.get("/shop.html",function(req,res){
    res.sendFile(__dirname + "/shop.html")
})
app.get("/style.css",function(req,res){
    res.sendFile(__dirname + "/style.css")
})
app.get("/Login.html",function(req,res){
    res.sendFile(__dirname + "/Login.html")
})
app.get("/register.html",function(req,res){
    res.sendFile(__dirname + "/register.html")
})
app.get("/script.js",function(req,res){
    res.sendFile(__dirname + "/script.js")
})
app.get("/product.js",function(req,res){
    res.sendFile(__dirname + "/product.js")
})
app.get("/admin.html",function(req,res){
    res.sendFile(__dirname + "/admin.html")
})
app.get("/adminpanel.html",function(req,res){
    res.sendFile(__dirname + "/adminpanel.html")
})

app.post("/", function(req, res){
  let  NewUser = new User({
      email:req.body.email,
      password:req.body.password
  })
  NewUser.save(console.log("saved"));
  res.redirect("/shop.html");
})


app.post("/Login.html" ,function(req,res){
    console.log("appgir");
    MongoClient.connect(urldb,function(err, db){var dbo = db.db('proje');
        dbo.collection("users").findOne({email:req.body.emaillog },function(err,user){
            if(err) throw new Error(err);
            //console.log("gir");
            if(!user)
            {
                
                console.log("not found")
                res.redirect("/Login.html")
            }
            else
            {
                if(req.body.passwordlog !== user.password )
                {
                    alert("The password is not correct\n");
                    console.log("The password is not correct\n");
                    res.redirect("/Login.html");
                }
                else
                {
                    res.redirect("/shop.html")
                }
            }
            })
  })
   
})
app.post("/admin.html" ,function(req,res){
    //console.log("appgir");
    MongoClient.connect(urldb,function(err, db){var dbo = db.db('proje');
        dbo.collection("users").findOne({email:req.body.adminID },function(err,user){
            if(err) throw new Error(err);
            //console.log("gir");
            if(!user)
            {
               
                console.log("not found")
                res.redirect("/admin.html")
            }
            else
            {
                if(req.body.adminpass !== user.adminpassword )
                {
                   
                    console.log("The password is not correct\n");
                    res.redirect("/admin.html");
                }
                else
                {
                    res.redirect("/adminpanel.html")
                }
            }
            })
  })
   
})

app.post("/adminpanel.html" ,function (req,res) {       
    
    for(i=0 ; i < 12 ; i++){
        let  NewProducts = new Products({
            brand:req.body.brand[i],
            amount:req.body.amount[i],
            priceperone:req.body.priceperone[i],
            size:req.body.size[i]
        })                
        NewProducts.save();
    }
    
    res.redirect("/adminpanel.html");
    
})

app.post("/shop.html", function(req,res){
    MongoClient.connect(urldb,function(err, db){var dbo = db.db('proje');
    dbo.collection("products").find({}).toArray((err, data) => {
            if(err) throw error
            var strTable = '';
            for(i = 0; i < data.length; i++){
                strTable += '<tr><td>'+data[i].brand+'</td><td>'+data[i].size+'</td><td>'+data[i].priceperone+'₺</td><td>'+data[i].amount+'</td></tr>';
            }
            console.log(strTable);             
    });
 })

   
})

app.listen(3000,function(){
    console.log("server is running on 3000")
})