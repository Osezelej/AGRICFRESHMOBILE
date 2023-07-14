import {View, StyleSheet, TouchableWithoutFeedback, Text, Keyboard, FlatList,Animated, RefreshControl, Alert} from 'react-native';
import { memo, useState, useCallback, useEffect, useRef } from 'react';
// import { FavouritesData } from '../components/marketItems';
import MarketItems from '../components/marketItems';
import FavMarketItems from '../components/favMarketItems';
import { styles as style} from './marketPlace';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator } from '@react-native-material/core';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from "expo-status-bar";
const styles = StyleSheet.create({
    header:{
        color:'black',
        fontSize:27,
        fontWeight:'800',
    },
    TextContainer:{
        paddingHorizontal:20,
        elevation:5,
        backgroundColor:'white',
        justifyContent:"center",
       paddingBottom:20
    },
    container:{
        flex:1,
    },
    body:{
        flex:1,
    },
    alertbody:{
        backgroundColor:'#4f9d5c',
        position:'absolute',
        flex:1,
        width:'100%',
        padding:5,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'center'
    },
    alertText:{
        color:'white',
        fontSize:18,
        fontWeight:'700',
        marginLeft:10,
    }
})
function Favourites ({
    navigation, 
    contentImages, 
    cartData
}){
    let currentData = useRef(new Animated.Value(0)).current
    const [title , settitle] = useState('Favourites');
    const [FavouritesData, setFavouriteData] = useState(null)
    const [refreshing, setRefreshing] = useState(false)
    const [itemName, setItemName] = useState('');
    const [email, setEmail] = useState('');


    async function getEmail(){
        await AsyncStorage.getItem('userEmail').then((data)=>{
            setEmail(JSON.parse(data).email)
        })
    }



    let handlePress = useCallback(()=>{
        title == 'Favourites'? settitle('Favourites '): settitle('Favourites')
    })



    let buyClicked = async (item_name)=>{

        setItemName(item_name)
        Animated.sequence([
        Animated.timing(currentData, {
            toValue:1,   
            duration: 5,
           useNativeDriver: true,
        }),
        Animated.timing(currentData, {
            toValue:1,   
            duration: 1000,
           useNativeDriver: true,
        }),
        Animated.timing(currentData, {
            toValue:0,   
            duration: 500,
           useNativeDriver: true,
        }),
    ]).start()
    }
    async function getFavData(){
        let data = [];
        await axios.get(`https://4v6gzz-3001.csb.app/v1/marketData/${email}`)
        .then((res)=>{
            if(res.status ==  200){
                data = res.data
            }
        })
        .catch(e=>console.log(e))

        return data
    }

    useEffect(()=>{
        getEmail()
    }, [])
    const [data_, setData_ ] = useState(false)
    useEffect(()=>{
        if (email.length > 0){
            getFavData()
            .then((value)=>{
               setFavouriteData(value.filter((data)=>{
                return data.isFav
            })) 
            }).then(()=>{
                
            })
        }

    }, [email])

    useEffect(()=>{
        if(FavouritesData){
            if(FavouritesData.length == 0){
                setData_(true)
            }
        }
    }, [FavouritesData])
    useEffect(()=>{
        if(data_){
            Alert.alert('NO FAVORITE ITEMS', 'You do not have any favourite item.\n\nGo to market place and like a product.', [
                {
                    text:'ok',
                    onPress:()=>{
                        navigation.goBack()
                    }
                }
            ])
        }
    }, [data_])

    return <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.container}>
        <View style={[styles.body, {backgroundColor:'white'}]}>
            <StatusBar style='dark'  />
            <View style={styles.headerContainer}>
                    <View style={styles.TextContainer}>
                        <Text style = {styles.header}>{title}</Text>
                    </View>
            </View>
            {FavouritesData == null ?<View style={{alignItems:'center', marginTop:15}}>
            <ActivityIndicator color='#ffaf36' size={35}/>
            <Text style={{fontSize:16, fontWeight:'400'}}>Getting Favourites</Text>
            </View>:<FlatList
                data={FavouritesData}
                renderItem = {({item})=>(<MarketItems 
                styles={style} 
                item={item}
                contentImages={contentImages}
                cartData={cartData}
                from={'favourite'}
                navigation = {navigation} 
                handlePress={buyClicked}
            
                />)}
                keyExtractor = {(item) => item.id}
                refreshControl={<RefreshControl
                    onRefresh={()=>{
                        setRefreshing(true);
                        getFavData()
                        .then((value)=>{
                            setFavouriteData(value.filter((data)=>{
                                return data.isFav
                            })) 
                        })
                        .finally(()=>{
                            setTimeout(()=>{
                                setRefreshing(false)
                            }, 300)
                        })
                        
                    }}
                    refreshing={refreshing}
                    enabled={true}
                    colors={['#ffaf35', '#ffae35']}
                    title='Getting Favourites'
                    titleColor={'black'}
                    
                />}
            />}
            
            <Animated.View style={[styles.alertbody, {opacity:currentData}]}>
                                        <Ionicons name="checkmark-sharp" size={24} color="white" />
                                        <Text style={styles.alertText}>{itemName} have been added to cart!!</Text>
                                    </Animated.View>
        </View>
    </TouchableWithoutFeedback>
}

export default memo(Favourites);
