
import { FC, ReactElement } from 'react';
import { DayOfWeek, DayOpenings, OpenClosePair } from '../../types';
import { secondsToLocaleTime, capitalise } from '../../utils';
import './DayInfo.scss';

const renderOpenCloseTime: (times: OpenClosePair[]) => ReactElement[] =
  (times) =>
    times.map(([open, close]: OpenClosePair) => {
      const openCloseTime: string = `${secondsToLocaleTime(open)} - ${secondsToLocaleTime(close)}`;
      return (
        <div
          key={openCloseTime}
          className='day-info--open-close-time'
          data-test-id='open-close-time'>
          {openCloseTime}
        </div>
      );
    });

const renderClosed = (): ReactElement => {
  return <div className='day-info--closed' data-test-id='closed'>Closed</div>;
}

type DayInfoProps = {
  dayOpenings: DayOpenings,
  today: DayOfWeek,
};

const DayInfo: FC<DayInfoProps> = ({ dayOpenings, today }) => {
  const { day, times } = dayOpenings;
  const isToday = today === day;

  return (
    <div className='day-info'>
      <div className='day-info--day-name'>
        {capitalise(day)}
      </div>

      {isToday &&
        <div className='day-info--today' data-test-id='today'>TODAY</div>
      }

      <div className='day-info--open-time'>
        {!!times.length
          ? renderOpenCloseTime(times)
          : renderClosed()
        }
      </div>
    </div>
  );
}

export default DayInfo;
