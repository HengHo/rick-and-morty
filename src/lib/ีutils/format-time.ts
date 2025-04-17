
export function fDateThai(date: Date | string | number) {
  
    const fDate = new Date(String(date)).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  
    return fDate;
}