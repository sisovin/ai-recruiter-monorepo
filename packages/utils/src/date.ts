/**
 * Formats a given date into a specified format.
 *
 * @param date - The date to format.
 * @param format - The format string.
 * @returns The formatted date string.
 */
export function formatDate(date: Date, format: string): string {
  const options: Intl.DateTimeFormatOptions = {};

  if (format.includes('yyyy')) {
    options.year = 'numeric';
  } else if (format.includes('yy')) {
    options.year = '2-digit';
  }

  if (format.includes('MMMM')) {
    options.month = 'long';
  } else if (format.includes('MMM')) {
    options.month = 'short';
  } else if (format.includes('MM')) {
    options.month = '2-digit';
  } else if (format.includes('M')) {
    options.month = 'numeric';
  }

  if (format.includes('dd')) {
    options.day = '2-digit';
  } else if (format.includes('d')) {
    options.day = 'numeric';
  }

  if (format.includes('HH')) {
    options.hour = '2-digit';
  } else if (format.includes('H')) {
    options.hour = 'numeric';
  }

  if (format.includes('mm')) {
    options.minute = '2-digit';
  } else if (format.includes('m')) {
    options.minute = 'numeric';
  }

  if (format.includes('ss')) {
    options.second = '2-digit';
  } else if (format.includes('s')) {
    options.second = 'numeric';
  }

  return new Intl.DateTimeFormat('en-US', options).format(date);
}
