import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import {
    useNavigation
} from "@react-navigation/native";

import PushNotification from "react-native-push-notification";
import App from './App';
//import CallScreen from './src/UI/UserComponent/CallScreen'
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

PushNotification.configure({
    onAction: function(notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);
        if (notification.action == "Accept") {
            console.log('accepted')
                //navigation.navigate('Home')
        } else {
            console.log('rejected')
            PushNotification.cancelLocalNotification('Call')
        }
        // process the action
    },
});


PushNotification.createChannel({
        channelId: "Alert_PCCC", // (required)
        channelName: "My channel", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

PushNotification.createChannel({
        channelId: "Calling", // (required)
        channelName: "Calling channel", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);


registerRootComponent(App);