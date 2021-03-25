import { useContext, Context } from 'react';

export const useSafeContext = <T>(context: Context<T>): T => {
  console.log(context);
  const checkForContext = useContext(context);
  if (!checkForContext) {
    throw Error('Error: hook must be called within a provider');
  }
  return checkForContext;
};
