require('dotenv').config();

const express = require('express');
const workoutRoutes = require('./routes/workouts')
const mongoose = require('mongoose')
const app = express();

// Middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/workouts',workoutRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        // Listen for requests
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error)
    })


