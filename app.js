require('dotenv').config()
const express=require("express");
const app=express();
const bodyParse=require("body-parser");
const https=require("https");
app.use(express.static("public"));
app.use(bodyParse.urlencoded({extended:true}))
app.get("/",(req,res)=>
{
    res.sendFile(__dirname+"/signup.html");
})
app.post("/",(req,res)=>{
    let fname=req.body.fname;
    let lname=req.body.lname;
    let email=req.body.email;
    console.log(fname +" "+lname+" "+email);
    let obj={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:fname,
                    LNAME:lname
                }
            }
        ]
    }
    let data=JSON.stringify(obj);
    let url="https://us6.api.mailchimp.com/3.0/lists/"+process.env.LIST_ID;
    let options={
        method:"POST",
        auth:"Soumya1:"+process.env.APPID
    }
    const request=https.request(url,options,(resp)=>{
        if(resp.statusCode===200)
        res.sendFile(__dirname+"/success.html");
        else
        {
        res.sendFile(__dirname+"/failure.html");
        }
    });
    request.write(data);
    request.end();
})
app.post("/failure",(req,res)=>
{
    res.redirect("/");
})
app.listen(process.env.PORT||3000,()=>{
    console.log("Server started on port 3000");
})


