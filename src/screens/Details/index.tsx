import { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';

import { styles } from './styles';

import { useCity } from '@hooks/useCity';

import { getWeatherByCityService, WeatherResponseProps } from '@services/getWeatherByCityService';
import { Loading } from '@components/Loading';
import { WeatherDetails } from '@components/WeatherDetails';
import { NextDays } from '@components/NextDays';
import { useNavigation } from '@react-navigation/native';

export function Details() {
  const navigation = useNavigation();

  const [isWeatherLoading, setWeatherIsLoading] = useState<boolean>(true);
  const [weather, setWeather] = useState<WeatherResponseProps>({} as WeatherResponseProps);

  const { city, cityIsLoading } = useCity();

  async function getWeatherDetails() {
    if (!city) {
      return;
    }

    setWeatherIsLoading(true);

    const { latitude, longitude } = city;
    const response = await getWeatherByCityService({ latitude, longitude });
    
    setWeather(response);
    setWeatherIsLoading(false);
  }

  useEffect(() => {
    getWeatherDetails();
  }, [city]);

  if (isWeatherLoading || cityIsLoading || !city) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1, height: '100%' }}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
       <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()} 
      >
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>
        {city.name}
      </Text>
        <WeatherDetails data={weather.today.details} />
        <NextDays data={weather.nextDays} />
      </ScrollView>
    </View>
  );
}