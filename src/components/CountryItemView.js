/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import Colors from '../constants/Colors';
import {abbreviate} from '../helpers';

const CountryItemView = ({countryData}) => {
  const {country, countryInfo, todayCases, todayRecovered} = countryData;

  return (
    <View style={{...styles.container, ...styles.shadow}}>
      <Image
        style={{...styles.flag, ...styles.shadow}}
        resizeMode="contain"
        source={{uri: `${countryInfo.flag}`}}
      />
      <View style={styles.rightInfoView}>
        <Text style={styles.countryName}>{country}</Text>
        <View style={styles.bottomNumberListView}>
          <View style={styles.numberView}>
            <Text style={styles.number}>
              Affected: +{abbreviate(todayCases)}
            </Text>
            <Image
              style={styles.upSign}
              source={require('../../assets/images/up_triangle.png')}
            />
          </View>
          <View style={{...styles.numberView, marginLeft: 20}}>
            <Text style={styles.number}>
              Recovered: +{abbreviate(todayRecovered)}
            </Text>
            <Image
              style={{...styles.upSign, tintColor: 'green'}}
              source={require('../../assets/images/up_triangle.png')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 90,
    marginBottom: 12,
    marginHorizontal: 14,
    paddingLeft: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  shadow: {
    shadowColor: '#878787',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8.0,
  },
  flag: {
    width: 60,
    height: 60,
    marginLeft: 10,
  },
  rightInfoView: {
    flex: 1,
    marginLeft: 13,
  },
  countryName: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 14,
    color: Colors.text.default,
  },
  bottomNumberListView: {
    flexDirection: 'row',
  },
  numberView: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  number: {
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
    color: Colors.text.default,
  },
  upSign: {
    width: 16,
    height: 16,
  },
});

export default CountryItemView;
