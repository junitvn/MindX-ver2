import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {numberWithCommas} from '../utils/utils';

const InfoBlock = (props: any) => {
  const {data, title, icon} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.textData}>{numberWithCommas(data)}</Text>
      <Image source={icon} style={styles.image} />
      <Text style={styles.textTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
  },
  textTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  textData: {
    fontSize: 30,
    marginVertical: 16,
  },
});

export default InfoBlock;
