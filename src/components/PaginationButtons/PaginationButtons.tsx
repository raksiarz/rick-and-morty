import { atom, useAtom } from 'jotai'
import { View, Pressable, Text } from 'react-native'
import styles from "./PaginationButtons.styled";

export const paginationAtom = atom<number>(1)

const PaginationButtons = () => {
  const [pagination, setPagination] = useAtom(paginationAtom)

  return (
    <View style={styles.paginationContainer}>
      {pagination > 1 && <Pressable onPress={() => setPagination(prev => prev -= 1)} style={styles.paginationButton}>
        <Text style={styles.text}>Prev</Text>
      </Pressable>}
      <Text style={{ color: '#59695C', marginHorizontal: 65 }}>Page: { pagination }</Text>
      <Pressable onPress={() => setPagination(prev => prev += 1)} style={styles.paginationButton}>
        <Text style={styles.text}>Next</Text>
      </Pressable>
    </View>
  )
}

export default PaginationButtons
