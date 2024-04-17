export default function convert_to_date(str: string): string {
  const dtObject = new Date(str);
  const weekday = dtObject.toLocaleString("en-US", { weekday: "long" });
  const month = dtObject.getMonth() + 1;
  const day = dtObject.getDate();
  const time = dtObject.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const formattedTime = `${weekday} ${day}/${month}, ${time}`;

  return formattedTime;
}
