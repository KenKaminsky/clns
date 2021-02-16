import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
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
import { Flex, FlexCenter, Grid } from '../../styles';
import useInsight from '../../hooks/useInsight';
import { IOption } from '../../reducers/insightReducer';
import { DataLayout, InsightButton } from './styles';
import { Link } from 'react-router-dom';

interface IData {
  [key: string]: string;
}

const Data = () => {
  const { state, changeSeries } = useInsight();

  const {
    isLoading: optionsLoading,
    error: optionsError,
    data: options,
  } = useQuery('options', () =>
    fetch('http://localhost:3001/list-targets')
      .then((res) => res.json())
      .then((data) => data.map((d: string) => ({ value: d, label: d }))),
  );

  const { isLoading: dataLoading, error: dataError, data } = useQuery(
    'data',
    () =>
      fetch('http://localhost:3001/data')
        .then((res) => res.json())
        .then((data: IData[]) => {
          const res = data.reduce<{
            [key: string]: { x: number; y: number | null; color: string }[];
          }>((acc, dp) => {
            const [index, ...keys] = Object.keys(dp);
            const [day, month, year] = dp[index]
              .split('/')
              .map((i) => parseInt(i));
            const date = new Date(year, month, day).getTime();
            keys.map((key) => {
              if (!acc[key]) acc[key] = [];
              acc[key].push({
                x: date,
                y:
                  dp[key] === ''
                    ? null
                    : parseFloat(parseFloat(dp[key]).toFixed(2)),
                color: 'white',
              });
            });
            return acc;
          }, {});
          console.log(res);
          return res;
        }),
  );

  useEffect(() => {
    if (!data) return;

    // console.log(data);
  }, [data]);

  const handleSelectChange = useCallback(
    (selectedOption) => {
      changeSeries(selectedOption);
      console.log(`Option selected:`, selectedOption);
    },
    [changeSeries],
  );

  return (
    <>
      <h1>Data</h1>
      <FlexCenter>
        {optionsLoading ? (
          <p>Loading...</p>
        ) : optionsError ? (
          <p>Oooops... Something went wrong</p>
        ) : options ? (
          <div>
            {
              <DataLayout cols={2} rows={1}>
                <Flex>
                  <Select options={options} onChange={handleSelectChange} />
                  <InsightButton
                    as={Link}
                    to={`/insight/${state?.series?.value || options[1].value}`}
                  >
                    Predict
                  </InsightButton>
                </Flex>
                <Flex>
                  {dataLoading ? (
                    <p>Loading...</p>
                  ) : dataError ? (
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
              </DataLayout>
            }
          </div>
        ) : (
          ''
        )}
      </FlexCenter>
    </>
  );
};

export default Data;
