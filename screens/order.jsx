import { memo, useEffect, useRef, useState } from "react";
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image, Alert, Modal, ScrollView } from "react-native";
import OrderItem from "../components/orderitem";
import { ActivityIndicator } from "@react-native-material/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


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
        backgroundColor:'#ffaf28',
        paddingVertical:10,
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
        fontSize:22,
        fontWeight:'500',
        marginTop:10,

    },
    orderIdContainer:{
        flexDirection:'row',
        marginBottom:4,
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:20
    },
    orderIdHeader:{
        fontSize:17,
        fontWeight:'bold'
    },
    transactionIdContainer:{
        paddingVertical:10,
    },
    orderDetail:{
        fontSize:14,
        fontWeight:'500',
        color:'#636363'
    },
    orderBody:{
        paddingHorizontal:5,
        marginVertical:5,
        paddingVertical:10,
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:2,
        borderBottomColor:'#f5f5f5',
    },
    image:{
        height: 60,
        width:70,
        aspectRatio:1.5
    },
    orderBodyinfo:{
        flexDirection:'row',
        marginLeft:10,

    },
    namePrice:{
        flexDirection:'row',
        marginLeft:10,
        justifyContent:'space-between',
        width:'75%',
    },
    name:{
        fontSize:16,
        fontWeight:'700'
    },
    numContainer:{
        paddingTop:4
    },
    orderContentContainer:{
        flex:1
    },
    Orderfooter:{
        paddingTop:15,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    OrderfooterText:{
        fontSize:20,
        fontWeight:'600',
        color:'white'
    },
    okayContainer:{
        backgroundColor:'#1ba07b',
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:10,
        elevation:10
    },
    vericontentContainer:{
        width:'85%',
        backgroundColor:'white',
        elevation:10,
        flexDirection:'row',
        paddingHorizontal:10,
        paddingVertical:10,
        alignItems:'center',
    },
    veriData:{
        fontSize:16,
        marginLeft:10
    }
});

