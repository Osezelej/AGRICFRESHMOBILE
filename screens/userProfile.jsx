import { TouchableWithoutFeedback, View, Keyboard, StyleSheet, Text, Pressable, TouchableOpacity, TextInput, ScrollView, Button } from "react-native";
import { memo } from "react";
import {AntDesign, Feather} from '@expo/vector-icons'

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        padding:15,
    },
    topContainer:{
        alignItems:"center",
        flex:1
    },
    username:{
        fontSize:20,
        fontWeight:'bold',
        marginTop:5
    },
    profileImageContainer:{
        width:155,
        height:157,
        backgroundColor:'#e3e3e3',
        borderRadius:100,
        alignItems:'center',
        justifyContent:'center'
    },
    editIconContainer:{
        position:'absolute',
        right:5,
        padding:3,
        backgroundColor:'#ffdb28',
        top:8,
        borderRadius:10

    },
    bottomContainer:{
        backgroundColor:'white',
        flex:2,
        paddingBottom:20

        
    },
    nameContainer:{
        marginBottom:10
    },
    Label:{
        fontSize:18,
        paddingBottom:10
    },
    Field:{
        backgroundColor:'white',
        padding:10,
        borderRadius:20,
        elevation:5,
        fontSize:16
    },
    body:{
        flex:1
    },
    nameContainers:{
        marginBottom:25
    }
})

function UserProfile({navigation}) {
    return  <ScrollView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.body}>
                    <View style={styles.topContainer}>

                        <View style={styles.profileImageContainer}>
                            <AntDesign name="user" size={100} color="#3b3b3b" />
                            
                            <TouchableOpacity style={styles.editIconContainer}>
                                <Feather name="edit-2" size={20} color="black" />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.username}>Art Template</Text>

                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={styles.nameContainer}>
                            <Text style={styles.Label}>Name:</Text>
                            <TextInput placeholder='Enter your name' style={styles.Field} selectionColor={'black'}/>
                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.Label}>Email:</Text>
                            <TextInput placeholder='Enter your Email' style={styles.Field} selectionColor={'black'} keyboardType={'email-address'}/>
                        </View>
                        <View style={styles.nameContainers}>
                            <Text style={styles.Label}>phone number:</Text>
                            <TextInput placeholder='Enter your name' style={styles.Field} selectionColor={'black'} />
                        </View>
                            <Button title="Apply changes" color={'#ffdb28'}   />
                    </View>
                   
                    
                </View>
    </TouchableWithoutFeedback>
    
    </ScrollView> 
}

export default memo(UserProfile);