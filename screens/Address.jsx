import {memo, useCallback, useState}from 'react';
import { StyleSheet, TextInput, View,Text, TouchableOpacity, Alert, ScrollView  } from 'react-native';
import NigeriaDetails from 'naija-state-local-government';
import { SelectList } from 'react-native-dropdown-select-list';
function Address({setAddrData, navigation, route}) {
  if(route.params != undefined){
    var Data = route.params.readyToBuydata;

    var itemOrdered = route.params.itemnumber;

}
  // console.log(NigeriaDetails.all())
  const [data,  setData] = useState({})
  const [lgas, setlga] = useState('')
  const country = [
    {key:1, value:"Nigeria"},
  ];

  const state = []
  let n = 0;
  for (let i of NigeriaDetails.states()){
    state.push({key:n, value:i})
    n++;
  }

  var lga = [] 

  let handleState = useCallback((val)=>{
    let n = 0
    let lgaList = NigeriaDetails.lgas(val).lgas;

    for (let i of lgaList){
      lga.push({key:n, value:i});
      n++;
    }
    setlga(lga)
    
  }) 

let handlePress = useCallback (()=>{
  if (data.state && data.Country && data.LGA &&  data.phone && data.loc && data.title && data.address){
    console.log(data)
    Alert.alert('CONFIRM YOUR ADDRESS', ` Title:${data.title.toUpperCase()}\n Country:${data.Country}\n state:${data.state} \n LGA:${data.LGA} \n Bustop:${data.loc} \n PhoneNumber:${data.phone}\n Street:${data.address}`,[{text:'Ok', onPress:()=>{

      setAddrData((prev)=>{
        return[...prev, {id:prev.length + 1, address:`${data.address}, ${data.loc}, ${data.LGA}, ${data.state}, ${data.Country}.`, phone:data.phone, title:data.title}]
       })
       navigation.navigate('Order',{readyToBuydata:Data, itemnumber:itemOrdered})
    }}, {text:'cancel'}])


  }else{
    Alert.alert('Error', 'FILL ALL THE INPUT BOXES')
  }
})

  return (
    <ScrollView style={styles.container}>

      <View style={styles.TextContainer}>
        <Text style = {styles.header}>Enter New Location</Text>
      </View>
      <View style={styles.formBody}>
        <TextInput
          placeholder='Address title'
          style={[styles.selectBox, styles.input, {borderRadius:10,
            borderWidth:2,
            paddingVertical:9,
            paddingHorizontal:13}]}
          cursorColor='black'
          
          onChangeText={(text)=>{
            setData((prev)=>{
              return {...prev, title:text}
            })
          }}
          value={data.title}
        />

        <SelectList
          data={country}
          save = "value"
          placeholder='Select Country'
          setSelected={(val)=>{console.log(val)
          setData((prev)=>{
            return {...prev, Country:val}
          })
        }}
        boxStyles={styles.selectBox}
        inputStyles={styles.input}
      />

      <SelectList
        data= {state}
        save = "value"
        placeholder='Select State'
        setSelected={(val)=>{
          console.log(val);
          setData((prev)=>{
            return {...prev, state:val}
          });

          handleState(val)
        }}
        
        boxStyles={styles.selectBox}
        inputStyles={styles.input}
      />

      <SelectList
        data= {lgas}
        save = "value"
        placeholder='Select Local Goverment Area'
        setSelected={(val)=>{
          
          setData((prev)=>{
            return {...prev, LGA:val}
          });
        }}
        
        boxStyles={styles.selectBox}
        inputStyles={styles.input}
      />

      <TextInput
        placeholder='Enter the nearest popular bustop'
        style={[styles.selectBox, styles.input, {borderRadius:10,
         borderWidth:2,
          paddingVertical:9,
           paddingHorizontal:13}]}
        onChangeText={(text)=>{
          setData((prev)=>{
            return {...prev, loc:text}
          })
        }}
        value={data.loc}
        cursorColor='black'
      />
      
        <TextInput
        placeholder='Enter your street Name'
        style={[styles.selectBox, styles.input, {borderRadius:10,
         borderWidth:2,
          paddingVertical:9,
           paddingHorizontal:13}]}
          cursorColor='black'
        
        onChangeText={(text)=>{
          setData((prev)=>{
            return {...prev, address:text}
          })
        }}
        value={data.address}
      />

    <TextInput
        placeholder='Recepient Phone number'
        style={[styles.selectBox, styles.input, {borderRadius:10,
         borderWidth:2,
          paddingVertical:9,
           paddingHorizontal:13}]}
        keyboardType = 'phone-pad'
        onChangeText={(text)=>{
          setData((prev)=>{
            return {...prev, phone:text}
          })
        }}
        value={data.phone}
        cursorColor='black'
      />
      
      </View>
      <View style={styles.saveTextContainer}>
        <TouchableOpacity style={styles.saveTexttouch} activeOpacity={0.7} onPress={handlePress}>
          <Text style = {styles.saveText}>SAVE DETAILS</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',

  },
  map: {
    width: '100%',
    height: '70%',
  },
  input:{
    fontSize:18
  },
  selectBox:{
    marginVertical:5,
    borderWidth:2,
    
  },
  TextContainer:{
      height:60,
      paddingHorizontal:20,
      backgroundColor:'white',
      justifyContent:"center",
  },  
  header:{
      color:'black',
      fontSize:27,
      fontWeight:'800',
  },
  formBody:{
    paddingHorizontal:10,
    flex:1

  },
  saveText:{
    fontSize:20,
    fontWeight:'bold'

  },
  saveTexttouch:{
    paddingVertical:10,
    alignItems:'center',
    backgroundColor:'#ffdb28',
    elevation:10,
  },
  saveTextContainer:{
    padding:15
  }
});

export default memo(Address)