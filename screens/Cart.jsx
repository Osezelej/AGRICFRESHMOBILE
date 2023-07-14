import { TouchableWithoutFeedback, Keyboard, View, StyleSheet, Text, Pressable, FlatList, Button, Touchable, TouchableOpacity, Image } from "react-native"
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import {AntDesign} from '@expo/vector-icons';
import CartItem from "../components/cartItem";
import MarketCard from '../components/tTLCard';
import { dataApi } from "../data/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { imageUrl } from "../data/database";
import { StatusBar } from "expo-status-bar";

const styles = StyleSheet.create({
    header:{
        color:'black',
        fontSize:29,
        fontWeight:'800',
    },
    headerContainer:{

    },
    TextContainer:{
        height:60,
        paddingHorizontal:20,
        elevation:5,
        backgroundColor:'white',
        justifyContent:"center",
    },
    userAccountHeader:{
        backgroundColor:'white',
        paddingHorizontal:14,
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:10,
        alignItems:'center'
    },
    profileImageContainer:{
        backgroundColor:'#e3e3e3',
        padding:2,
        paddingHorizontal:2,
        borderRadius:30,
        marginRight:5, 

    },
    userIconName:{
        flexDirection:'row',
        alignItems:'center',
        maxWidth:150,
    }, 
    username:{
        fontWeight:'bold',
        fontSize:16
    },
    fWalletButton:{
        backgroundColor:'#ffaf36',
        padding:6,
        elevation:10,
        borderRadius:10
    },
    acctText:{
        fontSize:16,
        fontWeight:'bold',
        
    },
    cartBody:{
        flex:1,
        backgroundColor:'white'
    },
    container:{
        flex:1
    },
    orderButton:{
        backgroundColor:'#42a0ff',
        flexDirection:'row',
        justifyContent:'center',
        marginVertical:10,
        marginHorizontal:20,
        paddingVertical:10,
        borderRadius:10
    },
    orderText:{
        color:'white',
        fontSize:17,
        fontWeight:'bold',   
    },
    cartItemBody:{
        flex:1,
    },
    suggestion:{
        flex:1,   
        paddingHorizontal:10,
        paddingBottom:10
    },
    suggestionHeader:{
        fontSize:22,
        fontWeight:'bold'

    }

})


function Cart({navigation, name, manageCartMinus, cartData, removeItem, image, getItem, balance}){
    const [ttlData, setTtlData] = useState([])
     const OrderItemdata = [...cartData]
     const [cartName, setCartName] = useState('Cart')
     const [userimage, setImage] = useState(null)
     const [userName, setUserName] = useState('user')
     async function getCartData(){
        await AsyncStorage.getItem('cartData', (e, res)=>{
            console.log(res)
        })
     }
     
     async function getUserData(){
        await AsyncStorage.getItem('userData').then((data)=>{
            let res = JSON.parse(data)
            let name = res.name
            if (res.userImg != null){
                let userImg = imageUrl + res.userImg
                setImage(userImg)
            }

            setUserName(name)
        })
     }
          for (let item of OrderItemdata){
        item.num = 1;
        console.log(item)
     }

     
     let dummyOrderData = [];
     const modifyOrderData = useCallback((data)=>{
                
            if (dummyOrderData.length == 0){
                dummyOrderData.push(data)
            }else{
                let num =  0;
                let ispresent = false
                for (let item of dummyOrderData){
                     if (item.id == data.id){
                        dummyOrderData[num] = data
                        ispresent = true
                        break
                     }
                    num ++
                }
                if (ispresent == false){
                    dummyOrderData.push(data)
                }

            }
            console.log(dummyOrderData)
     })

     let  handleCartItems = useCallback((id, price, num)=>{
        modifyOrderData({id:id, num:num, price:price})
     })  
    //  to search for ttl data
     let searchData = useCallback(async ()=>{
        

        await AsyncStorage.getItem('userEmail', async(err, res)=>{
            console.log()
            let keyword = []
            OrderItemdata.forEach((value)=>{
                let datas = [value.Name, value.farmName.split(' ')[0], ...value.foodType]
                keyword.push(...datas)
            })

        let data = {
            email:JSON.parse(res).email, 
            keywords:keyword
        }
        await axios.post("https://4v6gzz-3001.csb.app/v1/ttlData", data )
        .then((res)=>{
            setTtlData(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })

        })
     })


     useEffect(()=>{
        searchData()
     },[cartData]);

     useEffect(()=>{
        cartName == 'Cart'?setCartName('Cart '):setCartName('Cart')
     },[setTtlData]);

    useEffect(()=>{
        getUserData()
    }, [])
    return<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <StatusBar style='dark'  />
            <View style={styles.headerContainer}>
                    <View style={styles.TextContainer}>
                        <Text style = {styles.header}>{cartName}</Text>
                    </View>
                    <View style={styles.userAccountHeader}>
                            <View style={styles.userIconName}>
                                <View style={styles.profileImageContainer}>
                                  {userimage ? <Image source={{uri:userimage}} style={{width:35, height:35, borderRadius:30}}/>:  <AntDesign name="user" size={30} color="#3b3b3b" />}
                                </View>
                                <Text style={styles.username}>{userName}</Text>
                            </View>
                            <View style={styles.balWallet}>
                                <Text style={styles.acctText}>N{balance}</Text>
                                <Pressable style={styles.fWalletButton} onPress={()=>{navigation.navigate('Wallet')}}>
                                    <Text>Fund Wallet</Text>
                                </Pressable>
                            </View>
                    </View>
            </View>
 
            <View style={ styles.cartBody}>
                <View style={styles.cartItemBody}>
                    <FlatList 
                        data={cartData}
                        renderItem={({item})=> <View>
                        <CartItem data={item}
                         removeItem={removeItem}
                         handleCartItem={handleCartItems}
                        
                         />
                        </View>} 
                        keyExtractor={item =>item.id}
                        ListEmptyComponent={()=><View style = {{flexDirection:'column', 
                        justifyContent:'center',
                        alignItems:'center', flex:1}}>
                            <Image  source={image} style = {{width:100, height:100, marginBottom:20 }}/>
                            <Text>No items have been added to cart.</Text>
                        </View>}

                    />
                </View>
                {cartData.length > 0 ?<TouchableOpacity activeOpacity={0.8} onPress={()=>{navigation.navigate('Address', {readyToBuydata:cartData, itemnumber:dummyOrderData})}}>
                    <View style={styles.orderButton}>
                        <Text style={styles.orderText}>ORDER</Text>
                    </View>
                </TouchableOpacity>:null}
                
                <View style={styles.suggestion}>
                    <Text style={styles.suggestionHeader}>Things you may Like</Text>
                    <View>
                        <FlatList 
                            keyExtractor={item=>item.id}
                            data = {ttlData}
                            renderItem={({item})=><View><MarketCard item={item}/></View>}
                            horizontal={true}
                            ListEmptyComponent={<View>
                                <Text style={{fontSize:18, fontWeight:'500'}}>select an Item into cart</Text>
                            </View>}
                        />
                    </View>
                </View>
                

            </View>
        </View>
    </TouchableWithoutFeedback>

}

export default Cart;
