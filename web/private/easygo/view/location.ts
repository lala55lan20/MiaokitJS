/// <reference path="compat.ts" />

var PLocationStatus = {
  PLocation : null,
  openId : "",
  loclist : null,
  resfloor : {
    name: null,
    status: 1, //等同参数code
    time: null,
    count: 0
  },
  resPos : {
    x: 0.0,
    y: 0.0,
    floor: 0,
    count: 0
  },
  gpsPosition : {
    latitude: null,
    longitude: null,
    speed: null,
    accuracy: null,
    count: 0
  },
  gpsPositionPro : {
    latitude: null,
    longitude: null
  },
  GPSaccuracy : {
    accuracy:null,
    count:0
  },
  GPSTimer : null,
  InitPosArry : [],
  InitPosStatus : false,
  recentTime : 0,
  curEndX : null,
  curEndY : null,
  curEndPath : {
    num:null,
    status:true
  },
  nstepLLL:0,
  OutdoorStatus : false,  ///定位判断是否在室外
  IndoorStatus : true,  ///定位判断是否进入室内定位状态
  resscene : "",
  ff: null,
  voiceFLag : true,
  endX : null,
  endY : null,
  PosTime : null,
  posFault : false,
  bleOn : null,
  CentrePoint : new Vector3(112.53005, 0.0, 37.7573), ///体育馆的中心点
  rangeIn : false,  ///是否启动排除方案（刨去需要蓝牙定位的地方）
  GDmap : null, ///高德地图 容器
  geoLocation : null, ///高德地图 定位返回值
  shili : {
    "beacons": [{
      major: 10008,
      minor: 57686,
      uuid: "FDA50693-A4E2-4FB1-AFCF-C6EB07647825",
      accuracy: "0.235344",
      rssi: "-66",
      proximity: "1",
      heading: "288.1355"
    }]
  },
  GPSAcount : 0,
  currentTime:"",
  curStep : {
    count: 0,
    status: false
  },
  nowLine : null,
  orLine : [],
  yawAngle : 0,
  curWayStart : null,
  mnAngle : null,
  posList : [], //调试用 记录传入点
  StepMock: function(){},
  step : 1,
  nearistArr : [],
  lat : 0,
  last_lat : 0,
  lng : 0,
  last_lng : 0,
  alt : 0,
  last_alt : 0,
  gpsTime : null,
  last_gpsTime : null,
  dataLngLatAccuracy : 0,
  dataAltAccuracy : 0,
  angle : 0,
  speed : 0,
  eqCount: 0,
  tempCount : 0,
  rangeCount : 0,
  disableCount : 0,
};
/**GPS参数申明 */

var locationlib = new LocationLib();

  /**暂时不用的wxconfig方法 */
function initParam() {
  var host = window.location.host;
  var currentUrl = "/h5/weixin/sign.php?url=" + encodeURIComponent(SystemStatus.hostParams);
  $.ajax({
    type: "get",
    async: true,
    url: currentUrl,
    success: function (data) {
      var wxParams = JSON.parse(data);
      wx.Timestamp = wxParams["Timestamp"];
      wx.Noncestr = wxParams["Noncestr"];
      wx.Signature = wxParams["Signature"];
      wx.Appid = wxParams["Appid"];
      wx.Ticket = wxParams["jsapi_ticket"];

      wx.config({
        beta: true,
        debug: false,
        appId: wx.Appid,
        timestamp: wx.Timestamp,
        nonceStr: wx.Noncestr,
        signature: wx.Signature,
        jsApiList: [
          "startSearchBeacons",
          "onSearchBeacons",
          "scanQRCode",
          "startMonitoringBeacons",
          "stopMonitoringBeacons",
          "onBeaconsInRange",
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "onMenuShareQQ",
          "openWXDeviceLib",
          "closeWXDeviceLib",
          "onWXDeviceBluetoothStateChange",
          'openLocation', //使用微信内置地图查看地理位置接口
          'getLocation' //获取地理位置接口
        ]
      });
    },
    // complete: function () {
    //   getLocList();
    // },
    error: function (err) {
      console.log("get wxAPI error: " + err);
    }
  });
}


/** 用户点击链接触发登录*/
function getCode(code) {
  /**后台微信登录地址 */
  var openidURL = "/h5/weixin/login.php?code=" + code;

  $.ajax({
    url: openidURL,
    success: function (data) {
      PLocationStatus.openId = JSON.parse(data).openid;
      console.info(PLocationStatus.openId);

      if (PLocationStatus.openId) {
        if (!PLocationStatus.loclist) {
          getLocList();
        }
        locationlib.locationInit("RFaUJsuCZVYMTPbbEY5z", "sxtyzx", PLocationStatus.openId, function (x, y, floorId, code) {
          var mytime = new Date().getTime();
          getLocation(x, y, floorId, code, mytime);
        });
      }
    }
  });
}


