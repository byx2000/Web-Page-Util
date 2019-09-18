var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: 
  {
    isRegisting: false,
    username: "",
    password: "",
    confirm: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   * 用户名输入框
   */
  onUsername: function (event) {
    this.setData({ username: event.detail.value });
  },

  /**
   * 密码输入框
   */
  onPassword: function (event) {
    this.setData({ password: event.detail.value });
  },

  /**
   * 确认密码输入框
   */
  onConfirm: function (event)
  {
    this.setData({ confirm: event.detail.value });
  },

  /*注册按钮*/
  onRegister: function ()
  {
    //console.log("123");
    /*错误提示*/
    if (this.data.username === "" || this.data.password === "")
    {
      wx.showModal({
        title: "用户名或密码不能为空",
        showCancel: false
      });
      return;
    }
    else if (this.data.password !== this.data.confirm)
    {
      wx.showModal({
        title: "密码前后不一致",
        showCancel: false
      });
      return;
    }

    this.setData({ isRegisting: true});
    var env = this;
    app.register(this.data.username, this.data.password, 
      //注册成功
      function (res)
      {
        env.setData({ isRegisting: false});
        wx.navigateBack({
          delta: 1
        });
        wx.showToast({
          title: '注册成功！'
        });
      },
      //注册失败
      function (err)
      {
        console.log(err);
        env.setData({ isRegisting: false });
        wx.showModal({
          title: err.error,
          showCancel: false
        });
      }
    );
  }
})