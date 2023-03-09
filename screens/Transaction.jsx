import { ScrollView, View,StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import {memo, useState} from 'react';
import WalletHead from "../components/walletHead";

const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:'white',

    },
   
    fundWallet:{
        backgroundColor:'#ffdb28',
        marginHorizontal:20,
        padding:10,
        alignItems:'center',
        elevation:10,
        marginBottom:10,
    },
    walletText:{
        fontWeight:'800',
    },
    transactionHistoryContainer:{
        padding:20,
    },
    transactionHeaderText:{
        fontSize:24,
        fontWeight:'bold'
    },
    transactionLogoContainer:{
        alignSelf:'center',
        paddingTop:30
    },
    transactionsLogo:{
        height:200,
        width:200,
    },
    transactionText:{
        fontWeight:'bold',
        fontSize:15
    }


}) 

function Wallet({TImage, visibilityImages}){
    const [transactions, setTransactions] = useState([]);


    return<ScrollView style={styles.body}>
        <View style={styles.container}>
           <WalletHead visibilityImages={visibilityImages}/>
                
            <TouchableOpacity style={styles.fundWallet} activeOpacity={0.5}>
                <Text style={styles.walletText}> FUND WALLET </Text>
            </TouchableOpacity>
            <View style={styles.transactionHistoryContainer}>
                <Text style={styles.transactionHeaderText}>Transaction History</Text>
                <View style={styles.transactionBody}>
                    {transactions.length == 0?<View style={styles.transactionLogoContainer}>
                            <Image source={TImage} style={styles.transactionsLogo}/>
                            <Text style={styles.transactionText}>No Transaction have been done!</Text>
                    </View>:<View></View>}
                </View>
            </View>
        </View>
    </ScrollView>
}

export default memo(Wallet)
