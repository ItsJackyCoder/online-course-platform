# 🎓 Online Course Management Platform

## [Visit the Website](https://jackyfang-course-platform-a05d06b8d172.herokuapp.com/)

## Overview

This project is an online course management platform built with the MERN stack. It provides two user roles—students and instructors—with different features and workflows.

Students can browse available courses, search for courses using keywords, and enroll in courses they are interested in. They can also view their account information and enrolled courses on their profile page.

Instructors can create and publish new courses, manage the courses they offer, and view their account information and created courses on their profile page. Role-based access control ensures that students can browse and enroll in courses, while instructors can focus on creating and managing course content.

The system includes core features such as user registration and login, role-based authorization, course search, course creation, course enrollment, profile management, and course management. It simulates a basic online course platform with user and course management functionality.

## Tech Stack

- Backend:`Express.js`, `Node.js`, `JWT Authentication`, `Passport.js`, `bcrypt`, `Joi`
- Frontend::`JavaScript`, `HTML`, `CSS`, `React`, `React Router DOM`, `Bootstrap`
- Database:`MongoDB Atlas`, `Mongoose`
- Deployment: `heroku`

## Test Accounts

### Instructor Accounts

| Email | Password |
| --- | --- |
| minjun.kim@gmail.com | minjun.kim |
| seoyeon.lee@gmail.com | seoyeon.lee |
| jihoon.park@gmail.com | jihoon.park |

### Student Accounts

| Email | Password |
| --- | --- |
| yujin.choi@gmail.com | yujin.choi |
| jimin.han@gmail.com | jimin.han |

> You can create a new account to try the platform, or log in using one of the test accounts above.

## Screenshots

#### Home Page:

![](docs/images/homepage-section1.png)

![](docs/images/homepage-section2.png)

#### Login Page:

![](docs/images/login-page.png)

#### Registration Page:

![](docs/images/register-page.png)

#### Profile Page:

![](docs/images/profile-page1.png)
![](docs/images/profile-page2.png)

#### Student Enrolled Courses Page:

![](docs/images/student-course-page.png)

#### Student Course Browse and Search Page:

![](docs/images/student-search-course-page.png)

#### Instructor Course Management Page:

![](docs/images/instructor-course-page.png)

#### Instructor Create Course Page:

![](docs/images/instructor-post-course-page.png)
