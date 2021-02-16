import React from 'react';
import { useQuery } from 'react-query';

import { Link, useParams } from 'react-router-dom';
import Select from 'react-select';
import {
  HorizontalGridLines,
  LineSeries,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
} from 'react-vis';
import 'react-vis/dist/style.css';
import useInsight from '../../hooks/useInsight';
import { Flex, FlexCenter } from '../../styles';
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

  const { isLoading, error, data } = useQuery('prediction', () =>
    fetch(`http://localhost:3001/predict?target=${series || 'example.D2'}`)
      .then((res) => res.json())
      .then((data) => data.map((d: string) => ({ value: d, label: d }))),
  );

  //localhost:3001/predict?target=example.D1

  //http: console.log(state.series);
  return (
    <div>
      <FlexCenter>
        <h1>Insight</h1>
        <div>{JSON.stringify(state.series)}</div>
        <div>{series}</div>
      </FlexCenter>
      <FlexCenter>
        {
          <PredictLayout cols={2} rows={1}>
            <Flex>
              {isLoading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Oooops... Something went wrong</p>
              ) : data ? (
                <XYPlot xType='time' width={1000} height={300}>
                  <HorizontalGridLines />
                  <VerticalGridLines />
                  <XAxis title='X Axis' />
                  <YAxis title='Y Axis' />
                  <LineSeries
                    getNull={(d) => d.y !== null}
                    // @ts-ignore
                    data={data[state?.series?.value || options[1].value]}
                  />
                </XYPlot>
              ) : (
                ''
              )}
            </Flex>
          </PredictLayout>
        }
      </FlexCenter>
    </div>
  );
};

export default Insight;
