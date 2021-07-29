/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
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
import CovidLineChart from '../components/CovidLineChart';
import TextButton from '../components/TextButton';
import {
  fetchGeneralData,
  fetchAllCountriesData,
  fetchHistoryData,
} from '../redux/actions';

const chartOptions = [
  {id: 0, days: 7, text: '1 week'},
  {id: 1, days: 14, text: '2 weeks'},
  {id: 2, days: 30, text: '30 days'},
];
const DEFAULT_OPTION = chartOptions[0];

const HomeScreen = props => {
  const {generalData, countries, history, navigation} = props;
  const [selectedOptionId, setOptionId] = useState(DEFAULT_OPTION.id);
  const top10Countries = countries.slice(0, 10);
  const chartData =
    selectedOptionId === 0
      ? history.oneWeek
      : selectedOptionId === 1
      ? history.twoWeeks
      : history.oneMonth;

  useEffect(() => {
    props.fetchGeneralData();
    props.fetchAllCountriesData();
    props.fetchHistoryData(DEFAULT_OPTION.days);
  }, []);

  const renderHeader = () => {
    return (
      <View>
        <View style={styles.headerView}>
          <Image
            style={{width: 27, height: 27}}
            source={require('../../assets/images/virus.png')}
          />
          <View style={styles.headerTextView}>
            <Text style={styles.headerPrimaryText}>COVID-19</Text>
            <Text style={styles.headerSecondaryText}>VIRUS TRACKER</Text>
          </View>
        </View>
        <View style={styles.remindView}>
          <Text style={styles.remindTitle}>
            Report your COVID-19 health status.
          </Text>
          <Text style={styles.remindContent}>
            Take 1 minute every day to report your health status and help us map
            the spread of COVID to prevail faster
          </Text>
        </View>
      </View>
    );
  };

  const renderTimeUpdateData = () => {
    return (
      <Text style={styles.infoText}>
        Last Update | {convertToDateString(generalData.updated)}
      </Text>
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

  const renderChart = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <CovidLineChart
          data={chartData}
          option={chartOptions[selectedOptionId]}
        />
        <View style={styles.chartOptions}>
          <Text style={styles.chartType}>NEW CASES</Text>
          {chartOptions.map(option => {
            const isSelected = option.id === selectedOptionId;
            return (
              <TextButton
                key={option.id}
                title={option.text}
                selected={isSelected}
                onSelect={() => {
                  setOptionId(option.id);
                  props.fetchHistoryData(option.days);
                }}
              />
            );
          })}
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
          <Text style={{...styles.header, marginBottom: 0}}>Top Countries</Text>
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator="false">
        {renderHeader()}
        {renderGlobalStatisticView()}
        {renderChart()}
        {renderTimeUpdateData()}
        {renderTopCountriesView()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
  },
  headerTextView: {
    marginLeft: 8,
  },
  headerPrimaryText: {
    fontSize: 15,
    fontFamily: 'Raleway-ExtraBold',
    color: Colors.text.default,
  },
  headerSecondaryText: {
    fontSize: 10,
    fontFamily: 'Raleway-Regular',
    color: Colors.text.default,
  },
  remindView: {
    borderRadius: 10,
    backgroundColor: Colors.text.default,
    padding: 14,
    marginHorizontal: 12,
  },
  remindTitle: {
    fontFamily: 'Raleway-SemiBold',
    color: 'white',
    fontSize: 13,
  },
  remindContent: {
    fontFamily: 'Raleway-Regular',
    color: 'white',
    fontSize: 13,
    marginTop: 5,
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
    fontSize: 10,
    color: '#7d7d7d',
    marginHorizontal: 20,
    marginTop: 3,
  },
  chartOptions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 6,
  },
  chartType: {
    fontFamily: 'Raleway-SemiBold',
    fontSize: 10,
    color: Colors.text.default,
    marginRight: 8,
  },
});

HomeScreen.navigationOptions = () => {
  return {headerShown: false};
};

const mapStateToProps = state => {
  return {
    generalData: state.generalData,
    countries: state.countriesData,
    history: state.history,
  };
};

export default connect(mapStateToProps, {
  fetchGeneralData,
  fetchAllCountriesData,
  fetchHistoryData,
})(HomeScreen);
