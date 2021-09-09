import axios from 'axios';
import React, {useState} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import Header from '../components/Header';
import ListItem from '../components/ListItem';
import {populationByCountry} from '../utils/config';
import {sleep} from '../utils/utils';

const More = (props: any) => {
  const {pupolationByCountries, countries} = props.route.params;
  const [dataList, setDataList] = useState(pupolationByCountries);
  const [index, setIndex] = useState(20);

  const [loading, setLoading] = useState(false);

  const onEndReached = async () => {
    setLoading(true);
    await getPopulationByCountry(countries, index, index + 10);
    await setIndex(index + 9);
    setLoading(false);
  };

  const getPopulationByCountry = async (
    listCountries: any[],
    start: number,
    end: number,
  ) => {
    if (listCountries && listCountries.length === 0) {
      return;
    }
    let res: any[] = [];
    for (let index = start; index < end; index++) {
      await axios
        .request(populationByCountry(listCountries[index]))
        .then(response => {
          res.push(response.data.body);
        });
      await sleep(100);
    }
    setDataList((dataList: any[]) => [...dataList, ...res]);
  };

  return (
    <View style={{flex: 1, paddingBottom: 10}}>
      <Header isHome={false} title="ALL COUNTRIES" />
      <FlatList
        data={dataList}
        style={{
          padding: 12,
          backgroundColor: 'white',
          paddingBottom: 50,
          marginBottom: 20,
        }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => <ListItem item={item} />}
        onEndReached={onEndReached}
        ListFooterComponentStyle={{
          height: 20,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
        }}
        ListFooterComponent={() => {
          if (!loading) {
            return null;
          }
          return <ActivityIndicator size="small" />;
        }}
      />
    </View>
  );
};

export default More;
