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
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';

import {icons, COLORS, FONTS, SIZES} from '../constants';
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
  const top10Countries = countries.data.slice(0, 10);

  useEffect(() => {
    props.fetchGeneralData();
    props.fetchAllCountriesData();
    props.fetchHistoryData(DEFAULT_OPTION.days);
  }, []);

  const renderHeader = () => {
    return (
      <View>
        <View style={styles.headerView}>
          <Image style={{width: 27, height: 27}} source={icons.virus} />
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
        Last Update | {convertToDateString(generalData.data.updated)}
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
            mainNumber={generalData.data.cases.toLocaleString()}
            todayIncrement={generalData.data.todayCases.toLocaleString()}
          />
          <StatisticView
            type="DEATHS"
            mainNumber={generalData.data.deaths.toLocaleString()}
            todayIncrement={generalData.data.todayDeaths.toLocaleString()}
          />
        </View>
        <View style={styles.topHorizontalButtons}>
          <StatisticView
            type="RECOVERIES"
            mainNumber={generalData.data.recovered.toLocaleString()}
            todayIncrement={generalData.data.todayRecovered.toLocaleString()}
          />
          <StatisticView
            type="CRITICAL"
            mainNumber={generalData.data.critical.toLocaleString()}
          />
        </View>
      </View>
    );
  };

  const RenderChart = () => {
    const [selectedOptionId, setOptionId] = useState(DEFAULT_OPTION.id);
    const chartData =
      selectedOptionId === 0
        ? history.data.oneWeek
        : selectedOptionId === 1
        ? history.data.twoWeeks
        : history.data.oneMonth;

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
        <View style={styles.section}>
          <Text style={{...styles.header, marginBottom: 0}}>Top Countries</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Countries');
            }}>
            <View style={styles.viewAllButton}>
              <Text style={styles.headerButtonText}>View all</Text>
              <Image style={styles.rightIcon} source={icons.right} />
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          contentContainerStyle={{marginHorizontal: 20, marginVertical: 20}}
          showsHorizontalScrollIndicator={false}
          data={top10Countries}
          keyExtractor={(_item, index) => index}
          renderItem={({item}) => {
            return <CountryView countryData={item} />;
          }}
        />
      </View>
    );
  };

  const handleRefresh = () => {
    props.fetchGeneralData();
    props.fetchAllCountriesData();
    props.fetchHistoryData();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator="false"
        refreshControl={
          <RefreshControl
            refreshing={
              generalData.isFetching || history.loading || countries.isFetching
            }
            onRefresh={handleRefresh}
          />
        }>
        {renderHeader()}
        {renderGlobalStatisticView()}
        {RenderChart()}
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
    fontSize: 18,
    fontFamily: FONTS.extraBold,
    color: COLORS.violet,
  },
  headerSecondaryText: {
    fontSize: SIZES.h6,
    fontFamily: FONTS.regular,
    color: COLORS.violet,
  },
  remindView: {
    borderRadius: 10,
    backgroundColor: COLORS.patternBlue,
    padding: 14,
    marginHorizontal: 12,
  },
  remindTitle: {
    fontFamily: FONTS.semiBold,
    color: COLORS.cerulean,
    fontSize: SIZES.h5,
  },
  remindContent: {
    fontFamily: FONTS.regular,
    color: COLORS.cerulean,
    fontSize: SIZES.body5,
    marginTop: 5,
  },
  header: {
    fontSize: SIZES.body3,
    fontFamily: FONTS.semiBold,
    color: COLORS.violet,
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 20,
  },
  topHorizontalButtons: {
    flexDirection: 'row',
    marginRight: 14,
  },
  infoText: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.body5,
    color: COLORS.boulder,
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
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.h6,
    color: COLORS.violet,
    marginRight: 8,
  },
  headerButtonText: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.body5,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  viewAllButton: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  rightIcon: {
    width: 5,
    height: 5,
    marginLeft: 4,
    marginRight: 20,
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
