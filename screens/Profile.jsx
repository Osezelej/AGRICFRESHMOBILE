import { TouchableWithoutFeedback, Keyboard, View, StyleSheet, Image, Text, Pressable } from "react-native";
import { memo, useEffect, useState } from "react";
import {AntDesign} from '@expo/vector-icons';
import UserOptions from "../components/userOptions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    body:{
        flex:1,
    },
    profileImageContainer:{
        width:162,
        height:164,
        backgroundColor:'#e3e3e3',
        borderRadius:100,
        alignItems:'center',
        justifyContent:'center'
    },
    userIcon:{
        width:100,
        height:100
    },
    topContainer:{
        alignItems:"center",

    },
    username:{
        fontSize:25,
        fontWeight:'bold',
        marginTop:5
    },
    bottomContainer:{
        flexDirection:'row',
        flexWrap:'wrap', 
        marginTop:20,
        justifyContent:'space-around',
        paddingHorizontal:5

    },
    UserOptionsContainer:{
        alignItems:'center'
    },
    usernameContainer:{
        maxWidth:'60%',
    }
})

function Profile({navigation, userIcon, userProfileDetails}) {
    const [userName, setUserName] = useState('')
    
    async function getUsername(){
        await AsyncStorage.getItem('userData', (err, res)=>{
            setUserName(JSON.parse(res).name) 
        })
    }

    useEffect(()=>{getUsername()}, [])
    return<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <View style={styles.body}>
                <View style={styles.topContainer}>
                    <View style={styles.profileImageContainer}>
                    <AntDesign name="user" size={100} color="#3b3b3b" />
                    </View>
                    <Pressable style={styles.usernameContainer}>
                    <Text style={styles.username}>{userName}</Text></Pressable>
                </View>
                <View style={styles.bottomContainer}>
                    {userProfileDetails.map((object)=>(<View key={object.id} style={styles.UserOptionsContainer}>
                        <UserOptions image={object.image} navigation={navigation} navigationLink={object.label}/>
                        <Text>{object.label}</Text>
                    </View>))}
                </View>
            </View>
        </View>
    </TouchableWithoutFeedback>
}
export default memo(Profile);
