var express = require('express');
var router = express.Router();
const pool = require("../config/db");


const jwt = require('jsonwebtoken')



// GET all lessons for authorized users
router.get('/',authenticateToken, async (req, res, next)=>{
    console.log(req.user)
    try{
        const allLesson = await pool.query("SELECT * FROM lesson where level = $1", [req.user.level]);
        res.json(allLesson.rows)
    }catch(err){
        console.error(err.message)
    }
})


/* POST new lession. */
router.post('/', async (req, res, next) => {
    const {name, level} = req.body
    // validate name from lesson data
    if(name == null){
        res.status(400).send({status: false,message: "lesson name is empty"})
        return
    }
   
  
    try {
        const User = await pool.query("INSERT INTO lesson (name, level) VALUES ($1,$2) RETURNING *", [name, level])
        res.json({status: true,message: "lesson saved successfully"})            
            
    } catch (err) {
        console.error({status: false,message: err.message})

    }      
  
});

// middleware to authenticate user so that they see only lessons in their levels
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]  //returns authheader if defined
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}


module.exports = router;