import { atom, useSetAtom } from 'jotai'
import { View, Pressable, Text } from 'react-native'
import styles from "./PaginationButtons.styled";

export const paginationAtom = atom<number>(1)

const PaginationButtons = () => {
  const setPagination = useSetAtom(paginationAtom)

  return (
    <View>
      <Pressable onPress={() => setPagination(prev => prev -= 1)}>
        <Text>Prev</Text>
      </Pressable>
      <Pressable onPress={() => setPagination(prev => prev += 1)}>
        <Text>Next</Text>
      </Pressable>
    </View>
  )
}

export default PaginationButtons
