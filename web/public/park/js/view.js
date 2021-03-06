define("baseData", ["require", "exports", "react", "g2plot", "css!./styles/view.css"], function (require, exports, React, g2plot_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const data = [
        {
            country: '����',
            month: '1��',
            value: 30,
        },
        {
            country: '����',
            month: '2��',
            value: 50,
        },
        {
            country: '����',
            month: '3��',
            value: 80,
        },
        {
            country: '����',
            month: '4��',
            value: 100,
        },
        {
            country: '����',
            month: '5��',
            value: 80,
        },
        {
            country: '����',
            month: '6��',
            value: 50,
        },
        {
            country: '����',
            month: '7��',
            value: 30,
        },
        {
            country: '�ʺ�',
            month: '1��',
            value: 20,
        },
        {
            country: '�ʺ�',
            month: '2��',
            value: 60,
        },
        {
            country: '�ʺ�',
            month: '3��',
            value: 120,
        },
        {
            country: '�ʺ�',
            month: '4��',
            value: 70,
        },
        {
            country: '�ʺ�',
            month: '5��',
            value: 50,
        },
        {
            country: '�ʺ�',
            month: '6��',
            value: 30,
        },
        {
            country: '�ʺ�',
            month: '7��',
            value: 20,
        },
    ];
    class BaseData extends React.Component {
        constructor() {
            super(...arguments);
            this.state = {
                baseData: [{ name: "���������", number: "95,000", unit: "ƽ����", img: "./park/image/baseData/architecture.png" }, { name: "��פ��ҵ", number: "150", unit: "��", img: "./park/image/baseData/enterprise.png" },
                    { name: "԰����Ա", number: "6,000", unit: "��", img: "./park/image/baseData/personnel.png" }, { name: "������", number: "900", unit: "̨", img: "./park/image/baseData/monitoring.png" },
                    { name: "�����豸", number: "2,600", unit: "̨", img: "./park/image/baseData/equipment.png" }, { name: "ͣ��λ", number: "600", unit: "��", img: "./park/image/baseData/car.png" }],
            };
        }
        componentDidMount() {
            const areaPlot = new g2plot_1.StackArea(document.getElementById('curve'), {
                data,
                xField: 'month',
                yField: 'value',
                stackField: 'country',
                xAxis: {
                    grid: {
                        visible: true
                    }
                },
                label: {
                    visible: true
                },
                smooth: true,
                legend: {
                    visible: false,
                    position: 'right-top'
                }
            });
            areaPlot.render();
        }
        render() {
            return (React.createElement("div", { className: "base-data" },
                React.createElement("div", { style: { marginTop: "20px", marginLeft: "25px" } },
                    React.createElement("div", { style: {
                            borderLeft: "2px solid #07D1D3", height: "16px", width: "2px",
                            float: "left", marginTop: "4px", marginRight: "5px"
                        } }),
                    React.createElement("span", { style: { color: "#FFFFFF", fontSize: "16px" } }, "\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\u0373\uFFFD\uFFFD")),
                this.state.baseData.map((item, index) => {
                    return React.createElement("div", { className: "base-option", key: index },
                        React.createElement("img", { src: item.img, width: "45px", height: "45px", style: { float: "left", marginTop: "3px" } }),
                        React.createElement("div", { style: { float: "left", marginLeft: "18px" } },
                            React.createElement("span", { className: "base-span-a" }, item.name),
                            React.createElement("br", null),
                            React.createElement("span", { className: "base-span-b" }, item.number),
                            React.createElement("span", { className: "base-span-c" }, item.unit)));
                }),
                React.createElement("div", { style: { color: "#FFFFFF", marginLeft: "35px" } },
                    React.createElement("div", { style: { fontSize: "12px", float: "left" } }, "\u0530\uFFFD\uFFFD\uFFFD\u00B4\uFFFD\uFFFD\uFFFDGDP"),
                    React.createElement("div", { style: { fontSize: "12px", marginLeft: "10px", float: "left" } }, "(\uFFFD\uFFFD\uFFFD\uFFFD)"),
                    React.createElement("div", { style: {
                            borderTop: "2px solid #07D1D3", width: "10px", height: "3px", float: "left", opacity: 1,
                            marginLeft: "50px", marginTop: "8px"
                        } }),
                    React.createElement("div", { style: { float: "left", fontSize: "6px", marginLeft: "5px" } }, "\uFFFD\uFFFD\u01F0\u05B5"),
                    React.createElement("div", { style: {
                            borderTop: "2px solid #229FCE", width: "10px", height: "3px", float: "left", opacity: 1,
                            marginLeft: "10px", marginTop: "8px"
                        } }),
                    React.createElement("div", { style: { float: "left", fontSize: "6px", marginLeft: "5px" } }, "\uFFFD\uFFFD\u05FC\u05B5")),
                React.createElement("div", { id: "curve", style: { width: "350px", height: "260px", marginLeft: "12px" } })));
        }
    }
    exports.default = BaseData;
});
define("compat", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GlobalAction {
        switchRoom(pName) {
            console.log("SwitchLayer", pName);
        }
        switchMark(pName) {
            console.log("switchMark", pName);
        }
    }
    exports.default = GlobalAction;
});
define("monitorData", ["require", "exports", "react", "g2plot", "css!./styles/view.css"], function (require, exports, React, g2plot_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const data = [
        {
            type: '分类一',
            value: 27,
        },
        {
            type: '分类二',
            value: 25,
        },
        {
            type: '分类三',
            value: 18,
        },
        {
            type: '分类四',
            value: 15,
        },
        {
            type: '分类五',
            value: 10,
        },
        {
            type: '其它',
            value: 10,
        },
    ];
    const brokenLineData = [
        {
            month: '1月',
            value: 30,
        },
        {
            month: '2月',
            value: 50,
        },
        {
            month: '3月',
            value: 80,
        },
        {
            month: '4月',
            value: 100,
        },
        {
            month: '5月',
            value: 80,
        },
        {
            month: '6月',
            value: 50,
        },
        {
            month: '7月',
            value: 30,
        },
        {
            month: '1月',
            value: 20,
        },
        {
            month: '2月',
            value: 60,
        },
        {
            month: '3月',
            value: 120,
        },
        {
            month: '4月',
            value: 70,
        },
        {
            month: '5月',
            value: 50,
        },
        {
            month: '6月',
            value: 30,
        },
        {
            month: '7月',
            value: 20,
        },
    ];
    const htmlcontent = { name: "总量", value: "100 %" };
    class MonitorData extends React.Component {
        constructor() {
            super(...arguments);
            this.state = {
                monitorData: [
                    { name: "房间面积", allTag: "总面积", allNumber: "20,000", usingTag: "已使用", usingNumber: "5,000", remainTag: "剩余", remainNumber: "15,000", unit: "(㎡)" },
                    { name: "功耗统计", allTag: "总功耗", allNumber: "2,600", usingTag: "已使用", usingNumber: "2,000", remainTag: "剩余", remainNumber: "600", unit: "(kw)" },
                    { name: "车位", allTag: "总车位", allNumber: "600", usingTag: "已使用", usingNumber: "300", remainTag: "剩余", remainNumber: "300", unit: "(个)" }
                ],
                infoData: [
                    { name: "今日用水量", number: "200", unit: "吨", img: "./park/image/monitorData/water.png" },
                    { name: "今日用电量", number: "1200", unit: "度", img: "./park/image/monitorData/electricity.png" }
                ]
            };
        }
        componentDidMount() {
            const areaPlot = new g2plot_2.Area(document.getElementById('brokenLine'), {
                forcefit: true,
                padding: [0, 0, 0, 0],
                data: brokenLineData,
                xField: 'month',
                yField: 'value',
                xaxis: {
                    type: 'datetime',
                    tickcount: 5,
                },
            });
            const ringPlot0 = new g2plot_2.Ring(document.getElementById('loop0'), {
                forceFit: true,
                padding: [0, 0, 0, 0],
                data,
                angleField: 'value',
                colorField: 'type',
                label: {
                    visible: false
                },
                legend: {
                    visible: false
                },
                statistic: {
                    visible: true,
                    htmlcontent: htmlcontent,
                    triggeron: '',
                    triggeroff: ''
                }
            });
            const ringPlot1 = new g2plot_2.Ring(document.getElementById('loop0'), {
                forceFit: true,
                padding: [0, 0, 0, 0],
                data,
                angleField: 'value',
                colorField: 'type',
                label: {
                    visible: false
                },
                legend: {
                    visible: false
                },
                statistic: {
                    visible: true,
                    htmlcontent: htmlcontent,
                    triggeron: '',
                    triggeroff: ''
                }
            });
            const ringPlot2 = new g2plot_2.Ring(document.getElementById('loop0'), {
                forceFit: true,
                padding: [0, 0, 0, 0],
                data,
                angleField: 'value',
                colorField: 'type',
                label: {
                    visible: false
                },
                legend: {
                    visible: false
                },
                statistic: {
                    visible: true,
                    htmlcontent: htmlcontent,
                    triggeron: '',
                    triggeroff: ''
                }
            });
            areaPlot.render();
            ringPlot0.render();
            ringPlot1.render();
            ringPlot2.render();
        }
        render() {
            return (React.createElement("div", { className: "monitor-data" },
                React.createElement("div", { style: { marginTop: "20px", marginLeft: "25px" } },
                    React.createElement("div", { style: {
                            borderLeft: "2px solid #07D1D3", height: "16px", width: "2px",
                            float: "left", marginTop: "4px", marginRight: "5px"
                        } }),
                    React.createElement("span", { style: { color: "#FFFFFF", fontSize: "16px" } }, "\u667A\u80FD\u6570\u636E\u76D1\u63A7")),
                this.state.monitorData.map((item, index) => {
                    return React.createElement("div", { style: { width: "80%", height: "120px", marginLeft: "35px", marginTop: "15px" }, key: index },
                        React.createElement("div", { style: { width: "53%", height: "100%", float: "left" } },
                            React.createElement("span", { className: "span-a" }, item.name + item.unit),
                            React.createElement("br", null),
                            React.createElement("div", { style: { width: "70px", height: "50px", float: "left" } },
                                React.createElement("span", { className: "span-b" }, item.allTag + item.unit),
                                React.createElement("br", null),
                                React.createElement("span", { className: "span-c" }, item.allNumber)),
                            React.createElement("div", { style: { width: "70px", height: "50px", float: "right" } },
                                React.createElement("span", { className: "span-b" }, item.usingTag + item.unit),
                                React.createElement("br", null),
                                React.createElement("span", { className: "span-c" }, item.usingNumber)),
                            React.createElement("div", { style: { overflow: "hidden", width: "100%" } },
                                React.createElement("span", { className: "span-b" }, item.remainTag + item.unit),
                                React.createElement("br", null),
                                React.createElement("span", { className: "span-c" }, item.remainNumber))),
                        React.createElement("div", { style: { float: "right", width: "47%", height: "100%", top: "10px" }, id: "loop" + index }));
                }),
                React.createElement("div", { style: { marginTop: "20px", marginLeft: "25px" } },
                    React.createElement("div", { style: {
                            borderLeft: "2px solid #07D1D3", height: "16px", width: "2px",
                            float: "left", marginTop: "4px", marginRight: "5px"
                        } }),
                    React.createElement("span", { style: { color: "#FFFFFF", fontSize: "16px" } }, "\u6C34\u7535\u4FE1\u606F\u7EDF\u8BA1")),
                this.state.infoData.map((item, index) => {
                    return React.createElement("div", { className: index === 0 ? "add-option" : "option", key: index },
                        React.createElement("img", { src: item.img, width: "45px", height: "45px", style: { float: "left", marginTop: "3px" } }),
                        React.createElement("div", { style: { float: "left", marginLeft: "18px" } },
                            React.createElement("span", { className: "span-d" }, item.name),
                            React.createElement("br", null),
                            React.createElement("span", { className: "span-e" }, item.number),
                            React.createElement("span", { className: "span-f" }, item.unit)));
                }),
                React.createElement("div", { id: "container" }),
                React.createElement("div", { id: "brokenLine", style: { width: "300px", height: "120px", overflow: "hidden", marginLeft: "35px" } }),
                React.createElement("div", { className: "electricity-view" },
                    React.createElement("div", { className: "span-g" }, "\u4F01\u4E1A\u4ECA\u65E5\u5E73\u5747\u7528\u6C34\u91CF"),
                    React.createElement("div", { className: "span-h" }, "6")),
                React.createElement("div", { className: "water-view" },
                    React.createElement("div", { className: "span-g" }, "\u4F01\u4E1A\u4ECA\u65E5\u5E73\u5747\u7528\u7535\u91CF"),
                    React.createElement("div", { className: "span-h" }, "2"))));
        }
    }
    exports.default = MonitorData;
});
define("data", ["require", "exports", "react", "baseData", "monitorData", "react-router-dom", "css!./styles/view.css"], function (require, exports, React, baseData_1, monitorData_1, react_router_dom_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Data extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentDidMount() {
        }
        render() {
            return (React.createElement("div", { className: "data" },
                React.createElement("div", { className: "data-top" },
                    React.createElement("div", { className: "data-title", style: { float: "left", marginLeft: "3%", marginTop: "-5px" } }, "\u6842\u6797\u4FE1\u606F\u4EA7\u4E1A\u56ED\u6570\u636E\u5206\u6790"),
                    React.createElement(react_router_dom_1.Link, { to: "/" },
                        React.createElement("div", { style: { float: "right", marginRight: "15px", color: "#FFFFFF" } },
                            React.createElement(Industry, null))),
                    React.createElement("div", { style: { border: "1px solid #A1D4CF", float: "right", height: "10px", marginTop: "50px", marginRight: "12px" } }),
                    React.createElement("div", { style: { fontSize: "15px", color: "#FFFFFF", float: "right", marginRight: "12px" } }, "12:10:20"),
                    React.createElement("div", { style: { border: "1px solid #A1D4CF", float: "right", height: "10px", marginTop: "50px", marginRight: "12px" } }),
                    React.createElement("div", { style: { color: "#FFFFFF", fontSize: "15px", float: "right", marginRight: "12px" } }, "20 \u00B0C"),
                    React.createElement("div", { style: { float: "right", marginRight: "3px" } },
                        React.createElement(Sun, null))),
                React.createElement("div", { className: "base-data" },
                    React.createElement(baseData_1.default, null)),
                React.createElement("div", { className: "monitor-data" },
                    React.createElement(monitorData_1.default, null))));
        }
    }
    const Sun = () => React.createElement("svg", { className: "icon", "aria-hidden": "true" },
        React.createElement("use", { xlinkHref: "#iconyinzhuanqing" }));
    const Industry = () => React.createElement("svg", { className: "icon", "aria-hidden": "true" },
        React.createElement("use", { xlinkHref: "#iconhangye" }));
    exports.default = Data;
});
define("topNav", ["require", "exports", "react", "compat", "css!./styles/view.css"], function (require, exports, React, compat_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TopNav extends React.Component {
        constructor(props) {
            super(props);
            this.globalAction = new compat_1.default();
            this.state = {};
            TopNav.getValuefromChild = this.getValuefromChild.bind(this);
        }
        componentDidMount() { }
        static getValuefromChild(a) { }
        getValuefromChild(a) {
            console.log("topnav", a);
        }
        ;
        switchMark(a) {
            this.globalAction.switchMark(a);
        }
        render() {
            return (React.createElement("div", { className: "topNav" },
                React.createElement("div", { className: "topLogo" },
                    React.createElement("img", { src: "./park/image/logo.png" })),
                React.createElement("div", { className: "topM" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.switchMark.bind(this, "首页") }, "\u8C03\u75283d\u65B9\u6CD5"),
                        React.createElement("li", { onClick: this.switchMark.bind(this, "园区") }, "\u56ED\u533A"),
                        React.createElement("li", { onClick: this.switchMark.bind(this, "土地") }, "\u571F\u5730"),
                        React.createElement("li", { onClick: this.switchMark.bind(this, "厂房") }, "\u5382\u623F"),
                        React.createElement("li", { onClick: this.switchMark.bind(this, "写字楼") }, "\u5199\u5B57\u697C"),
                        React.createElement("li", { onClick: this.switchMark.bind(this, "商业") }, "\u5546\u4E1A"),
                        React.createElement("li", null,
                            "\u5176\u4ED6",
                            React.createElement("span", { className: "iconfont", style: { "fontSize": "10px" } }, "\uE804")))),
                React.createElement("div", { className: "topRight" },
                    React.createElement("span", { style: { "marginRight": "5px" } }, "\u6D59\u6C5F\u6C38\u62D3\u4FE1\u606F\u79D1\u6280"),
                    React.createElement("span", null, "\u767B\u5F55 "),
                    " | ",
                    React.createElement("span", null, " \u6CE8\u518C")),
                React.createElement("div", { className: "bottomNav" })));
        }
    }
    exports.default = TopNav;
});
define("dataService", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DataServices {
        callback(a, pBack) {
            console.log("callback1", a);
            pBack("callback");
        }
        areaType(pBackajax) {
            console.log("init-AllareaType");
            pBackajax(3333);
        }
        companyType(pBackajax) {
            console.log("init-companyType");
            pBackajax(4444);
        }
        getRoomdata(pBackajax) {
            console.log("initRoomdata");
            pBackajax(111);
        }
        getCompanydata(pBackajax) {
            console.log("initCompanydata");
            pBackajax(2222);
        }
    }
    exports.default = DataServices;
});
define("leftNav", ["require", "exports", "react", "compat", "dataService", "antd", "css!./styles/view.css"], function (require, exports, React, compat_2, dataService_1, antd_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const { TreeNode } = antd_1.Tree;
    class IntroduceArea extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            return (React.createElement("div", { className: "introduceContent" },
                React.createElement("p", { className: "intrTit" }, "\u6842\u6797\u5E02\u4FE1\u606F\u4EA7\u4E1A\u56ED"),
                React.createElement("div", { className: "contentOne" },
                    React.createElement("p", { className: "rowOne" },
                        React.createElement("span", { className: "rowOnetit" },
                            React.createElement("span", { className: "iconfont", style: { "color": "#D50000", "fontSize": "20px", "paddingRight": "4px" } }, "\uE80D"),
                            "\u56ED\u533A\u6982\u51B5")),
                    React.createElement("div", { className: "pContent" },
                        React.createElement("p", null, "\u6842\u6797\u56FD\u5BB6\u9AD8\u65B0\u533A\u521B\u610F\u4EA7\u4E1A\u56ED\u662F\u6842\u6797\u5E02\u5EFA\u8BBE\u6587\u5316\u521B\u610F\u4EA7\u4E1A\u3001\u8F6F\u4EF6\u3001\u52A8\u6F2B\u3001\u8BBE\u8BA1\u7684\u91CD\u8981\u652F\u6491\u9879\u76EE\uFF0C\u603B\u6295\u8D442.5\u4EBF\u5143\uFF0C\u7528\u5730117\u4EA9\uFF0C\u5EFA\u8BBE12.5\u4E07\u5E73\u65B9\u7C73\u7684\u8F6F\u4EF6\u4EA7\u4E1A\u529F\u80FD\u533A\uFF0C\u5305\u62EC\u8F6F\u4EF6\u5916\u5305\u3001\u8F6F\u4EF6\u7814\u53D1\u548C\u751F\u4EA7\u3001\u8F6F\u4EF6\u6D4B\u8BD5\u3001\u8F6F\u4EF6\u4EA7\u54C1\u5C55\u793A\u548C\u8425\u9500\u3001\u8F6F\u4EF6\u4EBA\u624D\u57F9\u8BAD\u4EE5\u53CA\u52A8\u6F2B\u7B56\u5212\u3001\u5236\u4F5C\u3001\u5EFA\u7B51\u8BBE\u8BA1\u3001\u5DE5\u4E1A\u8BBE\u8BA1\u3001\u73AF\u5883\u8BBE\u8BA1\u7B49\u8F6F\u4EF6\u3001\u52A8\u6F2B\u3001\u8BBE\u8BA1\u4E09\u5927\u529F\u80FD\u533A\u3002\u6842\u6797\u56FD\u5BB6\u9AD8\u65B0\u533A\u521B\u610F\u4EA7\u4E1A\u56ED\u6574\u4F53\u5EFA\u6210\u540E\uFF0C\u9884\u8BA1\u5E74\u4EA7\u503C20\u4EBF\u5143\uFF0C\u5229\u7A0E1.5\u4EBF\u5143\uFF0C\u65B0\u589E\u5C31\u4E1A\u5C97\u4F4D6000\u4E2A\uFF0C\u5C06\u6210\u4E3A\u5728\u5E7F\u897F\u533A\u5185\u5177\u6709\u8F83\u5927\u5F71\u54CD\u529B\u7684\u542B\u8F6F\u4EF6\u3001\u52A8\u6F2B\u3001\u8BBE\u8BA1\u7684\u521B\u610F\u4EA7\u4E1A\u57FA\u5730\uFF0C\u5168\u9762\u63A8\u52A8\u672C\u5730\u7535\u5B50\u4FE1\u606F\u4EA7\u4E1A\u548C\u521B\u610F\u4EA7\u4E1A\u7684\u8054\u52A8\u53D1\u5C55\uFF0C\u4FC3\u8FDB\u6842\u6797\u5E02\u5DE5\u4E1A\u7ED3\u6784\u5347\u7EA7\u3002\u5BF9\u7B26\u5408\u6761\u4EF6\u7684\u5165\u9A7B\u4F01\u4E1A\uFF0C\u9664\u4EAB\u53D7\u56FD\u5BB6\u548C\u300A\u6842\u6797\u56FD\u5BB6\u9AD8\u65B0\u533A\u5173\u4E8E\u52A0\u5FEB\u63A8\u8FDB\u521B\u610F\u4EA7\u4E1A\u53D1\u5C55\u7684\u82E5\u5E72\u63AA\u65BD\u300B\u4E2D\u7684\u653F\u7B56\u5916\uFF0C\u8FD8\u53EF\u4EAB\u53D7\u7A0E\u6536\u548C\u573A\u79DF\u7B49\u4F18\u60E0\u653F\u7B56\u3002"),
                        React.createElement("p", null, "\u6842\u6797\u56FD\u5BB6\u9AD8\u65B0\u533A\u521B\u610F\u4EA7\u4E1A\u56ED\u662F\u6842\u6797\u5E02\u5EFA\u8BBE\u6587\u5316\u521B\u610F\u4EA7\u4E1A\u3001\u8F6F\u4EF6\u3001\u52A8\u6F2B\u3001\u8BBE\u8BA1\u7684\u91CD\u8981\u652F\u6491\u9879\u76EE\uFF0C\u603B\u6295\u8D442.5\u4EBF\u5143\uFF0C\u7528\u5730117\u4EA9\uFF0C\u5EFA\u8BBE12.5\u4E07\u5E73\u65B9\u7C73\u7684\u8F6F\u4EF6\u4EA7\u4E1A\u529F\u80FD\u533A\uFF0C\u5305\u62EC\u8F6F\u4EF6\u5916\u5305\u3001\u8F6F\u4EF6\u7814\u53D1\u548C\u751F\u4EA7\u3001\u8F6F\u4EF6\u6D4B\u8BD5\u3001\u8F6F\u4EF6\u4EA7\u54C1\u5C55\u793A\u548C\u8425\u9500\u3001\u8F6F\u4EF6\u4EBA\u624D\u57F9\u8BAD\u4EE5\u53CA\u52A8\u6F2B\u7B56\u5212\u3001\u5236\u4F5C\u3001\u5EFA\u7B51\u8BBE\u8BA1\u3001\u5DE5\u4E1A\u8BBE\u8BA1\u3001\u73AF\u5883\u8BBE\u8BA1\u7B49\u8F6F\u4EF6\u3001\u52A8\u6F2B\u3001\u8BBE\u8BA1\u4E09\u5927\u529F\u80FD\u533A\u3002\u6842\u6797\u56FD\u5BB6\u9AD8\u65B0\u533A\u521B\u610F\u4EA7\u4E1A\u56ED\u6574\u4F53\u5EFA\u6210\u540E\uFF0C\u9884\u8BA1\u5E74\u4EA7\u503C20\u4EBF\u5143\uFF0C\u5229\u7A0E1.5\u4EBF\u5143\uFF0C\u65B0\u589E\u5C31\u4E1A\u5C97\u4F4D6000\u4E2A\uFF0C\u5C06\u6210\u4E3A\u5728\u5E7F\u897F\u533A\u5185\u5177\u6709\u8F83\u5927\u5F71\u54CD\u529B\u7684\u542B\u8F6F\u4EF6\u3001\u52A8\u6F2B\u3001\u8BBE\u8BA1\u7684\u521B\u610F\u4EA7\u4E1A\u57FA\u5730\uFF0C\u5168\u9762\u63A8\u52A8\u672C\u5730\u7535\u5B50\u4FE1\u606F\u4EA7\u4E1A\u548C\u521B\u610F\u4EA7\u4E1A\u7684\u8054\u52A8\u53D1\u5C55\uFF0C\u4FC3\u8FDB\u6842\u6797\u5E02\u5DE5\u4E1A\u7ED3\u6784\u5347\u7EA7\u3002\u5BF9\u7B26\u5408\u6761\u4EF6\u7684\u5165\u9A7B\u4F01\u4E1A\uFF0C\u9664\u4EAB\u53D7\u56FD\u5BB6\u548C\u300A\u6842\u6797\u56FD\u5BB6\u9AD8\u65B0\u533A\u5173\u4E8E\u52A0\u5FEB\u63A8\u8FDB\u521B\u610F\u4EA7\u4E1A\u53D1\u5C55\u7684\u82E5\u5E72\u63AA\u65BD\u300B\u4E2D\u7684\u653F\u7B56\u5916\uFF0C\u8FD8\u53EF\u4EAB\u53D7\u7A0E\u6536\u548C\u573A\u79DF\u7B49\u4F18\u60E0\u653F\u7B56\u3002"))),
                React.createElement("div", { className: "contentTwo" },
                    React.createElement("p", { className: "rowOne" },
                        React.createElement("span", { className: "rowOnetit" },
                            React.createElement("span", { className: "iconfont", style: { "color": "#D50000", "fontSize": "20px", "paddingRight": "4px" } }, "\uE80D"),
                            "\u56ED\u533A\u98CE\u91C7")),
                    React.createElement("p", { className: "imgBox" },
                        React.createElement("img", { src: "./park/image/imgone1.png", style: { "padding": "0px 13px 0px 0px" } }),
                        React.createElement("img", { src: "./park/image/imgone2.png", style: { "padding": "0px 13px 0px 13px" } }),
                        React.createElement("img", { src: "./park/image/imgone3.png", style: { "padding": "0px 13px 0px 13px" } }),
                        React.createElement("img", { src: "./park/image/imgone4.png", style: { "padding": "0px 0px 0px 13px" } })))));
        }
    }
    class SuperiorityArea extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            return (React.createElement("div", { className: "introduceContent" },
                React.createElement("p", { className: "intrTit" }, "\u6842\u6797\u5E02\u4FE1\u606F\u4EA7\u4E1A\u56ED"),
                React.createElement("div", { className: "contentOne" },
                    React.createElement("p", { className: "rowOne" },
                        React.createElement("span", { className: "rowOnetit" },
                            React.createElement("span", { className: "iconfont", style: { "color": "#D50000", "fontSize": "20px", "paddingRight": "4px" } }, "\uE80D"),
                            "\u533A\u4F4D\u4F18\u52BF")),
                    React.createElement("div", { className: "pContent" },
                        React.createElement("p", null, "\u6842\u6797\u56FD\u5BB6\u9AD8\u65B0\u533A\u521B\u610F\u4EA7\u4E1A\u56ED\u662F\u6842\u6797\u5E02\u5EFA\u8BBE\u6587\u5316\u521B\u610F\u4EA7\u4E1A\u3001\u8F6F\u4EF6\u3001\u52A8\u6F2B\u3001\u8BBE\u8BA1\u7684\u91CD\u8981\u652F\u6491\u9879\u76EE\uFF0C\u603B\u6295\u8D442.5\u4EBF\u5143\uFF0C\u7528\u5730117\u4EA9\uFF0C\u5EFA\u8BBE12.5\u4E07\u5E73\u65B9\u7C73\u7684\u8F6F\u4EF6\u4EA7\u4E1A\u529F\u80FD\u533A\uFF0C\u5305\u62EC\u8F6F\u4EF6\u5916\u5305\u3001\u8F6F\u4EF6\u7814\u53D1\u548C\u751F\u4EA7\u3001\u8F6F\u4EF6\u6D4B\u8BD5\u3001\u8F6F\u4EF6\u4EA7\u54C1\u5C55\u793A\u548C\u8425\u9500\u3001\u8F6F\u4EF6\u4EBA\u624D\u57F9\u8BAD\u4EE5\u53CA\u52A8\u6F2B\u7B56\u5212\u3001\u5236\u4F5C\u3001\u5EFA\u7B51\u8BBE\u8BA1\u3001\u5DE5\u4E1A\u8BBE\u8BA1\u3001\u73AF\u5883\u8BBE\u8BA1\u7B49\u8F6F\u4EF6\u3001\u52A8\u6F2B\u3001\u8BBE\u8BA1\u4E09\u5927\u529F\u80FD\u533A\u3002\u6842\u6797\u56FD\u5BB6\u9AD8\u65B0\u533A\u521B\u610F\u4EA7\u4E1A\u56ED\u6574\u4F53\u5EFA\u6210\u540E\uFF0C\u9884\u8BA1\u5E74\u4EA7\u503C20\u4EBF\u5143\uFF0C\u5229\u7A0E1.5\u4EBF\u5143\uFF0C\u65B0\u589E\u5C31\u4E1A\u5C97\u4F4D6000\u4E2A\uFF0C\u5C06\u6210\u4E3A\u5728\u5E7F\u897F\u533A\u5185\u5177\u6709\u8F83\u5927\u5F71\u54CD\u529B\u7684\u542B\u8F6F\u4EF6\u3001\u52A8\u6F2B\u3001\u8BBE\u8BA1\u7684\u521B\u610F\u4EA7\u4E1A\u57FA\u5730\uFF0C\u5168\u9762\u63A8\u52A8\u672C\u5730\u7535\u5B50\u4FE1\u606F\u4EA7\u4E1A\u548C\u521B\u610F\u4EA7\u4E1A\u7684\u8054\u52A8\u53D1\u5C55\uFF0C\u4FC3\u8FDB\u6842\u6797\u5E02\u5DE5\u4E1A\u7ED3\u6784\u5347\u7EA7\u3002\u5BF9\u7B26\u5408\u6761\u4EF6\u7684\u5165\u9A7B\u4F01\u4E1A\uFF0C\u9664\u4EAB\u53D7\u56FD\u5BB6\u548C\u300A\u6842\u6797\u56FD\u5BB6\u9AD8\u65B0\u533A\u5173\u4E8E\u52A0\u5FEB\u63A8\u8FDB\u521B\u610F\u4EA7\u4E1A\u53D1\u5C55\u7684\u82E5\u5E72\u63AA\u65BD\u300B\u4E2D\u7684\u653F\u7B56\u5916\uFF0C\u8FD8\u53EF\u4EAB\u53D7\u7A0E\u6536\u548C\u573A\u79DF\u7B49\u4F18\u60E0\u653F\u7B56\u3002"),
                        React.createElement("p", null, "\u6842\u6797\u56FD\u5BB6\u9AD8\u65B0\u533A\u521B\u610F\u4EA7\u4E1A\u56ED\u662F\u6842\u6797\u5E02\u5EFA\u8BBE\u6587\u5316\u521B\u610F\u4EA7\u4E1A\u3001\u8F6F\u4EF6\u3001\u52A8\u6F2B\u3001\u8BBE\u8BA1\u7684\u91CD\u8981\u652F\u6491\u9879\u76EE\uFF0C\u603B\u6295\u8D442.5\u4EBF\u5143\uFF0C\u7528\u5730117\u4EA9\uFF0C\u5EFA\u8BBE12.5\u4E07\u5E73\u65B9\u7C73\u7684\u8F6F\u4EF6\u4EA7\u4E1A\u529F\u80FD\u533A\uFF0C\u5305\u62EC\u8F6F\u4EF6\u5916\u5305\u3001\u8F6F\u4EF6\u7814\u53D1\u548C\u751F\u4EA7\u3001\u8F6F\u4EF6\u6D4B\u8BD5\u3001\u8F6F\u4EF6\u4EA7\u54C1\u5C55\u793A\u548C\u8425\u9500\u3001\u8F6F\u4EF6\u4EBA\u624D\u57F9\u8BAD\u4EE5\u53CA\u52A8\u6F2B\u7B56\u5212\u3001\u5236\u4F5C\u3001\u5EFA\u7B51\u8BBE\u8BA1\u3001\u5DE5\u4E1A\u8BBE\u8BA1\u3001\u73AF\u5883\u8BBE\u8BA1\u7B49\u8F6F\u4EF6\u3001\u52A8\u6F2B\u3001\u8BBE\u8BA1\u4E09\u5927\u529F\u80FD\u533A\u3002\u6842\u6797\u56FD\u5BB6\u9AD8\u65B0\u533A\u521B\u610F\u4EA7\u4E1A\u56ED\u6574\u4F53\u5EFA\u6210\u540E\uFF0C\u9884\u8BA1\u5E74\u4EA7\u503C20\u4EBF\u5143\uFF0C\u5229\u7A0E1.5\u4EBF\u5143\uFF0C\u65B0\u589E\u5C31\u4E1A\u5C97\u4F4D6000\u4E2A\uFF0C\u5C06\u6210\u4E3A\u5728\u5E7F\u897F\u533A\u5185\u5177\u6709\u8F83\u5927\u5F71\u54CD\u529B\u7684\u542B\u8F6F\u4EF6\u3001\u52A8\u6F2B\u3001\u8BBE\u8BA1\u7684\u521B\u610F\u4EA7\u4E1A\u57FA\u5730\uFF0C\u5168\u9762\u63A8\u52A8\u672C\u5730\u7535\u5B50\u4FE1\u606F\u4EA7\u4E1A\u548C\u521B\u610F\u4EA7\u4E1A\u7684\u8054\u52A8\u53D1\u5C55\uFF0C\u4FC3\u8FDB\u6842\u6797\u5E02\u5DE5\u4E1A\u7ED3\u6784\u5347\u7EA7\u3002\u5BF9\u7B26\u5408\u6761\u4EF6\u7684\u5165\u9A7B\u4F01\u4E1A\uFF0C\u9664\u4EAB\u53D7\u56FD\u5BB6\u548C\u300A\u6842\u6797\u56FD\u5BB6\u9AD8\u65B0\u533A\u5173\u4E8E\u52A0\u5FEB\u63A8\u8FDB\u521B\u610F\u4EA7\u4E1A\u53D1\u5C55\u7684\u82E5\u5E72\u63AA\u65BD\u300B\u4E2D\u7684\u653F\u7B56\u5916\uFF0C\u8FD8\u53EF\u4EAB\u53D7\u7A0E\u6536\u548C\u573A\u79DF\u7B49\u4F18\u60E0\u653F\u7B56\u3002")),
                    React.createElement("p", null,
                        React.createElement("img", { src: "./park/image/imgmap1.png", style: { "paddingTop": "13px" } })))));
        }
    }
    class BusinessArea extends React.Component {
        constructor(props) {
            super(props);
            this.dataService = new dataService_1.default();
            this.state = {
                id: null,
                roomList: [
                    {
                        "roomID": "id-A座-4F-B411",
                        "roomName": "A座-4F-B411",
                        "roomArea": "51",
                        "addTime": "2019-7-11",
                    },
                    {
                        "roomID": "id-A座-4F-B412",
                        "roomName": "A座-4F-B412",
                        "roomArea": "52",
                        "addTime": "2019-7-15",
                    },
                ],
            };
            this.getRoom = this.getRoom.bind(this);
            BusinessArea.updateList = this.updateList.bind(this);
        }
        ;
        componentDidMount() {
            this.dataService.areaType(this.initAreatype);
            this.dataService.getRoomdata(this.initRoomdata);
        }
        getRoom(event) {
            const id = event.target.getAttribute("data-id");
            this.setState({
                id: id
            });
            console.log("getRoom", this.state);
            compat_2.default.prototype.switchRoom(id);
        }
        static updateList(data) { }
        updateList(data) {
            this.setState({
                roomList: data.roomList
            });
            console.log('outRoomdata', this.state.id);
        }
        initRoomdata(data) {
            console.log("callback-Roomdata", data);
        }
        initAreatype(data) {
            console.log("callback-areatype", data);
        }
        render() {
            return (React.createElement("div", null,
                React.createElement("div", { className: "areaScope" },
                    React.createElement("p", { className: "areaScopeP" }, "\u7B5B\u9009\uFF08\u9762\u79EF\uFF09"),
                    React.createElement("ul", null,
                        React.createElement("li", null, "\u5168\u90E8"),
                        React.createElement("li", null, "100m\u4EE5\u4E0B"),
                        React.createElement("li", null, "100-200m"),
                        React.createElement("li", null, "200-300m"),
                        React.createElement("li", null, "300-500m"),
                        React.createElement("li", null, "500-1000m"),
                        React.createElement("li", null, "1000-2000m"),
                        React.createElement("li", null, "2000m\u4EE5\u4E0B"))),
                React.createElement("div", { className: "roomList" },
                    React.createElement("ul", null, this.state.roomList.map((i, index) => {
                        return (React.createElement("li", { className: "roomP" },
                            React.createElement("p", { onClick: this.getRoom, "data-id": i.roomID }, i.roomName),
                            React.createElement("p", { onClick: this.getRoom, "data-id": i.roomID },
                                React.createElement("span", { className: "icontop3" },
                                    React.createElement("span", { className: "iconfont" }, "\uE805")),
                                "\u00A0 \u623F\u95F4\u9762\u79EF\uFF1A",
                                React.createElement("span", { onClick: this.getRoom, "data-id": i.roomID },
                                    i.roomArea,
                                    " m\u00B2")),
                            React.createElement("p", { onClick: this.getRoom, "data-id": i.roomID },
                                React.createElement("span", { className: "icontop3" },
                                    React.createElement("span", { className: "iconfont" }, "\uE806")),
                                "\u00A0 \u53D1\u5E03\u65F6\u95F4\uFF1A",
                                React.createElement("span", null,
                                    i.addTime,
                                    " "))));
                    })))));
        }
        ;
    }
    class CompanyArea extends React.Component {
        constructor(props) {
            super(props);
            this.dataService = new dataService_1.default();
            this.state = {
                id: null,
                companyTypes: [
                    {
                        "typeName": "文化创意",
                        "typeID": "1",
                    },
                    {
                        "typeName": "金融保险",
                        "typeID": "2",
                    },
                    {
                        "typeName": "科技服务",
                        "typeID": "3",
                    },
                    {
                        "typeName": "高新技术",
                        "typeID": "4",
                    },
                    {
                        "typeName": "电子产业",
                        "typeID": "5",
                    },
                    {
                        "typeName": "电子商务",
                        "typeID": "6",
                    }
                ],
                companyList: [
                    {
                        "companyID": "id-浙江永拓信息科技有限公司",
                        "companyName": "浙江永拓信息科技有限公司",
                        "address": "E座B区-3F-301",
                        "type": "科技服务"
                    },
                    {
                        "companyID": "id-桂林银行",
                        "companyName": "桂林银行",
                        "address": "A座A区-1F-101",
                        "type": "金融保险"
                    },
                ],
            };
            this.getCompany = this.getCompany.bind(this);
            CompanyArea.updateList = this.updateList.bind(this);
        }
        ;
        componentDidMount() {
            this.dataService.companyType(this.initCompanytype);
            this.dataService.getCompanydata(this.initCompanydata);
        }
        getCompany(event) {
            const id = event.target.getAttribute("data-id");
            console.log('getCompany', id);
            compat_2.default.prototype.switchRoom(id);
        }
        static updateList(data) { }
        updateList(data) {
            this.setState({
                companyList: data.companyList
            });
            console.log('outRoomdata2', this.state.id);
        }
        initCompanytype(data) {
            console.log("callback-companyType", data);
        }
        initCompanydata(data) {
            console.log("callback-Companydata", data);
        }
        render() {
            return (React.createElement("div", null,
                React.createElement("div", { className: "areaScopeqy" },
                    React.createElement("p", { className: "areaScopeP" }, "\u4F01\u4E1A\u5206\u7C7B"),
                    React.createElement("ul", null,
                        React.createElement("li", null, "\u5168\u90E8"),
                        this.state.companyTypes.map((i, index) => {
                            return (React.createElement("li", null, i.typeName));
                        }))),
                React.createElement("div", { className: "roomList" },
                    React.createElement("ul", null, this.state.companyList.map((i, index) => {
                        return (React.createElement("li", { className: "roomP" },
                            React.createElement("p", { onClick: this.getCompany, "data-id": i.companyID }, i.companyName),
                            React.createElement("p", { onClick: this.getCompany, "data-id": i.companyID },
                                React.createElement("span", { className: "icontop3" },
                                    React.createElement("span", { className: "iconfont" }, "\uE807")),
                                "\u00A0\u516C\u53F8\u4F4D\u7F6E\uFF1A",
                                React.createElement("span", { onClick: this.getCompany, "data-id": i.companyID }, i.address)),
                            React.createElement("p", { onClick: this.getCompany, "data-id": i.companyID },
                                React.createElement("span", { className: "icontop3" },
                                    React.createElement("span", { className: "iconfont" }, "\uE808")),
                                "\u00A0\u6240\u5C5E\u884C\u4E1A\uFF1A",
                                React.createElement("span", null, i.type))));
                    })))));
        }
    }
    class TreeArea extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                treeData: {
                    equipmentList: [
                        {
                            "equipmentType": "IDC可视化监控系统",
                            "equipmentID": "1",
                            "buildList": [
                                {
                                    "buildname": "A座",
                                    "areaList": [
                                        {
                                            "areaName": "A区",
                                            "floorList": [
                                                {
                                                    "floorName": "A-1F",
                                                    "equipments": [
                                                        { "equipmentName": "机房1-A组列头柜" },
                                                        { "equipmentName": "机房1-B组列头柜" },
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "areaName": "B区",
                                            "floorList": [
                                                {
                                                    "floorName": "B-1F",
                                                    "equipments": [
                                                        { "equipmentName": "机房1-A组列头柜" },
                                                        { "equipmentName": "机房1-B组列头柜" },
                                                    ]
                                                }
                                            ]
                                        },
                                    ]
                                }
                            ]
                        }
                    ],
                }
            };
            TreeArea.setTreedata = this.setTreedata.bind(this);
        }
        ;
        componentDidMount() {
        }
        static setTreedata(data) { }
        setTreedata(data) {
            console.log("setTreedata2", data);
            this.setState({
                treeData: data
            });
            console.log("this2", this.state.treeData);
        }
        onSelect(selectedKeys, info) {
            console.log('selected', selectedKeys[0]);
        }
        ;
        onExpand() {
            console.log('Trigger Expand');
        }
        ;
        render() {
            return (React.createElement("div", null,
                React.createElement("div", { className: "treenode" },
                    React.createElement(antd_1.Tree, { showLine: true, switcherIcon: React.createElement(antd_1.Icon, { type: "down" }), defaultExpandedKeys: ['0-0-0'], onSelect: this.onSelect }, this.state.treeData.equipmentList.map((i, index) => {
                        return (React.createElement(TreeNode, { title: i.equipmentType, key: i.equipmentType }, i.buildList.map((it, index) => {
                            return (React.createElement(TreeNode, { title: it.buildname, key: it.buildname }, it.areaList.map((ite, index) => {
                                return (React.createElement(TreeNode, { title: ite.areaName, key: ite.areaName }, ite.floorList.map((ites, index) => {
                                    return (React.createElement(TreeNode, { title: ites.floorName, key: ites.floorName }, ites.equipments.map((iteg, index) => {
                                        return (React.createElement(TreeNode, { title: iteg.equipmentName, key: iteg.equipmentName }));
                                    })));
                                })));
                            })));
                        })));
                    })))));
        }
    }
    class ListArea extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                index: 99,
                show: null,
                introduce: false,
                superiority: false,
                listArea: false,
                showBusiness: false,
                showCompany: false,
                treeList: false,
                treeData: [],
            };
            ListArea.showList = this.showList.bind(this);
        }
        componentDidupdate() {
        }
        componentDidMount() {
            console.log("xxsssxxx", this.state);
        }
        static showList(data) { }
        showList(index) {
            console.log('showList-List', index);
            if (index == 1) {
                this.setState({
                    show: "one",
                    introduce: true,
                    superiority: false,
                    listArea: false,
                    showBusiness: true,
                    showCompany: false,
                    treeList: false,
                });
            }
            else if (index == 2) {
                this.setState({
                    show: "two",
                    introduce: false,
                    superiority: true,
                    listArea: false,
                    showBusiness: true,
                    showCompany: false,
                    treeList: false,
                });
            }
            else if (index == 3) {
                this.setState({
                    show: "three",
                    introduce: false,
                    superiority: false,
                    listArea: true,
                    showBusiness: true,
                    showCompany: false,
                    treeList: false,
                });
            }
            else if (index == 4) {
                this.setState({
                    show: "four",
                    introduce: false,
                    superiority: false,
                    listArea: true,
                    showBusiness: false,
                    showCompany: true,
                    treeList: false,
                });
            }
            else if (index == 10) {
                this.setState({
                    show: "ten",
                    introduce: false,
                    superiority: false,
                    listArea: false,
                    showBusiness: false,
                    showCompany: false,
                    treeList: true,
                });
            }
            else {
                this.setState({
                    show: "no ",
                    introduce: false,
                    superiority: false,
                    listArea: false,
                    treeList: false,
                });
            }
        }
        clickFun(a) {
            this.setState({
                index: 99,
                introduce: false,
                superiority: false,
                listArea: false,
                treeList: false,
            });
            LeftNav.indexCh(99);
        }
        render() {
            return (React.createElement("div", null,
                React.createElement("div", { className: this.state.introduce == true ? "introduce" : "hide" },
                    React.createElement("div", { className: "topTit" },
                        React.createElement("img", { src: "./park/image/banner1.png", className: "banner1" }),
                        React.createElement("div", { className: "topSpan" },
                            React.createElement("p", { className: "introduceBG" }),
                            React.createElement("span", { className: "topTTW" }, "\u56ED\u533A\u4ECB\u7ECD"),
                            React.createElement("span", { className: "introduceClose", onClick: this.clickFun.bind(this, this.state.index) },
                                React.createElement("span", { className: "iconfont", style: { "fontSize": "12px" } }, "\uE803")))),
                    React.createElement(IntroduceArea, null)),
                React.createElement("div", { className: this.state.superiority == true ? "introduce" : "hide" },
                    React.createElement("div", { className: "topTit" },
                        React.createElement("img", { src: "./park/image/banner1.png", className: "banner1" }),
                        React.createElement("div", { className: "topSpan" },
                            React.createElement("p", { className: "introduceBG" }),
                            React.createElement("span", { className: "topTTW" }, "\u533A\u4F4D\u4F18\u52BF"),
                            React.createElement("span", { className: "introduceClose", onClick: this.clickFun.bind(this, this.state.index) },
                                React.createElement("span", { className: "iconfont", style: { "fontSize": "12px" } }, "\uE803")))),
                    React.createElement(SuperiorityArea, null)),
                React.createElement("div", { className: this.state.listArea == true ? "listArea" : "hide" },
                    React.createElement("div", { className: this.state.showBusiness == true ? "show" : "hide" },
                        React.createElement("div", { className: "topTit" },
                            React.createElement("span", { className: "topTT" }, "\u62DB\u5546\u5217\u8868"),
                            React.createElement("span", { className: "listAreaClose", onClick: this.clickFun.bind(this, this.state.index) },
                                React.createElement("span", { className: "iconfont", style: { "fontSize": "12px" } }, "\uE803"))),
                        React.createElement(BusinessArea, null)),
                    React.createElement("div", { className: this.state.showCompany == true ? "show" : "hide" },
                        React.createElement("div", { className: "topTit" },
                            React.createElement("span", { className: "topTT" }, "\u5165\u9A7B\u4F01\u4E1A"),
                            React.createElement("span", { className: "listAreaClose", onClick: this.clickFun.bind(this, this.state.index) },
                                React.createElement("span", { className: "iconfont", style: { "fontSize": "12px" } }, "\uE803"))),
                        React.createElement(CompanyArea, null))),
                React.createElement("div", { className: this.state.treeList == true ? "treeList" : "hide" },
                    React.createElement("div", { className: "topTittree" },
                        React.createElement("span", { className: "topTT" }, "\u6842\u6797\u4FE1\u606F\u4EA7\u4E1A\u56ED"),
                        React.createElement("span", { className: "treeClose", onClick: this.clickFun.bind(this, this.state.index) },
                            React.createElement("span", { className: "iconfont", style: { "fontSize": "12px" } }, "\uE803"))),
                    React.createElement(TreeArea, null))));
        }
    }
    class LeftNav extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                index: 99,
                iconone: false,
                icontwo: false,
                iconthree: false,
                iconfour: false,
                aIcon: [
                    { "iconone": false },
                    { "icontwo": false },
                    { "iconthree": false },
                    { "iconfour": false },
                ],
                treeData: {}
            };
            this.indexC = this.indexC.bind(this);
            LeftNav.refreshTree = this.refreshTree.bind(this);
            LeftNav.showList = this.showList.bind(this);
            LeftNav.updateBusiness = this.updateBusiness.bind(this);
            LeftNav.indexCh = this.indexCh.bind(this);
            LeftNav.updateCompany = this.updateCompany.bind(this);
        }
        componentDidMount() {
        }
        static refreshTree(a) { }
        refreshTree(data) {
            TreeArea.setTreedata(data);
        }
        static updateBusiness(a) { }
        updateBusiness(a) {
            console.log("Businessnav");
            BusinessArea.updateList(a);
        }
        static updateCompany(a) { }
        updateCompany(a) {
            console.log("Companynav");
            CompanyArea.updateList(a);
        }
        static showList(index) { }
        showList(index) {
            console.log('showList-LeftNav', index);
            if (index == 1) {
                this.setState({
                    index: index,
                    iconone: true,
                    icontwo: false,
                    iconthree: false,
                    iconfour: false,
                });
            }
            else if (index == 2) {
                this.setState({
                    index: index,
                    iconone: false,
                    icontwo: true,
                    iconthree: false,
                    iconfour: false,
                });
            }
            else if (index == 3) {
                this.setState({
                    index: index,
                    iconone: false,
                    icontwo: false,
                    iconthree: true,
                    iconfour: false,
                });
            }
            else if (index == 4) {
                this.setState({
                    index: index,
                    iconone: false,
                    icontwo: false,
                    iconthree: false,
                    iconfour: true,
                });
            }
            else if (index == 10) {
                this.setState({
                    index: index,
                    iconone: false,
                    icontwo: false,
                    iconthree: false,
                    iconfour: false,
                });
            }
            ListArea.showList(index);
        }
        indexC(index) {
            console.log("indexC", index);
            this.setState({
                index: index
            });
        }
        static indexCh(a) { }
        indexCh(a) {
            console.log("indexCh", a);
            if (a == 99) {
                this.setState({
                    index: a,
                    iconone: false,
                    icontwo: false,
                    iconthree: false,
                    iconfour: false,
                });
            }
            else {
                this.setState({
                    index: a,
                });
            }
        }
        render() {
            return (React.createElement("div", null,
                React.createElement("div", { className: "tree", onClick: this.showList.bind(this, 10) },
                    React.createElement("div", { className: "stree" },
                        React.createElement("span", { className: "iconfont", style: { "fontSize": "14px" } }, "\uE809"),
                        "\u00A0 \u6842\u6797\u4FE1\u606F\u4EA7\u4E1A\u56ED")),
                React.createElement("div", { className: "leftNav" },
                    React.createElement("div", { className: "leftBG" }),
                    React.createElement("ul", { className: "leftul" },
                        React.createElement("li", { onClick: this.showList.bind(this, 1), className: this.state.iconone == true ? "iconit" : "iconun" },
                            React.createElement("span", { className: "iconfont", style: { "fontSize": "25px" } }, "\uE7FA"),
                            React.createElement("p", null, "\u56ED\u533A\u4ECB\u7ECD")),
                        React.createElement("li", { onClick: this.showList.bind(this, 2), className: this.state.icontwo == true ? "iconit" : "iconun" },
                            React.createElement("span", { className: "iconfont", style: { "fontSize": "25px" } }, "\uE7FB"),
                            React.createElement("p", null, "\u533A\u57DF\u4F18\u52BF")),
                        React.createElement("li", { onClick: this.showList.bind(this, 3), className: this.state.iconthree == true ? "iconit" : "iconun" },
                            React.createElement("span", { className: "iconfont", style: { "fontSize": "25px" } }, "\uE7FC"),
                            React.createElement("p", null, "\u62DB\u5546\u5217\u8868")),
                        React.createElement("li", { onClick: this.showList.bind(this, 4), className: this.state.iconfour == true ? "iconit" : "iconun" },
                            React.createElement("span", { className: "iconfont", style: { "fontSize": "25px" } }, "\uE7FD"),
                            React.createElement("p", null, "\u5165\u9A7B\u4F01\u4E1A")))),
                React.createElement(ListArea, null)));
        }
    }
    exports.default = LeftNav;
});
define("share", ["require", "exports", "antd", "react", "css!./styles/view.css"], function (require, exports, antd_2, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Share extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                value: "www.baidu.com"
            };
            this.copy = this.copy.bind(this);
            this.cancel = this.cancel.bind(this);
        }
        componentDidMount() {
        }
        copy() {
            var Url2 = document.getElementById("copy").innerText;
            var oInput = document.createElement('input');
            oInput.value = Url2;
            document.body.appendChild(oInput);
            oInput.select();
            document.execCommand("Copy");
            oInput.className = 'oInput';
            oInput.style.display = 'none';
            antd_2.message.success('复制成功!', 1);
            this.props.toggleShare();
        }
        cancel() {
            this.props.toggleShare();
        }
        render() {
            return (React.createElement("div", { className: "share" },
                React.createElement("div", { className: "share-title" }, "\u56ED\u533A\u5206\u4EAB"),
                React.createElement("div", { className: "url" },
                    React.createElement("span", { className: "share-span-a" }, "\u94FE\u63A5"),
                    React.createElement("span", { className: "share-span-b", id: "copy" }, this.state.value)),
                React.createElement("div", { className: "share-bt" },
                    React.createElement("div", { className: "share-span-c", onClick: this.cancel }, "\u53D6\u6D88"),
                    React.createElement("div", { className: "share-span-d", onClick: this.copy }, "\u590D\u5236\u94FE\u63A5"))));
        }
    }
    exports.default = Share;
});
define("Index", ["require", "exports", "react", "react-dom", "topNav", "leftNav", "iconView", "data", "share", "dataService", "react-router-dom", "css!./styles/view.css"], function (require, exports, React, ReactDOM, topNav_1, leftNav_1, iconView_1, data_1, share_1, dataService_2, react_router_dom_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Index extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                isFullScreen: false,
                isShare: false
            };
            this.toggleShare = (e) => {
                this.setState({ isShare: !this.state.isShare });
            };
            this.fullScreen = (e) => {
                this.setState({ isFullScreen: !this.state.isFullScreen });
            };
            this.iconChild = null;
            this.iconSon = ref => { this.iconChild = ref; };
            this.dataService = new dataService_2.default();
            this.toggleShare = this.toggleShare.bind(this);
            Index.g_pIns = this;
        }
        componentDidMount() { }
        render() {
            return (React.createElement("div", { className: "web" },
                this.state.isFullScreen ? null :
                    React.createElement("span", null,
                        React.createElement(topNav_1.default, null),
                        React.createElement(leftNav_1.default, null)),
                this.state.isShare ?
                    React.createElement("div", { className: "share" },
                        React.createElement(share_1.default, { toggleShare: this.toggleShare }))
                    : null,
                React.createElement("div", { className: "iconView" },
                    React.createElement(iconView_1.default, { toggleShare: this.toggleShare, fullScreen: this.fullScreen })),
                React.createElement("div", { id: "webgl-output" })));
        }
        showLeftview(a) {
            leftNav_1.default.showList(a);
        }
        hideLeftview(a) {
            leftNav_1.default.indexCh(a);
            leftNav_1.default.showList(a);
        }
        updateTree(data) {
            leftNav_1.default.refreshTree(data);
        }
        updateBusiness(a) {
            console.log("flushRoom", a);
            leftNav_1.default.updateBusiness(a);
        }
        updateCompany(a) {
            console.log("flushRoom", a);
            leftNav_1.default.updateCompany(a);
        }
        roomScene(a) {
            console.log("roomScene", a);
        }
        roomAduio(a) {
            iconView_1.default.play(a);
        }
        callback(a, pBack) {
            this.dataService.callback(a, pBack);
        }
    }
    Index.g_pIns = null;
    ReactDOM.render(React.createElement(react_router_dom_2.HashRouter, null,
        React.createElement(react_router_dom_2.Switch, null,
            React.createElement(react_router_dom_2.Route, { path: "/data", component: data_1.default }),
            React.createElement(react_router_dom_2.Route, { exact: true, path: "/", component: Index }))), document.getElementById('viewContainer'));
    exports.default = Index;
});
define("iconView", ["require", "exports", "react", "react-router-dom", "css!./styles/view.css"], function (require, exports, React, RouterDOM) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class IconView extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                isPlaying: false,
                isControls: true,
                audioArray: [
                    'https://eb-sycdn.kuwo.cn/ad367daf58355b6e9006e8b44a61057d/5e1d18eb/resource/n1/96/98/1578806792.mp3',
                    'https://win-web-ri01-sycdn.kuwo.cn/5b05672e4e9f39f61178ba25a8b913b0/5e1d1918/resource/n1/73/40/4073043717.mp3',
                    'https://win-web-re01-sycdn.kuwo.cn/f9cea19f40dc54473bd09c916aa9e312/5e1d1936/resource/n2/69/33/1625071345.mp3'
                ],
                currentAudio: 0
            };
            this.play = this.play.bind(this);
            this.endedAudio = this.endedAudio.bind(this);
            IconView.play = this.play;
        }
        componentDidMount() {
        }
        endedAudio() {
            let currentAudio = this.state.currentAudio;
            if (currentAudio !== 2) {
                currentAudio = currentAudio + 1;
            }
            else {
                currentAudio = 0;
            }
            this.setState({
                currentAudio: currentAudio,
                isPlaying: false
            }, () => {
                this.setState({ isPlaying: true });
            });
        }
        static play(a) { }
        play(a) {
            console.log("play");
            this.setState({ isPlaying: !this.state.isPlaying });
            var audio = document.getElementById("bgMusic");
            audio.src = a;
            audio.play();
        }
        playPark() {
            console.log("playPark");
            var voice = " http://downsc.chinaz.net/files/download/sound1/201206/1638.mp3";
            var audio = document.getElementById("bgMusic");
            audio.src = voice;
            audio.play();
        }
        render() {
            return (React.createElement("div", { className: "icon-view " },
                React.createElement(Audio, null),
                React.createElement("div", { style: { position: "fixed", top: "300px", left: "500px" } }),
                React.createElement(RouterDOM.Link, { to: "/data" },
                    React.createElement(Analyze, null)),
                React.createElement("span", { onClick: this.playPark },
                    React.createElement(Play, null)),
                React.createElement("span", { onClick: () => { this.props.toggleShare(); } },
                    React.createElement(Share, null)),
                React.createElement("span", { onClick: () => { this.props.fullScreen(); } },
                    React.createElement(Amplification, null))));
        }
    }
    const Analyze = () => React.createElement("svg", { className: "icon", "aria-hidden": "true", style: { height: "17px", width: "17px", cursor: "pointer", color: "#FFFFFF" } },
        React.createElement("use", { xlinkHref: "#iconfenxi" }));
    const Play = () => React.createElement("svg", { className: "icon", "aria-hidden": "true", style: { height: "17px", width: "17px", marginLeft: "22px", cursor: "pointer", color: "#FFFFFF" } },
        React.createElement("use", { xlinkHref: "#iconbofang" }));
    const Share = () => React.createElement("svg", { className: "icon", "aria-hidden": "true", style: { height: "17px", width: "17px", marginLeft: "22px", cursor: "pointer", color: "#FFFFFF" } },
        React.createElement("use", { xlinkHref: "#iconfenxiang" }));
    const Switch = () => React.createElement("svg", { className: "icon", "aria-hidden": "true", style: { height: "17px", width: "17px", marginLeft: "22px", cursor: "pointer", color: "#FFFFFF" } },
        React.createElement("use", { xlinkHref: "#iconD" }));
    const Amplification = () => React.createElement("svg", { className: "icon", "aria-hidden": "true", style: { height: "17px", width: "17px", marginLeft: "22px", cursor: "pointer", color: "#FFFFFF" } },
        React.createElement("use", { xlinkHref: "#iconmengbanzu" }));
    exports.default = IconView;
    class Audio extends React.Component {
        constructor(props) {
            super(props);
        }
        componentDidMount() {
            let aud = document.getElementById("bgMusic");
            aud.onended = function () {
                console.log("音频播放完成");
            };
        }
        render() {
            return (React.createElement("div", null,
                React.createElement("div", { id: "audioBox", style: { display: "none" } },
                    React.createElement("audio", { controls: true, id: "bgMusic" },
                        React.createElement("source", { src: "" })))));
        }
    }
});
