import {useNavigation} from '@react-navigation/core';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import InfoBlock from '../components/InfoBlock';
import ListItem from '../components/ListItem';
import {
  API,
  API_KEY,
  countriesOption,
  populationByCountry,
  world as worldOption,
} from '../utils/config';
import {sleep} from '../utils/utils';

const Home = () => {
  const [data, setData] = useState({});
  const [totalCountries, setTotalCountries] = useState(0);
  const [population, setPopulation] = useState(0);
  const [index, setIndex] = useState(0);
  const [countries, setCountries] = useState([]);
  const [pupolationByCountries, setPupolationByCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    axios
      .request(worldOption)
      .then(response => {
        const {total_countries, world_population} = response.data.body;
        setPopulation(world_population);
        setTotalCountries(total_countries);
      })
      .catch(e => {
        console.log('error', e);
      });
  }, []);

  useEffect(() => {
    axios
      .request(countriesOption)
      .then(response => {
        setCountries(response.data.body.countries);
        getPopulationByCountry(response.data.body.countries, 0, 20);
      })
      .catch(e => {
        console.log('error', e);
      });
  }, []);

  const getPopulationByCountry = async (
    listCountries: any[],
    start: number,
    end: number,
  ) => {
    if (listCountries && listCountries.length === 0) {
      return;
    }
    for (let index = start; index < end; index++) {
      await axios
        .request(populationByCountry(listCountries[index]))
        .then(response => {
          setPupolationByCountries(pupolationByCountries => [
            ...pupolationByCountries,
            response.data.body,
          ]);
          setIndex(index + 1);
          console.log(index, end);

          if (index === end - 1) setLoading(false);
        });
      await sleep(100);
    }
  };

  useEffect(() => {
    console.log(pupolationByCountries);
  }, [loading, index]);

  return (
    <View style={{flex: 1, paddingBottom: 16}}>
      <Header isHome={true} title="WOLRD POPULATION" countries={countries} />
      <View style={styles.infoContainer}>
        <InfoBlock
          title="Total Countries"
          data={totalCountries}
          icon={require('../assets/country.png')}
        />
        <InfoBlock
          title="World Populatiuon"
          data={population}
          icon={require('../assets/population.png')}
        />
      </View>
      <View style={styles.topCountriesContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', paddingVertical: 4}}>
            Top 20 Countries By Population
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('More', {
                pupolationByCountries: pupolationByCountries,
                countries: countries,
              })
            }>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: 'blue',
                paddingVertical: 4,
              }}>{`More >`}</Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <FlatList
            data={pupolationByCountries}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => <ListItem item={item} />}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
    backgroundColor: 'white',
    padding: 8,
    paddingBottom: 16,
    height: 150,
  },
  topCountriesContainer: {
    padding: 8,
    paddingBottom: 16,
    marginHorizontal: 8,
    backgroundColor: 'white',
    flex: 1,
  },
});

export default Home;
