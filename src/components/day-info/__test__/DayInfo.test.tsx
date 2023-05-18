import { render, screen } from '@testing-library/react'
import { DayOfWeek } from '../../../types';
import { dayWithTimes } from '../../../../mocks/openingHours';
import DayInfo from '../DayInfo';

describe('DayInfo test', () => {
  test('should show Today label if line is for current week day', () => {
    const [testDayMonday] = dayWithTimes;
    render(<DayInfo dayOpenings={testDayMonday} today={DayOfWeek.Monday} />);
    const element = screen.getByTestId('today');
    expect(element).toBeInTheDocument();
    expect(element.textContent).toBe('TODAY');
  });

  test('should not show Today label if line is not for current week day', () => {
    const [testDayMonday] = dayWithTimes;
    render(<DayInfo dayOpenings={testDayMonday} today={DayOfWeek.Tuesday} />);
    expect(() => screen.getAllByTestId('today')).toThrow('Unable to find an element');
  });

  test('should show Closed label and no time period if closed all day', () => {
    const [,,testDayWednesday] = dayWithTimes;
    render(<DayInfo dayOpenings={testDayWednesday} today={DayOfWeek.Tuesday} />);
    const closed = screen.getByTestId('closed');
    expect(closed.textContent).toBe('Closed');
    expect(() => screen.getByTestId('open-close-time')).toThrow('Unable to find an element');
  });

  test('should show time period and no Closed label if has opening period', () => {
    const [,testDayTuesday] = dayWithTimes;
    render(<DayInfo dayOpenings={testDayTuesday} today={DayOfWeek.Monday} />);
    expect(() => screen.getByTestId('closed')).toThrow('Unable to find an element');
    const openCloseTime = screen.getByTestId('open-close-time');
    expect(openCloseTime.textContent).toBe('10 AM - 6 PM');
  });

  test('should show all time periods', () => {
    const [,,,,testDayFriday] = dayWithTimes;
    render(<DayInfo dayOpenings={testDayFriday} today={DayOfWeek.Monday} />);
    const openCloseTime = screen.getAllByTestId('open-close-time');
    expect(openCloseTime.length).toBe(2);
  });
});
