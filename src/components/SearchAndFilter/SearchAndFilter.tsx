import { View, Pressable, Image, TextInput, Text } from 'react-native'
import { atom, useAtom, useSetAtom } from 'jotai'
import { Species, Status } from '../../types';
import CheckBox from '../CheckBox/CheckBox';
import styles from "./SearchAndFilter.styled";
import { paginationAtom } from '../PaginationButtons/PaginationButtons';

export const searchAtom = atom('')
export const statusAtom = atom<Status[]>([])
export const speciesAtom = atom<Species[]>([])
const searchValueAtom = atom('')
const statusValueAtom = atom<Status[]>([])
const speciesValueAtom = atom<Species[]>([])
const visibleAtom = atom(false)

const Dropdown = () => {
  const [visible, setVisible] = useAtom(visibleAtom)
  const setStatus = useSetAtom(statusAtom)
  const setSpecies = useSetAtom(speciesAtom)
  const [statusValue, setStatusValue] = useAtom(statusValueAtom)
  const [speciesValue, setSpeciesValue] = useAtom(speciesValueAtom)
  const setPagination = useSetAtom(paginationAtom)

  const reset = () => {
    setStatusValue([])
    setSpeciesValue([])
  }

  const apply = async () => {
    setPagination(1)
    setStatus(statusValue)
    setSpecies(speciesValue)
    setVisible(false)
  }

  const onPressStatus = (s: Status) => {
    setStatusValue(prev => prev.includes(s) ? prev = prev.filter(p => p !== s) : [...prev, s])
  }

  const onPressSpecies = (s: Species) => {
    setSpeciesValue(prev => prev.includes(s) ? prev = prev.filter(p => p !== s) : [...prev, s])
  }

  if(visible) {
    return (
      <View style={styles.dropdownContainer}>
        <View>
          <Text style={styles.dropdownContainerText}>status</Text>
          <View style={styles.optionsContainer}>
            <CheckBox text={'Alive'} isChecked={statusValue.includes('alive')} onPress={() => onPressStatus('alive')} />
            <CheckBox text={'Dead'} isChecked={statusValue.includes('dead')} onPress={() => onPressStatus('dead')} />
            <CheckBox text={'Unknown'} isChecked={statusValue.includes('unknown')} onPress={() => onPressStatus('unknown')} />
          </View>
        </View>
        <View >
          <Text style={styles.dropdownContainerText}>species</Text>
          <View style={styles.optionsContainer}>
            <CheckBox text={'Human'} isChecked={speciesValue.includes('human')} onPress={() => onPressSpecies('human')} />
            <CheckBox text={'Humanoid'} isChecked={speciesValue.includes('humanoid')} onPress={() => onPressSpecies('humanoid')} />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <Pressable style={[styles.dropdownButton, styles.resetButton]} onPress={reset}>
            <Text style={{ color: '#224229', textTransform: 'uppercase' }}>reset</Text>
          </Pressable>
          <Pressable style={[styles.dropdownButton, styles.applyButton]} onPress={apply}>
            <Text style={{ color: '#fff', textTransform: 'uppercase' }}>apply</Text>
          </Pressable>
        </View>
      </View>
    )
  }
}

const CharacterFilter = () => {
  const [visible, setVisible] = useAtom(visibleAtom)

  const chevronIcon = visible ? require('../../icons/chevron-up.png') : require('../../icons/chevron-down.png')

  return (
    <View>
      <Pressable
        onPress={() => setVisible((prev) => prev = !prev)}
        style={styles.filterButton}
      >
        <Text style={styles.filterText}>filter</Text>
        <Image source={chevronIcon} />
      </Pressable>
      <Dropdown />
    </View>
  )
}

const CharacterSearch = () => {
  const [searchValue, setSearchValue] = useAtom(searchValueAtom)
  const setSearch = useSetAtom(searchAtom)
  const setPagination = useSetAtom(paginationAtom)

  const onChange = (value: string) => {
    setSearchValue(value)
  }

  const onSubmit = async () => {
    setPagination(1)
    setSearch(searchValue)
  }

  return (
    <View style={styles.inputContainer}>
      <Image source={require('../../icons/magnifying-glass.png')} style={styles.inputIcon} />
      <TextInput
        onSubmitEditing={onSubmit}
        onChangeText={onChange}
        value={searchValue}
        style={styles.input}
        placeholder='Search the characters'
        textAlignVertical='center'
        placeholderTextColor={'#59695C'}
      />
    </View>
  )
}

const SearchAndFilter = () => {
    return (
        <View>
            <CharacterSearch />
            <CharacterFilter />
        </View>
    )
}

export default SearchAndFilter
