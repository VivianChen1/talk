var API = (function () {
  const BASE_URL = "https://study.duyiedu.com";

  function get(path) {
    let headers = {};
    const token = localStorage.getItem("token");
    if (token) {
      headers["authorization"] = `Bearer ${token}`;
    }
    return fetch(BASE_URL + path, { headers });
  }

  function post(path, body) {
    let headers = {
      "Content-Type": "application/json",
    };
    const token = localStorage.getItem("token");
    if (token) {
      headers["authorization"] = `Bearer ${token}`;
    }
    return fetch(BASE_URL + path, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
  }

  //注册
  async function reg(userInfo) {
    const resp = await post("/api/user/reg", userInfo);
    return await resp.json();
  }

  //登录
  async function login(userInfo) {
    const resp = await post("/api/user/login", userInfo);
    const res = await resp.json();
    if (res.code === 0) {
      const token = resp.headers.get("authorization");
      localStorage.setItem("token", token);
    }
    return res;
  }

  //获取用户信息
  async function profile() {
    const resp = await get("/api/user/profile");
    return await resp.json();
  }
  // console.log(await profile());

  //验证账号
  async function exists(loginId) {
    const resp = await get(`/api/user/exists?loginId=${loginId}`);
    return await resp.json();
  }
  // console.log(await exists("cn"));

  //发送聊天消息
  async function sendChat(content) {
    const resp = await post("/api/chat", { content });
    return await resp.json();
  }
  // console.log(await sendChat({ content: "我最好看" }));

  //获取聊天记录
  async function getHistory() {
    const resp = await get("/api/chat/history");
    return await resp.json();
  }
  // console.log(await getHistory());

  //注销
  function loginOut() {
    localStorage.removeItem("token");
  }

  return {
    reg,
    login,
    exists,
    profile,
    sendChat,
    getHistory,
    loginOut,
  };
})();
