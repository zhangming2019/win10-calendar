let LUNAR_CALENDAR = {
    //24 节气
    SOLAR_TERM: ['', '立春', '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种', '夏至', '小暑', '大暑', '立秋', '处暑', '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪', '冬至', '小寒', '大寒'], //二十四节气

    MONTH_CN: ['', '正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],

    DATE_CN: ['', '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十', '卅一'],

    SOLAR_EVERY_DAYS: [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    /**
     * 1890 - 2100 年的农历数据
     * 数据格式：[0,2,9,21936]
     * [闰月所在月，0为没有闰月; *正月初一对应公历月; *正月初一对应公历日; *农历每月的天数的数组（需转换为二进制,得到每月大小，0=小月(29日),1=大月(30日)）;]
    */
    LUNNAR_INFO: [[2, 1, 21, 22184], [0, 2, 9, 21936], [6, 1, 30, 9656], [0, 2, 17, 9584], [0, 2, 6, 21168], [5, 1, 26, 43344], [0, 2, 13, 59728], [0, 2, 2, 27296], [3, 1, 22, 44368], [0, 2, 10, 43856], [8, 1, 30, 19304], [0, 2, 19, 19168], [0, 2, 8, 42352], [5, 1, 29, 21096], [0, 2, 16, 53856], [0, 2, 4, 55632], [4, 1, 25, 27304], [0, 2, 13, 22176], [0, 2, 2, 39632], [2, 1, 22, 19176], [0, 2, 10, 19168], [6, 1, 30, 42200], [0, 2, 18, 42192], [0, 2, 6, 53840], [5, 1, 26, 54568], [0, 2, 14, 46400], [0, 2, 3, 54944], [2, 1, 23, 38608], [0, 2, 11, 38320], [7, 2, 1, 18872], [0, 2, 20, 18800], [0, 2, 8, 42160], [5, 1, 28, 45656], [0, 2, 16, 27216], [0, 2, 5, 27968], [4, 1, 24, 44456], [0, 2, 13, 11104], [0, 2, 2, 38256], [2, 1, 23, 18808], [0, 2, 10, 18800], [6, 1, 30, 25776], [0, 2, 17, 54432], [0, 2, 6, 59984], [5, 1, 26, 27976], [0, 2, 14, 23248], [0, 2, 4, 11104], [3, 1, 24, 37744], [0, 2, 11, 37600], [7, 1, 31, 51560], [0, 2, 19, 51536], [0, 2, 8, 54432], [6, 1, 27, 55888], [0, 2, 15, 46416], [0, 2, 5, 22176], [4, 1, 25, 43736], [0, 2, 13, 9680], [0, 2, 2, 37584], [2, 1, 22, 51544], [0, 2, 10, 43344], [7, 1, 29, 46248], [0, 2, 17, 27808], [0, 2, 6, 46416], [5, 1, 27, 21928], [0, 2, 14, 19872], [0, 2, 3, 42416], [3, 1, 24, 21176], [0, 2, 12, 21168], [8, 1, 31, 43344], [0, 2, 18, 59728], [0, 2, 8, 27296], [6, 1, 28, 44368], [0, 2, 15, 43856], [0, 2, 5, 19296], [4, 1, 25, 42352], [0, 2, 13, 42352], [0, 2, 2, 21088], [3, 1, 21, 59696], [0, 2, 9, 55632], [7, 1, 30, 23208], [0, 2, 17, 22176], [0, 2, 6, 38608], [5, 1, 27, 19176], [0, 2, 15, 19152], [0, 2, 3, 42192], [4, 1, 23, 53864], [0, 2, 11, 53840], [8, 1, 31, 54568], [0, 2, 18, 46400], [0, 2, 7, 46752], [6, 1, 28, 38608], [0, 2, 16, 38320], [0, 2, 5, 18864], [4, 1, 25, 42168], [0, 2, 13, 42160], [10, 2, 2, 45656], [0, 2, 20, 27216], [0, 2, 9, 27968], [6, 1, 29, 44448], [0, 2, 17, 43872], [0, 2, 6, 38256], [5, 1, 27, 18808], [0, 2, 15, 18800], [0, 2, 4, 25776], [3, 1, 23, 27216], [0, 2, 10, 59984], [8, 1, 31, 27432], [0, 2, 19, 23232], [0, 2, 7, 43872], [5, 1, 28, 37736], [0, 2, 16, 37600], [0, 2, 5, 51552], [4, 1, 24, 54440], [0, 2, 12, 54432], [0, 2, 1, 55888], [2, 1, 22, 23208], [0, 2, 9, 22176], [7, 1, 29, 43736], [0, 2, 18, 9680], [0, 2, 7, 37584], [5, 1, 26, 51544], [0, 2, 14, 43344], [0, 2, 3, 46240], [4, 1, 23, 46416], [0, 2, 10, 44368], [9, 1, 31, 21928], [0, 2, 19, 19360], [0, 2, 8, 42416], [6, 1, 28, 21176], [0, 2, 16, 21168], [0, 2, 5, 43312], [4, 1, 25, 29864], [0, 2, 12, 27296], [0, 2, 1, 44368], [2, 1, 22, 19880], [0, 2, 10, 19296], [6, 1, 29, 42352], [0, 2, 17, 42208], [0, 2, 6, 53856], [5, 1, 26, 59696], [0, 2, 13, 54576], [0, 2, 3, 23200], [3, 1, 23, 27472], [0, 2, 11, 38608], [11, 1, 31, 19176], [0, 2, 19, 19152], [0, 2, 8, 42192], [6, 1, 28, 53848], [0, 2, 15, 53840], [0, 2, 4, 54560], [5, 1, 24, 55968], [0, 2, 12, 46496], [0, 2, 1, 22224], [2, 1, 22, 19160], [0, 2, 10, 18864], [7, 1, 30, 42168], [0, 2, 17, 42160], [0, 2, 6, 43600], [5, 1, 26, 46376], [0, 2, 14, 27936], [0, 2, 2, 44448], [3, 1, 23, 21936], [0, 2, 11, 37744], [8, 2, 1, 18808], [0, 2, 19, 18800], [0, 2, 8, 25776], [6, 1, 28, 27216], [0, 2, 15, 59984], [0, 2, 4, 27424], [4, 1, 24, 43872], [0, 2, 12, 43744], [0, 2, 2, 37600], [3, 1, 21, 51568], [0, 2, 9, 51552], [7, 1, 29, 54440], [0, 2, 17, 54432], [0, 2, 5, 55888], [5, 1, 26, 23208], [0, 2, 14, 22176], [0, 2, 3, 42704], [4, 1, 23, 21224], [0, 2, 11, 21200], [8, 1, 31, 43352], [0, 2, 19, 43344], [0, 2, 7, 46240], [6, 1, 27, 46416], [0, 2, 15, 44368], [0, 2, 5, 21920], [4, 1, 24, 42448], [0, 2, 12, 42416], [0, 2, 2, 21168], [3, 1, 22, 43320], [0, 2, 9, 26928], [7, 1, 29, 29336], [0, 2, 17, 27296], [0, 2, 6, 44368], [5, 1, 26, 19880], [0, 2, 14, 19296], [0, 2, 3, 42352], [4, 1, 24, 21104], [0, 2, 10, 53856], [8, 1, 30, 59696], [0, 2, 18, 54560], [0, 2, 7, 55968], [6, 1, 27, 27472], [0, 2, 15, 22224], [0, 2, 5, 19168], [4, 1, 25, 42216], [0, 2, 12, 42192], [0, 2, 1, 53584], [2, 1, 21, 55592], [0, 2, 9, 54560]],
    /**
     * 二十四节气数据，节气点时间（单位是分钟）
     * 从0小寒起算
     */
    TERM_INFO: [0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758],
    // 农历节日
    SOLAR_FESTIVAL: {
        'd0101': '元旦',
        'd0214': '情人',
        'd0308': '妇女',
        'd0501': '劳动',
        'd0504': '青年',
        'd0801': '建军',
        'd1006': '老人',
        'd1224': '平安夜',
        'd1225': '圣诞'
    },
    // 阴历节日
    LUNAR_FESTIVAL: {
        'd0101': '春节',
        'd0115': '元宵节',
        'd0202': '龙抬头',
        'd0323': '妈祖',
        'd0505': '端午节',
        'd0707': '七夕',
        'd0715': '中元节',
        'd0815': '中秋节',
        'd0909': '重阳节',
        'd1015': '下元节',
        'd1208': '腊八节',
        'd1223': '小年',
        'd1230': '除夕'
    }
}



const CONSTANT = {
    ERROR_INFO: {
        ERROR1: {
            code: "101",
            message: "输入年份超限，正确年份范围为1890年到2100"
        },
        ERROR2: {
            code: "102",
            message: "输入日期不合法"
        }
    },
    YEAR_INTERVAL: {
        "MIN_YEAR": 1890,
        "MAX_YEAR": 2100
    }
}


/**
 * 
 * @param {Number} _year 
 * @param {Number} _month 
 * @param {Number} _day 
 */

function factoryLunarCalendar() {
    let factoryCache = {};
    return function (_year, _month, _day) {
        let curDateStr = `${_year}_${_month}_${_day}`;
        let curDateObj = factoryCache[curDateStr];
        if (factoryCache[curDateStr]) {
            return curDateObj;
        }
        let Obj = new LunarCalendar(_year, _month, _day);
        factoryCache[curDateStr] = Obj;
        return Obj;
    }
}

factoryLunarCalendar = factoryLunarCalendar();


/**
 * 输入参数为公历年月日
 * @param {*} _year 
 * @param {*} _month 
 * @param {*} _day 
 */

function LunarCalendar(_year, _month, _day) {
    // 公历年月日
    this.year = _year;
    this.month = _month;
    this.day = _day;
    // 农历年月日
    this.lunarYear = undefined;
    this.lunarMonth = undefined;
    this.lunarDay = undefined;
    this.curMonthAllDateInfo = undefined;
    this.festival = "";
    this.lastLunarCalendar = undefined;
    this.nextLunarCalendar = undefined;
}
/**
 * 根据公历年份获取当年的农历数据
 */
LunarCalendar.getLunarInfo = function (_year) {
    let bufData = LUNAR_CALENDAR.LUNNAR_INFO[_year - 1890];
    if (!bufData) {
        throw new Error(CONSTANT.ERROR_INFO.ERROR1.message);
    }
    return bufData;
}


LunarCalendar.SolarToLunar = function (_year, _month, _day) {
    let yearLunnarInfo = LunarCalendar.getLunarInfo(_year); // 获取当年的信息
    let lunarYearDay = [yearLunnarInfo[1], yearLunnarInfo[2]]; //过年当天所在的阳历日期
    /**
     * 获取当前年的每个月的天数
     * @param {*} yearInfo 
     */
    function getMonthsDayA(yearInfo) {
        let hasRunMonth = yearInfo[0];
        let monthsDayS = yearInfo[3].toString(2);
        while (monthsDayS.length < 16) {
            monthsDayS = '0' + monthsDayS;
        }
        return hasRunMonth == 0 ? monthsDayS.substring(0, 12) : monthsDayS.substring(0, 13);
    }
    let monthsDayA = getMonthsDayA(yearLunnarInfo);
    let lunar_year = _year;
    let month = undefined;
    let day = undefined;
    if (_month < lunarYearDay[0] || (_month == lunarYearDay[0] && _day < lunarYearDay[1])) {
        lunar_year = _year - 1;
        let diffDay = LunarCalendar.timeDifference([_year, ...lunarYearDay], [_year, _month, _day]);
        let lastYearLunnarInfo = LunarCalendar.getLunarInfo(lunar_year);
        let lastMonthsDayA = getMonthsDayA(lastYearLunnarInfo);
        for (let i = lastMonthsDayA.length - 1; i >= 0; i--) {
            let monthDays = lastMonthsDayA[i] == 1 ? 30 : 29;
            if (diffDay < monthDays) {
                month = i;
                day = monthDays - diffDay + 1;
                break;
            } else {
                diffDay = diffDay - monthDays;
            }
        }
        return [
            lunar_year,
            month + 1,
            day
        ];
    }
    let diffDay = LunarCalendar.timeDifference([_year, _month, _day], [_year, ...lunarYearDay]);
    for (let i = 0, len = monthsDayA.length; i < len; i++) {
        let monthDays = monthsDayA[i] == 1 ? 30 : 29;
        if (diffDay < monthDays) {
            month = i;
            day = diffDay + 1;
            break;
        } else {
            diffDay = diffDay - monthDays;
        }
    }
    return [
        lunar_year,
        month + 1,
        day
    ];
}

LunarCalendar.getCurrentFestival = function (_monthS, _dayS, _monthL, _dayL) {
    let dateFormateS = `d${_monthS < 10 ? '0' + _monthS : _monthS}${_dayS < 10 ? '0' + _dayS : _dayS}`;
    let dateFormateL = `d${_monthL < 10 ? '0' + _monthL : _monthL}${_dayL < 10 ? '0' + _dayL : _dayL}`;
    let LFestival = LUNAR_CALENDAR.SOLAR_FESTIVAL[dateFormateS];
    if (LFestival) {
        return `${LFestival}`;
    }
    let SFestival = LUNAR_CALENDAR.LUNAR_FESTIVAL[dateFormateL];
    if (SFestival) {
        return `${SFestival}`;
    }
    return "";
}

LunarCalendar.getSolorMonthDays = function (_year, _month) {
    if (_month == 2 && LunarCalendar.isSYunYear(_year)) {
        return 29;
    }
    return LUNAR_CALENDAR.SOLAR_EVERY_DAYS[_month];
}

LunarCalendar.isSYunYear = function (_year) {
    return (_year % 4 == 0 && _year % 400 != 0) || _year % 400 == 0;
}
// 公历时间差
LunarCalendar.timeDifference = function (date1, date2) {
    date1[1] -= 1;
    date2[1] -= 1;
    console.log(Math.floor(new Date(...date1) - new Date(...date2)));
    let buf = Math.floor(new Date(...date1) - new Date(...date2));
    return Math.round(buf / (86400000));
}

LunarCalendar.prototype = {
    constructor: LunarCalendar,
    getLunnarDate: function () {
        if (!this.lunarDay) {
            [this.lunarYear, this.lunarMonth, this.lunarDay] = LunarCalendar.SolarToLunar(this.year, this.month, this.day);
        }
    },

    getCurDateFestival: function () {
        if (!this.festival) {
            if (!this.lunarDay) {
                this.getLunnarDate();
            }
            this.festival = LunarCalendar.getCurrentFestival(this.month, this.day, this.lunarMonth, this.lunarDay);
        }
    },

    getCurMonthAllDate: function () {
        if (this.curMonthAllDateInfo) {
            return;
        }
        //获取到当前月第一天在星期几
        this.curMonthAllDateInfo = [];
        let date = new Date(this.year, this.month - 1, 1);//阳历
        let weekDay = date.getDay();
        let self = this;
        for (let i = 1, len = LunarCalendar.getSolorMonthDays(this.year, this.month); i <= len; i++) {
            let lunarBuf = LunarCalendar.SolarToLunar(this.year, this.month, i);
            let weekDayBuf = (weekDay + i - 1) % 7;
            this.curMonthAllDateInfo.push({
                solorDetail: {
                    year: self.year,
                    month: self.month,
                    day: i
                },
                lunarDetail: {
                    year: lunarBuf[0],
                    month: lunarBuf[1],
                    day: lunarBuf[2]
                },
                weekDay: weekDayBuf == 0 ? 7 : weekDayBuf,
                hasFestival: LunarCalendar.getCurrentFestival(self.month, i, lunarBuf[1], lunarBuf[2]),
                hasSolorTERM: undefined,
            });
        }
    },

    getAllInfo: function () {
        this.getLunnarDate();
        this.getCurDateFestival();
        this.getCurMonthAllDate();
    }
}



export {
    factoryLunarCalendar,
    LUNAR_CALENDAR,
    CONSTANT
};


