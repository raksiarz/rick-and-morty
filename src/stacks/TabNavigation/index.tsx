import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CharacterListScreen} from './screens/CharacterList';
import {FavoriteCharactersScreen} from './screens/FavoriteCharacters';

const Tab = createBottomTabNavigator();

export const TabNavigationStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Characters"
        component={CharacterListScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoriteCharactersScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};
