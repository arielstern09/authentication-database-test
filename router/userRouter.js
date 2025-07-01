const express = require("express");

const router = express.Router();

const { postUser, getUsers, loginUser, updatePassword } = require("../contorllers/userController");

router.get("/", async (req,res)=>{
try {
    const users = await getUsers(); 
    res.json({message: "success", payload: users})  
} catch (error) {
    res.status(500).json({ message: "failure", paylaod: error });
}
})

router.post("/", async (req, res) => {
  try {
    const newUser = await postUser(req.body);
    res.json({ message: "success", payload: newUser });
  } catch (error) {
    res.status(500).json({ message: "failure", paylaod: error });
  }
});

router.post("/login", async (req, res) => {
    try { 
      const result = await loginUser(req.body);
      // check the result
      // if true, successful login, else passwords did NOT equal
      if (result) {
        res.json({
          message: "success",
          payload: "Successfully logged in!!"
        });
      } else {
          throw "Login Failed"
      }
    } catch (error) {
        res.status(500).json({ message: "failure", paylaod: error.message });
    }
});

router.put("/changepassword", async (req, res) => {
    try {
       const result = await updatePassword(req.body)
       res.status(200).json(
        {
            message: "success",
            payload: result
        }
       )
    } catch (error) {
        res.json({
            message: "failure",
            payload: error.message
        })
    }
})
  


module.exports = router