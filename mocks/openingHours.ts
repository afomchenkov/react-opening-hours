import { OpeningHoursDto, DayOfWeek, DayOpenings } from '../src/types';

export const dayWithTimes: DayOpenings[] = [
  { day: DayOfWeek.Monday, times: [] },
  { day: DayOfWeek.Tuesday, times: [[36000, 64800]] },
  { day: DayOfWeek.Wednesday, times: [] },
  { day: DayOfWeek.Thursday, times: [[36000, 64800]] },
  { day: DayOfWeek.Friday, times: [[36000, 5040], [54000, 64800]] },
  { day: DayOfWeek.Saturday, times: [[36000, 64800]] },
  { day: DayOfWeek.Sunday, times: [[43200, 75600]] }
];

export const onePeriodPerEveryDay: OpeningHoursDto = {
  monday: [],
  tuesday: [
    { type: 'open', value: 36000 },
    { type: 'close', value: 64800 }
  ],
  wednesday: [],
  thursday: [
    { type: 'open', value: 36000 },
    { type: 'close', value: 64800 }
  ],
  friday: [
    { type: 'open', value: 36000 },
    { type: 'close', value: 64800 }
  ],
  saturday: [
    { type: 'open', value: 36000 },
    { type: 'close', value: 64800 }
  ],
  sunday: [
    { type: 'open', value: 43200 },
    { type: 'close', value: 75600 }
  ]
};

export const severalPeriodsPerDay: OpeningHoursDto = {
  monday: [],
  tuesday: [
    { type: 'open', value: 36000 },
    { type: 'close', value: 50400 },
    { type: 'open', value: 54000 },
    { type: 'close', value: 75600 }
  ],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
  sunday: []
}

export const periodClosedNextDay: OpeningHoursDto = {
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [{ type: 'open', value: 36000 }],
  saturday: [
    { type: 'close', value: 3600 },
    { type: 'open', value: 36000 }
  ],
  sunday: [
    { type: 'close', value: 3600 },
    { type: 'open', value: 43200 },
    { type: 'close', value: 75600 }
  ]
}

