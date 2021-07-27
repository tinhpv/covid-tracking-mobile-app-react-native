import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Colors from '../constants/Colors';

const generateColor = type => {
  switch (type) {
    case 'INFECTIONS':
      return ['#D2C6FF', '#B49DFC', '#301786'];
    case 'DEATHS':
      return ['#F6BFBF', '#FDB8B8', '#CC0E0E'];
    case 'RECOVERIES':
      return ['#CAE9C1', '#A9F095', '#217E08'];
    case 'CRITICAL':
      return ['#FDECBE', '#FFDE8C', '#F3B200'];
  }
};

const StatisticView = ({type, mainNumber, todayIncrement}) => {
  const [gradientColor, todayBackgroundColor, mainTextColor] =
    generateColor(type);
  const gradientColorList = [gradientColor, '#ffffff', '#ffffff'];

  return (
    <LinearGradient colors={gradientColorList} style={styles.container}>
      <View style={styles.innerView}>
        <View style={{...styles.today, backgroundColor: todayBackgroundColor}}>
          <Text style={{...styles.todayText, color: mainTextColor}}>
            +{todayIncrement}
          </Text>
        </View>
        <Text style={{...styles.mainNumber, color: mainTextColor}}>
          {mainNumber}
        </Text>
        <Text style={styles.type}>{type}</Text>
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
  },
  todayText: {
    fontSize: 12,
    fontFamily: 'Raleway-SemiBold',
    padding: 5,
    textAlign: 'center',
  },
  mainNumber: {
    fontSize: 18,
    fontFamily: 'Raleway-ExtraBold',
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