function Order ({navigation, 
    route, 
    deliveryImage, 
    deliveryImage2, 
    balance, 
    successImage,
    order,
    setOrder,
    setBalance,
    setCartData,
    setCartBadge
}){
    
    if(route.params != undefined){
        var data = route.params.readyToBuydata;
        var addr = route.params.addr;
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
        // to get the product id
        var productId = data.map((value)=>{
            return {productId:value.id, numOfitem:value.num}
        })
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
            Alert.alert('Confirm your Order', 'Are you sure you want to continue?', [
                {
                    text:'No, cancel',
            },
            {
                text:'yes',
                onPress:()=>{
                    if (ordRef.length > 0){
                        const data = {
                            orderId:ordRef,
                            orders:[...productId],
                            ...addr
                        }
                        removeMoneyFromWallet(data).then((value)=>{
                            if (value){
                                setOrderCon('Order')
                                handleOrderTrans(data)
                            }
                        })
                        
                    }
                }
            }
            ])



        }
        
    }

    // to give the order refrence
    const generateTransactionRef = (length) => {
        var result = '';
        var characters =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return `AgFh_ord_ref_${result}`;
      };
    

    async function generateNum_store(){
        if (ordRef.length == 0){
            let order_Id = generateTransactionRef(10);
            setOrdRef(order_Id);
        }else{
            setOrdRef(ordRef);
        }
    }


    async function genEmail(){
        await AsyncStorage.getItem('userEmail', (e,res)=>{
   
        }).then(async (res)=>{
          
          let userEmail = JSON.parse(res).email;
          setEmail(userEmail);
        })
}
    

    const [activeActivity, setActiveActivity] = useState(false);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [ordRef, setOrdRef] = useState('');
    const [email, setEmail] = useState('');
    const [veriModalVisibility, setVeriModalVisibility]= useState(false);
    const [orderCon, setOrderCon]= useState('Items')
    const justStarted = useRef(false);

    useEffect(()=>{
        genEmail()
        generateNum_store()
    }, []);

    // upload to the back end once checkout have been pressed
    async function handleOrderTrans(data){
        await axios.get(`https://4v6gzz-3001.csb.app/v1/getOrder/${data.orderId}`)
        .then(async (res)=>{
            if (res.status == 200){
                if(res.data == 1){
                    Alert.alert('Error', 
                    'please go back to the previous page and click continue', 
                    [{text:'ok', onPress:()=>{
                        navigation.goBack()
                    }}])
                }else{

                    await axios.post(`https://4v6gzz-3001.csb.app/v1/orderTransaction/${email}`, {...data})
                        .then((res)=>{
           
                         if (res.status == 200){
                                console.log(res.data);
                                setOrder(res.data)
                                setVeriModalVisibility(false)
                                setModalVisibility(true);
                                setCartData([]);
                                setCartBadge(0)
                        }})
                        .catch((err)=>{
                            console.log(err)
                         })
                        .finally(()=>{
                            setTimeout(()=>{
                                setActiveActivity(false)
                            }, 1000);
                        })
                    }
            }else{
                Alert.alert('Error', 
                'please go back to the previous page and click continue', 
                [{text:'ok', onPress:()=>{
                    navigation.goBack()
                }}])
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    // to deduct money from the wallet 
    async function removeMoneyFromWallet(data){
        setVeriModalVisibility(true)
        let success = false;
        await axios.get(`https://4v6gzz-3001.csb.app/v1/checkPayment/${ordRef}`)
        .then(async (res)=>{
            console.log(res.data)
            if (res.status == 200){
                if (res.data == 1){
                    Alert.alert('Error', 
                                'please go back to the previous page and click continue', 
                                [{text:'ok', onPress:()=>{
                                    navigation.goBack()
                                }}])
                }else{
                    setOrderCon('Payment')
                    await axios.post(`https://4v6gzz-3001.csb.app/v1/debitWallet/${email}`, {amount:total, orderId:ordRef})
                    .then((res)=>{
                        if (res.status == 200){
                            let data = res.data;
                                console.log(data)
                                let walletBal = data["walletBal"]
                                console.log(walletBal)
                                setBalance(walletBal)
                                success=true
                        }
                    })
                    .catch((err)=>{console.log('second',err)})
                }
            }
        })
        .catch((err)=>{
            console.log('first', err)
        })

        return success
    }


    useEffect(()=>{
        if(justStarted.current){
            justStarted.current = false;
            navigation.navigate('MarketPlace', {email:email})
        }
    }, [modalVisibility])

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
                                <Text style={styles.checkoutTotal}>N{total.toString()}</Text>
                            </View>
                        </TouchableOpacity>}
                        
                    </View>
        </View>
        <Modal
        visible={veriModalVisibility}
        transparent={true}
        animationType={'slide'}
        >
         <View style={styles.modalContainer}>
            <View style={styles.vericontentContainer}>
                
                <ActivityIndicator size={45} color={'#ffaf28'}/>
                <Text style={styles.veriData}>Verifying {orderCon}</Text>
            </View>
         </View>
        </Modal>

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
                                <Text style={styles.orderDetail}>
                                    {ordRef}
                                </Text>
                        </View>
                        <View style={styles.orderIdContainer}>
                            <Text style={styles.orderIdHeader}>Total Price:</Text> 
                                <Text style={styles.orderDetail}>NGN  {total}</Text>
                        </View>
                        <View style={styles.orderIdContainer}>
                            <Text style={styles.orderIdHeader}>Order Status:</Text> 
                                <Text style={[styles.orderDetail, {color:'#f0d125'}]}>Pending...</Text>
                        </View>
                    </View>
                    <View style={styles.orderContentContainer}>
                        <FlatList 
                            data = {data}
                            renderItem = {({item})=><View style = {styles.orderBody}>
                                <Image source={{uri:item.Image}} style={styles.image}/>
                                <View style={styles.orderBodyinfo}>
                                    <View style={styles.namePrice}>
                                        <Text style={styles.name}>{item.Name}</Text>
                                        <View style={styles.numContainer}>
                                            <Text style={styles.numOfItem}>X{item.num}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>}
                            keyExtractor = {item => item.id}
                        /> 
                    </View>
                    <View style={styles.Orderfooter}>
                        <TouchableOpacity style={styles.okayContainer} onPress={()=>{
                            justStarted.current = true;
                            setModalVisibility(false)
                        }}>
                            <Text style={styles.OrderfooterText}>Okay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    </View>
}

export default memo(Order);
