var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [
      { iconSrc: "../../images/entertainment.png", name: "休闲娱乐", color: "#4fbdba" },
      { iconSrc: "../../images/shopping.png", name: "购物网站", color: "#fe855a" },
      { iconSrc: "../../images/government.png", name: "政府组织", color: "#e3aa01" },
      { iconSrc: "../../images/info.png", name: "综合其他", color: "#616f7c" },
      { iconSrc: "../../images/education.png", name: "教育文化", color: "#9e8bcd" },
      { iconSrc: "../../images/industry.png", name: "行业企业", color: "#943b51" },
      { iconSrc: "../../images/services.png", name: "生活服务", color: "#e15057" },
      { iconSrc: "../../images/network.png", name: "网络科技", color: "#17ad90" },
      { iconSrc: "../../images/sports.png", name: "体育健身", color: "#f7e2d2" },
      { iconSrc: "../../images/health.png", name: "医疗健康", color: "#6f73f8" },
      { iconSrc: "../../images/tour.png", name: "交通旅游", color: "#eeb063" },
      { iconSrc: "../../images/news.png", name: "新闻媒体", color: "#3f3f3f" }
    ],
    isLoading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) 
  {
    var env = this;

    /*获取后端数据*/
    app.getTable(
    function (res) {
      app.globalData.table = res;
      env.setData({isLoading: false});
    },
    function (err) {
      console.log(err);
      env.setData({ isLoading: false });
    }
  );
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
   * 点击事件
   */
  onClick: function (event)
  {
    //console.log(event);
    /*打开分类详情*/
    wx.navigateTo({
      url: "../detail/detail?name=" + event.currentTarget.id
    });
  }
})