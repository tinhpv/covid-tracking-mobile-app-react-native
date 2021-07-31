/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

import {fetchAllCountriesData} from '../redux/actions';
import CountryItemView from '../components/CountryItemView';

const CountriesScreen = props => {
  const {countries, navigation} = props;

  const renderCountry = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CountryDetail', {
            name: item.country,
            flag: item.countryInfo.flag,
          });
        }}>
        <CountryItemView countryData={item} />
      </TouchableOpacity>
    );
  };

  const handleRefresh = () => {
    props.fetchAllCountriesData();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          contentContainerStyle={{marginVertical: 20}}
          data={countries.data}
          keyExtractor={(_item, index) => index}
          renderItem={renderCountry}
          refreshControl={
            <RefreshControl
              refreshing={countries.isFetching}
              onRefresh={handleRefresh}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

const mapStateToProps = state => {
  return {
    countries: state.countriesData,
  };
};

export default connect(mapStateToProps, {fetchAllCountriesData})(
  CountriesScreen,
);
