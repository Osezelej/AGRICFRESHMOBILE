import { setStatusBarBackgroundColor, setStatusBarStyle, StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView, ScrollView} from 'react-native';
import { Animated_page } from './screens/landing';
import {SignUp} from './screens/signUp';
import {Login} from './screens/logIn';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ForgotPassword } from './screens/Fpass';
import { ResetPassword } from './screens/rpas';
import  SearchHeader  from './components/search';
import { useState, useCallback } from 'react';
import ModalFilter from './components/ModalFilter';
import Description from './screens/Description';
import FootIconsNavigaiton from './screens/TabSceen';
const Stack = createNativeStackNavigator();

let logoImages = require('./assets/images/Agricfresh.png');
let searchImage = require('./assets/images/search-interface-symbol.png');
let FilterImage = require('./assets/images/setting.png');
let cartImage = require('./assets/images/shopping-cart.gif');
let star1Image = require('./assets/images/star1.png');
let starImage = require('./assets/images/star.png');
let newsImage = require('./assets/images/newsfeed.png');
let homeImage = require('./assets/images/home.png');
let profileImage = require('./assets/images/user.png');
let logoutImage = require('./assets/images/logout.png');
let commentImage = require('./assets/images/comment.png');

const Images = [searchImage, FilterImage];

export default function App() {
  // setStatusBarStyle('dark')
  // setStatusBarBackgroundColor('white')

const [state, setState] = useState(false);
let handleState = useCallback(()=>(state?setState(false):setState(true)))
  return (<View style ={styles.container}>
         <StatusBar/>
        {/* <Animated_page
          image={logoImages}
        /> */}
          {/* <SignUp/> */}
        
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name = "Sign up"
              component={SignUp}
              options={{headerTitleAlign:'center', title:'', headerTintColor:'none', animation:"slide_from_right", headerShadowVisible:false}}
              
            />
            <Stack.Screen
              name = "Login"
              component={Login}
              options={{
                headerTitleAlign:'center',
                title:'',
                headerTintColor:'none',
                animation:"slide_from_right",
                headerShadowVisible:false
               }}
              
            />

            <Stack.Screen
              name = "Forgot password"
              component={ForgotPassword}
              options={{title:"Forgot Password", animation:"slide_from_right"}}
            />

            <Stack.Screen
              name = "Reset Password"
              component={ResetPassword}
              options={{title:"Reset Password", animation:"slide_from_right"}}
            />

            <Stack.Screen
              name='MarketPlace'
                options={{animation:"slide_from_right", headerShown:false}}>
                {(props)=>(<FootIconsNavigaiton {...props}  logoImage= {logoImages} state={state} handleState={handleState}/>)}
              </Stack.Screen>
            <Stack.Screen
              name = "Description"
              options={{title:"MarketPlace", animation:"slide_from_right", headerTitle: (props)=>(<SearchHeader {...props} 
                image={Images} 
                setState = {handleState}/>), headerShadowVisible:false}}
                component = {Description}
            />
          </Stack.Navigator>
        </NavigationContainer>
  </View>
            
  );
}

export {Images, cartImage, star1Image, starImage, commentImage, newsImage, profileImage, homeImage, logoutImage, createBottomTabNavigator, NavigationContainer, ModalFilter, SearchHeader};

const styles = StyleSheet.create({
  container: {
    flex:1,
  }
 
});
