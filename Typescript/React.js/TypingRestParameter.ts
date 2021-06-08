// If we need to declare  a rest parameter that accepts any props we can do this way:

type Props = {
  propA: string[];
  propB: string;
} & Record<string, any>;

export const useHook = ({ propA, propB, ...payload }: Props) => {
  return null;
};
