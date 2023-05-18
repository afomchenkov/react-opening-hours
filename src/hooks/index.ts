import { useEffect, useState, useMemo } from 'react';
import { parseOpeningHours } from '../utils';
import {
  DayOfWeek,
  DayOpenings,
  OpeningHoursDto,
} from '../types';

const DAYS_OF_WEEK_FROM_SUNDAY: DayOfWeek[] = [
  DayOfWeek.Sunday,
  DayOfWeek.Monday,
  DayOfWeek.Tuesday,
  DayOfWeek.Wednesday,
  DayOfWeek.Thursday,
  DayOfWeek.Friday,
  DayOfWeek.Saturday,
];

const DEFAULT_OPTIONS = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

export const dispatchRequest = async <T>(
  url: string,
  options: Record<string, unknown> = DEFAULT_OPTIONS
): Promise<T> => {
  const request = new Request(url, options);
  const response = await fetch(request);
  return await response.json() as T;
};

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
