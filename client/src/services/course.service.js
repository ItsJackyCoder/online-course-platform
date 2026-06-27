import axios from "axios";
import App from "../App";
import AuthService from "./auth.service";

const API_URL =
  "https://jackyfang-course-platform-a05d06b8d172.herokuapp.com/api/courses";
// const API_URL = "http://localhost:8080/api/courses";
// const API_URL = "http://172.30.1.16:8080/api/courses";

class CourseService {
  post(title, description, price) {
    let token;

    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL,
      { title, description, price },
      {
        headers: { Authorization: token },
      },
    );
  }

  //使用學生id來找到學生註冊的課程
  getEnrolledCourses(_id) {
    let token;

    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/student/" + _id, {
      headers: { Authorization: token },
    });
  }

  //使用instructor id來找到講師擁有的課程
  get(_id) {
    let token;

    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/instructor/" + _id, {
      headers: { Authorization: token },
    });
  }

  getCourseByName(name) {
    let token;

    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/findByName/" + name, {
      headers: { Authorization: token },
    });
  }

  getCourseById(courseId) {
    let token;

    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/" + courseId, {
      headers: { Authorization: token },
    });
  }

  enroll(_id) {
    let token;

    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL + "/enroll/" + _id,
      //因為沒有資料要傳送,所以放{}(空物件)
      {},
      {
        headers: {
          Authorization: token,
        },
      },
    );
  }

  delete(_id) {
    let token;

    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    if (AuthService.getCurrentUser().user.role === "student") {
      //axios.delete(url, config)
      return axios.delete(API_URL + "/enrollment/" + _id, {
        headers: {
          Authorization: token,
        },
      });
    } else if (AuthService.getCurrentUser().user.role === "instructor") {
      //axios.delete(url, config)
      return axios.delete(API_URL + "/" + _id, {
        headers: {
          Authorization: token,
        },
      });
    }
  }

  editCourse(_id, formData) {
    let token;
    let { title, description, price } = formData;

    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    //axios.patch(url, data, config)
    return axios.patch(
      API_URL + "/" + _id,
      { title, description, price },
      {
        headers: { Authorization: token },
      },
    );
  }

  getAllCourses() {
    let token;

    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/", {
      headers: { Authorization: token },
    });
  }
}

const courseService = new CourseService();

export default courseService;
