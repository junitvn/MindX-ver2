import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = (props: any) => {
  const {isHome, title, countries} = props;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          !isHome && navigation.goBack();
        }}>
        {isHome ? (
          <Icon style={styles.icon} name="menu-outline" />
        ) : (
          <Icon style={styles.icon} name="arrow-back" />
        )}
      </TouchableOpacity>
      <Text style={styles.text}>{title}</Text>
      {isHome ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Search', {countries: countries});
          }}>
          <Icon style={styles.icon} name="search" />
        </TouchableOpacity>
      ) : (
        <View style={{width: 24}} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
    alignItems: 'center',
    paddingHorizontal: 8,
    borderBottomWidth: 0.1,
    backgroundColor: 'white',
  },
  icon: {
    fontSize: 24,
    color: 'black',
  },
  text: {
    fontSize: 20,
  },
});
export default Header;
