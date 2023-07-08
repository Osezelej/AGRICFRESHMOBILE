import { memo, useCallback, useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import WalletHead from "../components/walletHead";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

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
    },
    paymentoption:{
        borderWidth:2,
        borderRadius:10,
        padding:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        marginTop:10
    },
    cardImage:{
        width:50,
        height:50,
    },
    cardName:{
        fontSize:20,
        fontWeight:'500'
    },
})

function Wallet({visibilityImages, cardOption, navigation, balance, setBalance}){
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [tx_ref, setTx_ref] = useState('')

    async function getEmail(){
        let e  = '';
        await AsyncStorage.getItem('userEmail', (err, res)=>{
            e = JSON.parse(res).email
        })
        return e
    }



    async function getName(){
        let e  = '';
        await AsyncStorage.getItem('userData', (err, res)=>{
            e = JSON.parse(res).name
        })
        return e

    }

    const generateTransactionRef = (length) => {
        var result = '';
        var characters =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return `flw_tx_ref_${result}`;
      };


    //   handle fund your wallet event

    let handlePress = useCallback(()=>{
        let tx_ref = generateTransactionRef(10);
        console.log(tx_ref);
        navigation.navigate('Card', {tx_ref:tx_ref, email:email});
    })

    //   to get email once the page opens
    useEffect(()=>{
        getEmail().then((res)=>{
            setEmail(res)
        })
      
        getName().then((res)=>{
            setName(res)
        })
    },[])

    
    const isfocused = useIsFocused();
    useEffect(()=>{
        console.log(isfocused)
    }, [isfocused])
    return<ScrollView style={styles.container}>
            <View style={styles.body}>
                    <WalletHead 
                    visibilityImages={visibilityImages}
                    email={email}
                    name={name}
                    walletBal={balance}
                    />
                    <View style={styles.paymentCardContainer}>
                        <Text style={styles.paymentHeaderText}>Payment Options</Text>
                        <TouchableOpacity style={styles.paymentoption} activeOpacity={0.4} onPress={handlePress}>
                            <Text style = {styles.cardName}>{cardOption.cardname}</Text>
                            <Image 
                            source={cardOption.cardOption}
                            style = {styles.cardImage}
                            />
                        </TouchableOpacity>

                        {/* <PayWithFlutterwave
                            options={{
                                tx_ref:generateTransactionRef(10),
                                authorization:'FLWPUBK_TEST-ba508ec2f481c6534ffb291870398ecd-X',
                                customer:{
                                    email:email
                                },
                                currency:'NGN',
                                amount:3000,
                                payment_options:'card'
                            }}
                            onRedirect={(data)=>{
                                console.log(data)
                            }}
                            
                        /> */}
                        
                    </View>
            </View>
    </ScrollView>
}

export default Wallet;