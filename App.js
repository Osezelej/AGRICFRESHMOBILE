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
import { useState, useCallback, useRef } from 'react';
import ModalFilter from './components/ModalFilter';
import Description from './screens/Description';
import FootIconsNavigaiton from './screens/TabSceen';
import UserProfile from './screens/userProfile';
import Favourites from './screens/favourite';
import SearchHeader2 from './components/Search2';
import Transaction from './screens/Transaction';
import Wallet from './screens/Wallet';
import Card from './screens/Card';
import NewCard from './screens/NewCard';
import Address from './screens/Address';
import Order from './screens/order';
import AddressGuide from './screens/AddressGuide';
import Comment from './screens/comment';
import Search from './screens/search';
import SearchHead from './components/searchHead';
import Filter from './screens/filter';
import FrgtpswdCode from './screens/frgtpswdCode';


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
let orderImage = require('./assets/images/clipboard.png');
let favouriteImage = require('./assets/images/favorites.png');
let paymentImage = require('./assets/images/cashless-payment.png');
let addressImage = require('./assets/images/placeholder.png');
let TImage = require('./assets/images/refund.png');
let VisibleImage = require('./assets/images/visibility.png');
let notVisibleImage = require('./assets/images/notVisible.png');
let creditCard = require('./assets/images/creditcardpayment.png');
let appleCard = require('./assets/images/apple-pay.png');
let googleCard = require('./assets/images/google-pay.png');
let masterCard = require ('./assets/images/Mastercard_2019_logo.svg.png');
let visaCard = require('./assets/images/Visa.png');
let deliveryImage = require('./assets/images/fastDelivery.png');
let deliveryImage2 = require('./assets/images/foodDelivery.png');

const visibilityImages = [VisibleImage, notVisibleImage];

const Images = [searchImage, FilterImage];
const userProfileDetails = [{id:1, label:"Order history", image:orderImage, isActive:true},
  {id:2, label:"User Profile", image:profileImage, isActive:false},
  {id:3, label:"Favourites", image:favouriteImage, isActive:false},
  {id:4, label:"Cart", image:cartImage, isActive:false},
  {id:5, label:"Transactions", image:paymentImage, isActive:false},
  {id:6, label:"Address", image:addressImage, isActive:false},
  {id:7, label:"Logout", image:logoutImage, isActive:false},
];
const PaymentOptions = [
  {
    cardname:'Credit Card',
    cardOption:creditCard, 
    navigation:'Card'
  }, 
  {
    cardname:'Google Pay', 
    cardOption:googleCard,
    navigation:false,
  },
  {
    cardname:'Apple Pay',
    cardOption:appleCard,
    navigation:false,
  }
 ]
                            
