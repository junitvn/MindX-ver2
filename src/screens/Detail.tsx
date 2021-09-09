import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import Header from '../components/Header';
import {populationByCountry} from '../utils/config';

const Detail = (props: any) => {
  const {country} = props.route.params;
  const [data, setData] = useState({
    ranking: 0,
    population: 0,
  });
  console.log(country);

  useEffect(() => {
    axios.request(populationByCountry(country)).then((response: any) => {
      setData(response.data.body);
    });
  }, []);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Header isHome={false} title={country} />
      <View style={{flex: 1, backgroundColor: 'white', padding: 12}}>
        <Text style={{fontSize: 16}}>{`Rank: ${data.ranking}`}</Text>
        <Text
          style={{
            fontSize: 16,
            marginTop: 10,
          }}>{`Population: ${data.population}`}</Text>
      </View>
    </View>
  );
};

export default Detail;
