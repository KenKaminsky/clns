import { createContext, ReactNode, useMemo, useReducer } from 'react';
import { IAction, insightReducer, IState } from '../reducers/insightReducer';

const initState: IState = {
  series: null,
};

export interface IInsightProvider {
  state: IState;
  dispatch: React.Dispatch<IAction>;
}

export const InsightContext = createContext<IInsightProvider | null>(null);

export type ProviderProps = {
  children: ReactNode;
};

export const InsightProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(insightReducer, initState);
  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state],
  );
  return <InsightContext.Provider value={value} children={children} />;
};
