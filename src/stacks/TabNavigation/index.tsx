import React from 'react';
import { Image } from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CharacterListStack} from '../CharacterList';
import {FavoriteCharactersStack} from '../FavoriteCharacters';

const Tab = createBottomTabNavigator();

const tabStyles = {
  backgroundColor: '#162C1B',
  border: 1,
  borderColor: '#224229',
}

export const TabNavigationStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="All Characters"
        component={CharacterListStack}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image source={require('../../icons/characters.png')} />
          ),
          tabBarItemStyle: tabStyles,
          tabBarActiveTintColor: '#DAE4DC',
          tabBarInactiveTintColor: '#DAE4DC',
        }}
      />
      <Tab.Screen
        name="Liked Characters"
        component={FavoriteCharactersStack}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image source={require('../../icons/white-star-full.png')} />
          ),
          tabBarItemStyle: tabStyles,
          tabBarActiveTintColor: '#DAE4DC',
          tabBarInactiveTintColor: '#DAE4DC'
        }}
      />
    </Tab.Navigator>
  );
};
