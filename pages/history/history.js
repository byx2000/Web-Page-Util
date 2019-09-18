var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: 
  {
    isLoading: false,
    isMenuPopup: false,
    history: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) 
  {
    //设置页面标题
    wx.setNavigationBarTitle({
      title: "最近浏览"
    });

    //获取历史记录
    this.setData({isLoading: true});
    var env = this;
    app.getHistory(app.globalData.currentUser.username, 
      function (res)
      {
        //console.log(res);
        res.reverse();
        env.setData({isLoading: false});
        env.setData({history: res})
      },
      function (err)
      {
        env.setData({ isLoading: false });
        console.log(err);
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

  /*网页列表项点击事件*/
  onWebsiteClick: function (event) {
    //获取当前选中网页名称和网址
    /*var data = { url: event.currentTarget.dataset.url, name: event.currentTarget.dataset.name };

    //打开网址
    wx.navigateTo({
      url: "../webpage/webpage?data=" + JSON.stringify(data)
    });*/

    app.globalData.selectedItem = {
      name: event.currentTarget.dataset.name,
      address: event.currentTarget.dataset.url,
      img: event.currentTarget.dataset.img
    };

    wx.setClipboardData({
      data: app.globalData.selectedItem.address,
    });
  },

  /*网页列表项长按事件*/
  onWebsiteLongClick: function (event) {
    //保存当前选中网页
    app.globalData.selectedItem = {
      name: event.currentTarget.dataset.name,
      address: event.currentTarget.dataset.url,
      img: event.currentTarget.dataset.img
    };
    //弹出上下文菜单
    this.setData({ isMenuPopup: true });
  },

  /*菜单取消事件*/
  onMenuCancel: function (event) {
    //关闭上下文菜单
    this.setData({ isMenuPopup: false });
  },

  /*菜单复制事件*/
  onMenuCopy: function (event) {
    //将网址复制到剪切板
    wx.setClipboardData({
      data: app.globalData.selectedItem.address,
    });
    this.setData({ isMenuPopup: false });
  },

  /*菜单打开链接事件*/
  onMenuOpen: function (event) {
    //打开网址
    var data = { url: app.globalData.selectedItem.address, name: app.globalData.selectedItem.name };
    wx.navigateTo({
      url: "../webpage/webpage?data=" + JSON.stringify(data)
    });
    this.setData({ isMenuPopup: false });
  },

  /*菜单收藏事件*/
  onMenuCollect: function (event) {
    var data = { address: app.globalData.selectedItem.address, name: app.globalData.selectedItem.name, img: app.globalData.selectedItem.img };
    var user = app.globalData.currentUser;

    if (user === null) {
      wx.showToast({
        title: '请先登录',
        image: "../../images/attention.png"
      });
      this.setData({ isMenuPopup: false });
      return;
    }

    var env = this;
    app.addCollection(user.username, data.name, data.address, data.img,
      //添加成功
      function (res) {
        //console.log("添加成功");
        wx.showToast({
          title: '添加成功！'
        });
        env.setData({ isMenuPopup: false });
      },
      //添加失败
      function (err) {
        console.log(err);
        wx.showToast({
          title: '添加失败！',
          image: "../../images/error.png"
        });
        env.setData({ isMenuPopup: false });
      }
    );
  }
})