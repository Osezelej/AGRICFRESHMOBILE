import {View, Text, StyleSheet, Image} from 'react-native';
import { memo, useEffect, useState } from 'react';
import { imageUrl } from '../data/database';
import {AntDesign} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const styles = StyleSheet.create({
    commentBody:{
    
        paddingHorizontal:10,
        paddingVertical:2,
        borderRadius:10,
        maxWidth:'60%',
    },
    Text:{
        fontSize:16,
        fontWeight:'bold'
        
    }, 
    accountName:{
        marginBottom:4,

    },
    time:{
        alignSelf:'flex-end',
        color:'#e7e7e7',
        fontSize:11
    
    },
    profileImageContainer:{
        backgroundColor:'#e3e3e3',
        borderRadius:35,
        marginRight:5, 
        marginLeft:5,
        alignItems:'center',
        justifyContent:'center',
        padding:3


    },
})

function Comment({data, productData}){
    const timeSent = new Date()
    
    let hrs = timeSent.getHours();
    let mins = timeSent.getMinutes();
    const [userimage, setuserImage] = useState(null)
    const [productImage, setProductImage] = useState(productData.Image)
    async function getUserData(){
        await AsyncStorage.getItem('userData').then((data)=>{
            let res = JSON.parse(data)
            if (res.userImg != null){
                let userImg = imageUrl + res.userImg
                setuserImage(userImg)
            }
        })
     }
     useEffect(()=>{
        getUserData()
     }, [])
    {if(data.type == 'sent'){
        return <View style = {{flexDirection:'row-reverse', alignItems:'center', justifyContent:'flex-start', width:'100%',}}>
                     <View style={styles.profileImageContainer}>
                                  {userimage ? <Image source={{uri:userimage}} style={{width:25, height:25, borderRadius:30}}/>:  <AntDesign name="user" size={25} color="#3b3b3b" />}
                                </View>
                    <View style={[styles.commentBody, {backgroundColor:'#ffaf28'}]}>
                    <Text style={styles.Text}>{data.message}</Text>
                    <Text style={styles.time}>{hrs}:{mins}</Text>
                </View>
        </View>
       
    }else{
        return <View style = {{flexDirection:'row', alignItems:'center',}}>
                <View style={[{
                    marginLeft:0, 
                    marginRight:5,  
                    backgroundColor:'#e3e3e3',
                    borderRadius:35,
                    alignItems:'center',
                    justifyContent:'center',
                    padding:3
        }]}>
                                  {productImage ? <Image source={{uri:productImage}} style={{width:25, height:25, borderRadius:30}}/>:  <AntDesign name="user" size={25} color="#3b3b3b" />}
                                </View>
                <View style={[styles.commentBody, {backgroundColor:'#4f9d5c',}]}>
                    <Text style={[styles.accountName, {color:'white'}]}>{productData.farmName}</Text>
                    <Text style={[styles.Text, {color:'white'}]}>{data.message}</Text>
                    <Text style={styles.time}>{hrs}:{mins}</Text>
                </View>
        </View>
       
    }

}
    
}

export default memo(Comment);