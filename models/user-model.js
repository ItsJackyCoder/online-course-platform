const mongoose = require("mongoose");
const { Schema } = mongoose;

const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: { type: String, required: true, minlength: 3, maxlength: 50 },
  email: { type: String, required: true, minlength: 6, maxlength: 50 },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["student", "instructor"] },
  date: { type: Date, default: Date.now },
});

//instance methods
userSchema.methods.isStudent = function () {
  return this.role == "student";
};

userSchema.methods.isInstructor = function () {
  return this.role == "instructor";
};

userSchema.methods.comparePassword = async function (password, cb) {
  let result;

  try {
    result = await bcrypt.compare(password, this.password); //result是boolean值

    return cb(null, result);
  } catch (e) {
    return cb(e, result);
  }
};

//mongoose middlewares
//若使用者為新用戶,或者是正在更改密碼,則將密碼進行雜湊處理
//注意:這裡因為有使用"this",所以不能用arrow function expression
//這裡的next,代表把控制權交給下一個middleware-->似乎老師說錯了
//(GPT說用async就不要寫next;用一般的function在寫next)
userSchema.pre("save", async function () {
  //this代表mongoDB內的document
  if (this.isNew || this.isModified("password")) {
    const hashValue = await bcrypt.hash(this.password, 10);

    this.password = hashValue;
  }
});

module.exports = mongoose.model("User", userSchema);
