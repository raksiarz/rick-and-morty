import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
  listContainer: {
    flexDirection: 'column',
    gap: 50
  },
})