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

export function formatDateWithTime(date: Date): string {
  const now = new Date();

  if (isToday(date)) {
    return `Today at ${format(date, 'hh:mm a')}`;
  }

  if (isThisWeek(date, { weekStartsOn: 1 })) {
    return `${format(date, 'EEEE')} at ${format(date, 'hh:mm a')}`;
  }

  const daysDifference = differenceInDays(now, date);

  if (daysDifference <= 30) {
    return `${daysDifference} days ago at ${format(date, 'hh:mm a')}`;
  }

  return `${format(date, 'dd MMM yyyy')} at ${format(date, 'hh:mm a')}`;
}

