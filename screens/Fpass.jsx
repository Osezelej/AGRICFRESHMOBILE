import {View, Text, StyleSheet, TouchableWithoutFeedback,TextInput,TouchableOpacity, Keyboard, ScrollView} from 'react-native';
import { styles } from './signUp';
export function ForgotPassword ({navigation}){
    function handlePress(){
      navigation.navigate('Reset Password');

    }
    return (<ScrollView style={stylea.body}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={styles.body}>
                    <View style={stylea.textContainer} >
                        <Text style={stylea.text}>Please enter your email. you will recieve a link to create a new password via email.</Text>
                    </View>
                    <View style={styles.formbody}>
                            <View style={styles.nameContainer}>
                                <Text style={styles.Label}>Email</Text>
                                <TextInput placeholder='Enter your email' style={styles.Field} keyboardType={'email-address'} selectionColor={'black'}/>
                            </View>
                            <View style={styles.submitContainer}>
                            <TouchableOpacity style={styles.submit} onPress={handlePress}> 
                                <Text style={styles.submitText}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            </TouchableWithoutFeedback>
    </ScrollView>
       
    );
}

export const stylea = StyleSheet.create({
    text: {
        fontSize:15,
        fontWeight:"bold",

    },
    textContainer:{
        marginBottom: 15
    },
    body:{
        display:'flex',
        flex:1,
        backgroundColor:'white'
    }

})