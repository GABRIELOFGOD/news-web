import { format, isToday, isThisWeek, differenceInDays } from 'date-fns';

export function formatDate(date: Date): string {
  const now = new Date();

  if (isToday(date)) {
    return 'Today';
  }

  if (isThisWeek(date, { weekStartsOn: 1 })) {
    return format(date, 'EEEE');
  }

  const daysDifference = differenceInDays(now, date);

  if (daysDifference <= 30) {
    return `${daysDifference} days ago`;
  }

  return format(date, 'dd MMM yyyy');
}

