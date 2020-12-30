import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator,DrawerContentScrollView, } from '@react-navigation/drawer';
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Avatar } from 'react-native-elements';
import WorldStats from "./screens/WorldStats";
import FavCoun from "./screens/FavCountry";
import CountryStats from "./screens/CountryStats";
import CountryDetails from "./screens/CountryDetails";
import DrawerContent from "./screens/Drawer";
const Drawer = createDrawerNavigator();
// Drawer Navigation Starts
class MyDrawer extends React.Component {
  constructor(props){
    super(props)   
  }
  render(){
    return (    
    <Drawer.Navigator drawerType="slide" drawerStyle={{width: 230,}}
    drawerContent={props=>  <DrawerContent {...props}/>}
    drawerContentOptions={{
      activeTintColor: 'orange',
      itemStyle: { marginVertical: 5 },
    }}   
    >    
    <Drawer.Screen
          name="World Stats"
          component={StackNavigator1}
          options={{
              drawerLabel: "World Stats",
              drawerIcon: () => <Ionicons name="md-globe" size={26} color="orange" />,
          }}/>
      <Drawer.Screen
          name="Country Stats"
          component={StackNavigator2}
          options={{
            drawerLabel: "Country Stats",
            drawerIcon: () => <Ionicons name="md-flag" size={26} color="orange" />,
          }}/>
      <Drawer.Screen
          name="Fav Country"
          component={StackNavigator3}
          options={{
            drawerLabel: "Fav Country",
            drawerIcon: () => <Ionicons name="md-star" size={26} color="orange" />,
        }}/>
    </Drawer.Navigator>
    );
}}
// Drawer Navigation ends
const Stack1 = createStackNavigator();// stack variable for stacknavigation screen 1
const Stack2 = createStackNavigator();// stack variable for stacknavigation screen 2
const Stack3 = createStackNavigator();// stack variable for stacknavigation screen 3

//StackNavigation for world Stats

class StackNavigator1 extends React.Component {
  render(){
    return (     
    <Stack1.Navigator    
      screenOptions={{   
        headerTitleAlign:"center",              
         headerTintColor:"grey",
         headerStyle:{
           backgroundColor:"orange",
           borderWidth:2,  
          borderColor:"#fff",
         },
        headerLeft: () =>
          <View style={{ paddingLeft: 10 }}>
            <Ionicons
              name="md-menu"
              color="grey"  
              size={32}
              onPress={() => this.props.navigation.toggleDrawer()}    
            />
          </View>
      }}>   
    <Stack1.Screen
        name="World Stats"
        component={WorldStats}
        options={{
          title: 'World Stats',  
        }}
      />
    </Stack1.Navigator>
  )   
}}
// Stack Navigation for "country stats" and "country detail".
class StackNavigator2 extends React.Component {
  render(){
    return (
      <Stack2.Navigator
      screenOptions={{
        headerTitleAlign:"center",
         headerTintColor:"grey",
         headerStyle:{
           backgroundColor:"orange",
           borderWidth:2,
          borderColor:"#fff",
         },
        headerLeft: () =>
          <View style={{ paddingLeft: 10 }}>
            <Ionicons
              name="md-menu"
              color="grey"
              size={32}
              onPress={() => this.props.navigation.toggleDrawer()}
            />
          </View>
      }}>
      <Stack2.Screen
        name="Country Stats"
        component={CountryStats}
        options={ ({
          title: 'Country Stats',
        })
        }
      />
      <Stack2.Screen
        name="CountryDetails"
        component={CountryDetails}
        options={ ({
          title: 'Country Detail',
        })
        }
      />        
       </Stack2.Navigator>
)}}
// Stack Navigation for favourite Country.
class StackNavigator3 extends React.Component { 
  render(){
    return (
      <Stack3.Navigator
      screenOptions={{
        headerTitleAlign:"center",
         headerTintColor:"grey",
         headerStyle:{
           backgroundColor:"orange",
           borderWidth:2,
          borderColor:"#fff",
         },
        headerLeft: () =>
          <View style={{ paddingLeft: 10 }}>
            <Ionicons
              name="md-menu"
              color="grey"
              size={32}
              onPress={() => this.props.navigation.toggleDrawer()}
            />
          </View>
      }}> 
      <Stack3.Screen name="Fav Country" component={FavCoun}
        options={{
        title: 'Favourite Countries',
        headerTitleAlign:"center",
         headerTintColor:"grey",
         headerStyle:{
           backgroundColor:"orange",
           borderWidth:2,
          borderColor:"#fff",
         },}}
      />
      </Stack3.Navigator>
    )}}

// main component for drawer call
export default class App extends React.Component {
  render(){
    return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}}



