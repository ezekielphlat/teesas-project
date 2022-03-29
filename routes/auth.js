require('dotenv').config()
var express = require('express');
var router = express.Router();
const pool = require("../config/db");
const bcrypt = require("bcrypt")

const jwt = require('jsonwebtoken')



/* POST new student. */
router.post('/signUp', async (req, res, next) => {
    const newUser = req.body
    // validate user data
    if(newUser == null){
        res.status(400).send({status: false,message: "user is empty"})
        return
    }
    if(newUser["password"] != newUser["confirmPassword"]){
        res.status(200).send( {status: false,message: "password did not match"})
        return
    }
   const {childName,email,phoneNumber,countryCode,password,confirmPassword,grade,currentLevel } = newUser;
    const existingStudent = await pool.query("Select * FROM student where email = $1", [email]);
    console.log(existingStudent)
    if(existingStudent.rows[0] != null){
        res.status(403).send( {status: false,message: "Student already exists"})
        return
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const User = await pool.query("INSERT INTO student (childName,email,phoneNumber,countryCode,password,grade,currentLevel) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *"
        ,[childName,email,phoneNumber,countryCode,hashedPassword,grade,currentLevel ])
        res.json({status: true,message: "learner created successfully"})
            
            
    } catch (err) {
        console.error({status: false,message: err.message})

    }      
  
});

/* POST Login Authentication. */
router.post('/signIn', async (req, res, next) => {
    const {email,password} = req.body;
    // validate user data
    if(email == null){
        res.status(400).send("body is empty")
        return
    }   
    const user = await pool.query("Select * FROM student where email = $1", [email]);
    console.log(user.rows[0])
    if(user.rows[0] == null){
        return res.status(400).send("cannot find user")
        
    }
    try {
        if(await bcrypt.compare(password, user.rows[0].password))
        {
            const tokenDetails = {name:user.rows[0].email, level: user.rows[0].currentlevel}
            console.log(tokenDetails)
            const accessToken = jwt.sign(tokenDetails, process.env.ACCESS_TOKEN_SECRET )

            res.json({status: true,message:"login successful",token:accessToken})
        }else{
            res.send("Not allowed")
        }
      } catch (error) {
          res.status(500).send("server error")
      }     
  
});


module.exports = router;