import { memo, useState } from "react";
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image, Alert, Modal } from "react-native";
import OrderItem from "../components/orderitem";
import { ActivityIndicator } from "@react-native-material/core";


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
        paddingHorizontal:20,
        paddingVertical:10
 

    },
    deliveryIcon:{
        width:50,
        height:50,
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
    },
    modalContainer:{
        flex:1,
        flexDirecction:'row',
        justifyContent:'center',
        alignItems:'center'

    },
    contentContainer:{
        height:'70%',
        width:'85%',
        backgroundColor:'white',
        elevation:10,
        borderRadius:10,
        padding:15,
    },
    successImage:{
        height:100,
        width:100
    },
    headContainer:{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    successImageContainer:{
        borderRadius:100,
        elevation:13,
        padding:1,

    },
    orderText:{
        fontSize:20,
        fontWeight:'500',
        marginTop:10,

    },
    orderIdContainer:{
        flexDirection:'row',
        flexWrap:'wrap',
        marginBottom:4
    },
    orderIdHeader:{
        fontSize:14.6,
        fontWeight:'bold'
    },
    transactionIdContainer:{
        paddingVertical:10
    },
    
});

function Order ({navigation, route, deliveryImage, deliveryImage2, balance, successImage}){
    
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

    function handlePress(){
        setActiveActivity(true)
        if (total > balance){
            Alert.alert('Insufficient Funds', 'You do not have sufficient balance in your wallet to make this transaction. \n\ndo you want to fund your wallet?', [
                
            {
                text:'No'
            },
            {
                 text:'yes',
                onPress:()=>{
                        navigation.navigate('Wallet')
                        setActiveActivity(false)
                },
                style:'default'
                    
            }
        ])
        }else{
            setModalVisibility(true)
        }
        
        setTimeout(()=>{
            setActiveActivity(false)
        }, 1000)
    }
    const [activeActivity, setActiveActivity] = useState(false);
    const [modalVisibility, setModalVisibility] = useState(false);

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
                            <View style={styles.deliveryIcon}>
                                <Image source={deliveryImage2} style = {{width:50, height:50}}/>
                            </View> 
                            <Text style={styles.delivery}>Delivery Fee</Text>
                            <Text style={styles.deliveryText}>N500</Text>
                        </View>
                        <View style={styles.TotalContainer}>
                            <Text style={styles.totalText}>TOTAL</Text>
                            <Text style={styles.totalPrice}>N{total}</Text>
                        </View>
                    </View>
                    <View style={styles.checkoutContainer}>
                    {activeActivity?<View style={styles.checkout}>
                            <ActivityIndicator size={26} color="black"/>
                        </View>:
                        <TouchableOpacity style={styles.checkout} activeOpacity={0.6} onPress={handlePress}>
                            <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
                                <Text style={styles.checkoutText}>CHECKOUT</Text>
                                <Text style={styles.checkoutTotal}>N{total}</Text>
                            </View>
                        </TouchableOpacity>}
                        
                    </View>
        </View>
        <Modal 
        visible={modalVisibility}
        onDismiss={()=>{}}
        onRequestClose={()=>{}}
        transparent={true}
        animationType={'slide'}
        >
            <View style={styles.modalContainer}>
                <View style={styles.contentContainer}>
                    <View style={styles.headContainer}>
                        <View style={styles.successImageContainer}>
                                <Image source={successImage} style={styles.successImage} />
                        </View>
                        <Text style={styles.orderText}>SuccessFull !!!</Text>
                    </View>
                    <View style={styles.transactionIdContainer}>
                        <View style={styles.orderIdContainer}>
                            <Text style={styles.orderIdHeader}>Order ID:</Text>
                            <Text style={styles.orderDetail}>mvfs_24njrvik94</Text>
                        </View>
                        <View style={styles.orderIdContainer}>
                            <Text style={styles.orderIdHeader}>Customer Address:</Text>
                            <Text style={styles.orderDetail}>21, Ogunyoumi street, Kosofe, Lagos state, Nigeria. </Text>
                        </View>
                        <View style={styles.orderIdContainer}>
                            <Text style={styles.orderIdHeader}>Customer tel:</Text>
                            <Text style={styles.orderDetail}>08076320300</Text>
                        </View>
                        <Text>Dear customer, please note that you have limited time to cancel order Thank you!.</Text>
                    </View>
                    <View style={styles.orderContentContainer}>

                    </View>
                    <TouchableOpacity onPress={()=>{
                        setModalVisibility(false)
                    }}>
                        <Text>cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    </View>
}

export default memo(Order)