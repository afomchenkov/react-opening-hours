import { useEffect, useState, useMemo } from 'react';
import {
  DAYS_OF_WEEK_FROM_SUNDAY,
  parseOpeningHours,
  dispatchRequest,
} from '../utils';
import {
  DayOfWeek,
  DayOpenings,
  OpeningHoursDto,
} from '../types';

export const useFetch = <T>(url: string, options?: Record<string, unknown>) => {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<Error | unknown | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const response = await dispatchRequest<T>(url, options);
        setResponse(response);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { response, error, isLoading };
}

type UseOpeningHours = (data: OpeningHoursDto) => {
  today: DayOfWeek
  daysWithOpenings: DayOpenings[]
}

export const useOpeningHours: UseOpeningHours = (data) => {
  const today = DAYS_OF_WEEK_FROM_SUNDAY[new Date().getDay()];
  const parsedOpeningHours = useMemo(() => {
    const daysWithOpenings: DayOpenings[] = parseOpeningHours(data);

    return {
      today,
      daysWithOpenings,
    }
  }, [data, today])

  return parsedOpeningHours;
}
