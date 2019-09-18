var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: 
  {
    isLoading: false,
    isMenuPopup: false,
    collections: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) 
  {
    //设置页面标题
    wx.setNavigationBarTitle({
      title: "我的收藏"
    });

    //获取用户收藏
    /*this.setData({ isLoading: true});
    var env = this;
    app.getUserCollection(app.globalData.currentUser.username,
      function (res) {
        env.setData({ collections: res });
        env.setData({ isLoading: false });
      },
      function (err) {
        console.log(err);
        env.setData({ isLoading: false });
      }
    );*/

    //更新用户收藏
    this.updateCollection();
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
   * 更新用户收藏
   */
  updateCollection: function ()
  {
    this.setData({ isLoading: true });
    var env = this;
    app.getUserCollection(app.globalData.currentUser.username,
      function (res) {
        res.reverse();
        env.setData({ collections: res });
        env.setData({ isLoading: false });
      },
      function (err) {
        console.log(err);
        env.setData({ isLoading: false });
      }
    );
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
  onWebsiteLongClick: function (event)
  {
    //保存当前选中网页
    app.globalData.selectedItem = {
      name: event.currentTarget.dataset.name,
      address: event.currentTarget.dataset.url,
      img: event.currentTarget.dataset.img
    };
    //弹出上下文菜单
    this.setData({ isMenuPopup: true});
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

  /*移除收藏事件*/
  onMenuRemove: function (event)
  {
    var env = this;
    this.setData({ isMenuPopup: false });
    app.removeCollection(app.globalData.currentUser.username, app.globalData.selectedItem.name, app.globalData.selectedItem.address, app.globalData.selectedItem.img, 
      function (res)
      {
        console.log(res);
        env.updateCollection();
      },
      function (err)
      {
        console.log(err);
      }
    );
  }
})