wx.ready(function () {
  // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，
  //所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
  wx.startSearchBeacons({
    ticket: wx.Ticket,
    complete: function (argv) {
      var result = JSON.stringify(argv);
      if (result.indexOf("bluetooth power off") != -1) {
        $("#page-bluetooth").css("display", "block");
        $("#page-bluetooth").animate({
            left: "0"
          },
          "fast",
          function () {
            $("#page-index-new").css("height", "100vh");
          }
        );
        setTimeout(() => {
          PLocationStatus.IndoorStatus = false;
        }, 2000);
      } else if (result.indexOf("system unsupported") != -1) {
        alert("您的系统不支持此服务。");
      } else {
        setTimeout(() => {
          if (!PLocationStatus.posFault)
            PLocationStatus.IndoorStatus = false;
        }, 5000);
      }
    }
  });
  wx.onSearchBeacons({
    complete: function (argv) {
      if ($("#page-bluetooth").is(":visible")) {
        $("#page-index-new").css("height", "auto");
        $("#page-bluetooth").animate({
            left: "100vw"
          },
          "fast",
          function () {
            $("#page-bluetooth").hide();
          }
        );
      }
      locationlib.bleLocation(argv.beacons);
      // console.log("onsearch ing2");
      !PLocationStatus.posFault && (PLocationStatus.posFault = true, NNavigation.EnableLocate(true), NNavigation.g_pActiveList.length <= 0 && LockScene(), $(".lockScene").show(), ShowMockBtn());
      /**传递到和盛华提供接口 */
      $.post("http://api.heshenghua.net/rpc/beancons/setBeancons", {
        'beacons': JSON.stringify(argv.beacons),
        complete: function () {
          // console.log(JSON.stringify(shili.beacons));
        }
      });
      // getLocationOld();
    }
  });
  wx.invoke(
    "openWXDeviceLib", {
      brandUserName: "gh_b62862b4ed11"
    },
    function (res) {
      console.log("openWXDeviceLib", res);
    }
  );
  wx.on("onWXDeviceBluetoothStateChange", function (res) {
    if (res.state == "on") {
      if ($("#page-bluetooth").is(":visible")) {
        $("#page-index-new").css("height", "auto");
        $("#page-bluetooth").animate({
            left: "100vw"
          },
          "fast",
          function () {
            $("#page-bluetooth").hide();
          }
        );
      }
      NNavigation.TipVoice = function (message) {
        console.info(message);
        l(message);
      };
    } else if (res.state == "off") {
      //开启定位后关闭，需要恢复为模拟导航的配置
      PLocationStatus.PLocation = null;
      $(".start_input input").val("");
      CenterToastShow("未能获取蓝牙信息");
      NNavigation.EnableLocate(false);
      PLocationStatus.posFault = false;
      HideMockBtn();
    }
  });
  if (GLOBAL.GpsConfig.launch) {
    // InitGDMap();
    getGpsLocationGeo();
    console.log("getGPS start");
    gpscpArry = new Vector3(112.52847,0.0,37.75644251);
  }
});

function getRelLoc(x, y, floor, nWork) {
  var floorId = floor - 1;
  if (PLocationStatus.loclist) {
    var relX = 0,
      relY = 0,
      centX = PLocationStatus.loclist[floorId].centX,
      centY = PLocationStatus.loclist[floorId].centY,
      offsetX = PLocationStatus.loclist[floorId].offsetX,
      offsetY = PLocationStatus.loclist[floorId].offsetY,
      unit = PLocationStatus.loclist[floorId].unit,
      relLoc = [],
      Lx = x,
      Ly = y;

    relX = (Lx - centX) * unit + offsetX;
    relY = (Ly - centY) * unit + offsetY;
    relLoc = [relX, relY];
    let curPonit = new  Vector3(relX, 0.0, relY);
    //$("title").text(nWork+","+floorId+","+relX+","+relY);
    NNavigation.UpdateLocation(nWork, floorId, {x:relX,y:0.0,z:relY});
      if (NNavigation.g_pActiveList.length > 0 && GLOBAL.Navigating){
      // $("title").text(PLocationStatus.curEndPath.num+","+PLocationStatus.curEndX+','+PLocationStatus.curEndY);
      if (!PLocationStatus.curEndX&&!PLocationStatus.curEndY||PLocationStatus.curEndPath.num!=NNavigation.g_pActiveList[0].m_nCurPath){
        let Nav;
        ( Nav =  NNavigation.g_pActiveList[0],
          PLocationStatus.curEndPath.num = Nav.m_nCurPath,
          PLocationStatus.curEndPath.status = false,
          PLocationStatus.curEndX = Nav.m_aPath[Nav.m_nCurPath].m_aPath[Nav.m_aPath[Nav.m_nCurPath].m_aPath.length-1].x,
          PLocationStatus.curEndY = Nav.m_aPath[Nav.m_nCurPath].m_aPath[Nav.m_aPath[Nav.m_nCurPath].m_aPath.length-1].z
        );
      } else if (PLocationStatus.curEndPath.num==NNavigation.g_pActiveList[0].m_nCurPath&&!PLocationStatus.curEndPath.status){
        if (NNavigation.g_pActiveList[0].m_nCurPath >= NNavigation.g_pActiveList[0].m_aPath.length - 1) {
          switch(Engine.g_pInstance.pPath[Engine.g_pInstance.pPath.length - 1]
            .m_pEndPoint.m_mLandmark.Object.m_pName[0]){
              case "1" :
                calcDistance(relX, relY, 5,22);
                break;
                case "2":
                    calcDistance(relX, relY, 5,8);
              break;
              case "3":
                calcDistance(relX, relY, 5,17);
                break;
              default:
                calcDistance(relX, relY, 5,12);
                break;
              }
        } else {
          switch (NNavigation.g_pActiveList.length > 0 && NNavigation.g_pActiveList[0].m_aPath[NNavigation.g_pActiveList[0].m_nCurPath].m_pEndPoint.m_mLandmark.Object.TypeName())
           {
            case "出入口":
              calcDistance(relX, relY, 4);
              break;
            case "楼梯":
              calcDistance(relX, relY, 1);
              break;
            case "电梯":
              calcDistance(relX, relY, 2);
              break;
            case "扶梯":
              calcDistance(relX, relY, 3);
              break;
            default:
          }
        }
      }
    }

    /**蓝牙定位储存当前位置点信息（开启蓝牙和关闭蓝牙还是需要添加判断） */
    PLocationStatus.PLocation = {
      Work: nWork,
      Layer: floorId,
      Position: curPonit
    };
    GLOBAL.PLocation = PLocationStatus.PLocation;
  } else {
    getLocList();
    console.log("undefined loclist");
  }
}

/**播放动画 不自动结束 */
function c2 (e) {
  console.info("播放动画：" + e);
      var a = document.createElement("img");
      (a.src = "images/animate/" + e + ".gif"),
      (a.style.cssText =
          "position:absolute;padding:5px; top:150px; left:0px; right:0px;margin:auto; z-index:999999;background-image:linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);"),
      document.body.appendChild(a);
      a.setAttribute("id","movieC");
}
/**删除当前动画 */
function removeC () {
  var a = document.getElementById("movieC");
  if (a){
    (a.style.webkitTransition =
      "-webkit-transform 0.5s ease-in, opacity 0.5s ease-in"),
  (a.style.opacity = "0"),
  setTimeout(function () {
      document.body.removeChild(a);
  }, 500);
}
}

