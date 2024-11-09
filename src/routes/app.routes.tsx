import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {Details} from "@screens/Details";
import {Dashboard} from "@screens/Dashboard";

const {Navigator, Screen} = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="dashboard" component={Dashboard} />

      <Screen name="details" component={Details} />
    </Navigator>
  );
}