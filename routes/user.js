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
});

// GET all students as users
router.delete('/:email', async (req, res, next)=>{
    const {email} = req.params;
    try{
        const deletedUser = await pool.query("DELETE FROM student WHERE email = $1", [email]);
        res.status(200).send( {status: true,message: "Successfully removed User"})

        res.json(allUsers.rows)
    }catch(err){
        console.error(err.message)
    }
})




module.exports = router;