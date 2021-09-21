import { reactive, computed, readonly } from 'vue';

const weeks = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

const getDays = () => {
    let year = state.year;
    let month = state.month;

    let arr = [];

    let day = new Date(year, month, 1);
    day.setDate( day.getDate() - day.getDay() );

    for (let i = 0; i < 42; i++) {
        let className = ['current'];
        if (day.getMonth() < month) {
            className = ['prev'];
        }
        if (day.getMonth() > month) {
            className = ['next'];
        }
        if (day.getFullYear() == today.getFullYear() && day.getMonth() == today.getMonth() && day.getDate() == today.getDate()) {
            className.push('is-today');
        }
        arr.push({
            year: day.getFullYear(),
            month: day.getMonth(),
            date: day.getDate(),
            day: day.getDay(),
            className
        });
        day.setDate(day.getDate() + 1);
    }

    arr = [arr.slice(0,7), arr.slice(7,14), arr.slice(14, 21), arr.slice(21, 28), arr.slice(28,35), arr.slice(35,42)];

    return arr;
}

const setCalendar = (year, month) => {
    state.year = year;
    state.month = month;
}

const setToPrevMonth = () => {
    let date = new Date(state.year, state.month-1);
    state.year = date.getFullYear();
    state.month = date.getMonth();
}
const setToNextMonth = () => {
    let date = new Date(state.year, state.month+1);
    state.year = date.getFullYear();
    state.month = date.getMonth();
}
const setToToday = () => {
    let date = new Date();
    state.year = date.getFullYear();
    state.month = date.getMonth();
}

const today = new Date();

const state = reactive({
    weeks: readonly(weeks),
    year: today.getFullYear(),
    month: today.getMonth(),
    days: computed( getDays )
});

export {
    state,
    setCalendar,
    setToPrevMonth,
    setToNextMonth,
    setToToday
}