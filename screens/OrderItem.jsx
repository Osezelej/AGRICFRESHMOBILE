import {View, StyleSheet, Image, Text, FlatList, TouchableOpacity, ScrollView} from 'react-native';
import { memo, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';


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

})
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
function OrderItem({navigation, foodBasketImage, deliveryImage,checkedImage,deliveryManImage}){
    const [activeTransit, setActiveTransit] = useState(true)
    const [activeDelivered, setActiveDelivered] = useState(true)


    return<View style={styles.body}>
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
                <Text style={styles.orderDetail}>AgFh_ord_ref_9TlXUyGxYk</Text>
            </View>
            <View style={[styles.ordertitleDetail, {marginTop:5}]}>
                <Text  style={styles.ordertitle} >Delivery Status:</Text>
                <View style={styles.pendingContainer}>
                     <Text style={styles.orderDetail}>Pending</Text>
                </View>
            </View>
            <View style={styles.ordertitleDetail}>
                <Text  style={styles.ordertitle} >Price:</Text>
                <Text style={styles.orderDetail}>10000</Text>
            </View>
        </View>
        
        <View style={styles.orderItemContainer}>
            <FlatList
                keyExtractor={item=>item.id}
                data={data}
                renderItem={({item})=><View style = {styles.orderBody}>
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
            />
        </View>
        <View style={styles.orderFooter}>
            <TouchableOpacity style={styles.reOrderContainer} activeOpacity={0.5}>
                    <Text style={styles.orderText}>Re-Order</Text>
            </TouchableOpacity>

        </View>
    </View>
}


export default memo(OrderItem);
