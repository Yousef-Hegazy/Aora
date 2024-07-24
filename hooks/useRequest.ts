import { AxiosError, AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

interface CommonResponse<T> {
  isLoading: boolean;
  result: T;
  error: CommonError | null;
  refetch: () => Promise<void>;
}

interface CommonError {
  message: string;
  code: number;
  innerError?: any;
}

const useRequest = <T>({
  reqFn,
  onSuccess,
  onError,
  onFinally,
  initialLoading = true,
  initialData = null,
  dependencies = [],
  enabled = true,
}: {
  reqFn: () => Promise<T>;
  onError?: (error: CommonError) => void;
  onSuccess?: (data: T) => void;
  onFinally?: () => void;
  initialLoading?: boolean;
  initialData?: any;
  dependencies?: any[];
  enabled?: boolean;
}): CommonResponse<T> => {
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [result, setResult] = useState<any>(initialData);
  const [error, setError] = useState<CommonError | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await reqFn();

      onSuccess?.(res);

      setResult(res);
    } catch (err) {
      let error;

      if (err instanceof AxiosError) {
        error = {
          message:
            typeof err.response?.data === "string" ? err.response.data : err.message || "An unexpected error occurred",
          code: err.response?.status || 500,
        };
      } else {
        error = {
          message: "Something went wrong, please contact the admin",
          code: 500,
          innerError: err,
        };
      }

      console.log(error);

      setResult(initialData);
      setError(error);
      onError?.(error);
    } finally {
      onFinally?.();
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, dependencies);

  const refetch = useCallback(() => fetchData(), []);

  return {
    result,
    isLoading,
    error,
    refetch,
  };
};

export default useRequest;
