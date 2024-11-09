import { useContext, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { styles } from './styles';

import { useCity } from '@hooks/useCity';
import { CityProps, getCityByNameService } from '@services/getCityByNameService';
import { WeatherResponseProps, getWeatherByCityService } from '@services/getWeatherByCityService';

import { Loading } from '@components/Loading';
import { NextDays } from '@components/NextDays';
import { SelectList } from '@components/SelectList';
import { WeatherToday } from '@components/WeatherToday';
import { useNavigation } from '@react-navigation/native';

export function Dashboard() {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [cities, setCities] = useState<CityProps[]>([]);
  const [isWeatherLoading, setWeatherIsLoading] = useState<boolean>(true);
  const [weather, setWeather] = useState<WeatherResponseProps>({} as WeatherResponseProps);

  const { city, handleChanceCity, cityIsLoading, getUserLocation } = useCity();

  function handleSelect(value: CityProps) {
    handleChanceCity(value);
    setSearch('');
    setCities([]);
  }

  async function getWeatherDetails() {
    if (!city) {
      getUserLocation();
      return;
    }

    setWeatherIsLoading(true);

    const { latitude, longitude } = city;
    const response = await getWeatherByCityService({ latitude, longitude });
    
    setWeather(response);
    setWeatherIsLoading(false);
  }

  async function getCities(city: string) {
    setIsSearching(true);

    const response = await getCityByNameService(city);

    setCities(response);
    setIsSearching(false);
  }

  useEffect(() => {
    if (search.trim().length === 0) {
      return;
    }

    getCities(search)
    const debounce = setTimeout(() => getCities(search), 500);

    return () => clearInterval(debounce);
  }, [search]);

  useEffect(() => {
    getWeatherDetails();
  }, [city]);

  if (isWeatherLoading || cityIsLoading || !city) {
    return <Loading />;
  }

  const navigateToDetails = () => {
    navigation.navigate('details');
  };

  return (
    <View style={styles.container}>
      <SelectList
        data={cities}
        value={search}
        onChange={setSearch}
        onPress={handleSelect}
        isLoading={isSearching}
        placeholder="Buscar cidade"
      />

      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <WeatherToday city={city.name} weather={weather.today.weather} onPress={navigateToDetails} />

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <NextDays data={weather.nextDays} />
        </ScrollView>
      </View>
    </View>
  );
}