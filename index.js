import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';

import App from './App';
//import CallScreen from './src/UI/UserComponent/CallScreen'
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

/*
AppRegistry.registerHeadlessTask('CallScreen', () =>
    require('CallScreen')
);*/