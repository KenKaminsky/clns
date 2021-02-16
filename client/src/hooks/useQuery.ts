import { useEffect, useState } from 'react';

const PORT = process.env.PORT || '3001';
const HOST = process.env.SERVER_URL || 'http://localhost/';
const API = `${HOST}/${PORT}`;

export interface IQuery {
  data: any;
  isLoading: boolean;
  error: Error | null;
  updateChoice: (choice: any) => void;
}

const useQuery = (): any => {
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<Error | null>(null);

  const [data, setData] = useState();

  useEffect(() => {
    setIsLoading(true);
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        if (!data?.success) {
          setError(new Error(`Could not get the requested data.`));
        } else {
          setError(null);
        }
      });
  }, []);

  return { data, isLoading, error, setData };
};

export default useQuery;
