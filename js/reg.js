(function () {
  var loginIdValidator = new ValidatorItem("txtLoginId", async function (val) {
    if (!val) {
      return "账号不能为空";
    }

    const resp = await API.exists(val);
    if (resp.data) {
      return "该账号已被占用";
    }
  });

  var nackNameValidator = new ValidatorItem("txtNickname", function (val) {
    if (!val) {
      return "昵称不能为空";
    }
  });

  var loginPwdValidator = new ValidatorItem("txtLoginPwd", function (val) {
    if (!val) {
      return "密码不能为空";
    }
  });

  var loginAgainPwdValidator = new ValidatorItem(
    "txtLoginPwdConfirm",
    function (val) {
      if (!val) {
        return "确认密码不能为空";
      }
      if (val !== loginPwdValidator.input.value) {
        return "两次输入密码不一致";
      }
    }
  );

  const form = document.querySelector(".user-form");
  form.onsubmit = function (e) {
    e.preventDefault();
    ValidatorItem.validate(
      loginIdValidator,
      nackNameValidator,
      loginPwdValidator,
      loginAgainPwdValidator
    ).then(async (res) => {
      if (!res) {
        return;
      }
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      const resp = await API.reg(data);
      if (resp.code === 0) {
        alert("注册成功");
        location.href = "./login.html";
      } else {
        alert(resp.msg);
      }
    });
  };
})();
