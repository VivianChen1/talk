(async function () {
  const user = await API.profile();
  if (!user.data) {
    alert(user.msg);
    location.href = "./login.html";
    return;
  }

  //上面验证过，证明已登录,然后才可以进行下面的操作
  const dom = {
    aside: {
      nickname: $("nickname"),
      loginId: $("loginId"),
    },
    close: document.querySelector(".close"),
    main: {
      container: document.querySelector(".chat-container"),
      form: document.querySelector(".msg-container"),
      input: $("txtMsg"),
    },
  };
  setUserInfo();

  //设置用户信息
  function setUserInfo() {
    dom.aside.nickname.innerText = user.data.nickname;
    dom.aside.loginId.innerText = user.data.loginId;
  }

  //注销
  dom.close.onclick = function () {
    API.loginOut();
    location.href = "./login.html";
  };

  getMessage();
  //获取聊天记录
  async function getMessage() {
    const resp = await API.getHistory();
    resp.data.map((item) => setChat(item));
  }

  //将聊天记录变为html
  function setChat(history) {
    const chatItem = $$$("div");
    chatItem.className = "chat-item";
    if (history.from) {
      chatItem.classList.add("me");
    }

    const img = $$$("img");
    img.className = "chat-avatar";
    img.src = history.from ? "./asset/avatar.png" : "./asset/robot-avatar.jpg";
    chatItem.appendChild(img);

    const content = $$$("div");
    content.className = "chat-content";
    content.innerText = history.content;
    chatItem.appendChild(content);

    const date = $$$("div");
    date.className = "chat-date";
    date.innerText = formatDate(history.createdAt);
    chatItem.appendChild(date);

    dom.main.container.appendChild(chatItem);
  }

  function formatDate(time) {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDay().toString().padStart(2, "0");
    const hour = date.getHours().toString().padStart(2, "0");
    const min = date.getMinutes().toString().padStart(2, "0");
    const sec = date.getSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hour}-${min}-${sec}`;
  }

  //滚动到最下面
  function scroll() {
    dom.main.container.scrollTop = dom.main.container.scrollHeight;
  }

  dom.main.form.onsubmit = function (e) {
    e.preventDefault();
    sendChat();
  };

  //发送消息
  async function sendChat() {
    const content = dom.main.input.value;
    if (!content) {
      return;
    }
    setChat({
      from: user.data.loginId,
      to: null,
      content,
      createdAt: Date.now(),
    });
    dom.main.input.value = "";
    scroll();
    const resp = await API.sendChat(content);
    setChat({
      from: null,
      to: user.data.loginId,
      content: resp.data.content,
      createdAt: resp.data.createdAt,
    });
    scroll();
  }
})();
