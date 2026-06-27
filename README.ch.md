# 🎓 線上課程管理平台

## [前往網站](https://jackyfang-course-platform-a05d06b8d172.herokuapp.com/)

## 介紹

本專案是一個以 MERN Stack 開發的線上課程管理平台，提供學生與講師兩種不同的使用者角色與操作流程。

學生可以瀏覽平台上的課程，透過關鍵字搜尋感興趣的內容，並註冊想參與的課程；同時也能在個人檔案頁面查看自己的帳號資訊與已註冊課程，方便確認目前的選課狀態。

講師則可以建立並發布新課程，管理自己開設的課程內容，並透過個人檔案頁面查看帳號資訊與已開設的課程。平台透過角色權限控管，讓學生能瀏覽與註冊課程，而講師可專注於課程的建立與管理。

整體系統涵蓋會員註冊與登入、角色權限驗證、課程搜尋、課程建立、課程註冊、個人檔案查看，以及課程管理等核心功能，模擬一個具備基本會員與課程管理機制的線上課程平台。

## 技術堆疊

- 後端:`Express.js`, `Node.js`, `JWT Authentication`, `Passport.js`, `bcrypt`, `Joi`
- 前端:`JavaScript`, `HTML`, `CSS`, `React`, `React Router DOM`, `Bootstrap`
- 資料庫:`MongoDB Atlas`, `Mongoose`
- 部署平台: `heroku`

## 測試帳號

### 講師帳號

| 帳號 | 密碼 |
| --- | --- |
| minjun.kim@gmail.com | minjun.kim |
| seoyeon.lee@gmail.com | seoyeon.lee |
| jihoon.park@gmail.com | jihoon.park |

### 學生帳號

| 帳號 | 密碼 |
| --- | --- |
| yujin.choi@gmail.com | yujin.choi |
| jimin.han@gmail.com | jimin.han |

> 你也可以註冊新帳號試用，或直接使用上述測試帳號登入。

## 畫面展示

#### 首頁:

![](docs/images/homepage-section1.png)

![](docs/images/homepage-section2.png)

#### 登入頁面:

![](docs/images/login-page.png)

#### 註冊頁面:

![](docs/images/register-page.png)

#### 個人檔案頁面:

![](docs/images/profile-page1.png)
![](docs/images/profile-page2.png)

#### 學生已選課程頁面:

![](docs/images/student-course-page.png)

#### 學生瀏覽與搜尋課程頁面:

![](docs/images/student-search-course-page.png)

#### 講師課程管理頁面:

![](docs/images/instructor-course-page.png)

#### 講師新增課程頁面:

![](docs/images/instructor-post-course-page.png)
