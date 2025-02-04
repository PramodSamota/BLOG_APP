const {Router} = require("express");

const router = Router();
const User = require('../models/user.model')

router.get("/signin",(req,res)=>{
  return res.render("signin");
})

router.post('/signin',async (req,res)=>{
  const {email,password} = req.body;
  try {
    const token = await User.matchPasswordAndGenreateToken(email,password);
    // console.log("token",token);
    return res.cookie("token",token).redirect("/")
  } catch (error) {
    return res.render("signin",{
      error:"Invalid Email or Password",
    })
  }
})

router.get("/signup",(req,res) =>{
    return res.render("signup");
}) 

router.post("/signup", async(req,res) =>{
      const {fullName,email,password} = req.body;
      if(!fullName || !email||!password){
        return res.send("All fields are required")
      }
     const user=  await User.create({
        fullName,
        email,
        password,
      });

    // console.log("user:",user);
      return res.redirect("/");
});

router.get("/logout",(req,res)=>{
   return res.clearCookie("token").redirect("/");
})


module.exports = router;