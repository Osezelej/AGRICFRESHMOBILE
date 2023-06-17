import{View, Text, StyleSheet, Image} from 'react-native'
import { memo } from 'react'

const styles = StyleSheet.create({
    orderBody:{
        paddingHorizontal:10,
        marginVertical:5,
        paddingVertical:10,
        flexDirection:'row',
        alignItems:'center',
        borderBottomWidth:2,
        borderBottomColor:'#f5f5f5',
        marginHorizontal:5,
    },
    image:{
        height: 80,
        width:90,
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
    priceContainer:{
        backgroundColor:'#d9d9d9',
        width:70,
        flexDirection:'row',
        justifyContent:'center',
        paddingVertical:8,
        borderRadius:10,
    },
    name:{
        fontSize:18,
        fontWeight:'700'
    },
    numContainer:{
        paddingTop:4
    },
    price:{
        fontSize:15,
        fontWeight:'bold',

    }



})

function OrderItem({data}){
    return<View style = {styles.orderBody}>
        <Image source={{uri:data.Image}} style={styles.image}/>
        <View style={styles.orderBodyinfo}>
            <View style={styles.numContainer}>
                
            <Text style={styles.numOfItem}>{data.num}X</Text>
            </View>

                <View style={styles.namePrice}>
                    <Text style={styles.name}>{data.Name}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>{data.Price}</Text>
                    </View>
                </View>

        </View>
    </View>
}

export default memo(OrderItem)