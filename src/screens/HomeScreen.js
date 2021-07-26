/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  FlatList,
} from 'react-native';

import Colors from '../constants/Colors';
import StatisticView from '../components/StatisticView';
import CountryView from '../components/CountryView';

const countries = [
  {name: 'China', flag: 'china', today: 12228},
  {name: 'UK', flag: 'united_kingdom', today: 982},
  {name: 'USA', flag: 'usa', today: 182},
  {name: 'Japan', flag: 'japan', today: 782},
  {name: 'Cambodia', flag: 'cambodia', today: 887},
  {name: 'Italy', flag: 'italy', today: 162},
];

const HomeScreen = () => {
  return (
    <ScrollView>
      <View>
        <ImageBackground
          style={styles.headerImage}
          source={require('../../assets/images/header.jpg')}
        />
        <View style={styles.body}>
          <Text style={styles.header}>Coronavirus Global</Text>
          <View style={styles.topHorizontalButtons}>
            <StatisticView />
            <StatisticView />
          </View>
          <View style={styles.topHorizontalButtons}>
            <StatisticView />
            <StatisticView />
          </View>
          <Text style={{...styles.header, marginTop: 10, marginBottom: 0}}>
            Top Countries
          </Text>
          <FlatList
            horizontal={true}
            contentContainerStyle={{marginLeft: 20, marginTop: 20}}
            showsHorizontalScrollIndicator={false}
            data={countries}
            keyExtractor={item => {
              item.name;
            }}
            renderItem={({item}) => {
              return <CountryView name={item.name} number={item.today} />;
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    height: 290,
    width: '100%',
    zIndex: 100,
  },
  body: {
    backgroundColor: 'white',
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    marginBottom: 100,
    zIndex: 101,
  },
  header: {
    fontSize: 15,
    fontFamily: 'Raleway-SemiBold',
    color: Colors.text.default,
    marginHorizontal: 20,
    marginTop: 45,
    marginBottom: 20,
  },
  topHorizontalButtons: {
    flexDirection: 'row',
    marginRight: 20,
  },
});

HomeScreen.navigationOptions = () => {
  return {headerShown: false};
};

export default HomeScreen;
