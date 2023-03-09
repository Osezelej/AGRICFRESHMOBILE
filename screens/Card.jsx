import { ScrollView, View,Text, StyleSheet, Pressable, TextInput, TouchableOpacity } from "react-native";
import { memo, useCallback, useState } from "react";
import CreditCard from "../components/creditCard";
import { MaterialIcons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
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
        marginHorizontal:10,
        borderWidth:1.5,
        paddingHorizontal:10,
        paddingVertical:7,
        borderRadius:5,
        marginVertical:10,
        fontSize:16,
        fontWeight:'bold'
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

function Card({navigation}){
    const [focusColor, setFocusColor] = useState('#898989');
   
    let handleFocus = useCallback(()=>{
        setFocusColor((prev)=>{
            if (prev == '#898989'){
                return '#ffdb28'
            }else{
                return '#898989'
            }
        })
    })

    return<ScrollView style={styles.container}>
    <View style={styles.CreditCardContainer}>
        <CreditCard/>
            <Pressable onPress={()=>navigation.navigate('Add new Card')}>
                <View style={styles.addCardContainer}>
                    <MaterialIcons name="add" size={22} color="#e4c423" />
                    <Text style={styles.addCardText}>Add new card</Text>
                </View>
            </Pressable>
            <View style={styles.inputContainer}>
                <TextInput 
                    style={[styles.input, {borderColor:focusColor}]}
                    placeholder='Amount' 
                    onFocus={handleFocus} 
                    onBlur={handleFocus}
                    keyboardType='number-pad'
                    />
            </View>
    </View>
    <TouchableOpacity activeOpacity={0.8}>
        <View style={styles.submitContainer}>
            <Pressable >
                <Text style={styles.submit}>SUBMIT</Text>
            </Pressable>
        </View>
    </TouchableOpacity>
    </ScrollView>
}
export default memo(Card);