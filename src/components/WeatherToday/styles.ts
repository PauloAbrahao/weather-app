import { StyleSheet } from 'react-native';
import { theme } from '@styles/theme';

export const styles = StyleSheet.create({
  containerImage: {
    height: 400,
    borderRadius: 8
  },
  imageBackground: {
    backgroundColor: theme.colors.gray_700,
    padding: 20,
    marginTop: 15,
    borderRadius: 8,
    justifyContent: "space-between",
    overflow: "hidden",
    resizeMode: "cover",
    height: 400,
  },
  city: {
    color: theme.colors.gray_100,
    fontFamily: theme.fonts.bold,
    fontSize: 22,
    textAlign: "center",
  },
  day: {
    color: theme.colors.gray_100,
    fontFamily: theme.fonts.regular,
    fontSize: 16,
    textAlign: "center",
  },
  footer: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  details: {
    justifyContent: "center",
    alignItems: "center",
  },
  temperature: {
    color: theme.colors.white,
    fontFamily: theme.fonts.extra_bold,
    fontSize: 52,
  },
  minMax: {
    color: theme.colors.white,
    fontFamily: theme.fonts.bold,
    fontSize: 16,
  },
  weather: {
    color: theme.colors.white,
    fontFamily: theme.fonts.regular,
    fontSize: 14,
    textTransform: "capitalize",
  },
});