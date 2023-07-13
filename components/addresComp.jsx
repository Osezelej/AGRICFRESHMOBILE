import { memo, useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity, Alert } from "react-native";
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


function AddressComp({addrDetail, setVisibleCont, activeAddr, setActiveAddr, setOrderAddrData}){
    const [isSelected, setSelected] = useState(false);
    const [numofItem, setNumofItem] = useState(0);
  

    let handlePress = useCallback(()=>{

        isSelected ? setSelected(false) : setSelected(true);
        console.log(addrDetail)
        if (!isSelected){
            setVisibleCont(true);
            setActiveAddr(false);
            setOrderAddrData(addrDetail);
        }else{
            setVisibleCont(false);
        }
        
    });

    useEffect(()=>{
        if(activeAddr){
            setSelected(false)
            
            setVisibleCont(false);
        }
    }, [activeAddr])

    if (activeAddr){
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
    }else{
        return <View style={[styles.addressbody, {justifyContent:'space-evenly'}]}>
                    <View>
                        <SimpleLineIcons name="location-pin" size={27} color="black" />
                    </View>
                <TouchableOpacity style={styles.addrbody} activeOpacity={0.7} onPress={()=>{
                    Alert.alert('Alert', 'You have to Reorder to order to a different location. Pull down to refresh \nThank you!.')
                }}>
                    <Text style={styles.addrTitle}>{addrDetail.title}</Text>
                    <Text style={styles.addrPhone}>{addrDetail.phone}</Text>
                    <Text style={styles.addr} >{addrDetail.address}</Text>
                </TouchableOpacity>
                {isSelected?<View>
                    <Ionicons name="checkmark-sharp" size={24} color="black" />
                </View>:null}
            
        </View>
    }
  
}
export default AddressComp;