import {Text, View, StyleSheet, TouchableWithoutFeedback, TextInput, TouchableOpacity, Keyboard, ScrollView} from 'react-native'
import { styles } from './signUp';


export function ResetPassword (){
    return(<ScrollView style={styles.body}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
           <View >
                <View style={styles.formbody}>
                    <View style={styles.nameContainer}>
                            <Text style={styles.Label}>Password</Text>
                            <TextInput placeholder='Enter your password' style={styles.Field} selectionColor={'black'} secureTextEntry={true}/>
                    </View>
                    <View style={styles.nameContainer}>
                            <Text style={styles.Label}>Confirm Password</Text>
                            <TextInput placeholder='Confirm password' style={styles.Field} selectionColor={'black'} secureTextEntry={true}/>
                    </View>

                    <View style={styles.submitContainer}>
                        <TouchableOpacity style={styles.submit}> 
                            <Text style={styles.submitText}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
           </View>
            
        </TouchableWithoutFeedback>
    </ScrollView>
       
    )
}