import calendar from "../assets/icons/calendar-days.svg";
import home from "../assets/icons/home.svg";
import list from "../assets/icons/list.svg";
import settings from "../assets/icons/settings.svg";

export const icons = {
  home,
  list,
  settings,
  calendar,
} as const;

export type IconKey = keyof typeof icons;
