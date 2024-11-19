import React, { useEffect } from 'react';
import {View, Text, Pressable, FlatList} from 'react-native';
import { useAtomValue, useSetAtom, atom } from 'jotai';
import { useIsFocused } from '@react-navigation/native';
import { favouritesIdsAtom } from '../../../../components/LikeButton/LikeButton';
import { CharacterInfo } from '../../../CharacterList/screens/CharacterList/CharacterList.screen';
import CharacterCard from '../../../../components/CharacterCard/CharacterCard';
import SearchAndFilter from '../../../../components/SearchAndFilter/SearchAndFilter';
import { selectedCharacterAtom } from '../../../CharacterList/screens/CharacterList/CharacterList.screen';
import { fetchingAtom } from '../../../CharacterList/screens/CharacterList/CharacterList.screen';
import { characterInfoAtom } from '../../../CharacterDetails/screens/CharacterDetails/CharacterDetails.screen';
import {styles} from './FavoriteCharacters.styled';
import * as api from '../../../../api'

const favouriteCharactersAtom = atom<CharacterInfo[]>([])
const areIdsEmptyAtom = atom((get) => {
  const ids = get(favouritesIdsAtom)
  return !ids.length
})

const Card = ({ item }: {item: CharacterInfo}) => {
  const setSelectedCharacter = useSetAtom(selectedCharacterAtom)
  const setCharacterInfo = useSetAtom(characterInfoAtom)

  return (
    <Pressable
      key={item.id}
      onPress={(): void => {
        setCharacterInfo({} as CharacterInfo)
        setSelectedCharacter(item.id)
      }}
    >
      <CharacterCard key={item.id} character={item} />
    </Pressable>
  )
}

const renderCard = ({ item }: { item: CharacterInfo }) => {
  return (
    <Card item={item} />
  )
}

const CharactersList = () => {
  const favouriteCharacters = useAtomValue(favouriteCharactersAtom)
  const fetching = useAtomValue(fetchingAtom)

  if(fetching) {
    return <Text style={{ flex: 1, marginTop: 25 }}>Loading...</Text>
  }

  return (
    <FlatList
      data={favouriteCharacters}
      renderItem={renderCard}
      keyExtractor={item => '' + item.id}
      contentContainerStyle={{ gap: 10 }}
    />
  )
}

const FavouriteCharacters = () => {
  const areIdsEmpty = useAtomValue(areIdsEmptyAtom)

  if(areIdsEmpty) {
    return <Text style={{ marginBottom: 'auto' }} >Favourites are empty</Text>
  }

  return (
    <CharactersList />
  )
}

const FavoriteCharactersScreen = () => {
  const favouritesIds = useAtomValue(favouritesIdsAtom)
  const areIdsEmpty = useAtomValue(areIdsEmptyAtom)
  const setFavouriteCharacters = useSetAtom(favouriteCharactersAtom)
  const isFocused = useIsFocused()

  useEffect(() => {
    async function getCharacters() {
      if(areIdsEmpty) return;
      try {
        const resp = await api.getFiltered({id: favouritesIds})
        const json = await resp.json()
        const isArray = Array.isArray(json)
        setFavouriteCharacters(() => isArray ? [
          ...json as CharacterInfo[]
        ] : [json])
      } catch (err) {
        console.log('There was error getting favourite characters: ', err)
      }
    }
    getCharacters()
  }, [isFocused, favouritesIds])

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Characters</Text>
        <SearchAndFilter />
      </View>
      <FavouriteCharacters />
    </View>
  );
};

export default FavoriteCharactersScreen;
