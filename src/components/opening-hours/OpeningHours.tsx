import { FC } from 'react';
import { HiOutlineClock } from 'react-icons/hi';
import { DayWithTimes } from '../../types';
import { useOpeningHours } from '../../hooks';
import DayInfo from '../day-info/DayInfo';
import './OpeningHours.scss';

type OpeningHoursProps = {
  data: any
}

const OpeningHours: FC<OpeningHoursProps> = ({ data }) => {
  const { todaysDay, dayWithTimes } = useOpeningHours(data)

  return (
    <div className='opening-hours'>
      <header className='opening-hours--header'>
        <HiOutlineClock className='opening-hours--header-icon' />
        <div className='opening-hours--header-title'>
          Opening hours
        </div>
      </header>

      {dayWithTimes.map((dayWithTimes: DayWithTimes) =>
        <DayInfo
          key={dayWithTimes.day}
          data-test-id='day-line'
          dayWithTimes={dayWithTimes}
          todaysDay={todaysDay}
        />
      )}
    </div>
  );
}

export default OpeningHours;
