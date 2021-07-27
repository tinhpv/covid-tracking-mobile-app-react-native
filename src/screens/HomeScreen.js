/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';

import Colors from '../constants/Colors';
import {convertToDateString} from '../helpers';
import StatisticView from '../components/StatisticView';
import CountryView from '../components/CountryView';
import {fetchGeneralData, fetchAllCountriesData} from '../redux/actions';

const HomeScreen = props => {
  const {generalData, countries, navigation} = props;
  const top10Countries = countries.slice(0, 10);

  useEffect(() => {
    props.fetchGeneralData();
    props.fetchAllCountriesData();
  }, []);

  const renderHeaderImage = () => {
    return (
      <ImageBackground
        style={styles.headerImage}
        source={require('../../assets/images/header.jpg')}
      />
    );
  };

  const renderGlobalStatisticView = () => {
    return (
      <View>
        <Text style={styles.header}>Coronavirus Global</Text>
        <View style={styles.topHorizontalButtons}>
          <StatisticView
            type="INFECTIONS"
            mainNumber={generalData.cases.toLocaleString()}
            todayIncrement={generalData.todayCases.toLocaleString()}
          />
          <StatisticView
            type="DEATHS"
            mainNumber={generalData.deaths.toLocaleString()}
            todayIncrement={generalData.todayDeaths.toLocaleString()}
          />
        </View>
        <View style={styles.topHorizontalButtons}>
          <StatisticView
            type="RECOVERIES"
            mainNumber={generalData.recovered.toLocaleString()}
            todayIncrement={generalData.todayRecovered.toLocaleString()}
          />
          <StatisticView
            type="CRITICAL"
            mainNumber={generalData.critical.toLocaleString()}
          />
        </View>
      </View>
    );
  };

  const renderTopCountriesView = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'space-between',
          }}>
          <Text style={{...styles.header, marginTop: 10, marginBottom: 0}}>
            Top Countries
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Countries');
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <Text style={{fontFamily: 'Raleway-Regular', fontSize: 12}}>
                View all
              </Text>
              <Image
                style={{width: 5, height: 5, marginLeft: 4, marginRight: 20}}
                source={require('../../assets/images/right-arrow.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          contentContainerStyle={{marginHorizontal: 20, marginVertical: 20}}
          showsHorizontalScrollIndicator={false}
          data={top10Countries}
          keyExtractor={(item, index) => index}
          renderItem={({item}) => {
            return <CountryView countryData={item} />;
          }}
        />
      </View>
    );
  };

  const renderBottomInfo = () => {
    return (
      <Text style={styles.infoText}>
        Last Update | {convertToDateString(generalData.updated)}
      </Text>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator="false">
        {renderHeaderImage()}
        <View style={styles.body}>
          {renderGlobalStatisticView()}
          {renderTopCountriesView()}
          {renderBottomInfo()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  headerImage: {
    height: 230,
    width: '100%',
    zIndex: 100,
  },
  body: {
    backgroundColor: 'white',
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    marginBottom: 30,
    zIndex: 101,
  },
  header: {
    fontSize: 15,
    fontFamily: 'Raleway-SemiBold',
    color: Colors.text.default,
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 20,
  },
  topHorizontalButtons: {
    flexDirection: 'row',
    marginRight: 14,
  },
  infoText: {
    fontFamily: 'Raleway-Regular',
    fontSize: 12,
    color: '#7d7d7d',
    marginHorizontal: 20,
  },
});

HomeScreen.navigationOptions = () => {
  return {headerShown: false};
};

const mapStateToProps = state => {
  return {
    generalData: state.generalData,
    countries: state.countriesData,
  };
};

export default connect(mapStateToProps, {
  fetchGeneralData,
  fetchAllCountriesData,
})(HomeScreen);
