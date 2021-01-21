import { Reducer, useReducer } from 'react';

type FutureFilter<T> = [T, (filter: keyof T, value: any) => void];

type Action<T> = {
  filter: keyof T;
  value: any;
};

const futureFilterReducer = <T>(state: T, action: Action<T>) => ({
  ...state,
  [action.filter]: action.value,
});

export const useFutureFilter = <T>(initialState: T): FutureFilter<T> => {
  const [state, dispatch] = useReducer<Reducer<T, Action<T>>>(
    futureFilterReducer,
    initialState
  );

  const setFutureFilter = (filter: keyof T, value: any) =>
    dispatch({
      filter,
      value,
    });

  return [state, setFutureFilter];
};
