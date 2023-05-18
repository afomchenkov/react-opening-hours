import { useFetch } from './hooks';
import { OpeningHoursDto } from './types';
import OpeningHours from './components/opening-hours/OpeningHours';
import './App.scss';

const App = () => {
  const { response: schedule, isLoading } = useFetch<OpeningHoursDto>('data.json');

  if (isLoading || !schedule) {
    return null
  }

  return (
    <>
      <OpeningHours data={schedule}/>
    </>
  );
}

export default App;