/** 返回位置坐标（美迪端原始坐标）*/
function getLocation(initX, initY, floorId, code, time) {
  if (floorId == 4) {
    floorId = 5;
  }
  var floor = floorId;
  $("title").text(code + "," + initX + "," + initY + "," + floorId);
  if (code == 0) {
    if (NNavigation.g_pActiveList.length>0&&NNavigation.g_pActiveList[0].m_aPath[0].m_pLayerName=="5F"&&
      NNavigation.g_pActiveList[0].m_aPath[NNavigation.g_pActiveList[0].m_aPath.length-1].m_pLayerName=="室外"&&
      floorId==2) {
      PLocationStatus.IndoorStatus&&!PLocationStatus.GPSTimer && (getGpsLocationGeo());
      PLocationStatus.IndoorStatus = false;
    } else{
      PLocationStatus.resfloor.time = time;
      PLocationStatus.IndoorStatus = true;
      PLocationStatus.GPSTimer && (navigator.geolocation.clearWatch(PLocationStatus.GPSTimer),
        // console.log("cleargpstimer in onsearch"),
        PLocationStatus.GPSTimer = null, checkBLE());
      getRelLoc(initX, initY, floor, 1);
      if (PLocationStatus.resfloor.status) {
        PLocationStatus.resfloor.status = 0;
        HideMsg();
      }
    }
  } else {
    let interval = 8000;
    /**看情况 有导航和无导航，导航是否下一楼是室外还是啥，给不同的无信号时间，或者检测已经在区域外 */
    if ((new Date().getTime() - PLocationStatus.resfloor.time > interval) && !PLocationStatus.resfloor.status) {
      $("#msgBox img").attr("src","images/loading.gif");
      ShowMsg("", 5000);
      PLocationStatus.resfloor.status = 1;
      PLocationStatus.resfloor.time = time;
      if (NNavigation.g_pActiveList.length>0&&NNavigation.g_pActiveList[0].m_aPath[NNavigation.g_pActiveList[0].m_aPath.length-1].m_pLayerName=="室外") {
        PLocationStatus.IndoorStatus&&!PLocationStatus.GPSTimer && (getGpsLocationGeo());
        PLocationStatus.IndoorStatus = false;
      }
    } else if (!PLocationStatus.GPSTimer&&PLocationStatus.IndoorStatus) {
      getRelLoc(initX, initY, floor, 1);
    }
  }
}
/**通过接口获取位置信息 */
function getLocationOld() {
  $.ajax({
    url: "https://indoor.yunweizhi.net:3000/getjspos?mapId=" + "ychospital" + "&openId=" + PLocationStatus.openId,
    success: function (res) {
      var location = JSON.parse(res).data;
      if (location.code == 0) {
        getRelLoc(location.x, location.y, 0, 0);
      } else {
        // $("title").text(location.x + "," + location.y);
      }
    }
  });
}

/**当前终点距离计算
 * 出入口and楼梯通道and终点
 * type分别213
 */
function calcDistance(x, y, type, faraway = 15) {
  let EndPOI = new Vector3(PLocationStatus.curEndX,0.0,PLocationStatus.curEndY);
  let curPonit = new Vector3(x,0.0,y);
  let distance = Vector3.Distance(EndPOI,curPonit);
  // $("title").text(distance+","+type);
  if (distance < faraway) {
    switch (type) {
      case 1:
        if (NNavigation.g_pActiveList[0].m_aPath[0].m_nLayer < NNavigation.g_pActiveList[0].m_aPath[1].m_nLayer) {
          c2(0);
        } else {
          c2(1);
        }
        NNavigation.TipMessage = null;
        ToastShow("请上下楼梯");
        l(["请上下","楼梯"]);
        break;
      case 2:
        if (NNavigation.g_pActiveList[0].m_aPath[0].m_nLayer < NNavigation.g_pActiveList[0].m_aPath[1].m_nLayer) {
          c2(6);
        } else {
          c2(7);
        }
        NNavigation.TipMessage = null;
        ToastShow("请上下电梯");
        l(["请上下","电梯"]);
        break;
      case 3:
        if (NNavigation.g_pActiveList[0].m_aPath[0].m_nLayer < NNavigation.g_pActiveList[0].m_aPath[1].m_nLayer) {
          c2(4);
        } else {
          c2(5);
        }
        NNavigation.TipMessage = null;
        ToastShow("请上下扶梯");
        l(["请上下","扶梯"]);
        break;
      case 4:
        if (MiaokitDC.DC.m_nCurWork == 0) {
          c2(3);
          ToastShow("请通过出入口进入室内");
          l(["通过出入口","进入室内"]);
          } else {
          c2(2);
          ToastShow("请通过出入口前往室外");
          l(["通过出入口","前往室外"]);
        }
        NNavigation.TipMessage = null;
        break;
      case 5:
        /**终点播报 */
        CenterToastShow(
          "到达目的地" +
          Engine.g_pInstance.pPath[Engine.g_pInstance.pPath.length - 1]
          .m_pEndPoint.m_mLandmark.Object.m_pName,
          1500
        );
        ToastShow("到达目的地附近");
        l(["到达目的地附近", "结束导航"]);
        NNavigation.NavigateCancel();
        Engine.g_pInstance.m_pProject.CloseNavBack();
        GLOBAL.Navigating = false;
        break;
      default:
        return true;
    }
    $(".Info-Img-Box img").attr("src","images/ex.png");
    PLocationStatus.curEndPath.status = true;
    }
}

/**判断是否为定位跳动 */
function floorCheck(initX, initY, floor, time) {
  let date = time;
  if (NNavigation.g_pActiveList.length == 0) {
    if (PLocationStatus.resfloor.name) {
      if (PLocationStatus.resfloor.name != floor) {
        if (date - PLocationStatus.resfloor.time > 2000) {
          getRelLoc(initX, initY, floor, 1);
          PLocationStatus.resfloor.name = floor;
          PLocationStatus.resfloor.time = date;
        }
      } else {
        getRelLoc(initX, initY, floor, 1);
        PLocationStatus.resfloor.time = date;
      }
    } else {
      getRelLoc(initX, initY, floor, 1);
      PLocationStatus.resfloor.name = floor;
      PLocationStatus.resfloor.time = date;
    }
  } else {
    PLocationStatus.resfloor.time = time;
    getRelLoc(initX, initY, floor, 1);
  }
}


