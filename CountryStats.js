import * as React from 'react';
import {ActivityIndicator,Button,View,Text,TouchableOpacity,ScrollView,Image,StyleSheet,FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { SearchBar } from 'react-native-elements';
import { Searchbar } from 'react-native-paper';
class CountryStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      dataLoad:true,
      countryName:"Pakistan",
      favcoun:[],
      country:[],
      starcolor:"white",
      copyCountry:[]
    };
    this.arrayholder=[]
  }
  componentDidMount() {
    this.getData();
  }
  getStoredItem(){
    console.log("getting") 
     AsyncStorage.getItem("getFavArray")
     .then((value)=>{
       this.setState({favcoun:value.split(",")})
  }) 
  }
  searchFilterFunction = (text) => {
    this.setState({search:this.state.search=text}) 
    this.updateSearch(this.state.search)
    if (this.state.search) {
      const newData = this.arrayholder.filter(item => {        
    const itemData = `${item.Country.toUpperCase()}`;
     const textData = this.state.search.toUpperCase(); 
        return itemData.startsWith(textData);
      });
      this.setState({ country: this.state.country=newData }); 
  console.log(newData)
    } else {
      return this.state.country
    } 
};
   state = {
    search: '',
  };
  updateSearch = (search) => {
    this.setState({ search });
  };
  setData(){
    this.getStoredItem()
     AsyncStorage.setItem("getFavArray",(this.state.favcoun) )
     .then(()=>{
       console.log('It was saved successfully')
       this.setData2();
      })
  }
  setData2(){
     AsyncStorage.mergeItem("getFavArray",(this.state.storeFavCountry) )
     .then( ()=>{
       console.log('It was saved successfully')
      })
      console.log("saved")
      }
  updateListItems = (item) => {
    this.setState({countryName:(this.state.countryName=item)})
    this.props.navigation.navigate("CountryDetails",this.state.countryName)
  }
  getData() {
    var requestOptions = {
        method: 'GET',
      redirect: 'follow'
};
    return fetch("https://api.covid19api.com/summary", requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            dataLoad: false,
            country:(this.state.country=(responseJson.Countries)),
          },     
        );
        {console.log(this.state.country)}
        this.arrayholder=this.state.country
        this.setState({copyCountry:this.state.copyCountry=(responseJson.Countries)})
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    this.props.navigation.setOptions({
      headerRight: () =>
            <View style={{ paddingRight: 10 }}>
              <FontAwesome name="star" size={23} color="grey" onPress={()=> this.props.navigation.navigate("Fav Country")}/>
            </View>,
    });  
    if (this.state.dataLoad) {
      return (
        <View style={{ flex: 1, padding: 40,backgroundColor:"#fff"}}>
          <ActivityIndicator animating size="large" color="orange" />
        </View>
      );
    }
    const { search } = this.state;
   return(    
     <View style={styles.container}>
     <View style={styles.heading}><Text style={{textAlign:"center", fontSize:15,fontFamily:"Times New Roman",color:"#fff"}}>List Of Countries</Text></View>
     <View style={{marginLeft:"5%", marginRight:"5%",}}>
          <SearchBar
          inputStyle={{backgroundColor: 'white', padding: 3,marginLeft:"3%",fontSize:15, fontFamily:"Arial", borderRadius:"3%"}}
          containerStyle={{backgroundColor: 'orange', padding: 3,borderRadius:"3%"}}
          inputContainerStyle={{backgroundColor: 'grey', padding: 3,borderRadius:"3%"}}  
          placeholderTextColor={'orange'}
              lightTheme
              backgroundColor="orange"
              placeholder="filter it by name"       
              onChangeText={text => this.searchFilterFunction(text)}    
              autoCorrect={false}   
              clearIcon={{ style: { padding: 10 } }}
               value={search}   
               onClear={()=>this.setState({country:this.state.country=this.state.copyCountry})}/>
        </View>    
      <FlatList
           data={this.state.country}
            renderItem={({item}) =>
            <TouchableOpacity style={styles.adjustModal} onPress={() => {this.updateListItems(item.Country)}}><Text style={{color:"#fff"}}>{item.Country}</Text>
        <View style={{alignSelf:"flex-end"}}>
        <FontAwesome name="star" size={17} color={this.state.starcolor} onPress={()=>{ this.setState({favcoun:this.state.favcoun=(this.state.favcoun.concat(item.Country)),starcolor:(this.state.starcolor="orange")})
  this.setData()
  console.log(this.state.favcoun)}}/>
  </View></TouchableOpacity>} />
       </View>
    );
  }
}   
export default CountryStats;  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'silver',
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
    marginLeft:"6%",
    margin:6,
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



