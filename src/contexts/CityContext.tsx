import { ReactNode, createContext, useEffect, useState, } from 'react';
import Toast from "react-native-toast-message";

import {CityProps, getCityByNameService} from "@services/getCityByNameService";
import {getStorageCity, saveStorageCity} from "@libs/asyncStorage/cityStorage";
import * as Location from "expo-location";

type CityContextProviderProps = {
  children: ReactNode;
};

type CityContextDataProps = {
  cityIsLoading: boolean;
  city: CityProps | null;
  handleChanceCity: (city: CityProps) => void;
  getUserLocation: () => void;
};

export const CityContext = createContext<CityContextDataProps>(
  {} as CityContextDataProps
);

export function CityProvider({children}: CityContextProviderProps) {
  const [cityIsLoading, setCityIsLoading] = useState(true);
  const [city, setCity] = useState<CityProps | null>(null);

  async function handleChanceCity(selectedCity: CityProps) {
    setCityIsLoading(true);

    await saveStorageCity(selectedCity);
    setCity(selectedCity);

    setCityIsLoading(false);
  }

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Toast.show({
        type: "error",
        text1: "Permissão para acessar a localização foi negada.",
        position: "bottom"
      });
      return;
    }

    try {
      const newLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const coords = newLocation.coords;

      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      if (reverseGeocode.length > 0) {
        const res = await getCityByNameService(
          reverseGeocode[0].city || ""
        );
        setCity(res[0]);
        if (res.length !== 0) await saveStorageCity(res[0]);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao obter localização.",
        position: "bottom"
      });
      return;
    }
  }

  useEffect(() => {
    setCityIsLoading(true);

    getStorageCity()
      .then((data) => setCity(data))
      .finally(() => setCityIsLoading(false));
  }, []);

  useEffect(() => {
    (async () => {
      const savedCity = await getStorageCity();
      if (savedCity) {
        setCity(savedCity);
      } else {
        await getUserLocation();
      }
    })();
  }, []);

  return (
    <CityContext.Provider
      value={{
        city,
        cityIsLoading,
        handleChanceCity,
        getUserLocation
      }}
    >
      {children}
    </CityContext.Provider>
  );
}