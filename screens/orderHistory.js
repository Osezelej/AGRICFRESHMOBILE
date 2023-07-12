import {View, ScrollView, Pressable, StyleSheet, FlatList, RefreshControl} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {memo, useEffect, useState} from 'react'
import axios from 'axios';
import OrderHistoryComp from '../components/orderHistoryComp';

const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:'white',
    }
})

function OrderHistory({navigation}){
    const [orderHistory, setOrderHistory]= useState([]);
    const [refreshing, setRefreshing] = useState(true);
    const [email, setEmail] = useState('');

    async function getEmail(){
        await AsyncStorage.getItem('userEmail').then((res)=>{
            let email = JSON.parse(res).email
            setEmail(email)
        })
    }
    
    // get Email
    useEffect(()=>{
        getEmail();
    }, []);

    async function getOrderHistory(){
        let data = '';
        await axios.get(`https://4v6gzz-3001.csb.app/v1/getUserOrder/${email}`)
        .then((res)=>{
            if (res.status == 200){
                data = res.data
            }
        })
        .catch((err)=>{
            console.log(err)
        })

        return data
    }
    // get order History
    useEffect(()=>{
        getOrderHistory().then((value)=>{
            setOrderHistory(value)
            setTimeout(()=>{setRefreshing(false)},500)
        })
    }, [email])
    return<View style={styles.body}>
        <FlatList 
            data={orderHistory}
            refreshControl={<RefreshControl
                refreshing={refreshing}
                onRefresh={()=>{
                    setRefreshing(true)
                    getOrderHistory().then((value)=>{
                        setOrderHistory(value)
                setTimeout(()=>{setRefreshing(false)},500)
                    })
                    }}
                colors={['#ffaf28']}
            />}
            renderItem={({item})=><OrderHistoryComp
                data = {item}
                navigation={navigation}
            />}
            keyExtractor={items=>items.order_id}
        />
        
    </View>
}
export default OrderHistory;