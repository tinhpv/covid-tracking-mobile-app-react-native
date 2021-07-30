import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {COLORS, FONTS, SIZES} from '../constants';

const generateColor = type => {
  switch (type) {
    case 'INFECTIONS':
      return ['#E6E0FF', '#C9B7FF', '#301786'];
    case 'DEATHS':
      return ['#F9D2D2', '#FFC0C0', '#CC0E0E'];
    case 'RECOVERIES':
      return ['#DDF1D8', '#C5F1B8', '#217E08'];
    case 'CRITICAL':
      return ['#FEF2D3', '#FFDE8C', '#F3B200'];
  }
};

const StatisticView = ({type, mainNumber, todayIncrement}) => {
  const [gradientColor, todayBackgroundColor, mainTextColor] =
    generateColor(type);
  const gradientColorList = [gradientColor, COLORS.white, COLORS.white];

  return (
    <LinearGradient colors={gradientColorList} style={styles.container}>
      {type === 'CRITICAL' ? null : (
        <View style={{...styles.today, backgroundColor: todayBackgroundColor}}>
          <Text style={{...styles.todayText, color: mainTextColor}}>
            +{todayIncrement}
          </Text>
        </View>
      )}

      <Text style={{...styles.mainNumber, color: mainTextColor}}>
        {mainNumber}
      </Text>
      <Text style={styles.type}>{type}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 120,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 14,
    marginBottom: 14,
  },
  innerView: {
    marginLeft: 10,
  },
  today: {
    borderRadius: 20,
    marginBottom: 4,
  },
  todayText: {
    fontSize: SIZES.body5,
    fontFamily: FONTS.semiBold,
    paddingHorizontal: 10,
    paddingVertical: 5,

    textAlign: 'center',
  },
  mainNumber: {
    fontSize: SIZES.body3,
    fontFamily: FONTS.extraBold,
    margin: 4,
  },
  type: {
    fontSize: SIZES.body5,
    fontFamily: FONTS.regular,
    color: COLORS.tundora,
    margin: 4,
  },
});

export default StatisticView;
