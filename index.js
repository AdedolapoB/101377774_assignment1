const express = require('express');
const body_parser = require('body-parser');
const mongoose = require('mongoose');
const SERVER_PORT = 8088

const app = express();
const apiV1 = express();
app.use(express.json());
app.use(body_parser.json());

const userRoute = require('./routes/user');
const empRoute = require('./routes/emp');

mongoose.connect('mongodb+srv://balogun25dolapo:yNXfvLnmYPazODvd@cluster0.qnskim9.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Application Level Middleware:
var errorMiddleware = (err, req, res, next) => {
    console.log("Middleware Error Handling");
    const errStatus = err.statusCode || 500;
    const errMSg = err.message || 'Something went wrong'
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMSg,
        stack: process.env.NODE_ENW === 'development'
        ? err.stack : {}
      });
  }
  
  app.use(errorMiddleware);
  
  app.use((req, res, next) => {
    console.log('Application Middleware')
    console.log(`${Date()} ${req.method} - ${req.path}`);
    next()
  })
  
  
  app.use('/api/v1/user', (req, res, next) => {
    console.log('/user/Middleware')
    next();
  });
  
  app.use('/api/v1/emp', (req, res, next) => {
    console.log('/emp/Middleware')
    next();
  });
  
  
  app.use('/api/v1/', apiV1);
  apiV1.use('/user', userRoute)
  apiV1.use('/emp', empRoute)
  
  app.listen(SERVER_PORT, () => {
      console.log(`Server running on port ${SERVER_PORT}`);
  })
