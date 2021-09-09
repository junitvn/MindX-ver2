import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {numberWithCommas} from '../utils/utils';

const ListItem = (props: any) => {
  const {item} = props;
  const {country_name, population, ranking} = item;
  return (
    <View style={styles.container}>
      <Text style={styles.textCountry}>{country_name}</Text>
      <Text style={styles.textPopulation}>{numberWithCommas(population)}</Text>
      <Text>{ranking}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  textCountry: {
    flex: 4,
  },
  textPopulation: {flex: 4, justifyContent: 'flex-start'},
});

export default ListItem;
