import React, { useEffect } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { useAtom, atom, useAtomValue, useSetAtom } from 'jotai';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {MainStackNavigationProp} from '../../../Main/Main.routes';
import CharacterCard from '../../../../components/CharacterCard/CharacterCard';
import Header from '../../../../components/Header/Header';
import PaginationButtons, { paginationAtom } from '../../../../components/PaginationButtons/PaginationButtons';
import SearchAndFilter from '../../../../components/SearchAndFilter/SearchAndFilter';
import { searchAtom, statusAtom, speciesAtom } from '../../../../components/SearchAndFilter/SearchAndFilter';
import { characterInfoAtom } from '../../../CharacterDetails/screens/CharacterDetails/CharacterDetails.screen';
import { CharacterInfo } from '../../../../types'
import {styles} from './CharacterList.styled';
import * as api from '../../../../api';

export const selectedCharacterAtom = atom<number>()
export const charactersAtom = atom<CharacterInfo[]>([])
export const fetchingAtom = atom<boolean>(false)
export const pagesAtom = atom<number>()
const fetchFailedAtom = atom<boolean>(false)

const Card = ({ item }: {item: CharacterInfo}) => {
  const setSelectedCharacter = useSetAtom(selectedCharacterAtom)
  const setCharacterInfo = useSetAtom(characterInfoAtom)

  const {navigate} = useNavigation<MainStackNavigationProp>();
  return (
    <Pressable
      key={item.id}
      onPress={(): void => {
        setCharacterInfo({} as CharacterInfo)
        setSelectedCharacter(item.id)
        navigate('CharacterDetailsStack', {
          screen: 'CharacterDetailsScreen',
        });
      }}
    >
      <CharacterCard key={item.id} character={item} />
    </Pressable>
  )
}

const renderCard = ({ item }: {item: CharacterInfo}) => {
  return (
    <Card item={item} />
  )
}

const CharactersList = () => {
  const charactersInfo = useAtomValue(charactersAtom)
  const fetching = useAtomValue(fetchingAtom)

  if(fetching) {
    return <Text style={{ flex: 1, textAlign: 'center', marginTop: 25 }}>Loading...</Text>
  }

  return (
    <FlatList
      data={charactersInfo}
      renderItem={renderCard}
      keyExtractor={item => '' + item.id}
      ListFooterComponent={PaginationButtons}
      contentContainerStyle={{ gap: 10 }}
    />
  )
}

const CharacterListScreen = () => {
  const [fetchFailed, setFetchFailed] = useAtom(fetchFailedAtom)
  const setCharacters = useSetAtom(charactersAtom)
  const setFetching = useSetAtom(fetchingAtom)
  const setPages = useSetAtom(pagesAtom)
  const pagination = useAtomValue(paginationAtom)
  const search = useAtomValue(searchAtom)
  const species = useAtomValue(speciesAtom)
  const status = useAtomValue(statusAtom)
  const isFocused = useIsFocused()
  
  useEffect(() => {
    async function getCharacters() {
      try {
        setFetching(true)
        setFetchFailed(false)
        const resp = await api.getFiltered({page: pagination, name: search, status, species})
        const json = await resp.json()
        setPages(json.info.pages)
        setCharacters(() => [
          ...json.results as CharacterInfo[]
        ])

      } catch(err) {
        console.log('There was error getting all characters: ', err)
        setFetchFailed(true)
      } finally {
        setFetching(false)
      }
    }
    getCharacters()
  }, [isFocused, pagination, search, species, status])

  if(fetchFailed) {
    return <Text style={{ flex: 1, textAlign: 'center', marginTop: 25 }}>Fetch failed</Text>
 
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>Characters</Text>
          <SearchAndFilter />
        </View>
        <CharactersList />
      </View>
    </View>
  );
};

export default CharacterListScreen;
