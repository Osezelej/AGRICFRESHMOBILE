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
import { useState, useCallback, useRef, useEffect } from 'react';
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
import OrderHistory from './screens/orderHistory';
import OrderItem from './screens/OrderItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const Stack = createNativeStackNavigator();

let logoImages = require('./assets/icon.png');
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
let successImage = require('./assets/images/success.png');
let foodBasket = require('./assets/images/vegetable.gif');
let checkedImage = require('./assets/images/checked.png');
let deliveryManImage = require('./assets/images/delivery-man.png');
let unCheckedImage = require('./assets/images/unChecked.png')

const visibilityImages = [VisibleImage, notVisibleImage];

const Images = [searchImage, FilterImage];
const userProfileDetails = [{id:1, label:"Order history", image:orderImage, isActive:true},
  {id:2, label:"User Profile", image:profileImage, isActive:false},
  {id:3, label:"Favourites", image:favouriteImage, isActive:false},
  // {id:4, label:"Cart", image:cartImage, isActive:false},
  {id:5, label:"Transactions", image:paymentImage, isActive:false},
  {id:6, label:"Address", image:addressImage, isActive:false},
  {id:7, label:"Logout", image:logoutImage, isActive:false},
];
const PaymentOptions = {
    cardname:'Fund your wallet',
    cardOption:creditCard, 
    navigation:'Card'
  }
 
                            
export default function App() {
  // setStatusBarStyle('dark')
  // setStatusBarBackgroundColor('white')

  const searchItem = useRef()
const [marketData, setMarketData] = useState([])
let [cartData, setCartData] = useState([]);
const [cartBadge, setCartBadge] = useState(0); 
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
const [d, setD] = useState(false)
const [filteredData, setFilteredData] = useState([]) 



const [searchWord, setSearchWord] = useState('');
const [searchData, setSearchData] = useState([])
const [activeIndicator, setActiveIndicator] = useState(false);
const [email, setEmail] = useState()

// wallet balance
const [wbalance, setWBalance] = useState(0);

// user order History
const [order, setOrder] = useState([]);



let handleSearchTextChange = useCallback ((text)=>{
  setSearchWord(text);
  if (text.length > 0){
    setActiveIndicator(true)
  
  }else{
    setActiveIndicator(false)
  }
})
// to save the user information on the user phone 
const [dataSaved, setDataSaved] = useState('');
async function saveUserData (email, name, walletBal){
  let user_data =   JSON.stringify({
    email:email,
    name:name,
    walletBal:walletBal
  }) 
  await AsyncStorage.setItem('userData', user_data)
  setDataSaved('saved')

}


// to search for data in mongodb
let searchDatabase = useCallback(async()=>{
  await AsyncStorage.getItem('userEmail', (e,res)=>{
   
  }).then(async (res)=>{
    
    let userEmail = JSON.parse(res).email 
    await axios.put(`https://4v6gzz-3001.csb.app/v1/search/${userEmail}/${searchWord}`)
    .then((res)=>{
      setSearchData(res.data); 
    })

  
  })


})

//  to effect the searchDatabase function
useEffect(()=>{
  if(searchWord.length > 0){
    
      searchDatabase().then(()=>{
        setTimeout(()=>{
          setActiveIndicator(false)
        },300)   
      })
  }

},[searchWord])

// to handle cartData
async function  handleCartData(item){
  setCartData((prev)=>{
      let i = true;
      for (let n of prev){
          if (item.id == n.id){
              i = false;
              break;
          }
      }
      if (i){
          manageCart()
          return [...prev, item]
      }else{
          return[...prev]
      }
  })
}
let manageCart = useCallback(()=>{
  setCartBadge(cartBadge + 1);
})

// add to Wallet
let [firstLoad, setFirstLoad] = useState(false)

async function getbalance(){
  let e  = '';
  await AsyncStorage.getItem('userData', (err, res)=>{
      e = JSON.parse(res).walletBal
  })
  return e
}

useEffect(()=>{
  if(firstLoad){
    getbalance().then((res)=>{
      setWBalance(res)
    })
  }else{
    setFirstLoad(true)
  }

}, [dataSaved])


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
              options={{   
                headerTitleAlign:'center',
                title:'',
                headerTintColor:'none',
                animation:"slide_from_right",
                headerShadowVisible:false
               }}
              
          >
            {(props)=><Login {...props}
              saveUserData={saveUserData}
            />}
          </Stack.Screen>
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
                cartData = {cartData}
                setCartData = {setCartData}
                handleCartData={handleCartData}
                cartBadge={cartBadge}
                setCartBadge={setCartBadge}
                manageCart={manageCart}
                marketData = {marketData}
                setMarketData={setMarketData}
                d={d}
                setD={setD}
                filteredData={filteredData}
                setFilteredData={setFilteredData}
                balance={wbalance}
                setBalance={setWBalance}
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
              {(props)=><Transaction {...props} 
              TImage={TImage} 
              visibilityImages={visibilityImages}
              balance={wbalance}
              />}
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
                          balance={wbalance}
                          setBalance={setWBalance}
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
              {(props)=><Card {...props} 
                          cards={cards}
                          balance = {wbalance}
                          setBalance = {setWBalance}
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
                  balance={wbalance}
                  successImage={successImage}
                  order={order}
                  setOrder={setOrder}
                  setBalance={setWBalance}
                  setCartData={setCartData}
                  setCartBadge={setCartBadge}
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
                headerTitle:(props)=><SearchHead {...props} 
                                        searchWord = {searchWord} 
                                        searchItem = {searchItem}
                                        handleSearchTextChange = {handleSearchTextChange}
                                        />,
                headerTitleAlign:'left',
                
                
              }}
            >
              {(props)=>(

                <Search {...props} 
                    activeIndicator = {activeIndicator}
                    searchData = {searchData}
                    contentImages={[star1Image, starImage, commentImage]}
                    cartData={handleCartData}
                    setSearchWord={setSearchWord}
                    
                />
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
                    setMarketData={setMarketData}
                    setInitialChange={setD}
                    setFilteredData={setFilteredData}
                />
              )

              }

            </Stack.Screen>
              <Stack.Screen
              name='Order history'
              
              options={{
                headerShadowVisible:false,
                animation:'simple_push',
                headerTitleAlign:'center',
                title:'Order History'
                
              }}
              >
                {(props)=><OrderHistory   {...props}/>}
              </Stack.Screen>

              <Stack.Screen
              name='orderItem'
              options={{
                headerShadowVisible:false,
                animation:'slide_from_right',
                headerTitleAlign:'center',
                title:'Order'
              }}
              >
                {(props)=><OrderItem  {...props}
                  foodBasketImage = {foodBasket}
                  deliveryImage={deliveryImage}
                  checkedImage={checkedImage}
                  deliveryManImage={deliveryManImage}
                />}
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