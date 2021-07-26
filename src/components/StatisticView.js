import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Colors from '../constants/Colors';

const StatisticView = () => {
  return (
    <LinearGradient
      colors={['#F6BFBF', '#ffffff', '#ffffff']}
      style={styles.container}>
      <View style={styles.innerView}>
        <View style={styles.today}>
          <Text style={styles.todayText}>+15,218</Text>
        </View>
        <Text style={styles.mainNumber}>1,889,000</Text>
        <Text style={styles.type}>INFECTIONS</Text>
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    marginLeft: 20,
  },
  innerView: {
    marginLeft: 10,
  },
  today: {
    borderRadius: 20,
    marginBottom: 4,
    backgroundColor: '#FDB8B8',
  },
  todayText: {
    fontSize: 12,
    fontFamily: 'Raleway-SemiBold',
    color: '#CC0E0E',
    padding: 5,
    textAlign: 'center',
  },
  mainNumber: {
    fontSize: 15,
    fontFamily: 'Raleway-ExtraBold',
    color: '#CC0E0E',
    margin: 4,
  },
  type: {
    fontSize: 12,
    fontFamily: 'Raleway-Regular',
    color: Colors.text.minor,
    margin: 4,
  },
});

export default StatisticView;
