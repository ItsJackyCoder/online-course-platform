# 🎓 온라인 강의 관리 플랫폼

## [웹사이트 바로가기](https://jackyfang-course-platform-a05d06b8d172.herokuapp.com/)

## 소개

본 프로젝트는 MERN Stack을 기반으로 개발한 온라인 강의 관리 플랫폼입니다. 학생과 강사 두 가지 사용자 역할에 따라 서로 다른 기능과 이용 흐름을 제공합니다.

학생은 플랫폼에 등록된 강의를 둘러보고, 키워드 검색을 통해 관심 있는 강의를 찾은 뒤 수강 신청할 수 있습니다. 또한 마이페이지에서 계정 정보와 신청한 강의를 확인하여 현재 수강 상태를 편리하게 관리할 수 있습니다.

강사는 새로운 강의를 생성 및 게시하고, 자신이 개설한 강의를 관리할 수 있습니다. 마이페이지에서는 계정 정보와 개설한 강의 목록을 확인할 수 있습니다. 역할 기반 권한 관리를 통해 학생은 강의를 조회하고 수강 신청할 수 있으며, 강사는 강의 생성과 관리 기능을 이용할 수 있습니다.

본 시스템은 회원가입 및 로그인, 역할별 권한 인증, 강의 검색, 강의 생성, 수강 신청, 마이페이지 조회, 강의 관리 등 핵심 기능을 포함하고 있습니다. 기본적인 회원 관리 및 강의 관리 기능을 갖춘 온라인 강의 플랫폼을 구현한 프로젝트입니다.

## 기술 스택

- 백엔드:`Express.js`, `Node.js`, `JWT Authentication`, `Passport.js`, `bcrypt`, `Joi`
- 프론트엔드:`JavaScript`, `HTML`, `CSS`, `React`, `React Router DOM`, `Bootstrap`
- 데이터베이스:`MongoDB Atlas`, `Mongoose`
- 배포 플랫폼: `heroku`

## 테스트 계정

### 강사 계정

| 이메일 | 비밀번호 |
| --- | --- |
| minjun.kim@gmail.com | minjun.kim |
| seoyeon.lee@gmail.com | seoyeon.lee |
| jihoon.park@gmail.com | jihoon.park |

### 학생 계정

| 이메일 | 비밀번호 |
| --- | --- |
| yujin.choi@gmail.com | yujin.choi |
| jimin.han@gmail.com | jimin.han |

> 새로운 계정을 직접 생성하여 이용하시거나, 위의 테스트 계정으로 로그인하여 기능을 확인하실 수 있습니다.

## 화면 구성

#### 홈페이지:

![](docs/images/homepage-section1.png)

![](docs/images/homepage-section2.png)

#### 로그인 페이지:

![](docs/images/login-page.png)

#### 회원가입 페이지:

![](docs/images/register-page.png)

#### 마이페이지:

![](docs/images/profile-page1.png)
![](docs/images/profile-page2.png)

#### 학생 신청한 강의 페이지:

![](docs/images/student-course-page.png)

#### 학생 강의 조회 및 검색 페이지:

![](docs/images/student-search-course-page.png)

#### 강사 강의 관리 페이지:

![](docs/images/instructor-course-page.png)

#### 강사 강의 등록 페이지:

![](docs/images/instructor-post-course-page.png)
