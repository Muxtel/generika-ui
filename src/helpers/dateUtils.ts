export function weekNumberToDate(weekNumber: number, year: number): Date {
  const firstDay = new Date(year, 0, 1);
  const day = firstDay.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  return new Date(year, 0, 1 + diffToMonday + (weekNumber - 1) * 7);
}

export function dateToWeekNumber ( date: Date = new Date() ): number {
  const target = new Date(date.valueOf());
  // Convertir au jeudi de la même semaine (ISO commence le lundi)
  target.setDate(target.getDate() + 3 - ((target.getDay() + 6) % 7));
  // 1er janvier de l’année
  const firstThursday = new Date(target.getFullYear(), 0, 4);
  // Convertir le 1er janvier au jeudi de sa semaine
  const startWeek = new Date(firstThursday.valueOf());
  startWeek.setDate(startWeek.getDate() + 3 - ((firstThursday.getDay() + 6) % 7));
  // Calcul du nombre de semaines entre les deux jeudis
  const weekNumber = 1 + Math.round(
    (target.getTime() - startWeek.getTime()) / (7 * 24 * 60 * 60 * 1000)
  );

  return weekNumber;
}
