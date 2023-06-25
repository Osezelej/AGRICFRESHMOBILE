import {View, StyleSheet, Image, Text, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import { memo, useEffect, useState } from 'react';
import { MaterialIcons, SimpleLineIcons, Feather} from '@expo/vector-icons';
import { ActivityIndicator } from '@react-native-material/core';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:'white',
        padding:15
    },
    Image:{
        width:125,
        height:125,
    },
    imageContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    ordertitleDetail:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    orderItemContainer:{
        flex:1
    },
    progressLine:{
        backgroundColor:'#8888',
        height:3,
        zIndex:2,
        width:'28%',
        borderRadius:10,
        
    },
    deliveryStatus:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        zIndex:0,
        paddingHorizontal:19

    },
    deliveryStatusContainer:{
        alignItems:'center',
        justifyContent:'center',
        zIndex:1,
    },
    statusImage:{
        width:33,
        height:33,
        marginBottom:10
    },
    detialContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:20
    },
    detail:{
        fontSize:14,
        fontWeight:'500'
    },
    ordertitle:{
        fontWeight:'500',
        
    },
    pendingContainer:{
        backgroundColor:'#ffdb28',
        paddingVertical:3,
        paddingHorizontal:10,
        borderRadius:10,
    },
    orderBody:{
        paddingHorizontal:5,
        marginVertical:5,
        paddingVertical:10,
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:2,
        borderBottomColor:'#f5f5f5',
        width:'100%'
    },
    image:{
        height: 60,
        width:70,
        aspectRatio:1.5
    },
    namePrice:{
        flexDirection:'row',
        marginLeft:10,
        justifyContent:'space-between',
        width:200
    },
    name:{
        fontSize:16,
        fontWeight:'700'
    },
    numContainer:{
        paddingTop:4
    },
    orderFooter:{
        paddingVertical:10,
        paddingHorizontal:10,
    },
    reOrderContainer:{
        backgroundColor:'#42a0ff',
        paddingVertical:15,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },
    orderText:{
        fontSize:18,
        fontWeight:'600',
        color:'white'
    }, 
    orderBodyinfo:{
        flexDirection:'row',
        marginLeft:10,

    },
    iconContainer:{
        flexDirection:'column',
        position:'absolute',
        right:10,
        alignItems:'flex-end',
        zIndex:3
    },
    icon:{
        marginTop:13,
        borderWidth:1.5,
        padding:5,
        alignSelf:'center',
        borderRadius:50,
        paddingTop:7.5,
        paddingLeft:7.5,
        marginLeft:10
    },
    phoneDetailContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    AddressDetailContainer:{
        flexDirection:'row',
        alignItems:'center'
    }
})

