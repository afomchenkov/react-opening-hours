import { useFetch } from './hooks';
import OpeningHours from './components/opening-hours/OpeningHours';
import './App.scss';

const App = () => {
  const { response: schedule, isLoading } = useFetch<any>('data.json');

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
