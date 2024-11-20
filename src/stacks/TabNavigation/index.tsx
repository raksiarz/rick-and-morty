import React from 'react';
import { View, Pressable, Text, Image } from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CharacterListScreen} from './screens/CharacterList';
import {FavoriteCharactersScreen} from './screens/FavoriteCharacters';
import styles from './TabNavigation.styled';
import Footer from '../../components/Footer/Footer';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ navigation, state }: any) => {
  console.log('state: ', state)
  return (
      <View style={styles.tabBarContainer}>
        <Pressable
          onPress={() => navigation.navigate('Characters')}
          style={[styles.tabBarButton, state.index === 0 && styles.tabBarButtonActive]}
        >
          <Image source={require('../../icons/characters.png')} style={styles.tabBarIcon} />
          <Text style={styles.tabBarText}>all characters</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('Favorites')}
          style={[styles.tabBarButton, state.index === 1 && styles.tabBarButtonActive]}
        >
          <Image source={require('../../icons/white-star-full.png')} style={styles.tabBarIcon} />
          <Text style={styles.tabBarText}>liked characters</Text>
        </Pressable>
      </View>
  )
}

export const TabNavigationStack = () => {
  return (
    <Tab.Navigator
      tabBar={({ navigation, state }) => <CustomTabBar navigation={navigation} state={state} />}
    >
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
