require('dotenv').config()

const express = require('express'),
  ctrl=require('./products_controller'),
  massive=require('massive'),
  {SERVER_PORT, CONNECTION_STRING}=process.env,
  app=express();

  
  massive({
    connectionString: CONNECTION_STRING,
    ssl:{
      rejectUnauthorized: false
    }
  })
  .then((dbInstance)=>{
    app.set('db', dbInstance)
  })
  .catch(err=>console.log(err))
  
  app.use(express.json())
  
  //Endpoints
  app.get('/api/products',ctrl.getAll);
  app.get('/api/products/:id',ctrl.getOne);
  app.put('/api/products/:id',ctrl.update);
  app.post('/api/products',ctrl.create);
  app.delete('/api/products/:id',ctrl.delete);

  app.listen(SERVER_PORT,()=> console.log(`Listening on ${SERVER_PORT}`))