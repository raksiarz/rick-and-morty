import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
  },
  topContainer: {
    marginBottom: 'auto',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  image: {
    height: 200,
    width: 200,
    borderWidth: 1,
    borderRadius: 24,
    borderColor: '#224229',
  },
  title: {
    fontWeight: 500,
    fontSize: 36,
    color: '#162C1B',
    marginRight: 'auto',
    marginBottom: 16,
  },
});
