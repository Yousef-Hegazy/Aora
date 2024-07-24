import { AxiosError, AxiosResponse } from "axios";

interface CommonResponse<T> {
  isSuccess: boolean;
  message: string;
  data: T | null;
  error: AxiosError | any;
}

interface CommonError {
  message: string;
  code: number;
  innerError?: any;
}

/**
 * Handles the response from an axios request, providing a structured success/error response.
 *
 * @template T The type of the data expected in the response.
 * @param {Object} params The parameters object.
 * @param {() => Promise<AxiosResponse<T>>} params.reqFn The function that performs the axios request and returns a promise.
 * @param {(error: CommonError) => void} [params.onError] Optional callback for custom error handling.
 * @param {(data: T) => void} [params.onSuccess] Optional callback for custom success handling.
 * @param {() => void} [params.onFinally] Optional callback to be executed after success/error handling.
 * @returns {Promise<CommonResponse<T>>} A promise that resolves to a CommonResponse object indicating the outcome of the request.
 */
export const handleResponse = async <T>({
  reqFn,
  onError,
  onSuccess,
  onFinally,
}: {
  reqFn: () => Promise<AxiosResponse<T>>;
  onError?: (error: CommonError) => void;
  onSuccess?: (data: T) => void;
  onFinally?: () => void;
}): Promise<CommonResponse<T>> => {
  try {
    const { data } = await reqFn();

    onSuccess?.(data);

    return {
      isSuccess: true,
      message: "Success",
      data,
      error: null,
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      onError?.({
        message:
          typeof error.response?.data === "string"
            ? error.response.data
            : error.message || "An unexpected error occurred",
        code: error.response?.status || 500,
      });

      return {
        isSuccess: false,
        message: typeof error.response?.data === "string" ? error.response.data : error.message,
        data: null,
        error,
      };
    } else {
      onError?.({
        message: "Something went wrong, please contact the admin",
        code: 500,
        innerError: error,
      });
      // console.error("An unexpected error occurred", error);
      return {
        isSuccess: false,
        message: "An unexpected error occurred",
        data: null,
        error: error,
      };
    }
  } finally {
    onFinally?.();
  }
};
