import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Search = (props: any) => {
  const {countries} = props.route.params;
  const navigation = useNavigation();

  const [result, setResult] = useState([]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon style={styles.icon} name="arrow-back" />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          onChangeText={text => {
            setResult(
              countries.filter((country: any) => country.includes(text)),
            );
          }}
        />
      </View>
      <FlatList
        style={styles.list}
        data={result}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Detail', {country: item})}>
            <Text style={styles.textItem}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    elevation: 2,
    alignItems: 'center',
    paddingHorizontal: 8,
    borderBottomWidth: 0.1,
    backgroundColor: 'white',
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  icon: {
    fontSize: 24,
    color: 'black',
  },
  text: {
    fontSize: 20,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '90%',
    color: 'black',
    paddingBottom: 3,
  },
  list: {
    flex: 1,
    backgroundColor: 'white',
  },
  textItem: {
    paddingLeft: 26,
    paddingVertical: 6,
    fontSize: 16,
  },
});
export default Search;
