

type dayList = { date: Date; current: Boolean; }

const getMonthDayList = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    console.log(firstDay)
    const weekOrder = firstDay.getDay();
    // 面板中的第一天
    const firstDate = firstDay.getTime() - weekOrder * 24 * 60 * 60 * 1000;

    let list: dayList[] = [];

    // 6行7列
    for (let i = 0; i < 42; i++) {
        const d = new Date(firstDate + i * 24 * 60 * 60 * 1000);
        list.push({ date: d, current: d.getMonth() === month ? true : false });
    };
    return list;
}


export { getMonthDayList }