/**定时检测是否能够定位成功 */
function buletoothOn() {
  var curTime = Date.parse((new Date()).toString());
  if (curTime - PLocationStatus.PosTime > 5000 && PLocationStatus.posFault == true) {
    NNavigation.EnableLocate(false);
    PLocationStatus.posFault = false;
    if ($(".history-rollback-wrapper").is(":hidden")) {
      $(".lockScene").hide();
      LockCameraToPath(0);
      NNavigation.TipVoice = null;
    }
  }
}

function getLocList() {
  $.ajax({
    url: "../api/info/getBluetooth.php",
    success: function (data) {
      PLocationStatus.loclist = JSON.parse(data);
      for (let loc of PLocationStatus.loclist) {
        for (var i in loc) {
          loc[i] = parseFloat(loc[i]);
        }
      }
    }
  });
}

/**原生watch接口 */
function getGpsLocationGeo () {
  //获取设备信息
  PLocationStatus.GPSTimer=navigator.geolocation.watchPosition(
    function (p) {
        //ShowObjProperty(p);
        PLocationStatus.lat = p.coords.latitude || 0;
        PLocationStatus.lng = p.coords.longitude || 0;
        PLocationStatus.alt = p.coords.altitude || 0;
        PLocationStatus.gpsTime =new Date().getTime();
        PLocationStatus.dataLngLatAccuracy = p.coords.accuracy || 0;
        PLocationStatus.dataAltAccuracy = p.coords.altitudeAccuracy || 0
        PLocationStatus.angle = p.coords.heading || 0;
        PLocationStatus.speed = p.coords.speed || 0;
        // console.log(gpsTime);
        //暂时只判断经纬度海拔变化值是否变化
        if (!PLocationStatus.IndoorStatus&&(!PLocationStatus.last_gpsTime||PLocationStatus.gpsTime - PLocationStatus.last_gpsTime>1000)){
          // console.log("获取GPS一次");
          if (PLocationStatus.last_lat != PLocationStatus.lat || PLocationStatus.last_lng != PLocationStatus.lng || PLocationStatus.last_alt != PLocationStatus.alt) {//|| last_gpsTime != gpsTime
              PLocationStatus.eqCount = 0;
              PLocationStatus.gpsPosition.latitude = PLocationStatus.lat;
              PLocationStatus.gpsPosition.longitude = PLocationStatus.lng;
              PLocationStatus.gpsPosition.accuracy = PLocationStatus.dataLngLatAccuracy;
              PLocationStatus.last_gpsTime = PLocationStatus.gpsTime;
              /**当前位置点GPS坐标vector3对象 */
              let curpointGPS = new Vector3(PLocationStatus.lng,0.0,PLocationStatus.lat);
              if (Vector3.Distance(gpscpArry,curpointGPS)<=0.006527) {
                
                if (0) {
                  // OutdoorStatus = true;
                  // if (Vector3.Distance(CentrePoint,curpointGPS)<=0.00177){
                  //   gpsPosition.accuracy = 40;
                  //   OutdoorStatus = false;
                  //   //return false;
                  // } else {
                  //   rangeIn = false;
                  // }
                }else {
                  if (PLocationStatus.gpsPosition.accuracy<=30){
                !PLocationStatus.posFault && (PLocationStatus.posFault = true, NNavigation.EnableLocate(true), NNavigation.g_pActiveList.length <= 0 && LockScene(), $(".lockScene").show(), ShowMockBtn());
                setgpsLocation(PLocationStatus.gpsPosition);
              } else{
                PLocationStatus.OutdoorStatus&&PLocationStatus.PLocation&&PLocationStatus.speed>1&&PLocationStatus.StepMock();
              }
            }
            }
          }else {
            if (PLocationStatus.PLocation&&PLocationStatus.speed>1){
              PLocationStatus.eqCount++
              if (PLocationStatus.eqCount<8){
                PLocationStatus.StepMock();
              }
            }
          }
        } else if (new Date().getTime() - PLocationStatus.resfloor.time>1000){
          PLocationStatus.IndoorStatus = false;
        }
    },
    function (e) {

    },
    {
        maximumAge: 0,
        enableHighAccuracy: true
    }
);
}
/**获取GPS坐标，地图内判断 */
function getGpsLocation() {
  wx.getLocation({
    type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
    success: function (res) {
    if(PLocationStatus.gpsPosition.longitude!=res.longitude&&PLocationStatus.gpsPosition.latitude!=res.latitude){
      PLocationStatus.eqCount = 0;
      PLocationStatus.gpsPosition.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
      PLocationStatus.gpsPosition.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
      // PLocationStatus.gpsPosition.longitude = 110.28852; // 经度，浮点数，范围为180 ~ -180。
      // PLocationStatus.gpsPosition.latitude = 25.273695; // 纬度，浮点数，范围为90 ~ -90
      PLocationStatus.gpsPosition.speed = res.speed; // 速度，以米/每秒计
      PLocationStatus.gpsPosition.accuracy = res.accuracy; // 位置精度
      // $("title").text(res.longitude + "," + res.latitude + "," + res.accuracy);
      if (res.accuracy>30){
        PLocationStatus.StepMock();
        return false
      }
      if (PLocationStatus.gpsPosition.latitude <= gpscpArry.maxlatitude && PLocationStatus.gpsPosition.latitude >= gpscpArry.minlatitude && PLocationStatus.gpsPosition.longitude <= gpscpArry.maxlongitude && PLocationStatus.gpsPosition.longitude >= gpscpArry.minlongitude
        &&NNavigation.g_pActiveList.length<=0) {
        // $("title").text("okwx:" + res.longitude + "," + res.latitude + "," + res.accuracy);
        !PLocationStatus.posFault && (PLocationStatus.posFault = true, NNavigation.EnableLocate(true), $(".lockScene").show()) && NNavigation.g_pActiveList.length == 0 && LockScene();
        setgpsLocation(PLocationStatus.gpsPosition);
      } else {
        return false;
      }
    } else {
      if (PLocationStatus.PLocation){
        PLocationStatus.eqCount++
        if (PLocationStatus.eqCount<8){
          PLocationStatus.StepMock();
        }
      }
    }
    }
  });
}

