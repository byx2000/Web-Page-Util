App({

  //Bmob: require("utils/bmob.js"),

  /**
   * 后端数据接口
   */

  //查找指定第一类别的所有网页信息
  querytFirstClass: function (firstClass, onSucceed, onFailed)
  {
      var query = this.globalData.Bmob.Query("rank");
      query.equalTo("firstClass", "==", firstClass);
      query.find().then
        (
        function (res) {
          if (res.length == 0) {
            onSucceed([]);
            return;
          }

          var table = [];
          for (var i = 0; i < res.length; ++i) {
            table[i] =
              {
                firstClass: res[i].firstClass,
                secondClass: res[i].secondClass,
                rankInfo: res[i].rank
              };
          }

          onSucceed(table);
        }
        )
        .catch(onFailed);
    },

  //查找整张数据表
  getTable: function (onSucceed, onFailed)
  {
      var env = this;
      var firstClass = ["休闲娱乐", "购物网站", "政府组织", "综合其他", "教育文化", "行业企业", "生活服务", "网络科技", "体育健身", "医疗健康", "交通旅游", "新闻媒体"];
      var table = [];

      function search(iFirstClass, iTable)
    {
      if(iFirstClass == firstClass.length)
  {
    onSucceed(table);
    return;
  }

  env.querytFirstClass(firstClass[iFirstClass],
    function (res) {
      for (var i = 0; i < res.length; ++i) {
        table[iTable] = res[i];
        iTable++;
      }
      search(iFirstClass + 1, iTable);
    },
    onFailed
  );
    }

  search(0, 0);
  },

  //解析网页排名数据
  parseRankList: function (rankInfo)
  {
      var list = rankInfo.trim().split(/\s+/);
      var rankList = [];
      for(var i = 0; i<list.length; i += 3)
  {
    rankList[i / 3] =
      {
        name: list[i],
        img: list[i + 1],
        address: list[i + 2]
      };
  }
  return rankList;
  },

  //用户登录
  login: function (username, password, onSucceed, onFailed)
  {
    this.globalData.Bmob.User.login(username, password).then(onSucceed).catch(onFailed);
  },

  //用户注销
  logout: function ()
  {
    this.globalData.Bmob.User.logout();
  },

  //获取当前用户(若未登录则返回null)
  getCurrentUser: function()
  {
    return this.globalData.Bmob.User.current();
  },

  //更新用户收藏数据
  updateUserCollection: function (username, data, onSucceed, onFailed)
  {
      var query = this.globalData.Bmob.Query("_User");
      query.equalTo("username", "==", username);
      query.find().then(
        function (res) {
          var modify = Bmob.Query("_User");
          modify.set("id", res[0].objectId);
          modify.set("collection", data);
          modify.save().then(onSucceed).catch(onFailed);
        }
      ).catch(onFailed);
    },

  //解析收藏数据
  parseCollectionData: function (data)
  {
    if (data === undefined)
    {
      return [];
    }

    data = data.trim();
    if (data === "")
    {
      return [];
    }

      var list = data.trim().split(/\s+/);
      var res = [];
      for(var i = 0; i<list.length; i += 3)
    {
      res[i / 3] =
        {
          name: list[i],
          address: list[i + 1],
          img: list[i + 2]
        };
    }
    return res;
  },

  //增加一条收藏记录
  addCollection: function (username, name, address, img, onSucceed, onFailed)
  {
    var env = this;
    var query = this.globalData.Bmob.Query("_User");
      query.equalTo("username", "==", username);
      query.find().then(
      function (res) {
        console.log(res);
        var list = env.parseCollectionData(res[0].collection);
        for (var i = 0; i < list.length; ++i)
        {
          if (list[i].name === name && list[i].address == address && list[i].img === img)
          {
            onSucceed("repeat");
            return;
          }
        }

        var str = res[0].collection;
        if (str === undefined)
        {
          str = "";
        }
        str += (name + " " + address + " " + img + "\n");

        var modify = env.globalData.Bmob.Query("_User");
        modify.set("id", res[0].objectId);
        modify.set("collection", str);
        modify.save().then(onSucceed).catch(onFailed);
      }
    ).catch(onFailed);
  },

  //获取用户收藏
  getUserCollection: function (username, onSucceed, onFailed)
  {
      var env = this;
      var query = this.globalData.Bmob.Query("_User");
      query.equalTo("username", "==", username);
      query.find().then(
      function (res) {
        onSucceed(env.parseCollectionData(res[0].collection));
      }
    ).catch(onFailed);
  },

  //移除一条收藏记录
  removeCollection: function (username, name, address, img, onSucceed, onFailed)
  {
      var env = this;
      var query = this.globalData.Bmob.Query("_User");
      query.equalTo("username", "==", username);
      query.find().then(
      function (res) {
        var str = res[0].collection;

        var index = 0;
        var list = env.parseCollectionData(str);
        for (var i = 0; i < list.length; ++i) {
          if (list[i].name === name && list[i].address === address && list[i].img === img) {
            index = i;
            break;
          }
        }

        str = "";
        for (var i = 0; i < list.length; ++i) {
          if (i !== index) {
            str += (list[i].name + " " + list[i].address + " " + list[i].img + "\n");
          }
        }

        var modify = env.globalData.Bmob.Query("_User");
        modify.set("id", res[0].objectId);
        modify.set("collection", str);
        modify.save().then(onSucceed).catch(onFailed);
      }
    ).catch(onFailed);
  },

  //用户注册
  register: function (username, password, onSucceed, onFailed)
  {
      var params =
      {
        username: username,
        password: password
      };

    this.globalData.Bmob.User.register(params).then(onSucceed).catch(onFailed);
  },

  /*解析历史数据*/
  parseHistoryData: function (data)
  {
    if(data === undefined || data.trim() === "")
    {
      return [];
    }
    var list = data.trim().split(/\s+/);
    var rankList = [];
    for (var i = 0; i < list.length; i += 3) {
      rankList[i / 3] =
        {
          name: list[i],
          address: list[i + 1],
          img: list[i + 2]
        };
    }
    return rankList;
  },

  /*获取历史记录*/
  getHistory: function (username, onSucceed, onFailed)
  {
    var env = this;
    var query = this.globalData.Bmob.Query("_User");
    query.equalTo("username", "==", username);
    query.find().then(
      function (res) {
        //console.log(res);
        if (res[0].history === undefined)
        {
          onSucceed([]);
          return;
        }
        onSucceed(env.parseHistoryData(res[0].history));
      }
    ).catch(onFailed);
  },

  /*更新历史记录*/
  updateHistory: function (username, data, onSucceed, onFailed)
  {
    var env = this;
    var query = this.globalData.Bmob.Query("_User");
    query.equalTo("username", "==", username);
    query.find().then(
      function (res) {
        var modify = env.globalData.Bmob.Query("_User");
        modify.set("id", res[0].objectId);
        modify.set("history", data);
        modify.save().then(onSucceed).catch(onFailed);
      }
    ).catch(onFailed);
  },

  /*添加一条历史记录*/
  addHistory: function (username, name, address, img, onSucceed, onFailed)
  {
    var env = this;
    var query = this.globalData.Bmob.Query("_User");
    query.equalTo("username", "==", username);
    query.find().then(
      function (res) {
        var list = env.parseHistoryData(res[0].history);
        if (list.length < 10 && list.length > 0) {
          var str = res[0].history;
          str += (name + " " + address + " " + img + "\n");

          var modify = env.globalData.Bmob.Query("_User");
          modify.set("id", res[0].objectId);
          modify.set("history", str);
          modify.save().then(onSucceed).catch(onFailed);
        }
        else {
          list.splice(0, 1);
          var str = "";
          for (var i = 0; i < list.length; ++i) {
            str += (list[i].name + " " + list[i].address + " " + list[i].img + "\n");
          }
          str += (name + " " + address + " " + img + "\n");

          var modify = env.globalData.Bmob.Query("_User");
          modify.set("id", res[0].objectId);
          modify.set("history", str);
          modify.save().then(onSucceed).catch(onFailed);
        }
      }
    ).catch(onFailed);
  },

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {

    var env = this;

    //初始化bmob
    this.globalData.Bmob.initialize("361185e4535950187f99552651e76475", "6c01d615ea2a0be87426118464146835", "a3cd7ad9f2c35929d7e0a32aca43138d");

    //获取当前用户
    this.globalData.currentUser = this.getCurrentUser();
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  },

  /**
   * 全局变量
   */
  globalData: {
      Bmob: require("utils/bmob.js"),
      table: [], //所有网页信息(程序启动时从后端数据库获取)
      selectedItem: {}, //当前选中网页(用于上下文菜单的处理),
      currentUser: null //当前用户
  }
})
