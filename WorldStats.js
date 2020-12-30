import * as React from 'react';
import {ActivityIndicator,Button,View,Text,TouchableOpacity,ScrollView,Image,StyleSheet,FlatList} from 'react-native';
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { ListItem, Icon } from 'react-native-elements'
import moment from 'moment'

class WorldStats extends React.Component{
  constructor(props) {
    super(props);
    this.state = { 
      dataLoad:true,
      countryName:"Pakistan",
      dataSource:[],
      world:[],
      date:"",
    };
  }
  componentDidMount() {
    this.getData()
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
            world:(this.state.world=Object.values(responseJson.Global)),
            date:this.state.date=(responseJson.Date)
          },
        );
        {console.log(responseJson)}
        {console.log(this.state.world)}
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  render() {
    if (this.state.dataLoad) {
      return (
        <View style={{ flex: 1, padding: 40,backgroundColor:"grey"}}>
          <ActivityIndicator size="large" color="orange" />
        </View>    
      );
    }
   return(
       <View style={{backgroundColor:"grey", flex:1}}>
       <View style={{marginTop:"5%", marginBottom:"5%", backgroundColor:"grey"}}>
       <Text style={{textAlign:"center", color:"orange", fontSize:18}}>COVID-19 Global Cases Statistics</Text>
       <Text style={{color:"white", fontSize:12, textAlign:"center", marginTop:"2%"}}>These stats are being displayed by comparing the world population</Text>
       <View style={{color:"white",marginLeft:"10%" ,marginTop:"2%"}}><Text>World Population: <Text style={{color:"orange"}}>7.594 billion</Text></Text></View>
       </View>
       <View style={{marginLeft:"10%",marginRight:"10%", marginTop:"2%"}}>
      {this.state.world.map((item, i) => (
      <ListItem key={i} bottomDivider>
        <ListItem.Content>
          <View style={{flexDirection:"row", flex:1, justifyContent:"space-between" }}>
          <TouchableOpacity>          
          <ListItem.Content>
          {i==0?<Text>New Confirmed Cases: {"         "+((item/7794798739)*100).toFixed(2)+"%"}</Text>:i==1?<Text>Total Confirmed Cases: {"         "+((item/7794798739)*100).toFixed(2)+"%"}</Text>:i==2?<Text>New Deaths: {"                         "+((item/7794798739)*100).toFixed(4)+"%"}</Text>:i==3?<Text>Total Deaths: {"                        "+((item/7794798739)*100).toFixed(2)+"%"}</Text>:i==4?<Text>New Recovered Cases: {"        "+((item/7794798739)*100).toFixed(4)+"%"}</Text>:i==5?<Text>Total Recovered Cases: {"        "+((item/7794798739)*100).toFixed(2)+"%"}</Text>:""}
          </ListItem.Content>
          </TouchableOpacity> 
          </View>
        </ListItem.Content>
      </ListItem>
    ))}
    </View>
    <View style={{backgroundColor:"orange", marginTop:"3%", padding:10,marginLeft:"10%",marginRight:"10%"}}>
    <Text style={{color:"white", textAlign:"center"}}> Last Updated:{"   "+moment(this.state.date).fromNow()}</Text></View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' }
});

export default WorldStats;




