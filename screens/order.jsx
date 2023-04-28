import { memo } from "react";
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from "react-native";
import OrderItem from "../components/orderitem";


const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:'white',
    },
    TextContainer:{
        height:60,
        paddingHorizontal:20,
        backgroundColor:'white',
        justifyContent:"center",
    },
    header:{
        color:'black',  
        fontSize:29,
        fontWeight:'800',
    },
    orderListContainer:{
        flex:1,
    },
    deliverycheckoutContainer:{
        backgroundColor:"white",
        paddingHorizontal:10,
        paddingVertical:10
 

    },
    deliveryIcon:{
        width:50,
        height:50,
        backgroundColor:'#ffdb28'
    },
    deliveryContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingBottom:10,
        borderBottomWidth:2,
        borderBottomColor:'#f5f5f5'
    },
    delivery:{
        fontSize:18,
        fontWeight:'800'
        
    },
    deliveryText:{
        
        color:'red',
        fontSize:17,
        fontWeight:'900',
    },
    TotalContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:10,
    },
    totalText:{
        fontSize:21,
        fontWeight:'900'
    },
    totalPrice:{
        color:'red',
        fontSize:21,
        fontWeight:'900',
    },
    checkout:{
        backgroundColor:'#ffdb28',
        paddingVertical:15,
        borderRadius:20
    },
    checkoutText:{
        fontSize:21,
        fontWeight:'800',

    },
    checkoutTotal:{
        fontSize:20,
        fontWeight:'bold'
    }
});

function Order ({navigation, route}){
    
    if(route.params != undefined){
        var data = route.params.readyToBuydata;

        let itemOrdered = route.params.itemnumber;
        var total = 500;
        for (let items of data){
            for (let item  of itemOrdered){
                if (items.id == item.id){
                    items.num = item.num
                    items.Price = item.price
                    let price = item.price
                   total += parseInt(price.slice(1))
                    break;
                }
            }
        }
    }
    return <View style = {styles.body}>
                <View style={styles.TextContainer}>
                    <Text style = {styles.header}>Order</Text>
                </View>
                <View style = {styles.orderListContainer}>
                    <FlatList 
                        data = {data}
                        renderItem = {({item})=><OrderItem data={item}/>}
                        keyExtractor = {item => item.id}
                     /> 
                </View>
                <View style={styles.deliverycheckoutContainer}>
                    <View style={styles.deliveryTotalContainer}>
                        <View  style={styles.deliveryContainer}> 
                            <View style={styles.deliveryIcon}></View> 
                            <Text style={styles.delivery}>Delivery Fee</Text>
                            <Text style={styles.deliveryText}>N500</Text>
                        </View>
                        <View style={styles.TotalContainer}>
                            <Text style={styles.totalText}>TOTAL</Text>
                            <Text style={styles.totalPrice}>N{total}</Text>
                        </View>
                    </View>
                    <View style={styles.checkoutContainer}>
                        <TouchableOpacity style={styles.checkout} activeOpacity={0.6}>
                            <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                                <Text style={styles.checkoutText}>CHECKOUT</Text>
                                <Text style={styles.checkoutTotal}>N{total}</Text>
                            </View>
                            
                        </TouchableOpacity>
                    </View>
                </View>


    </View>
}
export default memo(Order)