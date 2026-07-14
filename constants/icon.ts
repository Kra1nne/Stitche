import clock from "../assets/icons/alarm-clock.svg";
import chevronRight from "../assets/icons/angle-small-right.svg";
import app from "../assets/icons/apps.svg";
import trend from "../assets/icons/arrow-trend-up.svg";
import bell from "../assets/icons/bell.svg";
import packageIcon from "../assets/icons/box-open.svg";
import briefcase from "../assets/icons/briefcase.svg";
import sun from "../assets/icons/brightness.svg";
import burger from "../assets/icons/burger-menu.svg";
import calendar from "../assets/icons/calendar-days.svg";
import document from "../assets/icons/document.svg";
import filter from "../assets/icons/filter-list.svg";
import home from "../assets/icons/home.svg";
import info from "../assets/icons/info.svg";
import question from "../assets/icons/interrogation.svg";
import list from "../assets/icons/list.svg";
import marker from "../assets/icons/marker.svg";
import moon from "../assets/icons/moon.svg";
import add from "../assets/icons/plus-small.svg";
import qr_scan from "../assets/icons/qr-scan.svg";
import ruler from "../assets/icons/ruler-combined.svg";
import search from "../assets/icons/search.svg";
import settings from "../assets/icons/settings.svg";
import cloud from "../assets/icons/system-cloud.svg";
import tshirt from "../assets/icons/tshirt.svg";
import logout from "../assets/icons/user-logout.svg";
import user from "../assets/icons/user.svg";

export const icons = {
  chevronRight,
  trend,
  clock,
  packageIcon,
  logout,
  cloud,
  user,
  ruler,
  question,
  info,
  document,
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
  search,
  qr_scan,
  filter,
} as const;

export type IconKey = keyof typeof icons;
