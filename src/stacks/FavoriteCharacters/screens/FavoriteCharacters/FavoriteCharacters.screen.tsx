import {View, Text, ScrollView} from 'react-native';
import React, { useEffect } from 'react';
import { useAtomValue, useSetAtom, atom, useAtom } from 'jotai';
import * as api from '../../../../api'
import {styles} from './FavoriteCharacters.styled';
import { favouritesIdsAtom } from '../../../../components/LikeButton/LikeButton';
import { CharacterInfo } from '../../../CharacterList/screens/CharacterList/CharacterList.screen';
import CharacterCard from '../../../../components/CharacterCard/CharacterCard';
import { useIsFocused } from '@react-navigation/native';

const favouriteCharactersAtom = atom<CharacterInfo[]>([])
const areIdsEmptyAtom = atom((get) => {
  const ids = get(favouritesIdsAtom)
  return !ids.length
})

const CharactersList = () => {
  const favouriteCharacters = useAtomValue(favouriteCharactersAtom)

  return (
    <ScrollView style={styles.listContainer}>
      {favouriteCharacters.map(el => (
        <CharacterCard key={el.id} character={el} />
      ))}
    </ScrollView>
  )
}

const FavouriteCharacters = () => {
  const areIdsEmpty = useAtomValue(areIdsEmptyAtom)

  if(areIdsEmpty) {
    return <Text>Favourites are empty</Text>
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
      if(areIdsEmpty) return
      try {
        const resp = await api.getCharacterInfo(favouritesIds)
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
      <FavouriteCharacters />
    </View>
  );
};

export default FavoriteCharactersScreen;
