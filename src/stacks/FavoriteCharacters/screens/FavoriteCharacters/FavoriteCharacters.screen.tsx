import {View, Text} from 'react-native';
import React, { useEffect } from 'react';
import { useAtomValue, useSetAtom, atom } from 'jotai';
import * as api from '../../../../fetch'
import {styles} from './FavoriteCharacters.styled';
import { likesAtom } from '../../../../components/LikeButton/LikeButton';
import { CharacterInfo } from '../../../CharacterList/screens/CharacterList/CharacterList.screen';
import CharactersList from '../../../../components/CharactersList/CharactersList';

const favouriteCharactersAtom = atom<CharacterInfo[]>([])

const FavouriteCharacters = () => {
  const favouriteCharacters = useAtomValue(favouriteCharactersAtom)

  return (
    <CharactersList charactersList={favouriteCharacters} />
  )
}

const FavoriteCharactersScreen = () => {
  const favourites = useAtomValue(likesAtom)
  const setFavouriteCharacters = useSetAtom(favouriteCharactersAtom)

  useEffect(() => {
    async function getCharacters() {
      try {
        const resp = await api.getCharacterInfo(favourites)
        const json = await resp.json()
        console.log('resp: ', json)
        setFavouriteCharacters(() => [
          ...json as CharacterInfo[]
        ])
      } catch (err) {
        console.log('There was error getting all characters: ', err)
      }
    }
    getCharacters()
  }, [])

  return (
    <View style={styles.container}>
      <FavouriteCharacters />
    </View>
  );
};

export default FavoriteCharactersScreen;