function InitGDMap() {
  PLocationStatus.GDmap = new AMap.Map('GDcontainer', {
    resizeEnable: true
  });
  AMap.plugin('AMap.Geolocation', function () {
    PLocationStatus.geoLocation = new AMap.Geolocation({
      enableHighAccuracy: true, //是否使用高精度定位，默认:true
      timeout: 10000000, //超过10秒后停止定位，默认：5s
      convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
      showButton: false, //显示定位按钮，默认：true
      showMarker: false, //定位成功后在定位到的位置显示点标记，默认：true
      showCircle: false, //定位成功后用圆圈表示定位精度范围，默认：true
      panToLocation: false, //定位成功后将定位到的位置作为地图中心点，默认：true
      zoomToAccuracy: false //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false

    });
    PLocationStatus.GDmap.addControl(PLocationStatus.geoLocation);

  });
}


/**使用高德api获得GPS坐标，做地图区域判断 */
function getGpsLocationGD() {
  console.log("gaode GPS0");
  PLocationStatus.geoLocation.getCurrentPosition(function (status, res) {
    // $.post("http://api.heshenghua.net/rpc/beancons/setBeancons", {
    //   'beancons': JSON.stringify(shili.beacons),
    //   // 'beancons': shili.beacons,
    //   complete: function () {
    //     console.log(JSON.stringify(shili.beacons));
    //   }
    // });
    console.log("gaode GPS1");
    if (status == 'complete') {
      console.log("gaode GPS");
      if (!PLocationStatus.PLocation||!PLocationStatus.gpsPosition.longitude||1){
        PLocationStatus.eqCount = 0;
        PLocationStatus.gpsPosition.longitude = res.position.lng; // 经度，浮点数，范围为180 ~ -180。
        PLocationStatus.gpsPosition.latitude = res.position.lat; // 纬度，浮点数，范围为90 ~ -90
        // PLocationStatus.gpsPosition.longitude = 110.28852; // 经度，浮点数，范围为180 ~ -180。
        // PLocationStatus.gpsPosition.latitude = 25.273695; // 纬度，浮点数，范围为90 ~ -90
        // PLocationStatus.gpsPosition.speed = res.speed; // 速度，以米/每秒计
        PLocationStatus.gpsPosition.accuracy = res.accuracy; // 位置精度
        // $("title").text(res.position.lng + "," + res.position.lat + "," + res.accuracy);
        if (!PLocationStatus.GPSaccuracy.accuracy) {
          PLocationStatus.GPSaccuracy.accuracy = PLocationStatus.gpsPosition.accuracy
        } else if (PLocationStatus.gpsPosition.accuracy>PLocationStatus.GPSaccuracy.accuracy) {
          if (PLocationStatus.GPSaccuracy.count>5){
            PLocationStatus.GPSaccuracy.count = 0;
            PLocationStatus.GPSaccuracy.accuracy = PLocationStatus.gpsPosition.accuracy;
          } else {
            PLocationStatus.GPSaccuracy.count++;
            return false;
          }
        } else {
          PLocationStatus.GPSaccuracy.count = 0;
        }
        if (PLocationStatus.GPSaccuracy.accuracy>90){
          //navigator.geolocation.clearWatch(PLocationStatus.GPSTimer);
          PLocationStatus.GPSTimer = setInterval(getGpsLocation,1000);
          return false;
        }
        if (
          // 1
          (PLocationStatus.gpsPosition.accuracy <= 30 || PLocationStatus.gpsPosition.accuracy <= PLocationStatus.GPSaccuracy) &&
          PLocationStatus.gpsPosition.latitude <= gpscpArry.maxlatitude && PLocationStatus.gpsPosition.latitude >= gpscpArry.minlatitude && PLocationStatus.gpsPosition.longitude <= gpscpArry.maxlongitude && PLocationStatus.gpsPosition.longitude >= gpscpArry.minlongitude
        ) {
            // $("title").text("okgd:" + res.position.lng + "," + res.position.lat + "," + res.accuracy);
            if (!PLocationStatus.posFault) {
                PLocationStatus.posFault = true;
                NNavigation.EnableLocate(true);
                $(".lockScene").show();
                ShowMockBtn();

                if (NNavigation.g_pActiveList.length == 0) {
                    LockScene();
                }
            }

            setgpsLocation(PLocationStatus.gpsPosition);
        } else {
            return false;
        }
      } else {
        PLocationStatus.eqCount++;
        if (PLocationStatus.PLocation&&PLocationStatus.eqCount<5){
          PLocationStatus.StepMock();
        }
      }
    } else {
      console.log(res);
    }
  });
}

