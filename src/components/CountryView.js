import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import {icons, COLORS, FONTS, SIZES} from '../constants';

const CountryView = ({countryData}) => {
  const {country, countryInfo, cases} = countryData;

  return (
    <View style={styles.container}>
      <Image
        style={styles.flag}
        resizeMode="contain"
        source={{uri: `${countryInfo.flag}`}}
      />
      <Text style={styles.countryName}>{country}</Text>
      <View style={styles.numberView}>
        <Text style={styles.number}>{cases.toLocaleString()}</Text>
        <Image style={styles.upSign} source={icons.up} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 90,
    marginRight: 10,
    justifyContent: 'center',
    paddingLeft: 10,
    backgroundColor: 'white',
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12.0,
    elevation: 10,
    borderRadius: 10,
  },
  flag: {
    width: 26,
    height: 26,
  },
  countryName: {
    fontFamily: FONTS.light,
    fontSize: SIZES.h6,
    color: COLORS.tundora,
  },
  numberView: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  number: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.body3,
    color: COLORS.violet,
  },
  upSign: {
    width: 16,
    height: 16,
  },
});

export default CountryView;
