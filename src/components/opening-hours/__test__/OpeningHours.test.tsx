import { render, screen } from '@testing-library/react'
import { onePeriodPerEveryDay } from '../../../../mocks/openingHours';
import OpeningHours from '../OpeningHours';

describe('OpeningHours test', () => {
  test('should render 7 DayLine elements', () => {
    render(<OpeningHours data={onePeriodPerEveryDay} />);
    const dayOpenCloseInfo = screen.getAllByTestId('day-info');
    expect(dayOpenCloseInfo.length).toBe(7);
  });
});
