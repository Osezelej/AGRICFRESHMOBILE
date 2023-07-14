import {View, StyleSheet, FlatList, Text, TouchableOpacity, Alert, RefreshControl} from 'react-native';
import AddresComp from '../components/addresComp';
import { memo, useEffect, useState } from 'react';
import { ActivityIndicator } from '@react-native-material/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StatusBar } from "expo-status-bar";


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
    paddingVertical:10,
    backgroundColor:'#ffaf36',
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
    const [activeAddr, setActiveAddr] = useState(true);
    const [orderAddrData, setOrderAddrData]= useState({});


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
            <StatusBar style='dark'  />
            <ActivityIndicator color='#ffaf36' size={45}/>
        </View>
    }else{
        return <View style={styles.body}>
        <StatusBar style='dark'  />
        <View style={styles.title}>
            <Text style={styles.titleText}>SAVED ADDRESSES</Text>
        </View>
    <FlatList
        renderItem={({item})=>(<AddresComp 
                            addrDetail={item} 
                            setVisibleCont={setVisibleCont} 
                            activeAddr={activeAddr}
                            setActiveAddr = {setActiveAddr}
                            setOrderAddrData={setOrderAddrData}
        />)
        }

        data={addreses}
        keyExtractor={item=>item.addrId}
        refreshControl={<RefreshControl
                refreshing={refreshing}
                onRefresh={()=>{
                    setRefreshing(true)
                    getData().then((value)=>{
                setTimeout(()=>{
                    setRefreshing(false);
                    setActiveAddr(true);
                },300)
                    })
                    }}
                colors={['#ffaf36']}
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
            <TouchableOpacity style={styles.addAddrButton} onPress={()=>{route.params.from == 'Profile'? navigation.goBack(): navigation.navigate('Order', {readyToBuydata:data, itemnumber:itemOrdered, addr:{title:orderAddrData.title, phone:orderAddrData.phone, addrId:orderAddrData.addrId, email:orderAddrData.email, address:orderAddrData.address}})}}>
                <Text style={styles.addAddrButtonText}>CONTINUE</Text>
            </TouchableOpacity>
        </View>}
    </View>
</View>
    }

}


export default memo(AddresseGuide)
