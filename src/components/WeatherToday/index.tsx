import {ImageBackground, Text, TouchableOpacity, View} from "react-native";
import dayjs from "dayjs";

import {styles} from "./styles";

import {isDayTime} from "@utils/isDayTime";
import {weatherIcons} from "src/utils/weatherIcons";

export type WeatherTodayProps = {
  temp: string;
  temp_min: string;
  temp_max: string;
  description: string;
  details: typeof weatherIcons.Clouds;
};

type Props = {
  city: string;
  weather: WeatherTodayProps;
  onPress: () => void;
};

export function WeatherToday({weather, city, onPress}: Props) {
  const today = dayjs(new Date()).format("dddd, DD [de] MMMM [de] YYYY");
  const isDay = isDayTime();

  const bgImg = isDay ? weather.details.bg_day : weather.details.bg_night;
  const Icon = isDay ? weather.details?.icon_day : weather.details?.icon_night;

  return (
    <TouchableOpacity onPress={onPress} style={styles.containerImage}>
      <ImageBackground style={styles.imageBackground} source={bgImg}>

        <View style={styles.footer}>
          <View style={styles.details}>
            <Icon width={160} height={160} />
            <Text style={styles.temperature}>{weather.temp}</Text>

            <Text style={styles.minMax}>
              {weather.temp_min} / {weather.temp_max}
            </Text>

            <Text style={styles.weather}>{weather.description}</Text>
          </View>

          <View>
            <Text style={styles.city}>{city}</Text>

            <Text style={styles.day}>{today}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
