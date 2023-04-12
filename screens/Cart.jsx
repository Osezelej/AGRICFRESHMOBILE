import { TouchableWithoutFeedback, Keyboard, View, StyleSheet, Text, Pressable, FlatList, Button, Touchable, TouchableOpacity } from "react-native"
import { memo, useState } from "react";
import {AntDesign} from '@expo/vector-icons';
import CartItem from "../components/cartItem";
import MarketCard from '../components/tTLCard';
import { dataApi } from "../data/data";
let ttlData =[...dataApi]

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
        paddingVertical:10
    },
    profileImageContainer:{
        backgroundColor:'#e3e3e3',
        padding:7,
        paddingHorizontal:8,
        borderRadius:20,
        marginRight:5, 

    },
    userIconName:{
        flexDirection:'row',
        alignItems:'center',
        maxWidth:70
    }, 
    username:{
        fontWeight:'bold'
    },
    fWalletButton:{
        backgroundColor:'#ffdb28',
        padding:3,
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


function Cart({navigation, name, manageCartMinus, cartData, removeItem}){
     

    return<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                    <View style={styles.TextContainer}>
                        <Text style = {styles.header}>{name}</Text>
                    </View>
                    <View style={styles.userAccountHeader}>
                            <View style={styles.userIconName}>
                                <View style={styles.profileImageContainer}>
                                    <AntDesign name="user" size={30} color="#3b3b3b" />
                                </View>
                                <Text style={styles.username}>Art Template</Text>
                            </View>
                            <View style={styles.balWallet}>
                                <Text style={styles.acctText}>N3000.00</Text>
                                <Pressable style={styles.fWalletButton} onPress={()=>{navigation.navigate('Wallet')}}>
                                    <Text>Fund Wallet</Text>
                                </Pressable>
                            </View>
                    </View>
            </View>
 
            <View style={styles.cartBody}>
                <View style={styles.cartItemBody}>
                    <FlatList 
                        data={cartData}
                        renderItem={({item})=><View>
                        <CartItem data={item} removeItem={removeItem}/>
                        </View>}
                        keyExtractor={item =>item.id}

                    />
                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={()=>{navigation.navigate('Order')}}>
                    <View style={styles.orderButton}>
                        <Text style={styles.orderText}>ORDER</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.suggestion}>
                    <Text style={styles.suggestionHeader}>Things you may Like</Text>
                    <View>
                        <FlatList 
                            keyExtractor={item=>item.id}
                            data = {ttlData}
                            renderItem={({item})=><View><MarketCard item={item}/></View>}
                            horizontal={true}
                        />
                    </View>
                </View>
                

            </View>
        </View>
    </TouchableWithoutFeedback>

}

export default Cart;
