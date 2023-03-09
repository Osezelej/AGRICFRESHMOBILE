import { StyleSheet, View, Text, Image} from "react-native";
import { memo } from "react";
import { FontAwesome } from '@expo/vector-icons';
const styles = StyleSheet.create({
    cardBody:{
        width:340,
        alignSelf:'center',
        paddingHorizontal:10,
        paddingVertical:10,
        backgroundColor:'#ffdb28',
        elevation:10,
        marginBottom:10,
        borderRadius:5,
    },
    banknameLogoContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:5,
        alignItems:'center',
    },
    cardName:{
        fontWeight:'500'
    },
    exContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:10,
    },
    cardNumber:{
        fontSize:26,
        fontWeight:'800'
    }, 
    acctName:{
        fontWeight:'bold'
    },
    expiringDate:{
        fontWeight:'800',
        fontSize:15
    }
})

function CreditCard(){

    
    return <View style={styles.cardBody}>
        <View style={styles.banknameLogoContainer}>
            <Text style={styles.cardName}>MASTER CARD</Text>
            <FontAwesome name="cc-mastercard" size={23} color="black"/>
        </View>
        <View style={styles.cardNumberContainer}>
            <Text style={styles.cardNumber}>5070 8400 3080 7854</Text>
        </View>
        <View style={styles.acctNameCardContainer}>
            <Text style={styles.acctName}>Anubahimendo Osezele Joseph</Text>
            <Text style={styles.bankName}>FIRST BANK PLC</Text>
        </View>
        <View style={styles.exContainer}>
            <Text style={styles.expiringDateText}>Expiring Date:</Text>
            <Text style={styles.expiringDate}>10/28</Text>
        </View>

    </View>
}
export default memo(CreditCard);