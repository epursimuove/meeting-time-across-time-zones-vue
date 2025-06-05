export const appVersion = __APP_VERSION__;
// export const appName = __APP_NAME__;
export const releaseDate = "2025-06-05";

const convenienceSlots = {
    red: [21, 22, 23, 0, 1, 2, 3, 4, 5, 6],
    orange: [7, 18, 19, 20],
    yellow: [8, 16, 17],
    yellowWeekend: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
};

export const getConvenienceIndicator = hourOfDayDateTime => {
    let cssClass;

    const hourOfDay = hourOfDayDateTime.hour;
    const dayOfWeek = hourOfDayDateTime.weekdayLong;
    const isWeekend = ["Saturday", "Sunday"].includes(dayOfWeek);

    if (hourOfDayDateTime.diffNow().toObject().milliseconds < 0) {
        cssClass = "in-the-past";
    } else if (convenienceSlots.red.includes(hourOfDay)) {
        cssClass = "really-bad";
    } else if (convenienceSlots.orange.includes(hourOfDay)) {
        cssClass = "bad";
    } else if (!isWeekend && convenienceSlots.yellow.includes(hourOfDay)) {
        cssClass = "okay";
    } else if (isWeekend && convenienceSlots.yellowWeekend.includes(hourOfDay)) {
        cssClass = "okay";
    } else {
        cssClass = "good";
    }
    return cssClass;
};
