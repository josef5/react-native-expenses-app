export function getDateMinusDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}

export function convertDateToISO(dateString: string) {
  const dateParts = dateString.split(" ");
  const months: { [key: string]: string } = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };
  const isoDate = `${dateParts[2]}-${
    months[dateParts[1]]
  }-${dateParts[0].padStart(2, "0")}`;
  return isoDate;
}
