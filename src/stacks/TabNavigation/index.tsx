import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CharacterListStack} from '../CharacterList';
import {FavoriteCharactersStack} from '../FavoriteCharacters';

const Tab = createBottomTabNavigator();

export const TabNavigationStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="All Characters"
        component={CharacterListStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Liked Characters"
        component={FavoriteCharactersStack}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};