// dummy data
const data = [{
	id:1,
	'Name': 'full chicken', 
  	'Image':"https://www.kindpng.com/picc/m/459-4590151_poultry-whole-chicken-me-like-one-of-your.png",
	'Price': "N4500",
	'description': '',
	'rating': 3,
	'NB': [],
	farmName:'Agric Fresh',
	foodType:['poultry', 'Beef']
},
{
	id:2,
	'Name': 'Chicken Eggs', 
  	'Image':"https://www.nicepng.com/png/detail/11-113565_egg-eggs-clipart.png",
	'Price': "N2500",
	'description': '',
	'rating': 4,
	'NB': [],
	farmName:"Ardinal Farm",
	foodType:['eggs', 'poultry']

},
{	id:3,
	'Name': 'Titus Fish', 
  	'Image':"https://marketsng.fra1.digitaloceanspaces.com/images/ypD5ZAcFcMGqKveA5BSWm5qeEFSULjCaTEtqGruM.jpg",
	'Price': "N1700",
	'description': '',
	'rating': 5,
	'NB': [],
	farmName:"Victobol Farm",
	foodType:['fish']

},
{
	id:4,
	'Name': 'Green Pepper', 
  	'Image':"https://marketsng.fra1.digitaloceanspaces.com/images/NUniwT0HgvJMQTxR7OSiUuakDNRHZfX04KKHkXAS.jpg",
	'Price': "N1200",
	'description': '',
	'rating': 3,
	'NB': [],
	farmName: 'Ademola Farm',
	foodType:['Vegetable']
},
{
	id:5,
	'Name': 'Tomatoes', 
  	'Image':"https://marketsng.fra1.digitaloceanspaces.com/images/5ze2dvcx7etDgGIKC3rQtB6Hipncx9E9THmWcD04.jpg",
	'Price': "N1300",
	'description': '',
	'rating': 0,
	'NB': [],
	farmName:'Derju Farm',
	foodType:['vegetable']
	
},
{
	id:6,
	'Name': 'Tatashe', 
  	'Image':"https://marketsng.fra1.digitaloceanspaces.com/images/u6mrfTRjnnMhgLRMEi8SocO3gVAcWlGWaIT95Edu.png",
	'Price': "N700",
	'description': '',
	'rating': 1,
	'NB': [],
	farmName:'Ademola Farm',
	foodType:['vegetable']
},
{
	id:7,
	'Name': 'Pineaple', 
  	'Image':"https://marketsng.fra1.digitaloceanspaces.com/images/U3BxaCfiI55wpTeH1Yi6zaM5wPgCyORj11O3UzAK.jpg",
	'Price': "N1500",
	'description': '',
	'rating': 3,
	'NB': [],
	farmName:'uniquejosam Farm',
	foodType:['fruit']
},
]
function OrderItem({navigation, foodBasketImage, deliveryImage,checkedImage,deliveryManImage, route}){
    const [activeTransit, setActiveTransit] = useState(false)
    const [activeDelivered, setActiveDelivered] = useState(false)
    const [activeActivity, setActiveActivity]= useState(true)
    const [email, setEmail] = useState('');
    const [orderData, setOrderData] = useState(null);
    const [icon1, setIcon1] = useState(false);
    const [icon2, setIcon2] = useState(false)

    let {order_id} = route.params;
    async function getEmail(){
        let e = '';
        await AsyncStorage.getItem('userEmail').then((val)=>{
            let userEmail = JSON.parse(val).email;
            setEmail(userEmail);
        })
    }

    // to get the entire marketData
    async function handleData(email){
        let data = [];
        await axios.get(`https://4v6gzz-3001.csb.app/v1/marketData/${email}`)
        .then((res)=>{
            if(res.status == 200){
                data = res.data;
            }
        })
        .catch((err)=>{
            console.log(err);
        });

        return data;
    }

    // to get the orderData
    async function handleorderData(order_id){
        let data = [];
        await axios.get(`https://4v6gzz-3001.csb.app/v1/getOrderPayment/${order_id}`)
            .then((res)=>{
                if (res.status == 200){
                    data = res.data;
                }
            })
            .catch((err)=>{
                console.log(err)
            })
            return data;
    }

    // to get the entire data 
    async function getData(){
        let data = [];
        await axios.get(`https://4v6gzz-3001.csb.app/v1/orderDetail/${order_id}`)
        .then( async(res)=>{
            let email = res.data[0].email;

            await handleorderData(order_id).then(async(orderData)=>{
                data = orderData;

                await handleData(email).then((entiredata)=>{
                    entiredata.forEach((dataValue)=>{

                        orderData.orders.forEach((orderValue)=>{
                            if(dataValue.id == orderValue.productId){
                                
                                orderValue.productId = dataValue
                                console.log(data)
                            }
                        })
                    })
                })
            })
            setOrderData(data)
        })
        .catch((err)=>{ 
            console.log(err)
        })
    }

    // display phone
   function showPhone(){
        icon2?setIcon2(false):setIcon2(true)
    }
    function showAddress(){
        icon1?setIcon1(false):setIcon1(true)
    }


    // set the email when the app open
    useEffect(()=>{
        getData()
    }, [])

    // once the email is set we want to get entire data
  
    if(activeActivity && !orderData){
        return <View style={[styles.body, {flexDirection:'row', 
        justifyContent:'center', 
        alignItems:'center'}]}>
            <ActivityIndicator color='#ffdb28' size={45}/>
        </View>
    }else{
        return<View style={styles.body}>
        <View style={styles.iconContainer}>
            <View style={styles.phoneDetailContainer}>
            {icon1 &&<View style={{maxWidth:150, 
                            padding:7, 
                            alignItems:'flex-start',
                            borderWidth:1.5, 
                            borderColor:'#10d3d6',
                            backgroundColor:'white',
                        
                            }}>
                    <Text style={{fontWeight:'500'}}>21, ogunyomi street, kosofe, lagos, Nigeria.</Text>
                </View>}
                <SimpleLineIcons name="location-pin" size={18} color="black" style = {[styles.icon, {backgroundColor:icon1 ? '#ffdg28':'white'}]} onPress={showAddress}/>
                
            </View>
            <View style={styles.AddressDetailContainer}>
            {icon2 &&<View style={{maxWidth:150, 
                            padding:7, 
                            alignItems:'flex-start',
                            borderWidth:1.5, 
                            borderColor:'#10d3d6',
                            backgroundColor:'white'
                            }}>
                    <Text style={{fontWeight:'500'}}>08128191829</Text>
                </View>}
                {icon2 ? <Feather name="phone" size={18} color="black"  style= {[styles.icon, {backgroundColor:'#ffdg28'}]} onPress={showPhone}/>:<Feather name="phone" size={18} color="black"  style= {[styles.icon, {backgroundColor:'white'}]} onPress={showPhone}/>}

            </View>
            
        </View>
            <View style={styles.imageContainer}>
                <Image source={foodBasketImage} style={styles.Image}/>
            </View>
            <View style={styles.deliveryStatus}>
                <View style ={styles.deliveryStatusContainer}>
                
                    <Image source={checkedImage} style={styles.statusImage}/>
                    <MaterialIcons name="check" size={20} color="black" />
                </View>
                <View style={styles.progressLine}></View>
                <View style ={styles.deliveryStatusContainer}>
                    <Image source={deliveryImage} style={styles.statusImage}/>
                    <MaterialIcons name="check" size={20} color={activeTransit?"black":"#e2e2e2"} />
                </View>
                <View style={styles.progressLine}></View>
                <View style ={styles.deliveryStatusContainer}>
                    <Image source={deliveryManImage} style={styles.statusImage}/>
                    <MaterialIcons name="check" size={20} color={activeDelivered?"black":"#e2e2e2"} />
                </View>
        </View>
        <View style={styles.detialContainer}>
            <Text style ={styles.detail}>Order Confirmed</Text>
            <Text style ={styles.detail}>Order in Transit.</Text>
            <Text style ={styles.detail}>Order Delivered</Text>
        </View>
        <View style={styles.headerContainer}>
            <View style={styles.ordertitleDetail}>
                <Text  style={styles.ordertitle} >Order ID:</Text>
                <Text style={styles.orderDetail}>{orderData.orderId}</Text>
            </View>
            <View style={[styles.ordertitleDetail, {marginTop:5}]}>
                <Text  style={styles.ordertitle} >Delivery Status:</Text>
                <View style={styles.pendingContainer}>
                    <Text style={styles.orderDetail}>Pending</Text>
                </View>
            </View>
            <View style={styles.ordertitleDetail}>
                <Text  style={styles.ordertitle} >Price:</Text>
                <Text style={styles.orderDetail}>N{orderData.walletBal}</Text>
            </View> 
           
        </View>
        
        <View style={styles.orderItemContainer}>
            <FlatList
                keyExtractor={item=>item.productId.id}
                data={orderData.orders}
                renderItem={({item})=><View style = {styles.orderBody}>
                                <Image source={{uri:item.productId.Image}} style={styles.image}/>
                                <View style={styles.orderBodyinfo}>
                                    <View style={styles.namePrice}>
                                        <Text style={styles.name}>{item.productId.Name}</Text>
                                        <View style={styles.numContainer}>
                                            <Text style={styles.numOfItem}>X{item.numOfitem}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>}
            />
        </View>
        <View style={styles.orderFooter}>
            <TouchableOpacity style={styles.reOrderContainer} activeOpacity={0.5}>
                    <Text style={styles.orderText}>Re-Order</Text>
            </TouchableOpacity>

        </View>
    </View>
    }
   
}


export default memo(OrderItem);
