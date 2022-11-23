//对登录和注册的表单项进行校验

class ValidatorItem {
  /**
   * 构造器
   * @param {String} txtId 元素id
   * @param {Function} verify 验证函数，如果有错误返回错误信息，没有错误，则不返回
   */
  constructor(txtId, validatorFun) {
    this.input = $(txtId);
    this.p = this.input.nextElementSibling;
    this.validatorFun = validatorFun;
    this.input.onblur = () => {
      this.validate();
    };
  }

  //校验
  async validate() {
    const res = await this.validatorFun(this.input.value);
    if (res) {
      this.p.innerText = res;
      return false;
    } else {
      this.p.innerText = "";
      return true;
    }
  }

  //校验参数中的所有项
  static async validate(...validators) {
    const proms = validators.map((item) => item.validate());
    const res = await Promise.all(proms);
    return res.every((r) => r);
  }
}

function test() {
  ValidatorItem.validate(loginIdValidator, nackNameValidator).then((res) => {
    console.log(res);
  });
}
