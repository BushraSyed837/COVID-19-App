import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import { Ionicons, FontAwesome } from "@expo/vector-icons";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default class DrawerContent extends React.Component {
  constructor(props){
    super(props)   
  }  
  render(){
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...this.props}>
                <View style={styles.drawerContent}>   
                    <View style={styles.userSection}>
                        <View style={{flexDirection:'row',marginLeft:"32%",marginTop:"9%"}}>
                            <Avatar.Image 
                                source={{
                                    uri: 'https://i.pinimg.com/originals/23/92/fb/2392fb7e5f3b36bfbeca4ff575a7eca0.png'
                                }}
                                size={70}
                            />                               
                            </View>
                            <View style={{marginLeft:"29%", flexDirection:'column' }}>
                                <Title style={{color:'orange', fontSize:15}}>Bushra Syed</Title>
                            </View>
                            <View>
                            <Caption style={{textAlign:"center"}}>bushraabbas368@gmail.com</Caption>
                            </View>
                            <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={ ({color, size} ) =>( <Ionicons name="md-globe" size={26} color="orange"/> )}
                            label="World Stats"
                            onPress={() => {this.props.navigation.navigate('World Stats')}}
                        />
                        <DrawerItem 
                            icon={ ({color, size} ) =>( <Ionicons name="md-flag" size={26} color="orange" /> )}
                            label="Country Stats"
                            onPress={() => {this.props.navigation.navigate('Country Stats')}}
                        />
                        <DrawerItem 
                            icon={ ({color, size} ) =>( <Ionicons name="md-star" size={26} color="orange" /> )}
                            label="Fav Country"
                            onPress={() => {this.props.navigation.navigate('Fav Country')}}
                        />
                        
                    </Drawer.Section>
                  </View>
              </View>
          </DrawerContentScrollView>
        </View>
    );
}}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userSection: {
      paddingLeft: 20,
    },
    drawerSection: {
      marginTop: 15,
      alignSelf:"center"
    },
    
  });