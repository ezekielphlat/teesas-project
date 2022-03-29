var createError = require('http-errors');

const express = require("express")
const app = express()

app.use(express.json())  //gives us access to res.body

var authRouter = require('./routes/auth');

const PORT = process.env.PORT || 8000;

app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404).send("Opps this service is not found");
    next(createError(404));
  });

app.listen(PORT, ()=>{
    console.log(`app listening on port ${PORT}`, )
})