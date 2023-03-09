import { memo, useEffect, useState } from "react";
import { View, StyleSheet, Pressable, Image, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';


const styles = StyleSheet.create({
    cartBody:{
        backgroundColor:'white',
        marginBottom:4,
        flexDirection:'row',
        alignItems:'center'
    },
    Image:{
        height:70,
        width:100,
        
    },
    cancelImage:{
        flexDirection:'row',
        alignItems:'center',
    },
    iconContainer:{
        width:40,
        padding:8,
    },
    name:{
        fontSize:16,
        fontWeight:'bold',

    },
    Price:{
        fontWeight:'bold',
        color:'red'

    }, 
    namePrice:{
        marginLeft:10
    },
    nameAddIcon:{
        flexDirection:'row',
        width:'57%',
        justifyContent:'space-between',
        alignItems:'center',
    },
    addIconContainer:{
        flexDirection:'row',
        backgroundColor:'#e3e3e3',
        paddingRight:12,
        paddingVertical:5,
        borderRadius:5,
        elevation:5,
        alignItems:'center'
        
    },
    operator:{
        marginLeft:12,

    },
    value:{
        marginLeft:10,
    },
    operatorChar:{
        fontSize:16,
        fontWeight:'900',
    },
    operatorMinus:{
        fontSize:20,
        fontWeight:'900',
    }
})
function CartItem({data, removeItem}) {
    const [num, setNum] = useState(1);
    const [price, setPrice] = useState(data.Price);
    function addFunction() {
        setNum(num + 1);
    }
    function subFunction(){
        if (num == 1){
            setNum(1)
        }else{
        setNum(num - 1)
        }
    }

useEffect(()=>(setPrice(`N${parseInt(data.Price.slice(1))*num}`)), [num])
    return<Pressable style={styles.cartBody}>
            <View style={styles.cancelImage}>
                <Pressable style={styles.iconContainer} onPress={()=>removeItem(data.id, data.Name)}>
                    <MaterialCommunityIcons name="close-circle-outline" size={24} color="black" />
                </Pressable>
                <Image source={{uri:data.Image}} style={styles.Image}/>
            </View>
            <View style={styles.nameAddIcon}>
                <View style={styles.namePrice}>
                    <Text style={styles.name}>{data.Name}</Text>
                    <Text style={styles.Price}>{price}</Text>
                </View>
                <View style={styles.addIconContainer}>
                    <TouchableOpacity style={styles.operator}  onPress={subFunction}><Text style={styles.operatorMinus}>-</Text></TouchableOpacity>
                    <Text style={styles.value}> {num}</Text>
                    <TouchableOpacity style={styles.operator} onPress={addFunction}><Text style={styles.operatorChar}>+</Text></TouchableOpacity>
                </View>
            </View>
    </Pressable>
}
export default memo(CartItem)