/**获取GPS坐标，是否在体育馆范围内判断 */
function RangeInGps() {
  wx.getLocation({
    type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
    success: function (res) {
      if (res.accuracy<=30){
      let g = {
        x: 0.0,
        y: 0.0,
        z: 0.0
      };
      g.x = res.longitude; // 经度，浮点数，范围为180 ~ -180。
      g.y = res.latitude; // 纬度，浮点数，范围为90 ~ -90
      /**画圆心判断 */
      PLocationStatus.CentrePoint = new Vector3(112.52985059057416, 0.0, 37.75731239593483);
      if (Vector3.Distance(g, PLocationStatus.CentrePoint) < 0.001806) {
        PLocationStatus.rangeCount = 0;
        return false;
      } else {
        if (PLocationStatus.rangeCount > 2) {
          return true;
        } else {
          PLocationStatus.rangeCount++;
          return false;
        }
      }
    }}
  });
}
function setgpsLocation(position) {
  if ($("#msgBox").is(":visible")) {
    HideMsg();
    CenterToastShow("已切换室外定位", 1000);
  }
  let rellongitude = 0.0,
    relatitude = 0.0;
  let gpsParam = GLOBAL.GpsConfig.unit;
  rellongitude = -(position.longitude - gpsParam.centX) * gpsParam.unitX;
  relatitude = -(position.latitude - gpsParam.centY) * gpsParam.unitY;
  position.longitude = rellongitude;
  position.latitude = relatitude;
  //FilterGPSPoi(position);
  if (NNavigation.g_pActiveList.length > 0 && GLOBAL.Navigating){
    //$("title").text(PLocationStatus.curEndPath.num+","+PLocationStatus.curEndX+','+PLocationStatus.curEndY);
    if (!PLocationStatus.curEndX&&!PLocationStatus.curEndY||PLocationStatus.curEndPath.num!=NNavigation.g_pActiveList[0].m_nCurPath){
      let Nav;
      ( Nav =  NNavigation.g_pActiveList[0],
        PLocationStatus.curEndPath.num = Nav.m_nCurPath,
        PLocationStatus.curEndPath.status = false,
        PLocationStatus.curEndX = Nav.m_aPath[Nav.m_nCurPath].m_aPath[Nav.m_aPath[Nav.m_nCurPath].m_aPath.length-1].x,
        PLocationStatus.curEndY = Nav.m_aPath[Nav.m_nCurPath].m_aPath[Nav.m_aPath[Nav.m_nCurPath].m_aPath.length-1].z
      );
    } else if (PLocationStatus.curEndPath.num==NNavigation.g_pActiveList[0].m_nCurPath&&!PLocationStatus.curEndPath.status){
      let dt = 60;
      if (NNavigation.g_pActiveList[0].m_nCurPath >= NNavigation.g_pActiveList[0].m_aPath.length - 1) {
        calcDistance(rellongitude, relatitude, 5, dt);
      } else {
        switch (NNavigation.g_pActiveList.length > 0 && NNavigation.g_pActiveList[0].m_aPath[NNavigation.g_pActiveList[0].m_nCurPath].m_pEndPoint.m_mLandmark.Object.TypeName()
        ) {
          case "出入口":
            calcDistance(rellongitude, relatitude, 4,dt/2);
            break;
          case "楼梯":
            calcDistance(rellongitude, relatitude, 1,dt);
            break;
          case "电梯":
            calcDistance(rellongitude, relatitude, 2,dt);
            break;
          case "扶梯":
            calcDistance(rellongitude, relatitude, 3,dt);
            break;
          default:
        }
      }
    }
  }
  NNavigation.UpdateLocation(0, 0, new Vector3(rellongitude, 0.0, relatitude)); //外景的workid与floorid始终为0
  
  PLocationStatus.PLocation = {
    Work: 0,
    Layer: 0,
    Position: new Vector3(rellongitude, 0.0, relatitude)
  };
  GLOBAL.PLocation = PLocationStatus.PLocation;
}
/**监听设备运动状态 */
function addDeviceMotion() {
  if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', handleMotion);
  }
}

/**解除监听设备运动状态 */
function removeDeviceMotion() {
  if (window.DeviceMotionEvent) {
    window.removeEventListener('devicemotion', handleMotion);
  }
}

/**精益求精的圆 */
function clacInitPos(x, y, InitPos) {
  let radius = 15,
    distance = 0.0;
  if (InitPos.z) {
    distance = Math.sqrt((x - InitPos.x) * (x - InitPos.x) + (y - InitPos.z) * (y - InitPos.z));
  } else if (InitPos.y) {
    distance = Math.sqrt((x - InitPos.x) * (x - InitPos.x) + (y - InitPos.y) * (y - InitPos.y));
  } else {
    distance = 0;
  }
  if (distance < radius) {
    return true;
  } else {
    return false;
  }
}

/**模拟步进 */
PLocationStatus.StepMock = function () {
  /**怎么写
   * 最终--》NNavigation.update()
   * 得到两个的坐标值即可、
   * 拿到方向 然后计算 ojbk
   */
  console.log("step mock");
  var difX = 0.0,
    difY = 0.0,
    nAngle = PLocationStatus.yawAngle;
  while (nAngle > 360) {
    nAngle = nAngle - 360;
  }
    /**nnvigation */
    if (NNavigation.g_pActiveList.length>0){
    var Nav = NNavigation.g_pActiveList[0];
    if (PLocationStatus.curWayStart===null){
      PLocationStatus.curWayStart = Nav.m_nWayStart;
      PLocationStatus.mnAngle = Vector3.AngleTo(NNavigation.g_pActiveList[0].m_aPath[Nav.m_nCurPath].m_aPath[Nav.m_nWayEnd],NNavigation.g_pActiveList[0].m_aPath[Nav.m_nCurPath].m_aPath[Nav.m_nWayStart])
    } else if (PLocationStatus.mnAngle===0){
      PLocationStatus.mnAngle = -Vector3.AngleTo(NNavigation.g_pActiveList[0].m_aPath[Nav.m_nCurPath].m_aPath[Nav.m_nWayEnd+1],NNavigation.g_pActiveList[0].m_aPath[Nav.m_nCurPath].m_aPath[Nav.m_nWayEnd])
    }else{
      if (Nav.m_nWayStart!=PLocationStatus.curWayStart){
       PLocationStatus.mnAngle = -Vector3.AngleTo(NNavigation.g_pActiveList[0].m_aPath[Nav.m_nCurPath].m_aPath[Nav.m_nWayEnd],NNavigation.g_pActiveList[0].m_aPath[Nav.m_nCurPath].m_aPath[Nav.m_nWayStart])
      }
    } 
  } else {
    while (nAngle > 360) {
      nAngle = nAngle - 360;
    }
    PLocationStatus.mnAngle = nAngle*0.017453293;
  }
  // while (nAngle > 360) {
  //   nAngle = nAngle - 360;
  // }
  // difX = Math.sin(0.017453293 * nAngle) * 1.8;
  // difY = Math.cos(0.017453293 * nAngle) * 1.8;
  difX = Math.sin(PLocationStatus.mnAngle) * 2.8;
  difY = Math.cos(PLocationStatus.mnAngle) * 2.8;
  if (!difX){
    difX = 0;
  }
  if (!difY)
    difY=0;

  console.log("position",PLocationStatus.PLocation.Position);
  NNavigation.UpdateLocation(0, 0, new Vector3(PLocationStatus.PLocation.Position.x+difX, 0.0, PLocationStatus.PLocation.Position.z+difY)); //外景的workid与floorid始终为0
  NNavigation.g_pActiveList.length>0&&console.log(NNavigation.g_pActiveList[0].m_nWayStep,"step");
  return new Vector3(PLocationStatus.PLocation.Position.x+difX, 0.0, PLocationStatus.PLocation.Position.z+difY);
};

