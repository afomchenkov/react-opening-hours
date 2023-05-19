import {
  DayOfWeek,
  OpenTimeDto,
  OpeningHoursDto,
  DayOpenings,
  OpenClosePair,
} from '../types';

export const DAYS_OF_WEEK_FROM_SUNDAY: DayOfWeek[] = [
  DayOfWeek.Sunday,
  DayOfWeek.Monday,
  DayOfWeek.Tuesday,
  DayOfWeek.Wednesday,
  DayOfWeek.Thursday,
  DayOfWeek.Friday,
  DayOfWeek.Saturday,
];

export const DEFAULT_OPTIONS = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

const IS_LOGGING_ENABLED = false;

export enum LogType {
  Warning = 'warning',
  Error = 'error',
  Log = 'log',
}

export type DebugLog = (message: string, logType?: LogType) => void

export const debugLog: DebugLog = (message = '', logType = LogType.Log) => {
  if (!message || !IS_LOGGING_ENABLED) {
    return;
  }

  switch (logType) {
    case LogType.Error:
      console.error('Error: ', message);
      break;
    case LogType.Warning:
      console.warn('Warning: ', message);
      break;
    case LogType.Log:
      console.log('Log: ', message);
      break;
    default:
      console.error('Undefined: ', message);
  }
}

export const dispatchRequest = async <T>(
  url: string,
  options: Record<string, unknown> = DEFAULT_OPTIONS
): Promise<T> => {
  const request = new Request(url, options);
  const response = await fetch(request);
  return await response.json() as T;
};

export const closePeriods = (data: OpeningHoursDto): OpeningHoursDto => {
  const days = Object.values(DayOfWeek);
  const daysWithClosedPeriods = { ...data };

  days.forEach((day, i) => {
    const firstEvent: OpenTimeDto | undefined = data[day]?.[0];
    const isOpenedOnPreviousDay: boolean = firstEvent?.type === 'close';

    if (isOpenedOnPreviousDay) {
      const previousDay = i > 0 ? days[i - 1] : days[6];
      daysWithClosedPeriods[day].shift();
      daysWithClosedPeriods[previousDay]?.push(firstEvent);
    }
  });

  return daysWithClosedPeriods;
}

export const parseOpeningHours = (data: OpeningHoursDto): DayOpenings[] => {
  const daysWithClosedPeriods = closePeriods(data);

  return (Object.keys(daysWithClosedPeriods) as DayOfWeek[])
    .reduce((acc: DayOpenings[], day: DayOfWeek) => {
      const times: OpenClosePair[] = openTimeToOpenClosePair(daysWithClosedPeriods[day]);
      return [...acc, { day, times }];
    }, []);
}

export const openTimeToOpenClosePair = (openTime: OpenTimeDto[]): OpenClosePair[] => {
  const times: OpenClosePair[] = [];
  const len = openTime.length - 1;

  for (let i = 0; i < len; i++) {
    if (i % 2 === 0) {
      times.push([openTime[i].value, openTime[i + 1].value]);
    }
  }

  return times;
}

export const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export const secondsToLocaleTime = (seconds: number, locale: string = 'en-US'): string =>
  new Date(seconds * 1000)
    .toLocaleString(locale, { timeZone: 'UTC', hour: 'numeric', hour12: true });
