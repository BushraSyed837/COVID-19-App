import * as React from 'react';
import {ActivityIndicator,Button,View,Text,TouchableOpacity,ScrollView,Image,StyleSheet,FlatList} from 'react-native';
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { ListItem, Icon } from 'react-native-elements'

class CountryStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      dataLoad:true,
      countryName:this.props.route.params,
      dataSource:[],
      country:[],
      cases:0,
      recovered:0,
      deaths:0,
    };
  }
  componentDidMount() {
    this.getData();
    this.getDat();
  }
  getData() {
    return fetch("https://world-population.p.rapidapi.com/population?country_name="+this.state.countryName,  {
      method: 'GET',
      headers: {
	    	"x-rapidapi-key": "979e8ea916mshee16c8e7ff6d13ap15a64bjsnbcc7d02d2bcd",
	    	"x-rapidapi-host": "world-population.p.rapidapi.com"
	},
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            dataLoad: false,
            country:(this.state.country=Object.values(responseJson.body)),
          },
        );
        {console.log(responseJson.body)}
      })
      .catch((error) => {
        console.error(error);
      });
  }
  getDat() {
        const where = encodeURIComponent(JSON.stringify({
          "countryName": this.state.countryName}))
       return  fetch(
          `https://parseapi.back4app.com/classes/Covid19Case?limit=10&order=countryName&where=${where}`,
          {
            headers: {
              'X-Parse-Application-Id': 'zoZ3zW1YABEWJMPInMwruD5XHgqT4QluDAAVx0Zz', 
              'X-Parse-Master-Key': 'gIo7p0nTyt72aROJqf0ronfzxGKw8Unjw0Zk6qFm', 
            },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        {console.log(responseJson.results[0])}
        this.setState(
          {
            dataLoad: false,
            cases:(this.state.cases=(responseJson.results[0].cases)),
            recovered:(this.state.cases=(responseJson.results[0].recovered)),
            deaths:(this.state.cases=(responseJson.results[0].deaths))
          },
        );
        console.log(this.state.cases,this.state.recovered,this.state.deaths)
      })
      .catch((error) => {
        console.error(error);
        alert("Not Found")
         this.props.navigation.navigate("Country Stats")
      });
  }
  render() {
  this.props.navigation.setOptions({
          headerLeft: () => <View style={{ paddingLeft: 10 }}>
            <Ionicons
              name="arrow-back"
              size={25}
              color="grey"
              onPress={() => {this.props.navigation.goBack(null)}}
            />
          </View>
   })
    if (this.state.dataLoad) {
      return (
        <View style={{ flex: 1, padding: 40, backgroundColor:"grey"}}>
          <ActivityIndicator size="large" color="orange"/>
        </View>
      );
    }
   return(
        <View style={{backgroundColor:"grey", flex:1, }}>
        <View style={{textAlign:"center", margin:"2%", }}><Text style={{color:"orange",fontSize:15}}>Details of {this.state.countryName} with respect to Population and Covid-19 Cases</Text></View>
          <View style={{marginLeft:"10%",marginRight:"10%", marginTop:"3%"}}>
      {this.state.country.map((item, i) => (
      <ListItem key={i} bottomDivider >
        <ListItem.Content>
          <View style={{flexDirection:"row", flex:1, justifyContent:"space-between" }}>
          <TouchableOpacity>          
          <ListItem.Content>
          {i==0?<Text>Name: {"          "+item}</Text>:i==1?<Text>Population: {"   "+item}</Text>:i==2?<Text>Ranking: {"        "+item}</Text>:i==3?<Text>World Share: {" "+item}</Text>:""}
          </ListItem.Content>
          </TouchableOpacity>
          </View>
        </ListItem.Content>
      </ListItem>
    ))}
    <ListItem bottomDivider>
    <ListItem.Content>
    <Text>Cases:{"            "+this.state.cases}</Text>
    </ListItem.Content>
    </ListItem>
    <ListItem  bottomDivider>
    <Text>Recovered:{"    "+ this.state.recovered}</Text>
    </ListItem>
    <ListItem  bottomDivider>
    <ListItem.Content>
    <Text>Deaths:{"         "+ this.state.deaths}</Text>
    </ListItem.Content>
    </ListItem>
      </View>
        </View> 
    );
  }
}
export default CountryStats;

const styles = StyleSheet.create({
  heading: {
    marginTop: '2%',
    textAlign: 'center',
    color: 'grey',
    

  },
});