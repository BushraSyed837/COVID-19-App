import * as React from 'react';
import {ActivityIndicator,View, Text, Button,TouchableOpacity,ScrollView,StyleSheet } from 'react-native';
import { Ionicons, FontAwesome } from "@expo/vector-icons"; 
import AsyncStorage from '@react-native-community/async-storage';
export default class FavCoun extends React.Component{
  constructor(props){
    super();
    this.state={
      storeFavCountry:[],   
      countryName:"Pakistan"
    }
  }
  componentDidMount(){  
      this.getStoredItem()
  }
  updateListItems = (item) => {
    this.setState({countryName:(this.state.countryName=item)})
    this.props.navigation.navigate("CountryDetails", this.state.countryName)
  }
  removeListItems=(ikey)=>{
    const features=this.state.storeFavCountry.slice(0, ikey).concat(this.state.storeFavCountry.slice(ikey + 1, this.state.storeFavCountry.length));
    this.setState({storeFavCountry:features})
    
  }
  scrollView=()=>{
    {console.log(this.state.storeFavCountry)}
    return(
      <ScrollView style={{backgroundColor:"grey",flex:1, flexDirection:"column" }} >
            <View >
            {this.state.storeFavCountry.map((item, key) =>{return <TouchableOpacity style={styles.adjustModal} key={key} onPress={() => {this.updateListItems(item)}}><Text style={{color:"#fff"}}>{key+1}- {item}</Text>
           <View style={{alignSelf:"flex-end"}}>
           <FontAwesome name="star" size={17} color={"orange"} onPress={()=>{this.removeListItems(key),this.setData()
           }}
             /></View> 
            </TouchableOpacity>} 
            )}
      </View>                       
           </ScrollView>
           
    );

  }
  emptyView=()=>{
    return(
      <View>
          <Text style={{alignSelf:"center", marginTop:12, color:"orange", fontStyle:"italic"}}>
            No Favourite Country To Display
          </Text>
       </View>
    );
  }
  getStoredItem(){
    console.log("getting") 
     AsyncStorage.getItem("getFavArray")
     .then((value)=>{
       this.setState({storeFavCountry:value.split(",")})
      })   
     
  }
  setData(){
     AsyncStorage.mergeItem("getFavArray",(this.state.storeFavCountry) )
     .then( ()=>{
       console.log('It was saved successfully')
      })
      console.log("saved")
      }
  render(){    
    if (this.state.dataLoad) {
      return (
        <View style={{ flex: 1, padding: 40,backgroundColor:"grey"}}>
          <ActivityIndicator size="large" color="orange" />
        </View>
      );
    }
    return(
      <View style={{backgroundColor:"grey",flex:1, flexDirection:"column" }}>
        <View style={styles.heading}><Text style={{textAlign:"center", fontSize:15,fontFamily:"Times New Roman",color:"white"}}>List Of Favourite Country</Text></View>      
        <View>   
          {(this.state.storeFavCountry.length<1)?this.emptyView():this.scrollView()}
        </View>
      </View>
    )
  }}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  adjustModal: {
    flexDirection:"column",
    justifyContent:"center",
    backgroundColor:"grey",
    fontSize:12,
    color:"white",    
    borderRadius:9,
    borderWidth:2,
    borderColor:"orange",
    width:"90%",
    marginTop:"2%",
    marginLeft:"6%",
    padding:6,
  }, 
  heading: {
    marginTop: '2%',
    textAlign: 'center',
    color: 'white',
    backgroundColor:"orange",
    marginLeft:50,
    marginRight:50,
    margintop:12,
    marginBottom:18,
    padding:6,
    borderRadius:9,

  },
});


