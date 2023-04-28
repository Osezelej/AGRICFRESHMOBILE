import {View, Text, StyleSheet} from 'react-native';
import { memo } from 'react';

const styles = StyleSheet.create({
    commentBody:{
    
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:10,
        maxWidth:'60%'

    },
    Text:{
        fontSize:16,
        fontWeight:'bold'
        
    }, 
    accountName:{
        marginBottom:4,

    },
    time:{
        alignSelf:'flex-end'
     
    }
})

function Comment({data}){
    const timeSent = new Date()
    
    let hrs = timeSent.getHours();
    let mins = timeSent.getMinutes();

    {if(data.type == 'sent'){
        return <View style={[styles.commentBody, {backgroundColor:'#ffdb28'}]}>
            <Text style={styles.accountName}>Art Template</Text>
            <Text style={styles.Text}>{data.message}</Text>
            <Text style={styles.time}>{hrs}:{mins}</Text>
        </View>
    }else{
        return <View style={[styles.commentBody, {backgroundColor:'#4f9d5c',}]}>
        <Text style={[styles.accountName, {color:'white'}]}>Art Template</Text>
        <Text style={[styles.Text, {color:'white'}]}>{data.message}</Text>
        <Text style={styles.time}>{hrs}:{mins}</Text>
    </View>
    }

}
    
}

export default memo(Comment);