var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogining: false,
    hasLogin: false,
    username: "",
    password: "",
    collections: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) 
  {
    this.updateUserData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.updateUserData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 更新用户信息
   */
  updateUserData: function ()
  {
    //用户未登录
    if (app.globalData.currentUser === null)
    {
      //登录状态标志
      this.setData({ hasLogin: false });
      //设置页面标题
      wx.setNavigationBarTitle({
        title: "登录/注册"
      });
    }
    //用户已登录
    else
    {
      //登录状态标志
      this.setData({ hasLogin: true });
      //用户名
      this.setData({ username: app.globalData.currentUser.username });
      //设置页面标题
      wx.setNavigationBarTitle({
        title: this.data.username
      });

      //获取用户收藏 
      /*var env = this;
      app.getUserCollection(this.data.username,
        function (res) 
        {
          env.setData({ collections: res });
        },
        function (err) 
        {
          console.log(err);
        }
      );*/
    }
  },

  /**
   * 登录按钮
   */
  onLogin: function ()
  {
    var env = this;
    this.setData({ isLogining: true});
    app.login(this.data.username, this.data.password,
      //登陆成功
      function (res) 
      {
        env.setData({ isLogining: false });
        //console.log(res);
        env.setData({ hasLogin: true });
        app.globalData.currentUser = app.getCurrentUser();
        env.updateUserData();
      },
      //登录失败
      function (err) 
      {
        console.log(err);
        env.setData({ isLogining: false });
        //错误提示
        if (err.error === "login data required.")
        {
          wx.showModal({
            title: "用户名或密码不能为空",
            showCancel: false
          });
        }
        else if (err.error === "username or password incorrect.")
        {
          wx.showModal({
            title: "用户名或密码错误",
            showCancel: false
          });
        }
        else
        {
          wx.showModal({
            title: "网络错误",
            showCancel: false
          });
        }
      }
    );
  },

  /**
   * 注销按钮
   */
  onLogout: function ()
  {
    app.logout();
    //this.setData({ hasLogin: false });
    app.globalData.currentUser = null;
    this.updateUserData();
  },

  /**
   * 用户名输入框
   */
  onUsername: function (event)
  {
    this.setData({username: event.detail.value});
  },

  /**
   * 密码输入框
   */
  onPassword: function (event)
  {
    this.setData({ password: event.detail.value });
  },

  /*网页列表项点击事件*/
  /*onWebsiteClick: function (event) {
    //获取当前选中网页名称和网址
    var data = { url: event.currentTarget.dataset.url, name: event.currentTarget.dataset.name };

    //打开网址
    wx.navigateTo({
      url: "../webpage/webpage?data=" + JSON.stringify(data)
    });
  },*/

  /*收藏点击事件*/
  onCollection: function (event)
  {
    wx.navigateTo({
      url: "../collection/collection"
    });
  },

  /*历史记录点击事件*/
  onHistory: function (event)
  {
    wx.navigateTo({
      url: "../history/history"
    });
  },

  /*注册按钮*/
  onRegister: function (event)
  {
    wx.navigateTo({
      url: "../register/register"
    });
  }
})