const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const authRoute = require("./routes").auth;
const courseRoute = require("./routes").course;

const passport = require("passport");
require("./config/passport")(passport);

const cors = require("cors");

//和路徑有關的module
const path = require("path");

//process.env.PORT是Heroku自動動態設定的(所以不需要在我們的".env"檔案裡再去設定PORT!!!)
const port = process.env.PORT || 8080; //短路運算!(如果左邊是true,就用左邊,否則就用右邊)

//本地測試用
// const port = 8080;

//連結MongoDB
mongoose
  .connect(process.env.MONGODB_CONNECTION)
  .then(() => {
    console.log("成功連結到mongodb......");
  })
  .catch((e) => {
    console.log(e);
  });

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//heroku部屬用
app.use(express.static(path.join(__dirname, "client", "build")));

app.use("/api/user", authRoute);

//course route應該被JWT保護(如果request header內部沒有JWT,則request就會被視為是unauthorized)
//只有登入系統的人(這些人手上一定有JWT),才能夠去新增課程或是註冊課程
app.use(
  "/api/courses",
  passport.authenticate("jwt", { session: false }),
  courseRoute,
);

//Heroku自動幫我們設定的environment variable(process.env.NODE_ENV)
if (process.env.NODE_ENV == "production" || process.env.NODE_ENV == "staging") {
  app.get(/.*/, (req, res) => {
    //build是只有在我們把檔案部屬到雲端上面時,它才會在client的資料夾裡面
    //這裡的"index.html"是指public資料夾裡的index.html
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

//避免使用port3000,因為React預設port是3000
//因為heroku的port是動態的
app.listen(port, () => {
  console.log("後端伺服器聆聽在port 8080......");
});
