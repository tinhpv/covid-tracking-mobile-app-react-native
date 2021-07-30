import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {View} from 'react-native';
import {abbreviate} from '../helpers/index';
import {SIZES, COLORS} from '../constants';

const DEFAULT_DATA = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Aug'],
  datasets: [
    {
      data: [1, 2, 3, 4, 5, 6],
      color: (opacity = 1) => `rgba(0, 145, 255, ${opacity})`,
      strokeWidth: 1,
    },
  ],
};

const generateChartData = (chartData, option) => {
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

  if (option.days === 14) {
    listOfLabels = listOfLabels.filter((num, index) => {
      return index % 3 === 0;
    });
  } else if (option.days === 30) {
    listOfLabels = listOfLabels.filter((num, index) => {
      return index % 6 === 0;
    });
  }

  return {
    labels: listOfLabels,
    datasets: [
      {
        data: listOfNumbers,
        color: (opacity = 1) => `rgba(0, 145, 255, ${opacity})`,
        strokeWidth: 4,
      },
    ],
  };
};

const chartConfig = {
  backgroundGradientFrom: COLORS.white,
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: COLORS.white,
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(21, 11, 64, ${opacity})`,
  barPercentage: 0.5,
  useShadowColorFromDataset: true,
};

const CovidLineChart = ({data, option}) => {
  const isEmptyData = Object.keys(data).length === 0;
  const dataSource = isEmptyData
    ? DEFAULT_DATA
    : generateChartData(data.cases, option);

  return (
    <View>
      <LineChart
        data={dataSource}
        width={SIZES.width - 20}
        height={220}
        chartConfig={chartConfig}
        yAxisInterval={7}
        yLabelsOffset={10}
        formatYLabel={item => {
          return abbreviate(item);
        }}
      />
    </View>
  );
};
export default CovidLineChart;