function correctDis(distance=1) {
  var difX = 0.0,
    difY = 0.0,
    nAngle = PLocationStatus.yawAngle;
  while (nAngle > 360) {
    nAngle = nAngle - 360;
  }
  difX = Math.sin(0.017453293 * nAngle) * distance;
  difY = Math.cos(0.017453293 * nAngle) * distance;
  return {
    difX,
    difY
  };
}

function handleMotion(event) {
  //$("title").text(event.accelerationIncludingGravity.x + "," + event.accelerationIncludingGravity.y + "," + event.accelerationIncludingGravity.z);
  /**进行判断 */
  var sqr = 0;
  sqr = Math.sqrt(event.accelerationIncludingGravity.x * event.accelerationIncludingGravity.x +
    event.accelerationIncludingGravity.y * event.accelerationIncludingGravity.y +
    event.accelerationIncludingGravity.z * event.accelerationIncludingGravity.z);
  if (PLocationStatus.nowLine) { // 当存在初始值时才进行趋势判断
    if (sqr >= PLocationStatus.nowLine) { // 如果获取到的计算后的加速度值 大于 上一个值
      PLocationStatus.orLine.push(1); // 表明趋势增加，记录趋势值为1
      PLocationStatus.nowLine = sqr; // 更新比较值
    } else if (sqr < PLocationStatus.nowLine) { // 如果小于的话
      PLocationStatus.orLine.push(-1); // 表明趋势减少，记录趋势值为-1
      PLocationStatus.nowLine = sqr; // 更新比较值
    }
  } else { // 初始值不存在时，记录当前的数据，并将当前的趋势值记录为0
    PLocationStatus.nowLine = sqr;
    PLocationStatus.orLine.push(0);
  }

  watchPause();
}

/**计步器实际调用情况 */
function watchPause() {
  if (PLocationStatus.orLine.length > 75) {//60次约1秒调用一次
    console.log("***计步器调用***");
    var x = 0, y = 0;
    for (var i = 0; i < PLocationStatus.orLine.length; i++) {
      if (PLocationStatus.orLine[i] == 1) {
        x++;
        y = 0;
        x >= 5 ? (PLocationStatus.step++, PLocationStatus.curStep.status = true) : (PLocationStatus.step = PLocationStatus.step);
      } else if (PLocationStatus.orLine[i] == -1) {
        x = 0;
        y++;
      }
    }
    if (1) {
        PLocationStatus.curStep.count = Math.floor(PLocationStatus.step / 2);
      console.log("计步+1",PLocationStatus.step,PLocationStatus.curStep.count);
      if (PLocationStatus.StepMock)
        PLocationStatus.StepMock();
    } else {
      PLocationStatus.curStep.status = false;
    }
    PLocationStatus.orLine = [];
  }
}

/**将位置点移动到路径上 */
function PosToRoad(x, y) {
  let poi = new Vector3(x, 0.0, y);
  /**先获取最近的两个位置点 */
  let PosArry = [];
  if (PLocationStatus.nearistArr.length > 1) {
    if (Vector3.Distance(poi, PLocationStatus.nearistArr[0].p) > PLocationStatus.nearistArr[0].d) {
      PLocationStatus.nearistArr[0].d = Vector3.Distance(poi, PLocationStatus.nearistArr[0].p);
      PLocationStatus.nearistArr.reverse();
    } else {
      PLocationStatus.nearistArr[0].d = Vector3.Distance(poi, PLocationStatus.nearistArr[0].p);
    }
    if (x <= PLocationStatus.nearistArr[0].p.x || y <= PLocationStatus.nearistArr[0].p.z) {
      PosArry = [PLocationStatus.nearistArr[0].p, PLocationStatus.nearistArr[1].p];
    } else {
      PLocationStatus.nearistArr.pop();
      return poi;
    }
  } else {
    FindNearistPoint2L(poi);
    return poi;
  }
  let A = (PosArry[0].z - PosArry[1].z) / (PosArry[0].x - PosArry[1].x);
  let B = PosArry[0].z - A * PosArry[0].z;
  let m = x + A * y;

  let Rx = m - (A + B) / (A * A + 1);
  let Ry = A * Rx + B;
  console.log("return postoroad", x, y, Rx, Ry);

  return new Vector3(Rx, 0.0, Ry);
}

/**找到最近距离的两个点 */
function FindNearistPoint2L(position) {
  console.log("findNearistPoi", PLocationStatus.nearistArr);
  let first = false;
  for (let pLandmark of NavChartDC.DC.m_pLayerMgr.m_pActiveLayer.m_mLandmarkList) {
    if (PLocationStatus.nearistArr.length < 1) {
      PLocationStatus.nearistArr.push({
        p: pLandmark.m_mPoint.Object.m_mPosition,
        d: Vector3.Distance(pLandmark.m_mPoint.Object.m_mPosition, position)
      });
    } else if (PLocationStatus.nearistArr.length < 2) {
      let dt = Vector3.Distance(pLandmark.m_mPoint.Object.m_mPosition, position);
      if (dt >= PLocationStatus.nearistArr[0].d && pLandmark.m_mPoint.Object.m_mPosition != PLocationStatus.nearistArr[0].p) {
        PLocationStatus.nearistArr.push({
          p: pLandmark.m_mPoint.Object.m_mPosition,
          d: dt
        });
      } else if (pLandmark.m_mPoint.Object.m_mPosition != PLocationStatus.nearistArr[0].p) {
        PLocationStatus.nearistArr.unshift({
          p: pLandmark.m_mPoint.Object.m_mPosition,
          d: dt
        });
      }
    } else {
      if (Vector3.Distance(pLandmark.m_mPoint.Object.m_mPosition, position) < PLocationStatus.nearistArr[0].d) {
        first = true;
        PLocationStatus.nearistArr.pop();
        PLocationStatus.nearistArr.unshift({
          p: pLandmark.m_mPoint.Object.m_mPosition,
          d: Vector3.Distance(pLandmark.m_mPoint.Object.m_mPosition, position)
        });
      }
    }
  }
  if (!first) {
    for (let pLandmark of NavChartDC.DC.m_pLayerMgr.m_pActiveLayer.m_mLandmarkList) {
      if (Vector3.Distance(pLandmark.m_mPoint.Object.m_mPosition, position) < PLocationStatus.nearistArr[1].d && pLandmark.m_mPoint.Object.m_mPosition != PLocationStatus.nearistArr[0].p) {
        PLocationStatus.nearistArr.pop();
        PLocationStatus.nearistArr.push({
          p: pLandmark.m_mPoint.Object.m_mPosition,
          d: Vector3.Distance(pLandmark.m_mPoint.Object.m_mPosition, position)
        });
      }
    }
  }
}

