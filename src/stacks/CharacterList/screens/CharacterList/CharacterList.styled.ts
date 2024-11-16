import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    flexDirection: 'column',
    gap: 50
  },
  card: {
    width: 358,
    height: 224,
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderRadius: 24,
    borderColor: '#224229',
    backgroundColor: '#F4F6F5'
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
  inputContainer: {
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    width: 358,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#162C1B',
    backgroundColor: '#FFF',
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  inputIcon: {
    width: 14,
    height: 14,
    marginLeft: 3,
  },
  input: {
    fontSize: 16,
    color: '#59695C',
  },
  title: {
    fontWeight: 500,
    fontSize: 36,
    color: '#162C1B',
    marginRight: 'auto',
    marginLeft: 16,
    marginVertical: 16,
  }
});
