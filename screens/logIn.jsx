import { View,Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, TouchableHighlight, Pressable, ScrollView } from "react-native";
import {styles} from './signUp'
export function Login({navigation}){
    function handlePress(){
        console.log('pressed')
        navigation.navigate('Forgot password')
    }
    function toMarketPlace() {
        navigation.navigate('MarketPlace')
    }
    return<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.body}>
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>Sign in</Text>
                </View>
                <View style={styles.formbody}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.Label}>Email</Text>
                        <TextInput placeholder='Enter your email' style={styles.Field} keyboardType={'email-address'} selectionColor={'black'}/>
                    </View>

                    <View style={styles.nameContainer}>
                        <Text style={styles.Label}>Password</Text>
                        <TextInput placeholder='Enter your password' style={styles.Field} selectionColor={'black'} secureTextEntry={true}/>
                    </View>

                    <View style={styles.submitContainer}>
                        <TouchableOpacity style={styles.submit} onPress={toMarketPlace}>
                            <Text style={styles.submitText}>Sign in</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottom}>
                    <Pressable onPress={handlePress}>
                        <Text style={styles.bottomText}>Forgot password?</Text>
                    </Pressable>
                
                </View>

                    <View style={styles.createAcctContainer}>
                        <TouchableHighlight style={styles.createContainer} onPress={()=>(navigation.navigate('Sign up'))}>
                            <Text >Create account</Text>
                        </TouchableHighlight>

                    </View>
                </View>
                
            </View>
            
    
    </TouchableWithoutFeedback>
}