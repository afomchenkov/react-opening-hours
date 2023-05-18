export enum DayOfWeek {
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday',
  Sunday = 'sunday',
}

export type OpenClosePair = [number, number]

export type DayOpenings = {
  day: DayOfWeek,
  times: OpenClosePair[],
}

export type OpenTimeDto = {
  type: 'open' | 'close',
  value: number,
}

export type OpeningHoursDto = Record<DayOfWeek, OpenTimeDto[]>
