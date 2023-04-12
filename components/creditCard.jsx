import { StyleSheet, View, Text, Image} from "react-native";
import { memo } from "react";
import { FontAwesome } from '@expo/vector-icons';


const styles = StyleSheet.create({
    cardBody:{
        width:340,
        alignSelf:'center',
        paddingHorizontal:10,
        paddingVertical:10,
        
        elevation:10,
        marginBottom:10,
        borderRadius:5,
        marginHorizontal:9,
        marginRight:20,
    },
    banknameLogoContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:5,
        alignItems:'center',
    },
    cardName:{
        fontWeight:'500',
        color:'white'
    },
    exContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:10,
    },
    cardNumber:{
        fontSize:26,
        fontWeight:'800',
        color:'white'
    }, 
    acctName:{
        fontWeight:'bold',
        color:'white'
    },
    expiringDate:{
        fontWeight:'800',
        fontSize:15,
        color:'white'
    },
    expiringDateText:{
        color:'white'
    }
})

function CreditCard({cardNumber, ownerName, expiringDate, cardType}){
    const color = ['#414141', '#3c2b41', '#2b2d41', '#2b3c41', '#2b4135']
    
    return <View style={[styles.cardBody, {backgroundColor: color[Math.floor(Math.random() * color.length)]} ]}>
        <View style={styles.banknameLogoContainer}>
            <Text style={styles.cardName}>{cardType}</Text>
            {cardType == 'MASTER CARD' && <FontAwesome name="cc-mastercard" size={23} color="white"/>}
            {cardType == 'VISA CARD' && <FontAwesome name="cc-visa" size={23} color="white"/>}
        </View>
        <View style={styles.cardNumberContainer}>
            <Text style={styles.cardNumber}>{cardNumber}</Text>
        </View>
        <View style={styles.acctNameCardContainer}>
            <Text style={styles.acctName}>{ownerName}</Text>
        </View>
        <View style={styles.exContainer}>
            <Text style={styles.expiringDateText}>Expiring Date:</Text>
            <Text style={styles.expiringDate}>{expiringDate}</Text>
        </View>

    </View>
}
export default memo(CreditCard);