# :moneybag: 線上學習系統

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
- 部屬平台: `heroku`

## 使用者介面
    (講師)
    帳號:minjun.kim@gmail.com
    密碼:minjun.kim

    帳號:seoyeon.lee@gmail.com
    密碼:seoyeon.lee

    帳號:jihoon.park@gmail.com
    密碼:jihoon.park

    (學生)
    帳號:yujin.choi@gmail.com
    密碼:yujin.choi

    帳號:jimin.han@gmail.com
    密碼:jimin.han

    備註:
    你可以註冊新帳號試用，或直接使用提供的帳號與密碼登入。

#### 登入頁面1:

![](docs/images/homepage-section1.png)

#### 登入頁面2:

![](docs/images/homepage-section2.png)

#### 首頁:

![](static/images/homepage-1.png)
![](static/images/homepage-2.png)

#### 現金記帳頁面:

![](static/images/cash_form.png)

#### 股票紀錄頁面:

![](static/images/stock_form.png)

#### 現金明細頁面:

![](static/images/cash_transaction_records.png)

#### 股票明細頁面:

![](static/images/stock_holdings.png)
