import React, { useEffect } from 'react';
import {Text, View, Button } from 'react-native';
import { atom, useAtomValue, useAtom, useSetAtom } from 'jotai';
import { CharacterInfo, selectedCharacterAtom } from '../../../CharacterList/screens/CharacterList/CharacterList.screen';
import * as api from '../../../../fetch';
import {styles} from './CharacterDetails.styled';

const characterInfoAtom = atom<CharacterInfo>({} as CharacterInfo)

const CharacterCard = () => {
  const characterInfo = useAtomValue(characterInfoAtom)

  return (
    <Text>{characterInfo.name}</Text>
  )
}

const CharacterDetailsScreen = () => {
  const setCharacterInfo = useSetAtom(characterInfoAtom)
  const selectedCharacter = useAtomValue(selectedCharacterAtom)

  useEffect(() => {
    async function getCharacter() {
      try {
        const resp = await api.getCharacterInfo(selectedCharacter)
        const json = await resp.json()
        setCharacterInfo(json)
      } catch(err) {
        console.log('There was error getting all characters: ', err)
      }
    }
    getCharacter()
  }, [])

  return (
    <View style={styles.container}>
      <CharacterCard />
    </View>
  );
};

export default CharacterDetailsScreen;
