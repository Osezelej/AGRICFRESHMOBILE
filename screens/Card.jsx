import { ScrollView, View,Text, StyleSheet, Pressable, TextInput, TouchableOpacity, Alert } from "react-native";
import { memo, useCallback, useState } from "react";
import { PayWithFlutterwave, FlutterwaveButton } from "flutterwave-react-native";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        padding:20
    },
    addCardContainer:{
        flexDirection:'row',
        marginBottom:5,
        justifyContent:'center',
        marginRight:10,
        alignItems:'center',
    },
    addCardText:{ 
        marginLeft:4,
        fontWeight:'700'
    },
    input:{
        borderWidth:1.5,
        paddingHorizontal:10,
        paddingVertical:7,
        borderRadius:5,
        marginVertical:10,
        fontSize:18,
        fontWeight:'bold',
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center'
    },
    CreditCardContainer:{
        flex:1,
        backgroundColor:'white',
    },

    submitContainer:{
      paddingHorizontal:20,
      backgroundColor:'#42a0ff',
      flexDirection:'row',
      justifyContent:'center',
      marginVertical:20,
      marginHorizontal:10,
      paddingVertical:10,
      borderRadius:10,
      elevation:10,
    },
    submit:{
        color:'white',
        fontSize:17,
        fontWeight:'bold',   
    }
});

function Card({navigation, route, balance, setBalance}){

    const [email, setEmail] = useState(route.params.email);
    const [tx_ref, setTx_ref] = useState(route.params.tx_ref);
    const [focusColor, setFocusColor] = useState('#898989');
    const [amount, setAmount] = useState('');
    const [isValid, setIsvalid] = useState(false);
    const [showcheckout, setShowCheckout] = useState(false);
    const [state, setState] = useState(true)

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
   
    let handleFocus = useCallback(()=>{
        setFocusColor((prev)=>{
            if (prev == '#898989'){
                return '#ffdb28'
            }else{
                return '#898989'
            }
        })
    })


    let handleTextChange = useCallback((text)=>{

        if (isNaN(text)){
            setIsvalid(true)
            setShowCheckout(false)
        }else{
            
            setIsvalid(false)
            setShowCheckout(true)
            setAmount(text)
        }
        
    })

    const isFocused = useIsFocused();

    return<ScrollView style={styles.container}>
    <View style={styles.CreditCardContainer}>
            {isValid &&   <Text style={{
                color:'red',
                fontSize:16,
                fontWeight:'600',

            }}>Enter a valid Amount.</Text>}
            <View style={styles.inputContainer}>
                <TextInput 
                    style={[styles.input, {borderColor:focusColor, height:60}]}
                    placeholder='Amount' 
                    onFocus={handleFocus} 
                    onBlur={handleFocus}
                    keyboardType='numeric'
                    onChangeText={handleTextChange}
                    value={amount}
                    />
            </View>
    </View>
        <PayWithFlutterwave
                            options={{
                                tx_ref:tx_ref,
                                authorization:'FLWPUBK_TEST-ba508ec2f481c6534ffb291870398ecd-X',
                                customer:{
                                    email:email
                                },
                                currency:'NGN',
                                amount:parseInt(amount),
                                payment_options:'card',
                            }}

                            
                            onRedirect={(data)=>{
                                if (data.status == 'completed'){
                                    
                                    Alert.alert('SUCCESS', 'Agric_Fresh wallet funded successfully', [{
                                        text:'OK',
                                        onPress:async()=>{
                                            await axios.post(`https://4v6gzz-3001.csb.app/v1/update/${email}`, {"newemail":"", "name":"", "walletBal":amount, trx_id:tx_ref})
                                            .then((res)=>{
                                                if(res.status == 200){
                                                    let data = res.data;
                                                    console.log(data)
                                                    let walletBal = data["walletBal"]
                                                    console.log(walletBal)
                                                    setBalance((prev)=>prev + parseInt(amount));
                                                    navigation.goBack();
                                                }
                                            })
                                            .catch((e)=>{
                                                console.log(e);
                                            })
                                        }
                                    }])
                                }

                                
                            }}
                            
                        />
    </ScrollView>
}
export default Card;