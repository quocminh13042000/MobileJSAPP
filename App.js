import React from "react";
import "react-native-gesture-handler";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import DetailsComponent from "./src/UI/HomeComponent/DetailsComponent";
import forgotPWComponent from "./src/UI/HomeComponent/forgotPWComponent";
import LogoutComponent from "./src/UI/HomeComponent/LogoutComponent";
import MapComponent from "./src/UI/HomeComponent/MapComponent";
import HomeScreen from "./src/UI/TramPhuLam/HomeScreen";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";

import UserScreen from "./src/UI/UserComponent/UserComponent";
import { SafeAreaView, StatusBar } from "react-native";
import Home from "./src/UI/UserComponent/CallComponent/Home";
import { interval, Subscription } from "rxjs";
import CallScreen from "./src/UI/UserComponent/CallScreen";


const Drawer = createDrawerNavigator();
export default function App() {
  /*var [Call, setCall] = React.useState(false);
  updateSubscription = interval(1000).subscribe((val) => {
    if (UserServices.Login) {
      setCall((x) => (x = true));
      Home;
      updateSubscription.unsubscribe();
    }
  });*/
  return (
    <NavigationContainer>
      <SafeAreaView>
        <StatusBar animated={true} backgroundColor="rgb(128, 235, 160)" />
      </SafeAreaView>
      <Drawer.Navigator
        drawerType={"back"}
        drawerStyle={{ width: "90%" }}
        overlayColor="transparent"
        initialRouteName="Logout"
        edgewidth={-100}
        //khoá swipe
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#A1FFB3",
            width: "80%",
          },
           swipeEnabled:false,
        }}
      >
        <Drawer.Screen
          name="Home"
          component={MapComponent}
          options={{
            headerStyle: { backgroundColor: "#3AE55B" },
          }}
        />
        <Drawer.Screen
          name="Trạm phú lâm"
          component={HomeScreen}
          options={{
            headerStyle: { backgroundColor: "#3AE55B" },
          }}
        />
        <Drawer.Screen
          name="Trạm 2"
          component={DetailsComponent}
          options={{
            headerStyle: { backgroundColor: "#3AE55B" },
          }}
        />
        <Drawer.Screen
          name="User"
          component={UserScreen}
          options={{
            headerStyle: { backgroundColor: "#3AE55B" },
          }}
        />
        <Drawer.Screen
          name="Logout"
          component={LogoutComponent}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Reset Password"
          component={forgotPWComponent}
          options={{
            drawerLabel: () => null,
            drawerIcon: () => null,
            headerShown: false,
          }}
        />
      </Drawer.Navigator>
      {/*Call ? (
        <View style={{ display: "none" }}>
          <Home></Home>
        </View>
      ) : null */}
      <View style={{ display: "none" }}><Home ></Home></View>
    </NavigationContainer>
  );
}

import BackgroundJob from "react-native-background-job";
import { UserServices } from "./src/services/User.service";

const backgroundJob = {
  jobKey: "myJob",
  job: () => CallScreen,
};

BackgroundJob.register(backgroundJob);

var backgroundSchedule = {
  jobKey: "myJob",
};

BackgroundJob.schedule(backgroundSchedule)
  .then(() => console.log("Success"))
  .catch((err) => console.err(err));
