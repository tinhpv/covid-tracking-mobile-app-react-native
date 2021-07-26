import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import Colors from '../constants/Colors';

const CountryView = ({name, number}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.flag}
        source={require('../../assets/images/usa.png')}
      />
      <Text style={styles.countryName}>{name}</Text>
      <View style={styles.numberView}>
        <Text style={styles.number}>{number}</Text>
        <Image
          style={styles.upSign}
          source={require('../../assets/images/up_triangle.png')}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    marginRight: 10,
    justifyContent: 'center',
    paddingLeft: 10,
    backgroundColor: 'white',
    shadowColor: '#878787',
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
    width: 50,
    height: 50,
  },
  countryName: {
    fontFamily: 'Raleway-Light',
    fontSize: 10,
    color: '#858585',
  },
  numberView: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  number: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 15,
    color: Colors.text.default,
  },
  upSign: {
    width: 16,
    height: 16,
  },
});

export default CountryView;
