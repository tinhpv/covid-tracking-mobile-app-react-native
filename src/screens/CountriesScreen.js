/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, SafeAreaView, FlatList, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import CountryItemView from '../components/CountryItemView';

const CountriesScreen = props => {
  const {countries} = props;

  const renderCountry = ({item}) => {
    return <CountryItemView countryData={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          contentContainerStyle={{marginVertical: 20}}
          data={countries}
          keyExtractor={(_item, index) => index}
          renderItem={renderCountry}
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

export default connect(mapStateToProps)(CountriesScreen);
