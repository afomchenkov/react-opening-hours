
import { FC, ReactElement } from 'react';
import { DayOfWeek, dayToStringMap, DayWithTimes, OpenClosePair } from '../../types';
import { secondsToTime } from '../../utils';
import './DayInfo.scss';

type DayInfoProps = {
  dayWithTimes: DayWithTimes,
  todaysDay: DayOfWeek,
};

const renderOpenCloseTime: (times: OpenClosePair[]) => ReactElement[] =
  (times) =>
    times.map(([open, close]: OpenClosePair) => {
      const period: string = `${secondsToTime(open)} - ${secondsToTime(close)}`;
      return <div key={period} className='day-info_period' data-test-id='period'>{period}</div>;
    });

const renderClosed = (): ReactElement => {
  return <div className='day-info_closed' data-test-id='closed'>Closed</div>;
}

const DayInfo: FC<DayInfoProps> = ({ dayWithTimes, todaysDay }) => {
  const { day, times } = dayWithTimes;
  const isToday = todaysDay === day;

  return (
    <div className='day-info'>
      <div className='day-info--day-name'>
        {dayToStringMap.get(day)}
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
