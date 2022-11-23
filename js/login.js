(function () {
  var loginIdValidator = new ValidatorItem("txtLoginId", function (val) {
    if (!val) {
      return "账号不能为空";
    }
  });

  var loginPwdValidator = new ValidatorItem("txtLoginPwd", function (val) {
    if (!val) {
      return "密码不能为空";
    }
  });

  const form = document.querySelector(".user-form");
  form.onsubmit = function (e) {
    e.preventDefault();
    ValidatorItem.validate(loginIdValidator, loginPwdValidator).then(
      async (res) => {
        if (!res) {
          return;
        }
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const resp = await API.login(data);
        if (resp.code === 0) {
          alert("登录成功");
          location.href = "./index.html";
        } else {
          alert(resp.msg);
        }
      }
    );
  };
})();
