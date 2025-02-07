const express = require("express");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");

const mongoose = require("mongoose");
const userRouter = require("./routes/user.router");
const blogRouter = require("./routes/blog.router")
const { checkForAuthenticationCookie } = require("./middleware/auth.middleware");
const PORT = 5000;

const Blog = require('./models/blog.model')
// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));  // ✅ Correct path

app.use(express.json());  // For parsing application/json
app.use(express.urlencoded({ extended: true }));  // For parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
//in express the file not serve as normal so you have to mantion that is static
app.use(express.static(path.join(__dirname,'public')));
//connect DB
mongoose.connect('mongodb://localhost:27017/blogify').then((e)=> console.log("mongodb connected"))

// Routes
app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({});
    res.render("home",{
        user: req.user,
        blogs:allBlogs,
    });
});

app.use("/user",userRouter);
app.use("/blog",blogRouter);

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
