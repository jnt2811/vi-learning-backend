const vn_zone = 'Asia/Ho_Chi_Minh';
// const vn_zone = 'America/Los_Angeles'
const moment = require("moment-timezone");

function ConvertTime() {

    this.getCurrentDate = getCurrentDate;
    this.getCurrentHour = getCurrentHour;
    this.hienThiNgay02 = hienThiNgay02;
}

module.exports = new ConvertTime;

function getCurrentDate(mili){
    if(mili){
        return moment.tz(new Date(mili),vn_zone).format("YYYYMMDD")
    } else {
        return moment.tz(vn_zone).format('YYYYMMDD');
    }
}

function getCurrentHour(){
    return moment.tz(vn_zone).format('HH:mm');
}

/**
 * TODO: Hiển thị ngày
 * @param {*} NGAY : '20220316' => "2022-03-16"
 */
function hienThiNgay(NGAY){
    let [_1,_2,_3,_4,_5,_6,_7,_8] = NGAY;
    return `${_1}${_2}${_3}${_4}-${_5}${_6}-${_7}${_8}`
}

function hienThiNgay02(NGAY){
    if(!NGAY) return '';
    NGAY = hienThiNgay(NGAY);
    let [nam, thang, ngay] = NGAY.split('-');
    return `${ngay}/${thang}/${nam}`;
}

/////////////////  concat(phieu.GIO ,' ', DATE_FORMAT(STR_TO_DATE(phieu.NGAY,'%Y%m%d'), '%d/%m/%Y')) as THOI_GIAN,