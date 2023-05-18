import { describe, expect } from '@jest/globals';
import { parseOpeningHours, secondsToLocaleTime } from '../';
import { DayOfWeek, DayOpenings } from '../../types';
import {
  onePeriodPerEveryDay,
  severalPeriodsPerDay,
  periodClosedNextDay,
} from '../../../mocks/openingHours';

describe('Parse opening hours', () => {
  it('should parse correctly one period per day - no overlaps', () => {
    const openings: DayOpenings[] = [
      { day: DayOfWeek.Monday, times: [] },
      { day: DayOfWeek.Tuesday, times: [[36000, 64800]] },
      { day: DayOfWeek.Wednesday, times: [] },
      { day: DayOfWeek.Thursday, times: [[36000, 64800]] },
      { day: DayOfWeek.Friday, times: [[36000, 64800]] },
      { day: DayOfWeek.Saturday, times: [[36000, 64800]] },
      { day: DayOfWeek.Sunday, times: [[43200, 75600]] }];
    expect(parseOpeningHours(onePeriodPerEveryDay)).toEqual(openings);
  });

  it('should parse correctly several periods per day - no overlaps', () => {
    const openings: DayOpenings[] = [
      { day: DayOfWeek.Monday, times: [] },
      { day: DayOfWeek.Tuesday, times: [[36000, 50400], [54000, 75600]] },
      { day: DayOfWeek.Wednesday, times: [] },
      { day: DayOfWeek.Thursday, times: [] },
      { day: DayOfWeek.Friday, times: [] },
      { day: DayOfWeek.Saturday, times: [] },
      { day: DayOfWeek.Sunday, times: [] }];
    expect(parseOpeningHours(severalPeriodsPerDay)).toEqual(openings);
  });

  it('should parse correctly period closed next day', () => {
    const openings: DayOpenings[] = [
      { day: DayOfWeek.Monday, times: [] },
      { day: DayOfWeek.Tuesday, times: [] },
      { day: DayOfWeek.Wednesday, times: [] },
      { day: DayOfWeek.Thursday, times: [] },
      { day: DayOfWeek.Friday, times: [[36000, 3600]] },
      { day: DayOfWeek.Saturday, times: [[36000, 3600,]] },
      { day: DayOfWeek.Sunday, times: [[43200, 75600]] }];
    expect(parseOpeningHours(periodClosedNextDay)).toEqual(openings);
  });

  it('should format seconds since midnight to hh a', () => {
    expect(secondsToLocaleTime(0)).toBe('12 AM');
    expect(secondsToLocaleTime(36000)).toBe('10 AM');
    expect(secondsToLocaleTime(64800)).toBe('6 PM');
  });
});
