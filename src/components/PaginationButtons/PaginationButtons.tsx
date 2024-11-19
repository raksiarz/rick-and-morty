import { atom, useAtom, useAtomValue } from 'jotai'
import { View, Pressable, Text } from 'react-native'
import { pagesAtom } from '../../stacks/TabNavigation/screens/CharacterList/CharacterList.screen';
import styles from "./PaginationButtons.styled";

export const paginationAtom = atom<number>(1)

const PaginationButtons = () => {
  const [pagination, setPagination] = useAtom(paginationAtom)
  const pages = useAtomValue(pagesAtom)
  const showPrevious = pagination > 1
  const showNext = !!pages ? pagination < pages : false

  return (
    <View style={styles.paginationContainer}>
      {showPrevious && <Pressable onPress={() => setPagination(prev => prev -= 1)} style={styles.paginationButton}>
        <Text style={styles.text}>Prev</Text>
      </Pressable>}
      <Text style={{ color: '#59695C', marginHorizontal: 65 }}>Page: { pagination }</Text>
      {showNext && <Pressable onPress={() => setPagination(prev => prev += 1)} style={styles.paginationButton}>
        <Text style={styles.text}>Next</Text>
      </Pressable>}
    </View>
  )
}

export default PaginationButtons
