export const appVersion = __APP_VERSION__;
// export const appName = __APP_NAME__;
export const releaseDate = "2025-08-19";

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

export const getConvenienceIndicatorsForTimeZones =
    (timeZones, startTime, startTimeOffset) => {

        return timeZones
            .map(timeZone => getConvenienceIndicator(startTime.plus({hours: startTimeOffset}).setZone(timeZone.id)));
    };

export const assembleConvenienceIndicators = (convenienceIndicators) => {

    const counts = {
        good: 0,
        okay: 0,
        bad: 0,
        "really-bad": 0,
    }

    convenienceIndicators.forEach(convenienceLevel => counts[convenienceLevel]++);

    return [
        {
            css: "good",
            count: counts.good
        },
        {
            css: "okay",
            count: counts.okay
        },
        {
            css: "bad",
            count: counts.bad
        },
        {
            css: "really-bad",
            count: counts["really-bad"]
        },
    ];
};
