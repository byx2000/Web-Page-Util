var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      name: "未知", //一级分类
      categories: { //网页分类信息
        "休闲娱乐": ["音乐网站", "娱乐时尚", "游戏网站", "图片摄影", "星座运势", "视频电影", "小说网站", "幽默笑话", "收藏爱好", "动漫网站", "明星粉丝"],
        "购物网站": ["电商网站", "购物分享", "返利比价", "团购网站"],
        "政府组织": ["政府门户", "政府职能", "事业单位"],
        "综合其他": ["法律法规", "门户网站", "论坛综合", "地方网站", "博客网站", "社交网站", "搜索引擎", "网址导航", "公共团体", "QQ个性"],
        "教育文化": ["在线教育", "中小学校", "教育资讯", "教育考试", "外语综合", "图书展馆", "军事国防", "出国留学", "百科辞典", "天文历史", "社科文艺", "科学探索", "高等院校", "培训机构"],
        "行业企业": ["电力水务", "日化用品", "商业百货", "跨国公司", "电子元器件", "广告营销", "机械工业", "五金电工", "汽车配件", "广电通信", "水暖安防", "建筑材料", "家电数码", "家居小商品", "食品饮料", "服装配饰", "包装印刷", "纺织皮革", "石化能源", "商务服务", "化工能源", "农林畜牧渔", "物流运输", "招商加盟", "汽车厂商"],
        "生活服务": ["家政服务", "生活百科", "餐饮美食", "家居建材", "宠物玩具", "分类信息", "求职招聘", "房产网站", "聊天交友", "汽车网站", "影楼婚嫁", "金融财经", "银行保险", "常用查询", "母婴网站", "驾校学车", "证券网站", "网贷平台"],
        "网络科技": ["应用工具", "电脑硬件", "软件下载", "技术编程", "设计素材", "域名主机", "网络安全", "网络硬盘", "邮件通信", "站长资源", "手机数码", "电子支付", "广告联盟", "数据分析", "电商服务", "创业投资", "IT资讯", "虚拟现实"],
        "体育健身": ["体育综合", "单车汽摩", "球类运动", "极限运动", "武术搏击", "体育院校", "体育用品", "福彩体彩", "棋牌健身"],
        "医疗健康": ["医院诊所", "健康保健", "妇幼医院", "男科医院", "美容整形", "不孕不育", "减肥瘦身", "医疗器械", "药品药学", "生育避孕", "组织机构"],
        "交通旅游": ["旅行社", "酒店宾馆", "交通地图", "票务预订", "旅游网站"],
        "新闻媒体": ["新闻报刊", "广播电视"]
      },
      tabs: [], //所有选项卡
      currentTabIndex: 0, //当前选项卡索引
      currentTabId: "i0", //当前id
      scrollHeight: 300,
      pages: [], //当前页面数据
      isLoading: true, //标记载入组件是否显示
      isMenuPopup: false //标记上下文菜单是否显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //获取一级分类
      this.setData({name: options.name});

      //设置页面标题
      wx.setNavigationBarTitle({
        title: options.name
      });

      //设置选项卡
      this.setData({ tabs: this.data.categories[options.name] });

      //获取屏幕高度尺寸
      let that = this;
      wx.getSystemInfo({
        success: function (res) {
          let clientHeight = res.windowHeight;
          let clientWidth = res.windowWidth;
          let ratio = 750 / clientWidth;
          let height = clientHeight * ratio;
          that.setData({
            scrollHeight: height - 90
          });
        }
      });

      //设置所有滑动页数据
      var pages = [];
      var table = app.globalData.table;
      var tabs = this.data.tabs;
      var index = 0;
      for (var i = 0; i < tabs.length; ++i)
      {
        for (var j = 0; j < table.length; ++j)
        {
          if (table[j].firstClass == this.data.name && table[j].secondClass == tabs[i])
          {
            pages[index] = table[j];
            index++;
            break;
          }
        }
      }

    for (var i = 0; i < pages.length; ++i)
    {
      pages[i].rankList = app.parseRankList(pages[i].rankInfo);
    }

    this.setData({pages: pages});
    this.setData({isLoading: false});
      
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
   * 选项卡点击事件
   */
  onTabClick: function (event)
  {
    //更新当前选项卡索引和id
    var id = event.currentTarget.id;
    this.setData({ currentTabId: id});
    id = id.replace("i", "");
    this.setData({ currentTabIndex: parseInt(id)});
  },

  /**
   * 滑动事件
   */
  onSwipeChange: function (event)
  {
    //更新当前选项卡索引和id
    this.setData({ currentTabIndex: event.detail.current});
    this.setData({ currentTabId: "i" + event.detail.current});
  },

    /*网页列表项点击事件*/
    onWebsiteClick: function (event)
    {
      //获取当前选中网页名称和网址
      var data = { url: event.currentTarget.dataset.url, name: event.currentTarget.dataset.name };
      
      //打开网址
      /*wx.navigateTo({
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

      //加入历史记录
      if (app.globalData.currentUser !== null)
      {
        app.addHistory(app.globalData.currentUser.username, 
          event.currentTarget.dataset.name,
          event.currentTarget.dataset.url,
          event.currentTarget.dataset.img,
          function (res)
          {

          },
          function (err)
          {
            console.log(err);
          });
      }
    },

    /*网页长按事件*/
    onWebsiteLongClick: function (event)
    {
      //保存当前选中网页
      app.globalData.selectedItem = {
        name: event.currentTarget.dataset.name,
        address: event.currentTarget.dataset.url,
        img: event.currentTarget.dataset.img
      };

      //弹出上下文菜单
      this.setData({isMenuPopup: true});
    },

    /*菜单取消事件*/
    onMenuCancel: function (event)
    {
      //关闭上下文菜单
      this.setData({ isMenuPopup: false });
    },

    /*菜单复制事件*/
    onMenuCopy: function (event)
    {
      //将网址复制到剪切板
      wx.setClipboardData({
        data: app.globalData.selectedItem.address,
      });
      this.setData({ isMenuPopup: false });
    },

    /*菜单打开链接事件*/
    onMenuOpen: function (event)
    {
      //打开网址
      var data = { url: app.globalData.selectedItem.address, name: app.globalData.selectedItem.name };
      wx.navigateTo({
        url: "../webpage/webpage?data=" + JSON.stringify(data)
      });
      this.setData({ isMenuPopup: false });
    },

    /*收藏*/
    onMenuCollect: function (event)
    {
      var data = { address: app.globalData.selectedItem.address, name: app.globalData.selectedItem.name, img: app.globalData.selectedItem.img };
      var user = app.globalData.currentUser;
      
      if (user === null)
      {
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
        function (res)
        {
          //console.log("添加成功");
          wx.showToast({
            title: '添加成功！'
          });
          env.setData({ isMenuPopup: false });
        },
        //添加失败
        function (err)
        {
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