/**对于GPS定位的约束方法 */
function LimitGPS() {

}

/**过滤精度大的值 */
function FilterGPSPoi (positionParam) {
  /**几个点，拿到的第一个精度<=30的为基准数据，之后每个30一下的数据先做相交测试，成功做为基准数据
   * 大于30的做相交计算，拿到相交点，半径为精度值，然后更新基准数据
   * 先这么做
   */
  let mGPSpiont;
  if (!PLocationStatus.PLocation){
    if (positionParam.accuracy<=30){
      PLocationStatus.PLocation = {
        Work:0,
        Layer:0,
        Position:new Vector3(positionParam.longitude,0.0,positionParam.latitude)
      }
      GLOBAL.PLocation = PLocationStatus.PLocation;
      NNavigation.UpdateLocation(0,0,PLocationStatus.PLocation.Position);
    }
    /**如果有一直没得30的情况 遇到了再说吧 */
  }else {
    mGPSpiont = new Vector3(positionParam.longitude,0.0,positionParam.latitude);
    /**小于30时情况 */
    if (positionParam.accuracy<=15){
      let mPointDis = Vector3.Distance(PLocationStatus.PLocation.Position,mGPSpiont);
      if (mPointDis<=10){
        console.log("distance小于15");
        PLocationStatus.PLocation = {
          Work:0,
          Layer:0,
          Position:new Vector3(positionParam.longitude,0.0,positionParam.latitude)
        }
        GLOBAL.PLocation = PLocationStatus.PLocation;
        NNavigation.UpdateLocation(0,0,PLocationStatus.PLocation.Position);
      } else {
        console.log("distance 大于15小于30");
        /**相交后的交点 */
        let cPoint;
        cPoint=CrossPoint(mGPSpiont,positionParam.accuracy);
        if (cPoint) {
          PLocationStatus.PLocation = {
            Work:0,
            Layer:0,
            Position:new Vector3(cPoint.x,0.0,cPoint.z)
          }
          GLOBAL.PLocation = PLocationStatus.PLocation;
          NNavigation.UpdateLocation(0,0,PLocationStatus.PLocation.Position);
        } else {
          let mockPos;
          mockPos=PLocationStatus.StepMock();
          PLocationStatus.PLocation = {
            Work:0,
            Layer:0,
            Position:mockPos
          }
          GLOBAL.PLocation = PLocationStatus.PLocation;
        }
      }
    }
    /**大于30的情况 */
    else {
      let cPoint;
        cPoint=CrossPoint(mGPSpiont,positionParam.accuracy/2);
        if (cPoint) {
          PLocationStatus.PLocation = {
            Work:0,
            Layer:0,
            Position:new Vector3(cPoint.x,0.0,cPoint.z)
          }
          GLOBAL.PLocation = PLocationStatus.PLocation;
          NNavigation.UpdateLocation(0,0,PLocationStatus.PLocation.Position);
        } else {
          PLocationStatus.StepMock();
        }
    }
  }
}

/**两点做相交，PLocation一直为基准点 */
function CrossPoint (Point,acc) {
  let mPointDis = Vector3.Distance(Point,PLocationStatus.PLocation.Position);
  /**先算有没有相交点，没有就count */
  if (mPointDis>acc+15+PLocationStatus.disableCount*10){
    if (PLocationStatus.disableCount>=5){
      let MockPoint;
      MockPoint = PLocationStatus.StepMock();
      return MockPoint;
    }
    PLocationStatus.disableCount++;
    PLocationStatus.StepMock();
    return null;
  }
  /**先得到两个点，然后拿靠近两圆心的中点的那个点 */
  else {
    let C0,C1,C2;
    let x0,x1,x2,y0,y1,y2;
    let pointcX,pointcY,pointdX,pointdY;
    let a,h;
    a = (225-acc*acc+mPointDis*mPointDis)/(2*mPointDis);
    h = Math.sqrt(225-a*a);
    if (isNaN(h))
    h=0;
    x1 = PLocationStatus.PLocation.Position.x;
    x2 = Point.x;
    y1 = PLocationStatus.PLocation.Position.z;
    y2 = Point.z;
    x0 = x1+(a/mPointDis)*(x2-x1);
    y0 = y1+(a/mPointDis)*(y2-y1);
    C0 = new Vector3(x0,0.0,y0);
    pointcX = x0-(h/mPointDis)*(y2-y1);
    pointcY = y0 - (h/mPointDis)*(x2-x1);
    pointdX = x0 + (h/mPointDis)*(y2-y1);
    pointdY = y0 + (h/mPointDis)*(x2-x1);
    C1 = new Vector3(pointcX,0.0,pointcY);
    C2 = new Vector3(pointdX,0.0,pointdY);
    if (Vector3.Distance(C0,C1)<=Vector3.Distance(C0,C1)){
      console.log("c1",C1,x0,y0,a,h,mPointDis);
      return C1;
    } else {
      console.log("C2",C2);
      return C2;
    }
  }
}

/**检测是否还有蓝牙 */
function checkBLE () {
  if (PLocationStatus.IndoorStatus){
    if (new Date().getTime() - PLocationStatus.resfloor.time>2000){
      if (NNavigation.g_pActiveList.length>0){
        if(NNavigation.g_pActiveList[0].m_aPath[NNavigation.g_pActiveList[0].m_aPath.length-1].m_pLayerName=="5F"&&new Date().getTime() - PLocationStatus.resfloor.time>8000){
          PLocationStatus.IndoorStatus = false;
          CenterToastShow("请重新规划室外导航路线",1000);
        }
      }else {
        PLocationStatus.IndoorStatus = false;
      }
    }
    checkBLE();
  }
}

