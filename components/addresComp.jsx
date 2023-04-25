import { memo, useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity } from "react-native";
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    addressbody:{
        paddingHorizontal:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderBottomColor:'#e8e8e8',
        borderBottomWidth:2,
        paddingVertical:15
    },
    addrTitle:{
        fontSize:17,
        fontWeight:'600'
    },
    addrPhone:{
        fontSize:16,
    },
    addrbody:{
        width:'80%'
    }

})


function AddressComp({addrDetail, setVisibleCont}){
    const [isSelected, setSelected] = useState(false)

    let handlePress = useCallback(()=>{
        isSelected ? setSelected(false) : setSelected(true);
        if (! isSelected){
            setVisibleCont(true)
        }else{setVisibleCont(false)}
        
    })

    return <View style={[styles.addressbody, {justifyContent:'space-evenly'}]}>
            <View>
                <SimpleLineIcons name="location-pin" size={27} color="black" />
            </View>
        <TouchableOpacity activeOpacity={0.4} onPress={handlePress} style={styles.addrbody}>
            <Text style={styles.addrTitle}>{addrDetail.title}</Text>
            <Text style={styles.addrPhone}>{addrDetail.phone}</Text>
            <Text style={styles.addr} >{addrDetail.address}</Text>
        </TouchableOpacity>
        {isSelected?<View>
            <Ionicons name="checkmark-sharp" size={24} color="black" />
        </View>:null}
        
</View>
}
export default AddressComp