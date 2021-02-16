export interface IOption {
  value: string;
  lable: string;
}

export interface IDataSeries extends IOption {}

export interface IState {
  series: IDataSeries | null;
}

export const CHANGE_SERIES = 'CHANGE_SERIES';

export type IAction = { type: typeof CHANGE_SERIES; payload: IDataSeries };

export const insightReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case CHANGE_SERIES:
      return { ...state, series: action.payload };
    default:
      return state;
  }
};
