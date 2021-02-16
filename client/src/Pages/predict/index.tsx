import React from 'react';
import { useQuery } from 'react-query';

import { Link, useParams } from 'react-router-dom';
import Select from 'react-select';
import {
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
} from 'react-vis';
import 'react-vis/dist/style.css';
import useInsight from '../../hooks/useInsight';
import { colors, Flex, FlexCenter, Grid } from '../../styles';
import { PredictLayout } from './styles';

export interface RouterParams {
  series: string;
}

interface IPrediction {
  featureImportance: { [key: string]: number };
  predictions: (number | null)[];
  metrics: {
    confusionMetric: {
      falsePositive: number;
      truePositive: number;
      falseNegative: number;
      trueNegative: number;
    };
    detailedScoring: {
      pearsonR: number;
      spearmanRho: number;
      meanAbsError: number;
      medianAbsError: number;
      percentageAbsError: number;
      signMatch: number;
    };
    overallScores: {
      training: number;
      validation: number;
      testing: number;
    };
  };
  modelSummary: {
    algo_type: string;
    n_retrain: number;
    n_training_gap: number;
    n_training_warmup: number;
    n_window_size: number;
    scaling: string;
    training_mode: string;
    weight_decay: number;
  };
}

const Insight = () => {
  const { series } = useParams<RouterParams>();

  const { state, changeSeries } = useInsight();

  const { isLoading, error, data } = useQuery<IPrediction>('prediction', () =>
    fetch(`http://localhost:3001/predict?target=${series || 'example.D2'}`)
      .then((res) => res.json())
      .then((data) => {
        return {
          ...data,
          predictions: data.predictions.map((d: string, i: number) => ({
            x: i,
            y: !d ? null : parseFloat(d),
            color: 'white',
          })),
        };
      }),
  );

  return (
    <>
      <FlexCenter>
        <h1>Predictions</h1>
        <div>{JSON.stringify(state.series)}</div>
        <div>{series}</div>
      </FlexCenter>
      <FlexCenter>
        {
          <PredictLayout cols={2} rows={1}>
            <FlexCenter>
              <h2>Model Summary</h2>
              <Grid cols={2} rows={8}>
                {data &&
                  Object.entries(data.modelSummary).map(([key, val]) => (
                    <>
                      <label>{key}</label>
                      <div>{val}</div>
                    </>
                  ))}
              </Grid>
            </FlexCenter>
            <FlexCenter>
              {isLoading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Oooops... Something went wrong</p>
              ) : data ? (
                <XYPlot width={1000} height={300}>
                  <HorizontalGridLines />
                  <VerticalGridLines />
                  <XAxis title='X Axis' />
                  <YAxis title='Y Axis' />
                  <VerticalBarSeries
                    barWidth={5}
                    color={colors.primary}
                    // @ts-ignore
                    data={data.predictions}
                  />
                </XYPlot>
              ) : (
                ''
              )}
            </FlexCenter>
          </PredictLayout>
        }
      </FlexCenter>
    </>
  );
};

export default Insight;
