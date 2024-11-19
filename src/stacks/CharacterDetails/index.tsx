import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native'
import Header from '../../components/Header/Header';
import {CharacterDetailsStackRoutes} from './CharacterDetails.routes';
import {CharacterDetailsScreen} from './screens';

const Stack = createNativeStackNavigator();
const styles = StyleSheet.create({
  backButton: {
    padding: 10,
  },
  backText: {
    fontSize: 12,
    color: '#59695C',
    textDecorationLine: 'underline'
  }
})

const CustomHeader = ({navigation}: any) => {
  return (
    <>
      <Header />
      <Pressable style={styles.backButton} onPress={navigation.goBack}>
        <Text style={styles.backText}>{'<- Go back to Characters List'}</Text>
      </Pressable>
    </>
  )
}

export const CharacterDetailsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={CharacterDetailsStackRoutes.CharacterDetailsScreen}
        children={CharacterDetailsScreen}
        options={{
          header: ({navigation}) =>{
            return (
              <CustomHeader navigation={navigation} />
            )
          }
        }}
      />
    </Stack.Navigator>
  );
};
