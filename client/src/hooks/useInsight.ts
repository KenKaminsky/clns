import { useCallback, useContext } from 'react';
import { IInsightProvider, InsightContext } from '../providers/insightProvider';
import { CHANGE_SERIES, IDataSeries } from '../reducers/insightReducer';

export interface IUseInsight extends IInsightProvider {
  changeSeries: (series: IDataSeries) => void;
}

const useInsight = (): IUseInsight => {
  const context = useContext(InsightContext);
  if (!context) {
    throw new Error(`useInsight must be used within a InsightProvider`);
  }
  const { state, dispatch } = context;

  const changeSeries = useCallback(
    (series: IDataSeries) => dispatch({ type: CHANGE_SERIES, payload: series }),
    [dispatch],
  );

  return { state, dispatch, changeSeries };
};

export default useInsight;
