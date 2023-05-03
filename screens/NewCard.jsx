import {View, ScrollView, StyleSheet, Pressable, Text, Image, Alert } from 'react-native';
import { memo, useState, useCallback, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from '@react-native-material/core';

let styles = StyleSheet.create({
    input:{
        marginHorizontal:10,
        borderWidth:1.5,
        paddingHorizontal:10,
        paddingVertical:7,
        borderRadius:5,
        marginVertical:10,
        fontSize:20,
        fontWeight:'600',
        height:60
    },
    monthCvv:{
        flexDirection:'row'
    },
    smallInput:{
        marginHorizontal:10,
        borderWidth:1.5,
        width:'30%',
        paddingHorizontal:10,
        paddingVertical:7,
        fontSize:16,
        borderRadius:5,
        marginVertical:10,
        height:60
    },
    inputContainer:{
        marginTop:20,
        paddingHorizontal:10
    },
    container:{
        flex:1,
        backgroundColor:'white'
        
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
        elevation:10
      },
      submit:{
          color:'white',
          fontSize:17,
          fontWeight:'bold',   
      },
      contain:{
        flexDirection:'row',
        alignItems:'center',
      },
      cardnumderInput:{
        flexDirection:'row',
        width:'100%',
      },
      image:{
        width:48,
        height:30,
        position:'absolute',
        bottom:25,
        right:20,

      }
})
function NewCard({masterCardImage, visaCardImage, setCards}){
    const [focusColor, setFocusColor] = useState('#898989');
    const [focusColor1, setFocusColor1] = useState('#898989');
    const [focusColor2, setFocusColor2] = useState('#898989');
    const [focusColor3, setFocusColor3] = useState('#898989');
    const [card, setCard] = useState(null);
    const [name, setname ] = useState('ADD TO WALLET');
    const [cardMonth, setCardMonth ] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCvv] = useState('');
    const [ownerName, setOwnerName] = useState('');


    let handleFocus = useCallback(()=>{
        setFocusColor((prev)=>{
            if (prev == '#898989'){
                return '#ffdb28'
            }else{
                return '#898989'
            }
        })
    })

    let handleFocus1 = useCallback(()=>{
        setFocusColor1((prev)=>{
            if (prev == '#898989'){
                return '#ffdb28'
            }else{
                return '#898989'
            }
        })
    })
    
    let handleFocus2 = useCallback(()=>{
        setFocusColor2((prev)=>{
            if (prev == '#898989'){
                return '#ffdb28'
            }else{
                return '#898989'
            }
        })
    })
    let handleFocus3 = useCallback(()=>{
        setFocusColor3((prev)=>{
            if (prev == '#898989'){
                return '#ffdb28'
            }else{
                return '#898989'
            }
        })
    })

    let handleTextInput = useCallback((Text)=>{
        
        if (cardNumber.length <= 16){
            
            if (Text[0] == '5'){
                    setCard('master card')
                }else if (Text[0] == '4'){
                    setCard('visa card')
                }
                else{
                    setCard(null)
                }
        }else{

        }
        setCardNumber(Text)
    })

   
    let handleMonthChange = (text)=>{
        let month = text;
        if (month.length == 2){
            let monthNum = parseInt(month);
            if (monthNum > 12){
                Alert.alert('Error', 'Enter a valid month', [
                    {
                        text:'OK',
                        style:'destructive',
                        onPress:()=>{
                            setCardMonth('')
                        }
                    }
                ])
            }
            month += '/';
        }
        if (month.length <= 5){
            setCardMonth(month)
        }else{
            Alert.alert('Error', 'Enter a valid card expiring date number');
        }
    }

    let handleCvv = (text)=>{
        if (text.length <= 3){
            setCvv(text)
        }else{
            Alert.alert('Error', 'Enter the correct details', [
                {
                        text:'OK',
                        style:'destructive',
                        onPress:()=>{
                            setCvv('')
                        }
            }])
        }
    }


    useEffect(()=>{
         name == 'ADD TO WALLET'?setname('ADD TO WALLET  '):setname('ADD TO WALLET');
    }, [card])


    return<ScrollView style={styles.container}>
            <View style={styles.inputContainer}>
                <View style={styles.cardnumderInput}>
                    <TextInput 
                    style={[styles.input, {borderColor:focusColor, flex:1}]}
                    label='Card Number' 
                    onFocus={handleFocus} 
                    onBlur={handleFocus}
                    keyboardType='number-pad'
                    onChangeText={(Text)=>handleTextInput(Text)}
                    value={cardNumber}
                    variant=''
                    color='#ffdb28'
                    />

                    {card == 'visa card' && <Image source={visaCardImage} style={styles.image}/>}
                    {card == 'master card' && <Image source={masterCardImage} style={styles.image}/>}

                </View>
            
            
            <TextInput 
                style={[styles.input, {borderColor:focusColor1}]} 
                label='Card Holder Name' 
                onFocus={handleFocus1} 
                onBlur={handleFocus1}
                onChangeText={(text)=>{setOwnerName(text)}}
                variant=''
                color='#ffdb28'
            />

            <View style={styles.monthCvv}>
                <TextInput 
                    style={[styles.smallInput, {borderColor:focusColor2, fontSize:20, fontWeight:'600'}]} 
                    label='MM/YY' 
                    onFocus={handleFocus2}
                    onBlur={handleFocus2}
                    keyboardType='number-pad'
                    value={cardMonth}
                    onChangeText={(handleMonthChange)}
                    variant=''
                    color='#ffdb28'
                    
                />

                <TextInput 
                    style={[styles.smallInput, {borderColor:focusColor3, fontSize:20, fontWeight:'600'}]} 
                    label='CVV' 
                    onFocus={handleFocus3} 
                    onBlur={handleFocus3}
                    keyboardType='number-pad'
                    onChangeText={handleCvv}
                    value ={cvv}
                    variant=''
                    color='#ffdb28'
                />

            </View>
        </View>
        <View style={styles.submitContainer}>
            <Pressable style={styles.contain} onPress={()=>{
                Alert.alert('CONFIRM YOUR CARD DETAILS', ` CARD NUMBER: ${cardNumber}\n OWNER'S NAME: ${ownerName}\n Cvv: ${cvv}`, [{
                    text:'OK',
                        style:'default',
                        onPress:()=>{
                            
                            setCards((prev)=>{

                                return[...prev, {id:prev.length + 1, cardNumber:cardNumber, cardType:card.toUpperCase(), cvv:cvv, ownerName:ownerName, expiringDate:cardMonth}]
                            })
                        }
                }])
            }}>
                <MaterialIcons name="add" size={22} color="white" />
                <Text style={styles.submit}>{name}</Text>
            </Pressable>
        </View>
    </ScrollView>
}
export default memo(NewCard);