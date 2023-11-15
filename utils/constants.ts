import { ActiveMonthT } from "@/app/redux/features/strava-slice";

export const months: ActiveMonthT[] = [
  { name: "january", before: 1672531200, after: 1675209600 }, // January 2023
  { name: "february", before: 1675209600, after: 1677628800 }, // February 2023
  { name: "march", before: 1677628800, after: 1680307200 }, // March 2023
  { name: "april", before: 1680307200, after: 1682899200 }, // April 2023
  { name: "may", before: 1682899200, after: 1685577600 }, // May 2023
  { name: "june", before: 1685577600, after: 1688169600 }, // June 2023
  { name: "july", before: 1688169600, after: 1690848000 }, // July 2023
  { name: "august", before: 1690848000, after: 1662041600 }, // August 2023
  { name: "september", before: 1693526400, after: 1696118400 }, // September 2023
  { name: "october", before: 1696118400, after: 1698796800 }, // October 2023
  { name: "november", before: 1698796800, after: 1701388800 }, // November 2023
  { name: "december", before: 1701388800, after: 1704067199 }, // December 2023
];
