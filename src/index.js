import { factoryLunarCalendar, LUNAR_CALENDAR, CONSTANT } from "./LunarCalendar.js"
import CanvasAnimation from './CanvasAnimation.js'
import "./css/demo.css"
import "./css/icon_font/iconfont.css"

(function (context) {
    const clockDom = context.querySelector(".header>h1");
    const dateDetailDom = context.querySelector(".header>span"); // 当前具体日期现实
    const dateCurButtonDom = context.querySelector(".center>div:first-child>.yearmonth"); // 日期选择按钮
    const monthInfoDom = context.querySelector(".month-info");
    const monthViewDom = monthInfoDom.querySelector(".date-detail>.content");// 当前月内容展示区
    const dataChooseDom = document.querySelector(".date-choose>.content"); // 月份选择和年份选择
    const arrowDom = context.querySelector(".center>div:first-child>.arrow");
    const upArrowDom = arrowDom.children[0];
    const contentView = [monthViewDom, dataChooseDom];

    const curStatus = {
        "year": Symbol("year"),
        "month": Symbol("month"),
        "day": Symbol("day")
    }

    let realYear = undefined;
    let realMonth = undefined;
    let realDay = undefined;
    let dateDetailAnimation1 = new CanvasAnimation();
    dateDetailAnimation1.init();
    dateDetailAnimation1.startAnimation();


    let config = {
        domNode: document.querySelector(".date-choose"),
        lineN: 4,
        rowN: 4,
        R: 100
    }

    let dateDetailAnimation2 = new CanvasAnimation(config);

    dateDetailAnimation2.init();
    // dateDetailAnimation2.startAnimation();

    let utils = {
        monthSelfReduce: function (year, month) {
            if (month == 1) {
                month = 12;
                year = this.yearSelfReduce(year);
            } else {
                month--;
            }
            return [year, month];
        },

        monthSelfadd: function (year, month) {
            if (month == 12) {
                month = 1;
                year = this.yearSelfadd(year);
            } else {
                month++;
            }
            return [year, month];
        },

        yearSelfReduce: function (year) {
            if (year > CONSTANT.YEAR_INTERVAL.MIN_YEAR) {
                return --year;
            }
            throw new Error(CONSTANT.ERROR_INFO.ERROR1);
        },

        yearSelfadd: function (year) {
            if (year < CONSTANT.YEAR_INTERVAL.MAX_YEAR) {
                return ++year;
            }
            throw new Error(CONSTANT.ERROR_INFO.ERROR1);
        },

        yearIntervalAdd: function (yearInterval) {
            if (yearInterval[1] + 10 < CONSTANT.YEAR_INTERVAL.MAX_YEAR - CONSTANT.YEAR_INTERVAL.MAX_YEAR % 10) {
                return [yearInterval[0] + 10, yearInterval[1] + 10];
            }
            throw new Error(CONSTANT.ERROR_INFO.ERROR1);
        },

        yearIntervalReduce: function (yearInterval) {
            if (yearInterval[0] > CONSTANT.YEAR_INTERVAL.MIN_YEAR % 10 + CONSTANT.YEAR_INTERVAL.MIN_YEAR) {
                return [yearInterval[0] - 10, yearInterval[1] - 10];
            }
            throw new Error(CONSTANT.ERROR_INFO.ERROR1);
        },

        dataFormConv: function (dataStr) {
            dataStr = dataStr.trim();
            let yearIdx = dataStr.indexOf("年");
            if (yearIdx > -1) {
                let monthIdx = dataStr.indexOf("月");
                let dayIdx = dataStr.indexOf("日");
                return {
                    year: Number(dataStr.substring(0, yearIdx)),
                    month: monthIdx > -1 ? Number(dataStr.substring(yearIdx + 1, monthIdx)) : null,
                    day: dayIdx > -1 ? Number(dataStr.substring(monthIdx + 1, dayIdx)) : null
                };
            }
            throw new Error("转化格式出错！");
        }
    }

    let inOrOutAnimate = {
        "outAnimate": function (viewDom) {
            let list = viewDom.classList;
            list.add('outAnimate');
        },

        "inAnimate": function (viewDom, delay = true) {
            let list = viewDom.classList;
            function _changeStyle(){
                if (!list.contains('inAnimate')) {
                    list.add('inAnimate');
                }
                list.add('restoreConfiguAnimate');
            }
            if(delay){
                setTimeout(() => {
                    _changeStyle();
                }, 0);
            }else{
                _changeStyle();
            }
        },
        
        "restoreStyle": function(viewDom){
            let list = viewDom.classList;
            list.contains('inAnimate') && list.remove('inAnimate');
            list.contains('restoreConfiguAnimate') && list.remove('restoreConfiguAnimate');
            list.contains('outAnimate') && list.remove('outAnimate');
        }

    }

    //更新数字时钟时间
    function upateClock() {
        let timer = null;
        let lunarCalendar = null;
        function updatedDomClock() {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let lunarCalendarBuf = factoryLunarCalendar(year, month, day);
            let allNeedUpdate = false;
            if (lunarCalendarBuf !== lunarCalendar) {
                lunarCalendar = lunarCalendarBuf;
                realYear = year;
                realMonth = month;
                realDay = day;
                lunarCalendar.getAllInfo();
                monthViewDom.innerHTML = upLoadDayContent(lunarCalendarBuf);
                allNeedUpdate = true;
            }
            let monthL = lunarCalendar.lunarMonth;
            let dayL = lunarCalendar.lunarDay;
            let str = date.getHours() + ":" + (date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()) + ":" + (date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds());
            let str2 = year + "年" + month + "月" + day + "日" + " " + LUNAR_CALENDAR.MONTH_CN[monthL] + "月" + LUNAR_CALENDAR.DATE_CN[dayL] + " " + lunarCalendar.festival;
            clockDom.innerHTML = str;
            dateDetailDom.innerHTML = str2;
            if (allNeedUpdate) {
                dateCurButtonDom.innerHTML = str2.substring(0, str2.indexOf('月') + 1);
            }

        }
        updatedDomClock();

        function startClock() {
            timer = setInterval(function () {
                updatedDomClock();
            }, 1000)
        }

        function closeClock() {
            clearInterval(timer);
            timer = null;
        }
        return {
            startClock,
            closeClock
        }
    }

    function monthDaysPanelView(lunarCalendar) {
        if (!lunarCalendar.curMonthAllDateInfo || lunarCalendar.length == 0) {
            lunarCalendar.getAllInfo();
        }
        let curMonthAllDateInfo = lunarCalendar.curMonthAllDateInfo;
        let panelViewData = JSON.parse(JSON.stringify(curMonthAllDateInfo));
        function calcPanelViewData() {
            let diffFirstDay = curMonthAllDateInfo[0].weekDay - 1;
            if (diffFirstDay > 1) {
                let lastMonthlunarCalendar = factoryLunarCalendar(...utils.monthSelfReduce(lunarCalendar.year, lunarCalendar.month), 1);
                lastMonthlunarCalendar.getAllInfo();
                let length = lastMonthlunarCalendar.curMonthAllDateInfo.length;
                for (let i = 0; i < diffFirstDay; i++) {
                    panelViewData.unshift(lastMonthlunarCalendar.curMonthAllDateInfo[length - i - 1]);
                }
            }
            length = panelViewData.length;
            let diffLastDay = 42 - length;
            if (diffLastDay > 0) {
                let nextMonthlunarCalendar = factoryLunarCalendar(...utils.monthSelfadd(lunarCalendar.year, lunarCalendar.month), 1);
                nextMonthlunarCalendar.getAllInfo();
                for (let i = 0; i < diffLastDay; i++) {
                    panelViewData.push(nextMonthlunarCalendar.curMonthAllDateInfo[i]);
                }
            }
            return this;
        }

        function panelViewDataRender() {
            let str = "";
            let curMonth = curMonthAllDateInfo[0].solorDetail.month;

            panelViewData.forEach((ele, index) => {
                let firstLine = ele.solorDetail.day;
                let lastLine = LUNAR_CALENDAR.DATE_CN[ele.lunarDetail.day];
                let dataStyle = ele.solorDetail.month < curMonth ? 'lastMonthday' :
                    ele.solorDetail.month > curMonth ? 'nextMonthday' : "curMonthday";

                if (ele.solorDetail.year == realYear && ele.solorDetail.month == realMonth && realDay == ele.solorDetail.day) {
                    dataStyle = "curDay";
                }

                if (ele.hasSolorTERM) {
                    lastLine = ele.hasSolorTERM;
                }
                if (ele.hasFestival) {
                    lastLine = ele.hasFestival;
                }
                if (index == 0) {
                    str += `<ul class="line">`;
                }
                str += `<li class="row ${dataStyle}"><div><span>${firstLine} </span><span>${lastLine}</span></div></li>`;
                if (index == panelViewData.length - 1) {
                    str += `</ul>`;
                    return;
                }
                if ((index + 1) % 7 == 0) {
                    str += `</ul><ul class="line">`;
                }
            });
            return str;
        }

        return {
            calcPanelViewData,
            panelViewDataRender
        }
    }

   

    function upLoadDayContent(lunarCalendar) {
        let result = "";
        let lastMonthlunarCalendar = factoryLunarCalendar(...utils.monthSelfReduce(lunarCalendar.year, lunarCalendar.month), 1);
        lastMonthlunarCalendar.getAllInfo();
        let nextMonthlunarCalendar = factoryLunarCalendar(...utils.monthSelfadd(lunarCalendar.year, lunarCalendar.month), 1);
        nextMonthlunarCalendar.getAllInfo();
        result += monthDaysPanelView(lastMonthlunarCalendar).calcPanelViewData().panelViewDataRender();
        result += monthDaysPanelView(lunarCalendar).calcPanelViewData().panelViewDataRender();
        result += monthDaysPanelView(nextMonthlunarCalendar).calcPanelViewData().panelViewDataRender();
        return result;
    }



    function accordCurDateACMonthChoose(chooseDate, curDate) {
        let chooseDateObj = utils.dataFormConv(chooseDate);
        let curDateObj = utils.dataFormConv(curDate);
        let result = "";
        function _eachYearHtmlList(chooseDateObj, curDateObj) {
            let str = "";
            for (let i = 1; i <= 16; i++) {
                let month = "";
                let monthStyle = "";
                if (i <= 12) {
                    month = i + "月";
                } else {
                    month = i - 12 + "月";
                }
                if (i == 1) {
                    str += `<ul class="line">`
                }
                // if (i > 12) {
                //     monthStyle = "nextMonth";
                // } else {
                //     monthStyle = "curYearMonth";
                // }
                monthStyle = "curYearMonth";
                // if ((chooseDateObj.year === curDateObj.year && i === curDateObj.month) || (i > 12 && chooseDateObj.year + 1 === curDateObj.year && i-12 === curDateObj.month)) {
                //     monthStyle = "curMonth";
                // }
                str += `<li><div class = "${monthStyle}"><span>${i > 12 ? i - 12 : i}月</span></div></li>`
                if (i % 4 == 0) {
                    if (i == 16) {
                        str += `</ul>`;
                        continue;
                    }
                    str += `</ul><ul class="line">`;
                }
            }
            return str;
        }

        function allRender() {
            chooseDateObj.year--;
            result += _eachYearHtmlList(chooseDateObj, curDateObj);
            chooseDateObj.year++;
            result += _eachYearHtmlList(chooseDateObj, curDateObj);
            chooseDateObj.year++;
            result += _eachYearHtmlList(chooseDateObj, curDateObj);
            chooseDateObj.year--;
            return result;
        }


        function monthChoosePanelStyleRender() {
            setTimeout(() => {
                let child = dataChooseDom.querySelectorAll('div');
                let curIndex = 16 * 1 - 1;
                for (let i = curIndex; i <= curIndex + 16; i++) {
                    if (i - curIndex > 12) {
                        child[i].className = "nextMonth";
                    }
                    if ((chooseDateObj.year === curDateObj.year && i - curIndex === curDateObj.month) ||
                        (i - curIndex > 12 && chooseDateObj.year + 1 === curDateObj.year && i - curIndex - 12 === curDateObj.month)) {
                        child[i].className = "curMonth";
                    }
                }
            }, 300);
        }
        return {
            allRender,
            monthChoosePanelStyleRender
        }
    }

    function accordCurDateACYearChoose(yearInterval, curDate) {
        if (!Array.isArray(yearInterval)) {
            yearInterval = yearInterval.split("-").map((ele) => {
                return Number(ele);
            });
        }
        let minYear = CONSTANT.YEAR_INTERVAL.MIN_YEAR;
        let curDateObj = utils.dataFormConv(curDate);
        function _curYearHtmlList(yearInterval) {
            let index = (yearInterval[0] - minYear) % 4;
            let str = "";
            let yearStyle = "nextYear";
            for (let i = 1; i <= 16; i++) {
                if (i == 1) {
                    str += `<ul class="line">`
                }
                if (i <= index) {
                    str += `<li><div class = "${yearStyle}"><span>${yearInterval[0] - index + i - 1}</span></div></li>`;
                } else {
                    if(yearInterval[0] + i - index - 1 > CONSTANT.YEAR_INTERVAL.MAX_YEAR){
                        str += `<li><div class = "${yearStyle}"><span></span></div></li>`;
                    }else{
                        str += `<li><div class = "${yearStyle}"><span>${yearInterval[0] + i - index - 1}</span></div></li>`;
                    }
                }
                if (i % 4 == 0) {
                    if (i == 16) {
                        str += `</ul>`;
                        continue;
                    }
                    str += `</ul><ul class="line">`;
                }
            }
            return str;
        }

        function allYearRender() {
            let result = "";
            yearInterval = [yearInterval[0] - 10, yearInterval[1] - 10];
            result += _curYearHtmlList(yearInterval);
            yearInterval = [yearInterval[0] + 10, yearInterval[1] + 10];
            result += _curYearHtmlList(yearInterval);
            yearInterval = [yearInterval[0] + 10, yearInterval[1] + 10];
            result += _curYearHtmlList(yearInterval);
            yearInterval = [yearInterval[0] - 10, yearInterval[1] - 10];
            return result;
        }

        function yearChoosePanelStyleRender() {
            setTimeout(() => {
                let child = dataChooseDom.querySelectorAll('div');
                let curIndex = 16 * 1 - 1;
                for (let i = curIndex; i <= curIndex + 16; i++) {
                    let str = child[i].children[0].innerText;
                    let year = Number(str.trim());
                    if (year == curDateObj.year) {
                        child[i].className = "curYear";
                    } else if (yearInterval[0] <= year && year <= yearInterval[1]) {
                        child[i].className = "curYearInterval";
                    }
                }
            }, 300);
        }
        return {
            allYearRender,
            yearChoosePanelStyleRender
        }

    }


    let Status_Mode = {
        status: curStatus.day,
        [curStatus.day]: {
            changeStatusAction: function () {
                let dataChooseClassList = dataChooseDom.parentNode.classList;
                let monthInfoClassList = monthInfoDom.classList;
                Status_Mode.status = curStatus.month;
                let str = dateCurButtonDom.innerText;
                dateCurButtonDom.innerText = str.substring(0, str.indexOf("年") + 1);
                monthInfoClassList.replace("show", "hidden");
                dataChooseClassList.replace("hidden", "show");
                dateDetailAnimation2.startAnimation();
                let renderO = accordCurDateACMonthChoose(dateCurButtonDom.innerText, dateDetailDom.innerText);
                dataChooseDom.innerHTML = renderO.allRender();
                renderO.monthChoosePanelStyleRender();
                inOrOutAnimate.inAnimate(dataChooseDom.parentNode);
            },
            scrollAndArrowAction: function (direction = 0) {
                let str = dateCurButtonDom.innerHTML.trim();
                let chooseDateObj = utils.dataFormConv(str);
                let year = chooseDateObj.year;
                let month = chooseDateObj.month;
                if (direction == "0") {
                    monthViewDom.style.transition = "top 0.3s";
                    monthViewDom.style.top = "0";
                    [year, month] = utils.monthSelfReduce(year, month);
                } else {
                    monthViewDom.style.transition = "top 0.3s";
                    monthViewDom.style.top = "-600px";
                    [year, month] = utils.monthSelfadd(year, month);
                }
                dateCurButtonDom.innerHTML = `${year}年${month}月`;
                let lunarCalendar = factoryLunarCalendar(year, month, 1);
                lunarCalendar.getAllInfo();
                setTimeout(() => {
                    monthViewDom.innerHTML = upLoadDayContent(lunarCalendar);
                    monthViewDom.style.transition = undefined;
                    monthViewDom.style.top = "-300px";
                }, 300)
            },

        },
        [curStatus.month]: {
            changeStatusAction: () => {
                Status_Mode.status = curStatus.year;
                let str = dateCurButtonDom.innerText;
                let strN = Number(str.trim().substring(0, str.indexOf("年")));
                let floor = Math.floor(strN / 10) * 10;
                dateCurButtonDom.innerText = `${floor} - ${floor + 9}`;
                inOrOutAnimate.restoreStyle(dataChooseDom.parentNode);
                let renderO = accordCurDateACYearChoose([floor, floor + 9], dateDetailDom.innerText);
                dataChooseDom.innerHTML = renderO.allYearRender();
                renderO.yearChoosePanelStyleRender();
                inOrOutAnimate.inAnimate(dataChooseDom.parentNode);
            },

            scrollAndArrowAction: function (direction = 0) {
                let str = dateCurButtonDom.innerHTML.trim();
                let chooseDateObj = utils.dataFormConv(str);
                let year = chooseDateObj.year;
                if (direction == "0") {
                    dataChooseDom.style.transition = "top 0.3s";
                    dataChooseDom.style.top = "0";
                    year = utils.yearSelfReduce(year);
                } else {
                    dataChooseDom.style.transition = "top 0.3s";
                    dataChooseDom.style.top = "-680px";
                    year = utils.yearSelfadd(year);
                }
                dateCurButtonDom.innerHTML = `${year}年`;
                setTimeout(() => {
                    let renderO = accordCurDateACMonthChoose(dateCurButtonDom.innerText, dateDetailDom.innerText);
                    dataChooseDom.innerHTML = renderO.allRender();
                    dataChooseDom.style.transition = undefined;
                    dataChooseDom.style.top = "-340px";
                    renderO.monthChoosePanelStyleRender();
                }, 300)
            },

            contentClickAction: function (target) {
                let dataChooseClassList = dataChooseDom.parentNode.classList;
                let monthInfoClassList = monthInfoDom.classList;
                let targetList = target.classList;
                Status_Mode.status = curStatus.day;
                let str = dateCurButtonDom.innerText;
                let chooseYear = Number(str.trim().substring(0, str.indexOf("年")));
                let chooseMonthStr = target.innerHTML.trim();
                let chooseMonth = Number(chooseMonthStr.substring(0, chooseMonthStr.indexOf("月")));
                if (targetList.contains("nextMonth")) {
                    chooseYear += 1;
                }
                if (targetList.contains("curMonth")) {
                    let str = dateDetailDom.innerText.trim();
                    chooseYear = Number(str.substring(0, str.indexOf("年")));
                }
                dateCurButtonDom.innerText = chooseYear + "年" + chooseMonth + "月";
                inOrOutAnimate.outAnimate(dataChooseDom.parentNode);
                dateDetailAnimation2.stopAnimation();
                setTimeout(()=>{
                    monthInfoClassList.replace("hidden", "show");
                    dataChooseClassList.replace("show", "hidden");
                    inOrOutAnimate.restoreStyle(dataChooseDom.parentNode);
                    let lunarCalendarBuf = factoryLunarCalendar(chooseYear, chooseMonth, 1);
                    lunarCalendarBuf.getAllInfo();
                    monthViewDom.innerHTML = upLoadDayContent(lunarCalendarBuf);
                },300);
                
            }
        },
        [curStatus.year]: {
            changeStatusAction: () => {

            },
            scrollAndArrowAction: function (direction = 0) {
                let str = dateCurButtonDom.innerHTML.trim();
                let chooseYearInterval = str.split("-").map((ele) => {
                    return Number(ele);
                });
                if (direction == 0) {
                    try {
                        chooseYearInterval = utils.yearIntervalReduce(chooseYearInterval);
                    } catch (e) {
                        return;
                    }
                    dataChooseDom.style.transition = "top 0.3s";
                    dataChooseDom.style.top = "0";

                } else {
                    try {
                        chooseYearInterval = utils.yearIntervalAdd(chooseYearInterval);
                    } catch (e) {
                        return;
                    }
                    dataChooseDom.style.transition = "top 0.3s";
                    dataChooseDom.style.top = "-680px";
                }
                dateCurButtonDom.innerHTML = `${chooseYearInterval[0]}-${chooseYearInterval[1]}`;
                setTimeout(() => {
                    let renderO = accordCurDateACYearChoose(dateCurButtonDom.innerText, dateDetailDom.innerText);
                    dataChooseDom.innerHTML = renderO.allYearRender();
                    dataChooseDom.style.transition = undefined;
                    dataChooseDom.style.top = "-340px";
                    renderO.yearChoosePanelStyleRender();
                }, 300)
            },
            contentClickAction: function (target) {
                Status_Mode.status = curStatus.month;
                let dataChooseClassList = dataChooseDom.parentNode.classList;
                let chooseYear = target.innerHTML.trim();
                dateCurButtonDom.innerText = chooseYear + "年";
                inOrOutAnimate.outAnimate(dataChooseDom.parentNode);
                setTimeout(()=>{
                    inOrOutAnimate.restoreStyle(dataChooseDom.parentNode);
                    inOrOutAnimate.inAnimate(dataChooseDom.parentNode, false);
                    let renderO = accordCurDateACMonthChoose(dateCurButtonDom.innerText, dateDetailDom.innerText);
                    dataChooseDom.innerHTML = renderO.allRender();
                    renderO.monthChoosePanelStyleRender();
                },300)
            }
        }
    };



    let clockEventListener = {
        /**
         * 具体日期点击事件
         * @param {*} e  
         */
        dateDetailDomListener: function (e) {
            dateDetailDom.addEventListener('click', function (e) {
                let str = this.innerHTML;
                let dataChooseClassList = dataChooseDom.parentNode.classList;
                let monthInfoClassList = monthInfoDom.classList;
                dateCurButtonDom.innerHTML = realYear + "年" + realMonth + "月";
                if(Status_Mode.status === curStatus.month || Status_Mode.status === curStatus.year){
                    inOrOutAnimate.outAnimate(dataChooseDom.parentNode);
                    dateDetailAnimation2.stopAnimation();
                    setTimeout(()=>{
                        monthInfoClassList.replace("hidden", "show");
                        dataChooseClassList.replace("show", "hidden");
                        inOrOutAnimate.restoreStyle(dataChooseDom.parentNode);
                        let lunarCalendarBuf = factoryLunarCalendar(realYear, realMonth, realDay);
                        lunarCalendarBuf.getAllInfo();
                        monthViewDom.innerHTML = upLoadDayContent(lunarCalendarBuf);
                    },300);
                }else{
                    let lunarCalendarBuf = factoryLunarCalendar(realYear, realMonth, realDay);
                    lunarCalendarBuf.getAllInfo();
                    monthViewDom.innerHTML = upLoadDayContent(lunarCalendarBuf);
                }
                Status_Mode.status = curStatus.day;
            })
            return this;
        },
        /**
         * 上下箭头点击事件
         * @param {*} e 
         */
        arrowAction: function (e) {
            let self = this;
            // 点击切换
            arrowDom.addEventListener('click', function (e) {
                let target = e.target;
                if (target.tagName == "SPAN") {
                    let direction = target == upArrowDom ? 0 : 1;
                    Status_Mode[Status_Mode.status].scrollAndArrowAction(direction);
                }
            });
            return this;
        },

        scrollMonthViewDom: function (e) {
            let self = this;
            let isDebounce = true;
            contentView.forEach((ele) => {
                ele.addEventListener('mousewheel', function (e) {
                    if (isDebounce) {
                        let wheelDelta = e.wheelDelta;
                        let direction = wheelDelta > 0 ? 0 : 1;
                        Status_Mode[Status_Mode.status].scrollAndArrowAction(direction);
                        isDebounce = false;
                    }
                    setTimeout(function () {
                        isDebounce = true;
                    }, 300);
                });
            })

            return this;
        },

        dateCurButtonViewAction: function (e) {
            dateCurButtonDom.addEventListener('click', () => {
                Status_Mode[Status_Mode.status].changeStatusAction();
            });
            return this;
        },

        _arrowAcdStatusAction: function () {

        },

        dateContentChooseAction: function () {
            dataChooseDom.addEventListener("click", (e) => {
                let target = e.target;
                target.tagName == "DIV" && Status_Mode[Status_Mode.status].contentClickAction(target.children[0]);
                target.tagName == "SPAN" && Status_Mode[Status_Mode.status].contentClickAction(target);
            });
            return this;
        }
    }

    // 开始时钟
    let controlClock = upateClock();
    controlClock.startClock();
    // 注册事件
    clockEventListener.dateDetailDomListener().arrowAction().scrollMonthViewDom().dateCurButtonViewAction().dateContentChooseAction();

})(window.document.querySelector(".calendar"))



