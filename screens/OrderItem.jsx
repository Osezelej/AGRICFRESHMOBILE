import {View, StyleSheet, Image, Text} from 'react-native';
import { memo } from 'react';

const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:'white',
        padding:15
    },
    Image:{
        width:160,
        height:160,
    },
    imageContainer:{
        flexDirection:'row',
        justifyContent:'center',

    },
    ordertitleDetail:{
        flexDirection:'row',
    },
    orderItemContainer:{
        flex:1
    }
})

function OrderItem({navigation, foodBasketImage, deliveryImage,checkedImage,deliveryManImage}){
    return<View style={styles.body}>
        <View style={styles.imageContainer}>
            <Image source={foodBasketImage} style={styles.Image}/>
        </View>
        <View style={styles.deliveryStatus}>
            
        </View>
        <View style={styles.headerContainer}>
            <View style={styles.ordertitleDetail}>
                <Text  style={styles.ordertitle} >Order ID:</Text>
                <Text style={styles.orderDetail}>AgFh_ord_ref_9TlXUyGxYk</Text>
            </View>
            <View style={styles.ordertitleDetail}>
                <Text  style={styles.ordertitle} >Delivery Status:</Text>
                <Text style={styles.orderDetail}>Pending</Text>
            </View>
            <View style={styles.ordertitleDetail}>
                <Text  style={styles.ordertitle} >Price:</Text>
                <Text style={styles.orderDetail}>10000</Text>
            </View>
        </View>
        
        <View style={styles.orderItemContainer}>

        </View>
    </View>
}


export default memo(OrderItem);
