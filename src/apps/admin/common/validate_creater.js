let validate_creater = {};
validate_creater.required = function($msg = "请输入内容", $trigger = "blur") {
  let validator = {
    required: true,
    message: $msg,
    trigger: $trigger
  };
  return validator;
};

validate_creater.between = function($min = 0, $max = 20, $trigger = "blur") {
  let validator = {
    min: $min,
    max: $max,
    message: "内容长度不符,请输入" + $min + "至" + $max + "个字符",
    trigger: $trigger
  };
  return validator;
};
validate_creater.datatype = function(
  $dataType,
  $msg = null,
  $trigger = "blur"
) {
  let validator = {
    trigger: $trigger,
    validator: (r, v, c) => {
      if (typeof $msg != $dataType) {
        c(new Error($msg || "输入类型不符"));
      } else {
        c();
      }
    }
  };
  return validator;
};
validate_creater.isNumber = function($msg = null, $trigger = "blur") {
  let validator = {
    trigger: $trigger,
    validator: (r, v, c) => {
      let numberRegexp = new RegExp("[1-9]", "i");
      if (numberRegexp.test(v)) {
        c();
      } else {
        c(new Error($msg || "输入内容不是纯数字"));
      }
    }
  };
  return validator;
};
validate_creater.isPhone = function($msg = null, $trigger = "blur") {
  let validator = {
    trigger: $trigger,
    validator: (r, v, c) => {
      let phoneRegExp = new RegExp(
        "^((13[0-9])|(15[^4,\\D])|(18[0,0-9]))\\d{8}$",
        "i"
      );
      if (phoneRegExp.test(v)) {
        c();
      } else {
        c(new Error($msg || "输入内容不是有效的11位手机号码"));
      }
    }
  };
  return validator;
};

validate_creater.custom = function(func, $trigger = "blur") {
  let validator = {
    trigger: $trigger,
    validator: func
  };
  return validator;
};
module.exports = validate_creater;
export default validate_creater;
