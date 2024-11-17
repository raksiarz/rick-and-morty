import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  image: {
    width: 310,
    height: 310,
    margin: 10,
    borderWidth: 1,
    borderRadius: 24,
    borderColor: '#224229'
  },
  card: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: '#224229',
    borderRadius: 24,
  },
  nameContainer: {
    display: 'flex',
  },
  nameTitle: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: 500,
  },
  name: {
    fontSize: 36,
    fontWeight: 500,
  },
  infoContainer: {
  },
});
