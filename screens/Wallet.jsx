import { memo } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import WalletHead from "../components/walletHead";
import PaymentOption from '../components/card';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    paymentCardContainer:{
        padding:20
    },
    paymentHeaderText:{
        fontSize:24,
        fontWeight:'bold'
    }
})

function Wallet({visibilityImages, cardOption, navigation}){
    return<ScrollView style={styles.container}>
            <View style={styles.body}>
                    <WalletHead visibilityImages={visibilityImages}/>
                    <View style={styles.paymentCardContainer}>
                        <Text style={styles.paymentHeaderText}>Payment Options</Text>
                        {cardOption.map((value, id)=>{
                            if (value.navigation){
                                return <PaymentOption
                                key={id}
                                cardImage={value.cardOption}
                                cardName={value.cardname}
                                navigation={navigation}
                                cardNavigation={value.navigation}
                                />
                            }else{
                               return <PaymentOption
                                key={id}
                                cardImage={value.cardOption}
                                cardName={value.cardname}
                                navigation={{navigate:()=>{console.log('i got clicked')}}}
                                cardNavigation={''}
                                />
                            }
                            
                                
                        })}
                    </View>
            </View>
    </ScrollView>
}

export default memo(Wallet)