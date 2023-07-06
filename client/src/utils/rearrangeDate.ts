export function rearrangeDate(date: string) {
  const dateParts = date.split("T")[0].split("-"); // ['yyyy', 'mm', 'dd']
  const rearrangedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`; // 'dd/mm/yyyy'
  return rearrangedDate;
}
