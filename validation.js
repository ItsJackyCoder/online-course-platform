const Joi = require("joi");

const registerValidation = (data) => {
  //Joi.object描述了這個data應該要長什麼樣子(Joi提供多種資料類型[可以參考官方文件])
  const schema = Joi.object({
    username: Joi.string().min(1).max(10).required().messages({
      "string.empty": "사용자 이름을 입력해 주세요.",
      "string.min": "사용자 이름은 최소 1자 이상 입력해 주세요.",
      "string.max": "사용자 이름은 최대 10자까지 입력할 수 있습니다.",
    }),
    email: Joi.string().min(6).max(25).required().email().messages({
      "string.empty": "이메일 주소를 입력해 주세요",
      "string.min": "이메일 주소는 최소 6자 이상 입력해 주세요.",
      "string.max": "이메일 주소는 최대 25자까지 입력할 수 있습니다.",
      "string.email": "올바른 이메일 주소 형식을 입력해 주세요.",
    }),
    password: Joi.string().min(6).max(15).required().messages({
      "string.empty": "비밀번호를 입력해 주세요.",
      "string.min": "비밀번호는 최소 6자 이상 입력해 주세요.",
      "string.max": "비밀번호는 최대 20자까지 입력할 수 있습니다.",
    }),
    //這些東西可以去看terminal的訊息在慢慢拆解
    role: Joi.string().required().valid("student", "instructor").messages({
      "any.only": "계정 유형을 선택해 주세요.",
      "string.empty": "계정 유형을 선택해 주세요.",
      "any.required": "계정 유형을 선택해 주세요.",
    }),
  });

  return schema.validate(data); //會告訴我們validate的結果是什麼
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(25).required().email().messages({
      "string.empty": "이메일 주소를 입력해 주세요",
      "string.min": "이메일 주소는 최소 6자 이상 입력해 주세요.",
      "string.max": "이메일 주소는 최대 25자까지 입력할 수 있습니다.",
      "string.email": "올바른 이메일 주소 형식을 입력해 주세요.",
    }),
    password: Joi.string().min(6).max(20).required().messages({
      "string.empty": "비밀번호를 입력해 주세요.",
      "string.min": "비밀번호는 최소 6자 이상 입력해 주세요.",
      "string.max": "비밀번호는 최대 20자까지 입력할 수 있습니다.",
    }),
  });

  return schema.validate(data);
};

const courseValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(15).required().messages({
      "string.empty": "강의명을 입력해 주세요.",
      "string.min": "강의명은 최소 3자 이상 입력해 주세요.",
      "string.max": "강의명은 최대 15자까지 입력할 수 있습니다.",
    }),
    description: Joi.string().min(20).max(250).required().messages({
      "string.empty": "강의 소개를 입력해 주세요.",
      "string.min": "강의 소개는 최소 20자 이상 입력해 주세요.",
      "string.max": "강의 소개는 최대 250자까지 입력할 수 있습니다.",
    }),
    price: Joi.number().min(1).max(1000000).required().messages({
      "number.min": "수강료는 최소 1원 이상 입력해 주세요.",
      "number.max": "수강료는 최대 1,000,000원까지 입력할 수 있습니다.",
      "number.base": "수강료를 숫자로 입력해 주세요.",
    }),
  });

  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
  courseValidation,
};
