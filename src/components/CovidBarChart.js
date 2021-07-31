/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {BarChart} from 'react-native-chart-kit';
import {View} from 'react-native';
import {abbreviate} from '../helpers/index';
import {SIZES} from '../constants';

const chartConfig = {
  backgroundColor: '#fff',
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 2,
  barPercentage: 0.8,
  color: (opacity = 0.6) => `rgba(21, 11, 64, ${opacity})`,
  propsForHorizontalLabels: {
    fontSize: '9',
  },
  propsForLabels: {
    fontSize: '9',
  },
};

const DEFAULT_DATA = {
  labels: ['25/7', '26/7', '27/7', '28/7', '29/7', '30/7'],
  datasets: [
    {
      data: [1, 2, 3, 4, 5, 6],
      color: (opacity = 1) => `rgba(0, 145, 255, ${opacity})`,
    },
  ],
};

const generateChartData = chartData => {
  let previousNumber = 0;
  const listOfNumbers = [];
  let listOfLabels = [];

  for (const property in chartData) {
    if (previousNumber !== 0) {
      const differenceCases = chartData[property] - previousNumber;
      listOfNumbers.push(differenceCases);
      listOfLabels.push(`${property}`.slice(0, -3));
    }
    previousNumber = chartData[property];
  }

  return {
    labels: listOfLabels,
    datasets: [
      {
        data: listOfNumbers,
        color: (opacity = 1) => `rgba(0, 145, 255, ${opacity})`,
      },
    ],
  };
};

const CovidBarChart = ({data}) => {
  const isEmptyData = Object.keys(data).length === 0;
  const dataSource = isEmptyData ? DEFAULT_DATA : generateChartData(data);

  return (
    <View style={{alignItems: 'center'}}>
      <BarChart
        data={dataSource}
        width={SIZES.width - 40}
        height={240}
        chartConfig={chartConfig}
        fromZero={true}
      />
    </View>
  );
};

export default CovidBarChart;
