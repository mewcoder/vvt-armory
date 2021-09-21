<template>
  <div class="el-calendar">
    <!-- 日历头部 -->
    <div class="el-calendar__header">
      <div class="el-calendar__title">
        {{ state.year }} {{ t("el.datepicker.year") }} {{ state.month + 1 }}
        {{ t("el.datepicker.month") }}
      </div>
      <div class="el-calendar__button-group">
        <div class="el-button-group">
          <div class="el-button-group">
            <button
              type="button"
              class="el-button el-button--plain el-button--mini"
              @click="setToPrevMonth"
            >
              <span>{{ t("el.datepicker.prevMonth") }}</span>
            </button>
            <button
              type="button"
              class="el-button el-button--plain el-button--mini"
              @click="setToToday"
            >
              <span>{{ t("el.datepicker.today") }}</span>
            </button>
            <button
              type="button"
              class="el-button el-button--plain el-button--mini"
              @click="setToNextMonth"
            >
              <span>{{ t("el.datepicker.nextMonth") }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="el-calendar__body">
      <!-- 日历的星期列表 -->
      <table class="el-calendar-table" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th v-for="week of state.weeks" :key="week">
              {{ t(`el.datepicker.weeks.${week}`) }}
            </th>
          </tr>
        </thead>
      </table>

      <!-- 选择月对应的日期列表 -->
      <table class="el-calendar-table" cellspacing="0" cellpadding="0">
        <tbody>
          <tr
            class="el-calendar-table__row"
            v-for="row of state.days"
            :key="row"
          >
            <td :class="cell.className" v-for="cell of row" :key="cell">
              <div class="el-calendar-day">
                <span>{{ cell.date }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="js">
import local from "../utils/local";
import {
  state,
  setCalendar,
  setToPrevMonth,
  setToNextMonth,
  setToToday,
} from "../utils/date";
import { reactive } from "vue";

export default {
  name: "Calendar",

  setup() {
    const t = local("zh-cn");

    // console.log(t('el.datepicker.today'));
    // console.log(t('el.select.noMatch'));
    // console.log( getLocalWeeks(t) );

    // console.log(days);

    return {
      state,

      setToPrevMonth,
      setToNextMonth,
      setToToday,

      t,
    };
  },
};
</script>