export default function App() {
  // setStatusBarStyle('dark')
  // setStatusBarBackgroundColor('white')

  const searchItem = useRef()

const [state, setState] = useState(false);
let handleState = useCallback(()=>(state?setState(false):setState(true)))
const [cards, setCards] = useState([]);
const [addrData, setaddrData] = useState([
  {
      id:1,
      title:'Test',
      phone:'08145462539',
      address:'ademola farm rd, Atan bustop, ota, Ogun, Nigeria.'
  }
])


const [searchWord, setSearchWord] = useState('');


  return (<View style ={styles.container}>
         <StatusBar/>
        {/* <Animated_page
          image={logoImages}
        /> */}
          {/* <SignUp/> */}
        
        <NavigationContainer>
          <Stack.Navigator>
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
              name = "ForgotPassword"  
              component={FrgtpswdCode} 
              options={{   
                headerTitleAlign:'center',
                title:'Confirm Your Email',
                headerTintColor:'none',
                animation:"slide_from_right",
                headerShadowVisible:false
               }}


               />
            <Stack.Screen  
              name = "Sign up"
              options={{headerTitleAlign:'center', title:'', headerTintColor:'none', animation:"slide_from_right", headerShadowVisible:false}}
              
            >
            {(props)=><SignUp {...props} visibleImage ={VisibleImage} notVisibleImage = {notVisibleImage} />}
            </Stack.Screen>  
            <Stack.Screen
              name = "Forgot password"
              component={ForgotPassword}
              options={{title:"Forgot Password", animation:"slide_from_right"}}
            />

            <Stack.Screen
              name = "Reset Password"
              options={{title:"Reset Password", animation:"slide_from_right", headerTitleAlign:'center'}}
            >
              {(prop)=><ResetPassword {...prop}
                visibleImage={VisibleImage}
                notVisibleImage={notVisibleImage}
              />}
            </Stack.Screen>


            <Stack.Screen
              name='MarketPlace'
                options={{animation:"slide_from_right", headerShown:false}}>

                {(props)=>(<FootIconsNavigaiton {...props}
                searchItem={searchItem}
                logoImage= {logoImages} 
                state={state} 
                handleState={handleState} 
                userProfileDetails={userProfileDetails}
                
                />)}

              </Stack.Screen>


            <Stack.Screen
              name = "Description"
              options={{title:"", animation:"slide_from_right", headerShadowVisible:false}}
                component = {Description}
                
            />
            <Stack.Screen
              name='User Profile'
              component={UserProfile}
              options={{title:'Edit Profile', animation:"slide_from_bottom", headerShadowVisible:false}}
            />
             <Stack.Screen
              name='Favourites'
              component={Favourites}
              options={{title:'Favourites', animation:"simple_push", headerShadowVisible:false, headerTitle:(props)=>(<SearchHeader2 {...props} 
                image={Images} 
                setState = {handleState}/>),}}
            />
            
            <Stack.Screen
              name='Transactions'
              
              options={{
                headerShadowVisible:false,
                headerTitleAlign:'center',
                animation:'slide_from_right'
              }}
            >
              {(props)=><Transaction {...props} TImage={TImage} visibilityImages={visibilityImages}/>}
            </Stack.Screen>

            <Stack.Screen
              name='Wallet'
              options={{
                headerShadowVisible:false,
                headerTitleAlign:'center',
                animation:'slide_from_right'
              }}
            >
              {(props)=><Wallet {...props} 
                          visibilityImages={visibilityImages}
                          cardOption = {PaymentOptions}
              />}
            </Stack.Screen>

            <Stack.Screen
              name='Card'
              options={{
                headerShadowVisible:false,
                headerTitleAlign:'center',
                animation:'fade_from_bottom'
              }}
            >
              {(props)=><Card {...props} cards={cards}
              />}
            </Stack.Screen>

            <Stack.Screen
              name='Add new Card'
              options={{
                headerShadowVisible:false,
                headerTitleAlign:'center',
                animation:'fade_from_bottom'
              }} 
            >
              {(props)=><NewCard {...props} 
                masterCardImage = {masterCard}
                visaCardImage = {visaCard}
                setCards={setCards}
              />}

            </Stack.Screen>
            <Stack.Screen
              name='Address'
              options={{
                headerShadowVisible:false,
                headerTitleAlign:'center',
                animation:'fade_from_bottom',
                title:'Select Addresses',
               
              }} 
            >
              {(props)=>(

                <AddressGuide
                  {...props}
                  addreses={addrData}
                />
              )

              }

            </Stack.Screen>
            <Stack.Screen
              name='AddressGuide'
              options={{
                headerShadowVisible:false,
                headerTitleAlign:'center',
                animation:'fade_from_bottom',
                title:'ENTER NEW ADDRESS'
              }} 
            >
              {(props)=>(

                <Address
                  {...props}
                  setAddrData={setaddrData}
                />
              )

              }

            </Stack.Screen>
            <Stack.Screen
              name='Order'
              options={{
                headerShadowVisible:false,
                headerTitleAlign:'center',
                animation:'fade_from_bottom',
                title:''
              }} 
            >
              {(props)=>(

                <Order {...props} 
                  deliveryImage = {deliveryImage}
                  deliveryImage2 = {deliveryImage2}
                />
              )

              }

            </Stack.Screen>
            <Stack.Screen
              name='Comment'
              options={{
                headerShadowVisible:false,
                headerTitleAlign:'center',
                animation:'fade_from_bottom',
                title:'Negotiate',
              }} 
            >
              {(props)=>(

                <Comment {...props} />
              )

              }

            </Stack.Screen>
            <Stack.Screen
              name='Search'
              options={{
                headerShadowVisible:false,
                animation:'fade',
                headerTitle:(props)=><SearchHead {...props} searchWord = {searchWord} setSearchWord = {setSearchWord} searchItem = {searchItem}/>,
                headerTitleAlign:'left',
                
              }}
            >
              {(props)=>(

                <Search {...props} />
              )

              }

            </Stack.Screen>
            <Stack.Screen
              name='Filter'
              options={{
                headerShadowVisible:false,
                animation:'fade',
                headerTitleAlign:'center',
                
              }}
            >
              {(props)=>(

                <Filter {...props} 
                    starImage = {starImage}

                />
              )

              }

            </Stack.Screen>
     

          </Stack.Navigator> 
        </NavigationContainer> 
  </View>
        
  );
}

export {Images, cartImage, star1Image, starImage, commentImage, newsImage, profileImage, homeImage, logoutImage, createBottomTabNavigator, NavigationContainer, ModalFilter, SearchHeader, visibilityImages, PaymentOptions};

const styles = StyleSheet.create({
  container: {
    flex:1,
  }
 
});