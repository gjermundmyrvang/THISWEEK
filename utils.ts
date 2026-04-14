const WEEKDAY = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

export function getNext7Days() {
  const today = new Date();

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() + i);

    return {
      date,
      label: WEEKDAY[date.getDay()],
    };
  });
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export const getKey = (date: Date) => date.toISOString().split("T")[0];
