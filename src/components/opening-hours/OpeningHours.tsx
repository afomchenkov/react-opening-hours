import { FC } from 'react';
import { HiOutlineClock } from 'react-icons/hi';
import { DayOpenings } from '../../types';
import { useOpeningHours } from '../../hooks';
import DayInfo from '../day-info/DayInfo';
import './OpeningHours.scss';

type OpeningHoursProps = {
  data: any
}

const OpeningHours: FC<OpeningHoursProps> = ({ data }) => {
  const { today, daysWithOpenings } = useOpeningHours(data)

  return (
    <div className='opening-hours'>
      <div className='opening-hours--header'>
        <HiOutlineClock className='opening-hours--header-icon' />
        <div className='opening-hours--header-title'>
          Opening hours
        </div>
      </div>

      {daysWithOpenings.map((dayOpenings: DayOpenings) =>
        <DayInfo
          key={dayOpenings.day}
          data-test-id='day-line'
          dayOpenings={dayOpenings}
          today={today}
        />
      )}
    </div>
  );
}

export default OpeningHours;
