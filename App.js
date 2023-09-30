import { StatusBar } from "expo-status-bar";
import { STRIPE_PUBLISHABLE_KEY } from "@env";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

import ProfileScreen from "./screens/Profile/ProfileScreen";
import { useEffect, useLayoutEffect } from "react";
import colors from "./constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TrucksMainScreen from "./screens/Trucks/TrucksMainScreen";
import HomeMainScreen from "./screens/Home/HomeMainScreen";
import OrderHistoryMain from "./screens/OrderHistory/OrderHistoryMain";
import { store } from "./store/store";
import { Provider } from "react-redux";
import LocationMainScreen from "./screens/Location/LocationMainScreen";
import BlankScreen from "./screens/BlankScreen";
import { StripeProvider } from "@stripe/stripe-react-native";
import ForgotPassword from "./screens/ForgotPassword/ForgotPassword";
import OtpScreen from "./screens/ForgotPassword/OtpScreen";

import { io } from "socket.io-client";
import { baseUrl } from "./constants/baseUrl";
import Notification from "./screens/Notification/Notification";
import PaymentMethod from "./screens/PaymentMethodScreen/PaymentMethod";
const socket = io.connect(baseUrl);

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { position: "absolute" },
      }}
      initialRouteName="home"
    >
      <Tab.Screen
        name="trucks"
        component={TrucksMainScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarLabel: "Truck",
          tabBarIcon: ({ color, focused }) => (
            <View style={focused && styles.activeTab}>
              <MaterialCommunityIcons
                name="truck-fast-outline"
                size={30}
                color={focused ? colors.action : colors.gray}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarLabel: "Orders",
          tabBarIcon: ({ color, focused }) => (
            <View style={focused && styles.activeTab}>
              <Feather
                name="file-text"
                size={30}
                color={focused ? colors.action : colors.gray}
              />
            </View>
          ),
        }}
        name="orders"
        component={OrderHistoryMain}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused }) => (
            <View style={focused && styles.activeTab}>
              <AntDesign
                name="home"
                size={30}
                color={focused ? colors.action : colors.gray}
              />
            </View>
          ),
        }}
        name="home"
        component={HomeMainScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarLabel: "Location",
          tabBarIcon: ({ color, focused }) => (
            <View style={focused && styles.activeTab}>
              <Octicons
                name="location"
                size={30}
                color={focused ? colors.action : colors.gray}
              />
            </View>
          ),
        }}
        name="location"
        component={LocationMainScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <View style={focused && styles.activeTab}>
              <FontAwesome5
                name="user-circle"
                size={30}
                color={focused ? colors.action : colors.gray}
              />
            </View>
          ),
        }}
        name="profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const joinRoom = () => {
    socket.emit("join_room", "yumtruxAdmin#123$56");
  };
  useEffect(() => {
    joinRoom();
    socket.on("receive_msg", (data) => {
      // add fresh notification
      // backend will handle adding them to db
      alert("data.message.title");

      // setNotifications((prvData) => {
      //   return [
      //     {
      //       ...data.message,
      //       date: new Date(),
      //       viewed: false,
      //     },
      //     ...prvData,
      //   ];
      // });
    });

    return () => {
      // Unregister the event listener when the component unmounts
      socket.off("receive_msg");
    };
  }, [socket]);

  return (
    <NavigationContainer>
      <StripeProvider
        publishableKey={STRIPE_PUBLISHABLE_KEY}
        urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
      >
        <Provider store={store}>
          <Stack.Navigator>
            <Stack.Screen name="loading" component={BlankScreen} />
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="register" component={RegisterScreen} />
            <Stack.Screen name="forgotPass" component={ForgotPassword} />
            <Stack.Screen name="otpScreen" component={OtpScreen} />
            <Stack.Screen name="main" component={TabNavigator} />
            <Stack.Screen name="notification" component={Notification} />
            <Stack.Screen name="paymentMethod" component={PaymentMethod} />
          </Stack.Navigator>
        </Provider>
      </StripeProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    borderBottomColor: colors.action,
    borderBottomWidth: 1.5,
  },
});
