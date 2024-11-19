import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TabNavigationStackParamList} from '../TabNavigation/TabNavigation.routes';
import {CharacterDetailsStackParamList} from '../CharacterDetails/CharacterDetails.routes';

export type MainStackParamList = {
  TabNavigationStack: NavigatorScreenParams<TabNavigationStackParamList>;
  CharacterDetailsStack: NavigatorScreenParams<CharacterDetailsStackParamList>;
};

export type MainStackNavigationProp =
  NativeStackNavigationProp<MainStackParamList>;

export const MainStackRoutes: {
  [route in keyof MainStackParamList]: route;
} = {
  TabNavigationStack: 'TabNavigationStack',
  CharacterDetailsStack: 'CharacterDetailsStack',
};
