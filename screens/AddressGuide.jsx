import {View, StyleSheet, FlatList, Text, TouchableOpacity, Alert, RefreshControl} from 'react-native';
import AddresComp from '../components/addresComp';
import { memo, useEffect, useState } from 'react';
import { ActivityIndicator } from '@react-native-material/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const styles = StyleSheet.create({
body:{
    flex:1,
    backgroundColor:'white',
},
addAddr:{
    backgroundColor:'white',
    paddingBottom:10,
    paddingTop:10,
    paddingHorizontal:20
},

addAddrButton:{
    paddingVertical:15,
    backgroundColor:'#ffdb28',
    elevation:10,
    borderRadius:15,
    display:'flex',
    flexDirection:'row',
    justifyContent:'center'
},

addAddrButtonText:{
    fontSize:19,
    fontWeight:'bold',
    
},

title:{
    paddingHorizontal:20
},

titleText:{
    fontSize:16,
    fontWeight:'600'
}

})

function AddresseGuide({navigation, route}){

    if(route.params != undefined){
        var data = route.params.readyToBuydata;
        var itemOrdered = route.params.itemnumber;
    }
    
    let [visibleCont, setVisibleCont] = useState(false);
    const [addreses, setAddr] = useState([]);
    const [email, setEmail] = useState('');
    const [activeActivity, setActiveActivity] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    async function getEmail(){
        await AsyncStorage.getItem('userEmail').then((data)=>{
            let email = JSON.parse(data).email
            setEmail(email)
        })
    }

    async function getData(){
        await axios.get(`https://4v6gzz-3001.csb.app/v1/getAddr/${email}`)
        .then((res)=>{
            if(res.status == 200){
                console.log(res.data)
                setAddr(res.data)
                setActiveActivity(false)
            }
        })
        .catch((err)=>{
            console.log(err)
            Alert.alert('Error', 'there is an Error, Re open the app and try again')
        })
    }

    useEffect(()=>{
        getEmail()
    },[])

    useEffect(()=>{
        if (email.length > 0){
            getData()
        }
    }, [email])
    if(activeActivity){
        return<View style={{
            flex:1, 
            flexDirection:'row', 
            justifyContent:'center', 
            alignItems:'center',
            backgroundColor:'white'}}>
            <ActivityIndicator color='#ffdb28' size={45}/>
        </View>
    }else{
        return <View style={styles.body}>
        <View style={styles.title}>
            <Text style={styles.titleText}>SAVED ADDRESSES</Text>
        </View>
    <FlatList
        renderItem={({item})=>(<AddresComp addrDetail={item} setVisibleCont={setVisibleCont} />)}
        data={addreses}
        keyExtractor={item=>item.AddrId}
        refreshControl={<RefreshControl
                refreshing={refreshing}
                onRefresh={()=>{
                    setRefreshing(true)
                    getData().then((value)=>{
                setTimeout(()=>{setRefreshing(false)},300)
                    })
                    }}
                colors={['#ffdb28']}
            />}
        style={{flex:1}}
    />
    <View >
        <View style={styles.addAddr}>
            <TouchableOpacity style={styles.addAddrButton} onPress={()=>{route.params.from == 'Profile'? navigation.navigate('AddressGuide'): navigation.navigate('AddressGuide', {readyToBuydata:data, itemnumber:itemOrdered})}}>
                <Text style={styles.addAddrButtonText}>ADD NEW ADDRESS</Text>
            </TouchableOpacity>
        </View>
        {visibleCont &&  <View style={styles.addAddr}>
            <TouchableOpacity style={styles.addAddrButton} onPress={()=>{route.params.from == 'Profile'? navigation.goBack(): navigation.navigate('Order', {readyToBuydata:data, itemnumber:itemOrdered})}}>
                <Text style={styles.addAddrButtonText}>CONTINUE</Text>
            </TouchableOpacity>
        </View>}
    </View>
</View>
    }
   
}

export default memo(AddresseGuide)
