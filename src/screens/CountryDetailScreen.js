/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  RefreshControl,
} from 'react-native';

import {FONTS, SIZES, COLORS} from '../constants';
import StatisticView from '../components/StatisticView';
import TextButton from '../components/TextButton';
import CovidBarChart from '../components/CovidBarChart';
import {
  fetchCountry,
  fetchCountryVaccineInfo,
  fetchCountryHistoryData,
} from '../redux/actions';
import {convertToDateString} from '../helpers';

const chartOptions = [
  {id: 0, text: 'New infections'},
  {id: 1, text: 'Deaths'},
];

const B = props => (
  <Text style={{fontWeight: 'bold', fontSize: SIZES.body4}}>
    {props.children}
  </Text>
);

const CountryDetailScreen = props => {
  const {country, history, navigation} = props;
  const countryName = navigation.getParam('name');

  useEffect(() => {
    props.fetchCountry(countryName);
    props.fetchCountryVaccineInfo(countryName);
    props.fetchCountryHistoryData(countryName);
  }, []);

  const renderDateUpdateView = () => {
    return (
      <View style={styles.dateUpdateView}>
        <Text style={styles.dateText}>
          Last Updated | {convertToDateString(country.data.general.updated)}
        </Text>
      </View>
    );
  };

  const renderStatisticView = () => {
    return (
      <View style={{marginHorizontal: 20}}>
        <View style={{...styles.statisticView, marginLeft: -15}}>
          <StatisticView
            type="INFECTIONS"
            mainNumber={country.data.general.cases.toLocaleString()}
            todayIncrement={country.data.general.todayCases.toLocaleString()}
          />
          <StatisticView
            type="DEATHS"
            mainNumber={country.data.general.deaths.toLocaleString()}
            todayIncrement={country.data.general.todayDeaths.toLocaleString()}
          />
          <StatisticView
            type="RECOVERIES"
            mainNumber={country.data.general.recovered.toLocaleString()}
            todayIncrement={country.data.general.todayRecovered.toLocaleString()}
          />
        </View>
      </View>
    );
  };

  const RenderChart = () => {
    const [selectedChartOptionId, setChartOptionId] = useState(0);
    const chartData =
      selectedChartOptionId === 0
        ? history.data.oneWeek.cases
        : history.data.oneWeek.deaths;

    return (
      <View>
        <CovidBarChart data={chartData} />
        <View style={styles.optionView}>
          {chartOptions.map(option => {
            return (
              <TextButton
                key={option.id}
                title={option.text}
                selected={option.id === selectedChartOptionId}
                onSelect={() => {
                  setChartOptionId(option.id);
                }}
              />
            );
          })}
        </View>
      </View>
    );
  };

  const renderVaccinationInfo = () => {
    const numberOfDoses = Object.values(country.data.vaccination)[0];
    const population = country.data.general.population;
    const percentage = (numberOfDoses / population) * 100;

    return (
      <View style={styles.vaccineView}>
        <Text style={styles.titleVaccine}>Vaccination</Text>
        <Text style={styles.vaccineText}>
          <Text>{countryName} has administered at least </Text>
          <B>{numberOfDoses.toLocaleString()}</B>
          <Text>
            {' '}
            doses of COVID vaccines so far. Assuming every person needs 2 doses,
            that’s enough to have vaccinated about{' '}
          </Text>
          <B>{percentage.toFixed(2)}%</B>
          <Text> of the country’s population.</Text>
        </Text>
      </View>
    );
  };

  const handleRefresh = () => {
    props.fetchCountry;
    props.fetchCountryVaccineInfo;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator="false"
        refreshControl={
          <RefreshControl
            refreshing={country.isFetching || history.loading}
            onRefresh={handleRefresh}
          />
        }>
        {renderDateUpdateView()}
        {renderVaccinationInfo()}
        {renderStatisticView()}
        {RenderChart()}
      </ScrollView>
    </SafeAreaView>
  );
};

CountryDetailScreen.navigationOptions = ({navigation}) => {
  return {
    headerTitle: () => (
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{width: 30, height: 20, marginRight: 8}}
          source={{uri: navigation.getParam('flag')}}
        />
        <Text style={styles.navigationTitle}>
          {navigation.getParam('name')}
        </Text>
      </View>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  navigationTitle: {
    fontSize: SIZES.h3,
    fontFamily: FONTS.semiBold,
    color: COLORS.violet,
  },
  dateUpdateView: {
    marginTop: 25,
    marginHorizontal: 20,
  },
  dateText: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.body5,
    color: COLORS.violet,
  },
  statisticView: {
    flexDirection: 'row',
    marginTop: 25,
  },
  headerText: {
    fontSize: SIZES.body5,
    fontFamily: FONTS.semiBold,
    color: COLORS.tundora,
  },
  optionView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  vaccineView: {
    marginTop: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 12,
    backgroundColor: COLORS.patternBlue,
  },
  titleVaccine: {
    fontSize: SIZES.body4,
    fontFamily: FONTS.semiBold,
    color: COLORS.cerulean,
  },
  vaccineText: {
    fontSize: SIZES.body5,
    fontFamily: FONTS.regular,
    color: COLORS.cerulean,
    lineHeight: 20,
    marginTop: 6,
  },
  shadow: {
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8.0,
  },
});

const mapStateToProps = state => {
  return {
    country: state.country,
    history: state.history,
  };
};

export default connect(mapStateToProps, {
  fetchCountry,
  fetchCountryVaccineInfo,
  fetchCountryHistoryData,
})(CountryDetailScreen);
