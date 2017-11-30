let validate_creater = {};
validate_creater.required = function($trigger = "blur", $msg = "请输入内容") {
  return { required: true, message: $msg, trigger: $trigger };
};
validate_creater.
module.exports = validate_creater;
export default validate_creater;
