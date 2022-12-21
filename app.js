const express=require('express');
const db=require('./db_connect');
const cors=require('cors');
const bodyParser=require('body-parser');
const router=require('./mainroutes/routes');
const foodRouter=require('./mainroutes/foodRoutes')
const orderRouter=require('./mainroutes/orderRoutes')
const port=process.env.PORT||3000;

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]}
));

app.use(router);
app.use(foodRouter);
app.use(orderRouter);
app.listen(port,()=>{
    console.log('listening on 3000')
})