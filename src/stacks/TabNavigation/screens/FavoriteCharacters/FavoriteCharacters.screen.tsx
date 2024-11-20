import React, { useEffect } from 'react';
import {View, Text, Pressable, FlatList} from 'react-native';
import { useAtomValue, useSetAtom, atom } from 'jotai';
import { useIsFocused } from '@react-navigation/native';
import { favouritesIdsAtom } from '../../../../components/LikeButton/LikeButton';
import CharacterCard from '../../../../components/CharacterCard/CharacterCard';
import Header from '../../../../components/Header/Header';
import SearchAndFilter, { searchAtom, speciesAtom, statusAtom } from '../../../../components/SearchAndFilter/SearchAndFilter';
import { selectedCharacterAtom } from '../CharacterList/CharacterList.screen';
import { fetchingAtom } from '../CharacterList/CharacterList.screen';
import { characterInfoAtom } from '../../../CharacterDetails/screens/CharacterDetails/CharacterDetails.screen';
import {styles} from './FavoriteCharacters.styled';
import { CharacterInfo } from '../../../../types';
import * as api from '../../../../api'

const favouriteCharactersAtom = atom<CharacterInfo[]>([])
const areIdsEmptyAtom = atom((get) => {
  const ids = get(favouritesIdsAtom)
  return !ids.length
})

const displayedFavouritesAtom = atom((get) => {
  const favourites = get(favouriteCharactersAtom)
  const search = get(searchAtom)
  const species = get(speciesAtom)
  const status = get(statusAtom)

  return favourites.filter(f => {
    if(f.name.includes(search)) {
      let includes = true
      if(species && species === f.species.toLowerCase()) {
        includes = false
      } else if(status && status !== f.status.toLowerCase()) {
        includes = false
      }
      return includes
    }
    return false
  })
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
  const displayedFavourites = useAtomValue(displayedFavouritesAtom)
  const fetching = useAtomValue(fetchingAtom)

  if(fetching) {
    return <Text style={{ flex: 1, marginTop: 25 }}>Loading...</Text>
  }

  return (
    <FlatList
      data={displayedFavourites}
      renderItem={renderCard}
      keyExtractor={item => '' + item.id}
      contentContainerStyle={{ gap: 10 }}
    />
  )
}

const FavouriteCharacters = () => {
  const areIdsEmpty = useAtomValue(areIdsEmptyAtom)

  if(areIdsEmpty) {
    return <Text style={{ flex: 1, textAlign: 'center', marginBottom: 'auto', marginTop: 25 }} >Favourites are empty</Text>
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
      <Header />
      <View style={styles.content}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>Characters</Text>
          <SearchAndFilter />
        </View>
        <FavouriteCharacters />
      </View>
    </View>
  );
};

export default FavoriteCharactersScreen;
