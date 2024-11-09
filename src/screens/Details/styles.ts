import { theme } from '@styles/theme';
import { Dimensions, StyleSheet } from 'react-native';

const dimensions = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    width: dimensions.width,
    height: dimensions.height,
    padding: 24,
    paddingTop: 48,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    paddingBottom: 56
  },
  title: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: theme.colors.white,
    textAlign: 'center'
  },
  brand: {
    color: theme.colors.blue_light
  },
  subtitle: {
    fontSize: 28,
    fontFamily: theme.fonts.regular,
    color: theme.colors.gray_200,
    textAlign: 'center',
    marginBottom: 8,
    backgroundColor: 'transparent',
  },
  scroll: {
    backgroundColor: theme.colors.gray_900,
    height: "100%",
    justifyContent: 'center',
    gap: 10
  },
  backButton: {
    position: 'absolute',
    top: 20,
    right: 0,
    paddingRight: 20,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  backButtonText: {
    color: '#fff', 
    fontSize: 16,
  }
});