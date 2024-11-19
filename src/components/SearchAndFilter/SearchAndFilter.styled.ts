import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
    paddingVertical: 0,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  inputIcon: {
    width: 14,
    height: 14,
    marginHorizontal: 3,
  },
  input: {
    margin: 0,
    padding: 0,
    fontSize: 16,
    color: '#59695C',
  },
  filterButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: 113,
    height: 34,
    borderRadius: 22,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 10,
    backgroundColor: '#224229',
  },
  filterText: {
    textTransform: 'uppercase',
    fontSize: 14,
    color: '#fff',
  },
  dropdownContainer: {
    position: 'absolute',
    display: 'flex',
    zIndex: 10,
    top: 42,
    width: 358,
    height: 325,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    gap: 8,
    borderColor: '#224229',
    backgroundColor: '#fff',
  },
  bottomContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dropdownButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 74,
    height: 34,
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  resetButton: {
    borderWidth: 1,
    borderColor: '#224229',
  },
  applyButton: {
    backgroundColor: '#224229',
  },
  dropdownContainerText: {
    fontSize: 14,
    textTransform: 'uppercase',
    color: '#59695C',
    marginBottom: 8,
  }
})

export default styles
