import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

import {COLORS, FONTS} from '../constants';

const SELECTED_COLOR = COLORS.violet;
const UNSELECTED_COLOR = COLORS.white;
const SELECTED_TEXT_COLOR = COLORS.white;
const UNSELECTED_TEXT_COLOR = COLORS.violet;

const TextButton = props => {
  const {onSelect, selected, title} = props;
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        backgroundColor: selected ? SELECTED_COLOR : UNSELECTED_COLOR,
      }}
      onPress={onSelect}>
      <Text
        style={{
          ...styles.title,
          color: selected ? SELECTED_TEXT_COLOR : UNSELECTED_TEXT_COLOR,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 2,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.regular,
    fontSize: 9,
    marginVertical: 5,
    marginHorizontal: 8,
  },
});

export default TextButton;
