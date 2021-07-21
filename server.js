
if(process.env.NODE_ENV !== 'production'){
    require("dotenv").config();
}
const WHEATHER_API_KEY=process.env.WHEATHER_API_KEY;
const express = require("express");
const axios=require("axios");

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.post("/weather",(req,res)=>{
    const coordinates=req.body.coordinates;
    const url=`https://api.weatherapi.com/v1/current.json?key=${WHEATHER_API_KEY}&q=${coordinates}`;
    axios({
        url:url,
        responseType:'json'
    }).then(data=>res.json(data.data));
});
app.listen(process.env.PORT || 5000);
