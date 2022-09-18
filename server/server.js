//framework of node that makes everthing else
// import express from 'express';
const express = require('express')

//mongodb schema
// import mongoose from 'mongoose';
const mongoose = require('mongoose')

const Cards = require('./dbCards')
// const cors = require('cors')
const dotenv = require('dotenv')

//app config
const app = express()
const PORT = process.env.PORT || 8001
//setup env
dotenv.config()
const connectionUrl = `mongodb+srv://admin:${process.env.PASSWORD}@cluster0.boxh0.mongodb.net/tinder-mern-db?retryWrites=true&w=majority`

//middleware
app.use(express.json());
// app.use(cors)
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");  //allow my response to be shared for anyone who requests it
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();                                             //keep going onto the next endpoint
});

//db config
mongoose.connect(connectionUrl, {
    //params used to make the connection smooth
    //mongoose is under constant development this keeps us away from touble
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

//api endpoints
app.get('/', (req, res, next) => {
    res.status = 200
    res.send("Hello Clever Programmers")
})

app.post("/tinder/cards", (req, res) => {
    const dbCard = req.body;
    console.log(dbCard)
    Cards.create(dbCard, (err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.get("/tinder/cards", (req, res) => {
    Cards.find((err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

//listener
app.listen(PORT, () => console.log(`Listening on localhost: ${PORT}`))