import {
  DayOfWeek,
  OpenTimeDto,
  OpeningHoursDto,
  DayOpenings,
  OpenClosePair,
} from '../types';

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