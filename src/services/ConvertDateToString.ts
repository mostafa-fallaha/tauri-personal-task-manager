export default function convertDateToString(
  hours: number,
  minutes: number,
  seconds: number
): string {
  let hourStr = hours < 10 ? ("0" + hours).toString() : hours.toString();
  let minuteStr =
    minutes < 10 ? ("0" + minutes).toString() : minutes.toString();
  let secondStr =
    seconds < 10 ? ("0" + seconds).toString() : seconds.toString();

  let str = hourStr + ":" + minuteStr + ":" + secondStr;
  return str;
}
