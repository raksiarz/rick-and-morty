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
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 24,
    borderColor: '#224229'
  },
  card: {
    width: '100%',
    height: 'auto',
    display: "flex",
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#224229',
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 24,
  },
  nameContainer: {
    marginVertical: 4,
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
  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginVertical: 16,
  },
  textTagContainer: {
    width: 147,
    height: 55,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#F4F6F5',
    borderRadius: 10,
    padding: 8,
    gap: 4,
  },
  textTagTitle: {
    textTransform: 'uppercase',
    fontSize: 12,
    color: '#59695C'
  },
  textTagValue: {
    fontSize: 16,
    color: '#162C1B',
  }
});
