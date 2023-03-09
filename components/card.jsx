import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {memo} from 'react';

const styles = StyleSheet.create({
    cardBody:{
        marginTop:15,
        marginHorizontal:5,
        flexDirection:'row',
        alignItems:'center',
        borderWidth:1,
        padding:10,
        borderRadius:10

    },
    cardImage:{
        width:50,
        height:50,
        marginRight:20,
    },
    cardName:{
        fontSize:18,
        fontWeight:'bold'
    }
});

function PaymentOption({cardImage, cardName, navigation, cardNavigation}){
    return <TouchableOpacity style={styles.cardBody} activeOpacity={0.5} onPress={()=>{navigation.navigate(cardNavigation)}}>
        <View style={styles.imageContainer}>
            <Image source={cardImage} style={styles.cardImage}/>
        </View>
        <View style={styles.nameContainer}>
            <Text style={styles.cardName}>{cardName}</Text>
        </View>
    </TouchableOpacity>
}
export default memo(PaymentOption)