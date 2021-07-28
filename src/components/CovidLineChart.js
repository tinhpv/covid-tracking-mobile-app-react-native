import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import Colors from '../constants/Colors';

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Aug'],
  datasets: [
    {
      data: [99, 43, 1, 20, 45, 28, 80, 99, 43, 1],
      color: (opacity = 1) => `rgba(0, 145, 255, ${opacity})`, // optional
      strokeWidth: 1,
    },
  ],
};

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#fff',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(21, 11, 64, ${opacity})`,
  barPercentage: 0.5,
  useShadowColorFromDataset: true,
};

const CovidLineChart = () => {
  return (
    <View>
      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
      />
    </View>
  );
};
export default CovidLineChart;
