import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
 card: {
    width: 358,
    height: 224,
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderRadius: 24,
    padding: 12,
    borderColor: '#224229',
    backgroundColor: '#F4F6F5'
  },
  infoContainer: {
    width: 114,
  },
  textTagContainer: {
    rowGap: 4,
    padding: 8,
  },
  textTagTitle: {
    textTransform: 'uppercase',
    fontSize: 12,
    color: '#59695C'
  },
  textTagValue: {
    fontSize: 16,
    color: '#162C1B',
    flexWrap: 'wrap',
  },
  imageContainer: {
    height: 200,
    width: 200,
    borderWidth: 1,
    borderRadius: 24,
    borderColor: '#224229',
    overflow: 'hidden',
  },
  image: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
})
