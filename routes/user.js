var express = require('express');
var router = express.Router();
const pool = require("../config/db");


// GET all students as users
router.get('/', async (req, res, next)=>{
    try{
        const allUsers = await pool.query("SELECT * FROM student");
        res.json(allUsers.rows)
    }catch(err){
        console.error(err.message)
    }
})



module.exports = router;