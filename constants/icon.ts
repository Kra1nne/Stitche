import app from "../assets/icons/apps.svg";
import bell from "../assets/icons/bell.svg";
import briefcase from "../assets/icons/briefcase.svg";
import sun from "../assets/icons/brightness.svg";
import burger from "../assets/icons/burger-menu.svg";
import calendar from "../assets/icons/calendar-days.svg";
import home from "../assets/icons/home.svg";
import list from "../assets/icons/list.svg";
import marker from "../assets/icons/marker.svg";
import moon from "../assets/icons/moon.svg";
import add from "../assets/icons/plus-small.svg";
import settings from "../assets/icons/settings.svg";
import tshirt from "../assets/icons/tshirt.svg";

export const icons = {
  home,
  list,
  settings,
  calendar,
  bell,
  moon,
  sun,
  tshirt,
  app,
  burger,
  briefcase,
  marker,
  add,
} as const;

export type IconKey = keyof typeof icons;
