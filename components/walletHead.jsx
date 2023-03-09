import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import { memo, useState, useCallback, useEffect } from 'react';

const styles = StyleSheet.create({
    headertag:{
        backgroundColor:'#ffdb28',
        flex:1,
        marginHorizontal:20,
        marginVertical:20,
        paddingHorizontal:20,
        paddingVertical:20,
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        elevation:10,
    },
    acctname:{
        fontWeight:'300',
        color:'#353535'
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
function WalletHead({visibilityImages}){
    const [hidden, setHidden] = useState(visibilityImages[1]);
    const [number, setNumber] = useState('30000.00');
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
            setNumber('8076360300')
            setVisible('none')
        }else{
            setNumber('30000.00')
            setVisible('flex')
        }
    },[hidden])
    return<View style={styles.headertag}>
        <View>
            <Text style={styles.acctname}>Account Name: Art Template</Text>
                <View style={styles.acctbalContainer}>
                    <Text style={styles.acctbal}>{number}</Text>
                    <Text style={[styles.currency, {display:visible}]}>NGN</Text>
                </View>
        </View>
        <Pressable style={styles.imageContainer} onPress={handleVisibility}>
            <Image source={hidden} style={styles.image}/>
        </Pressable>

        </View>
}
export default memo(WalletHead)