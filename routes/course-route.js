const router = require("express").Router();

const Course = require("../models").course;
const courseValidation = require("../validation").courseValidation;

//新增課程
router.post("/", async (req, res) => {
  //驗證資料是否符合規範
  let { error } = courseValidation(req.body);

  if (error)
    return res.status(400).send({
      field: error.details[0].path[0],
      message: error.details[0].message,
    });

  if (req.user.isStudent()) {
    return res
      .status(400)
      .send("只有講師才能發佈新課程。若您已經是講師,請透過講師帳號登入!");
  }

  let { title, description, price } = req.body;

  try {
    //確認是否已經發過此課程
    const courseExists = await Course.findOne({
      title: title.trim(),
      instructor: req.user._id,
    });

    if (courseExists) {
      return res.status(409).send("您已經建立過同名課程。");
    }

    let newCourse = new Course({
      title,
      description,
      price,
      instructor: req.user._id,
    });

    await newCourse.save();

    //return res.send({ message: "新課程已經保存!", savedCourse }); //測試用
    return res.send("新課程已經保存!");
  } catch (e) {
    return res.status(500).send("無法創建課程......");
  }
});

//獲得系統中所有的課程
router.get("/", async (req, res) => {
  try {
    let courseFound = await Course.find({})

      //第二個參數:我們需要instructor的什麼資料
      //注意:populate()是"query object(thenable object)"的一個method,
      //所以要使用的話,得先寫populate()後,再寫exec()
      .populate("instructor", ["username", "email"])
      .exec();

    return res.send(courseFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

//用講師id來尋找課程
router.get("/instructor/:_instructor_id", async (req, res) => {
  let { _instructor_id } = req.params;

  let coursesFound = await Course.find({ instructor: _instructor_id })
    .populate("instructor", ["username", "email"])
    .exec();

  return res.send(coursesFound);
});

//用學生id來尋找註冊過的課程
router.get("/student/:_student_id", async (req, res) => {
  let { _student_id } = req.params;

  let coursesFound = await Course.find({ students: _student_id })
    .populate("instructor", ["username", "email"])
    .exec();

  return res.send(coursesFound);
});

//用課程名稱來尋找課程
router.get("/findByName/:name", async (req, res) => {
  let { name } = req.params;
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  try {
    const courseFound = await Course.find({
      title: { $regex: escapedName, $options: "i" },
    })
      .populate("instructor", ["email", "username"])
      .exec();

    return res.send(courseFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

//用課程id尋找課程
router.get("/:_id", async (req, res) => {
  let { _id } = req.params;

  try {
    let courseFound = await Course.findOne({ _id })
      .populate("instructor", ["email"])
      .exec();

    return res.send(courseFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

//讓學生透過課程id來註冊新課程
router.post("/enroll/:_id", async (req, res) => {
  let { _id } = req.params;

  try {
    let course = await Course.findOne({ _id }).exec();

    course.students.push(req.user._id);
    await course.save();

    return res.send("註冊完成!");
  } catch (e) {
    return res.send(e);
  }
});

//更改課程
router.patch("/:_id", async (req, res) => {
  //驗證資料符合規範
  let { error } = courseValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let { _id } = req.params;

  //確認此課程是否存在
  try {
    let courseFound = await Course.findOne({ _id });

    //使用者必須是此課程講師才能編輯此課程
    if (courseFound.instructor.equals(req.user._id)) {
      let updatedCourse = await Course.findOneAndUpdate({ _id }, req.body, {
        returnDocument: "after",
        runValidators: true,
      });

      return res.send({ message: "課程已被更新成功!", updatedCourse });
    } else {
      return res.status(403).send("只有此課程的講師才能編輯此課程!");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

//講師刪除課程
router.delete("/:_id", async (req, res) => {
  let { _id } = req.params;

  //確認此課程是否存在
  try {
    let courseFound = await Course.findOne({ _id }).exec();

    //使用者必須是此課程講師才能刪除此課程
    if (courseFound.instructor.equals(req.user._id)) {
      await courseFound.deleteOne({ _id }).exec();

      return res.send("課程已被刪除!!!");
    } else {
      return res.status(403).send("只有此課程的講師才能刪除此課程!");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

//學生取消註冊課程(傳入課程id)
router.delete("/enrollment/:_id", async (req, res) => {
  let { _id } = req.params;

  try {
    let courseFound = await Course.findOne({ _id }).exec();

    //使用者必須是此課程學生才能取消註冊此課程
    const isEnrolled = courseFound.students.some(
      //MongoDB裡的ObjectId
      //equals()只有ObjectId才可以使用哦!!!
      (studentId) => req.user._id.equals(studentId),
    );

    if (isEnrolled) {
      //equals()只有ObjectId才可以使用哦!!!
      courseFound.students = courseFound.students.filter(
        (studentId) => !req.user._id.equals(studentId),
      );

      await courseFound.save();

      return res.send("課程已被取消註冊!!!");
    } else {
      return res.status(403).send("只有註冊此課程的學生才能刪除此課程!");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
