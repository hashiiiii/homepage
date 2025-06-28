import { useState, useEffect } from 'react';

interface UseStaticDataResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/**
 * 静的データ用のカスタムフック
 * APIコールと同じインターフェースを提供するが、実際は同期的にデータを返す
 */
export function useStaticData<T>(
  dataProvider: () => Promise<T>,
  deps: React.DependencyList = []
): UseStaticDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await dataProvider();

        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}
