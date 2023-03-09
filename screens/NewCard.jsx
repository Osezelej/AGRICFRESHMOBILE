import {View, ScrollView, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import { memo, useState, useCallback } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

let styles = StyleSheet.create({
    input:{
        marginHorizontal:10,
        borderWidth:1.5,
        paddingHorizontal:10,
        paddingVertical:7,
        borderRadius:5,
        marginVertical:10,
        fontSize:16,
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
        marginVertical:10
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
        flexDirection:'row'
      }
})
function NewCard(){
    const [focusColor, setFocusColor] = useState('#898989');
    const [focusColor1, setFocusColor1] = useState('#898989');
    const [focusColor2, setFocusColor2] = useState('#898989');
    const [focusColor3, setFocusColor3] = useState('#898989');
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
    return<ScrollView style={styles.container}>
            <View style={styles.inputContainer}>
            <TextInput 
                style={[styles.input, {borderColor:focusColor}]}
                placeholder='Card Number' 
                onFocus={handleFocus} 
                onBlur={handleFocus}
                />

            <TextInput 
                style={[styles.input, {borderColor:focusColor1}]} 
                placeholder='Card Holder Name' 
                onFocus={handleFocus1} 
                onBlur={handleFocus1}
            />
            <View style={styles.monthCvv}>
            <TextInput 
                style={[styles.smallInput, {borderColor:focusColor2}]} 
                placeholder='MM/YY' 
                onFocus={handleFocus2} 
                onBlur={handleFocus2}
            />
            <TextInput 
                style={[styles.smallInput, {borderColor:focusColor3}]} 
                placeholder='CVC' 
                onFocus={handleFocus3} 
                onBlur={handleFocus3}
            />
            </View>
        </View>
        <View style={styles.submitContainer}>
            <Pressable style={styles.contain}>
                <MaterialIcons name="add" size={22} color="white" />
                <Text style={styles.submit}>ADD TO WALLET</Text>
            </Pressable>
        </View>
    </ScrollView>
}

export default memo(NewCard);