import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { memo } from 'react';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    body:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        margin:5,
        borderWidth:0.5,
        paddingHorizontal:10,
        borderRadius:8,
        paddingVertical:5,
        borderColor:'#ffdb28'
    }
})

function VerificationComp({item}){

    if(item.isActive){
        return <View style={[styles.body, {backgroundColor:'#ffdb28'}]} activeOpacity={0.5}>
                <Ionicons name="checkmark-sharp" size={15} color="black" />
                <Text>{item.text}</Text>
        </View>
    }else{
       return <View style={[styles.body]} activeOpacity={0.5}>
                <Text>{item.text}</Text>
        </View>
    }
}
  
export default VerificationComp;