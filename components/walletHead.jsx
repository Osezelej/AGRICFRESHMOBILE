import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import { memo, useState, useCallback, useEffect } from 'react';

const styles = StyleSheet.create({
    headertag:{
        backgroundColor:'#ffaf36',
        marginHorizontal:20,
        marginVertical:20,
        paddingHorizontal:20,
        paddingVertical:15,
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        elevation:10,
    },
    acctname:{
        fontWeight:'600',
        color:'#353535',
        paddingBottom:10
    },
    acctbal:{
        fontSize:35,
        fontWeight:'800',
        
    },
    acctbalContainer:{
        flexDirection:"row",
        alignItems:'flex-end',
    },
    currency:{
        paddingBottom:10,
        paddingLeft:10
    },
    image:{
        width:25,
        height:25
    },
    imageContainer:{
        padding:4,
    }
})
function WalletHead({visibilityImages, walletBal, name, email}){
    const [hidden, setHidden] = useState(visibilityImages[1]);
    const [number, setNumber] = useState(walletBal);
    const [visible, setVisible] = useState('flex')

    let handleVisibility = useCallback(()=>{
        setHidden((prev)=>{
            if (prev == visibilityImages[0]){
                return visibilityImages[1]
            }else{
                return visibilityImages[0]
            }
        })
    })

    useEffect(()=>{
        if (hidden == visibilityImages[0]){
            setNumber(email)
            setVisible('none')
        }else{
            setNumber(walletBal)
            setVisible('flex')
        }
    },[hidden])
    return<View style={styles.headertag}>
        <View>
            <Text style={styles.acctname}>Account Name: {name}</Text>
            <Text style={styles.acct}>Account Balance:</Text>
                <View style={styles.acctbalContainer}>
                {visible == 'none'?<Text style={[styles.acctbal, {fontSize:21}]}>{number}</Text>:<Text style={[styles.acctbal]}>{number}</Text>}
                    <Text style={[styles.currency, {display:visible}]}>NGN</Text>
                </View>
        </View>
        <Pressable style={styles.imageContainer} onPress={handleVisibility}>
            <Image source={hidden} style={styles.image}/>
        </Pressable>

        </View>
}
export default WalletHead;