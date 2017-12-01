let validate_creater = {};
validate_creater.required = function($msg = "请输入内容", $trigger = "blur") {
  return {
    required: true,
    message: $msg,
    trigger: $trigger
  };
};

validate_creater.between = function($min = 0, $max = 20, $trigger = "blur") {
  return {
    min: $min,
    max: $max,
    message: "内容长度不符,请输入" + $min + "至" + $max + "个字符",
    trigger: $trigger
  };
};
validate_creater.datatype = function(
  $dataType,
  $msg = null,
  $trigger = "blur"
) {
  return {
    trigger: $trigger,
    validator: (r, v, c) => {
      if (typeof $msg != $dataType) {
        c(new Error($msg || "输入类型不符"));
      }
    }
  };
};

validate_creater.custom = function(func, $trigger = "blur") {
  return { trigger: $trigger, validator: func };
};
module.exports = validate_creater;
export default validate_creater;
