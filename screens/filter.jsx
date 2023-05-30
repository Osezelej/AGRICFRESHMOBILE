import {View, StyleSheet, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import { memo, useCallback, useEffect, useState } from 'react';
import OptionButton from '../components/optionButton';
import { ActivityIndicator, TextInput } from '@react-native-material/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },
    subtitleText:{
        fontSize:19.2,
        fontWeight:'bold',
        marginBottom:10
    },
    body:{
        paddingHorizontal:15,
        flex:1
    },
    filterContainer:{
   marginBottom:10
    },
    searchInput:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between'
    },
    TextInput:{
        width:'45%',
    },
    ApplyFilterContainer:{
        paddingHorizontal:15,
        paddingVertical:10, 
        flexDirection:'row',
        justifyContent:'space-between'
    },
    ApplyFilter:{
        borderWidth:1,
        borderColor:'#ffdb28',
        paddingHorizontal:25,
        paddingVertical:15,
        borderRadius:10

    },
    applyFilterText:{
        fontSize:19,
        fontWeight:'500'
    },
    ApplyFilterActive:{
        borderWidth:1,
        borderColor:'#ffdb28',
        paddingHorizontal:25,
        paddingVertical:15,
        borderRadius:10,
        backgroundColor:'#ffdb28'

    },
})
function Filter ({starImage, navigation, setMarketData, setInitialChange, setFilteredData}){

    let getEmail = useCallback(async()=>{
        let email = '';
        await AsyncStorage.getItem('userEmail', (err, res)=>{
            email = JSON.parse(res).email;
        })
        return email
    })

    const [options, setoptions] = useState([
    {
        id:2,
        option:'Poultry',
        isActive:false,
    },
    {
        id:3,
        option:'Beef',
        isActive:false,
    },
    {
        id:4,
        option:'Pork',
        isActive:false,
    },
    {
        id:5,
        option:'Diary',
        isActive:false,
    
    },
    {
        id:6,
        option:'Eggs',
        isActive:false,
    },
    {
        id:7,
        option:'Fish',
        isActive:false,
    }, 
    {
        id:8,
        option:'vegetable',
        isActive:false
    },
    {
        id:9,
        option:'Fruit',
        isActive:false
    }
    ]);
    const [optionSelected, setOptionSelected] = useState('all')
    const [optionSortSelected, setOptionSortSelected] = useState('all')
    const [optionRatingSelected, setOptionRatingSelected] = useState('all')
    const [priceRange, setPriceRange] = useState({
        min:'',
        max:''
    })
    const [d, setD] = ('')
    const [optionSort, setOptionSort] = useState([
    {
        id:2,
        option:'Most Recent',
        isActive:false
    },
    {
        id:3,
        option:'Price High',
        isActive:false
    },
    {
        id:4,
        option:'Price Low',
        isActive:false
    }
])
    const [rating, setRating] = useState([
        {
            id:2,
            option:'1',
            isActive:false,
        },
        {
            id:3,
            option:'2',
            isActive:false,
        },
        {
            id:4,
            option:'3',
            isActive:false,
        },
         {
            id:5,
            option:'4',
            isActive:false,
        },
        {
            id:6,
            option:'5',
            isActive:false,
        }
    ]) 
    const [activeActivity, setActiveActivity] = useState(false)



    let handleChange = useCallback((item)=>{
        let item_id = item.id;
        setoptions((prev)=>{
            for (let n of prev){
                if (item_id != n.id){
                    n.isActive = false;
                }else{
                    n.isActive = true;
                    setOptionSelected(n.option)
                }
            }
            return[...prev]
        })
    }, )
    const [filterData, setFilterData] = useState(
        {
            categories:optionSelected,
            rating:optionRatingSelected,
            sort:optionSortSelected,
            priceRange:priceRange,
        }
    ) 


    useEffect(()=>{
        setFilterData((prev)=>{
            return{...prev, categories:optionSelected.toLocaleLowerCase()}
        })

    }, [optionSelected])

    useEffect(()=>{
        setFilterData((prev)=>{
            return{...prev, rating:optionRatingSelected}
        })

    }, [optionRatingSelected])

    useEffect(()=>{
        setFilterData((prev)=>{
            return{...prev, sort:optionSortSelected}
        })

    }, [optionSortSelected])

    useEffect(()=>{
        setFilterData((prev)=>{
            return{...prev, priceRange:priceRange}
        })
    }, [priceRange])

    let handleChange2 = useCallback((item)=>{
        let item_id = item.id;
        setOptionSort((prev)=>{
            for (let n of prev){
                if (item_id != n.id){
                    n.isActive = false;
                }else{
                    n.isActive = true;
                    setOptionSortSelected(n.option)
                }
            }
            return[...prev]
        })
    })
    let handleChange3 = useCallback((item)=>{
        let item_id = item.id;
        setRating((prev)=>{
            for (let n of prev){
                if (item_id != n.id){
                    n.isActive = false;
                }else{
                    n.isActive = true;
                    setOptionRatingSelected(n.option)
                }
            }
            return[...prev]
        })
    })
    let handlefilterData = async(data)=>{
       let filteredData =  data.filter((value)=>{
        let categories = value.foodType.includes(filterData.categories)
        let rating = (value.rating >= filterData.rating  )
        let foodPrice = parseInt(value.Price.slice(1))
        let foodPriceCheck = (foodPrice <= filterData.priceRange.max) && (foodPrice >= filterData.priceRange.min)
        if (filterData.categories.toLowerCase() == 'all'){
            categories = true;
        }
        if (filterData.rating.toLowerCase() == 'all'){
            rating == true;
        }
        console.log('categories: ',categories)
        console.log('rating: ',rating)
        return categories && rating && foodPriceCheck
        })
        return filteredData
    }

    return <View style={styles.container}>
            <ScrollView style = {styles.body}>    
                <View style = {styles.filterContainer}>
                  <Text style={styles.subtitleText}>Categories</Text>
                 <View style = {{flexDirection:'row', flexWrap:'wrap'}}>
                    {options.map((item)=><OptionButton key={item.id} styles={styles} 
                    handleChange={handleChange} 
                    active={'#ffdb28'} 
                    item={item} d ={d} 
                    filterRender = {true}

                    />)}
                 </View> 
                </View>
                <View style = {styles.filterContainer}>
                  <Text style={styles.subtitleText}>PriceRange</Text>
                  <View style = {styles.searchInput}>
                    <TextInput variant="outlined" 
                    label="From" 
                    style = {styles.TextInput}
                    keyboardType='number-pad'
                    color='#ffdb28'
                    onChangeText={(text)=>{
                        setPriceRange((prev)=>({...prev, min:text
                        }))
                    }}
                    />

                    <TextInput variant="outlined" 
                    label="To" 
                    style = {styles.TextInput}
                    keyboardType='number-pad'
                    color='#ffdb28'
                    onChangeText={(text)=>{
                        setPriceRange((prev)=>({...prev, max:text
                        }))
                    }}
                    />  
                  </View>  

                </View>
                <View style = {styles.filterContainer}>
                  <Text style={styles.subtitleText}>Sort By</Text>
                  <View style = {{flexDirection:'row', flexWrap:'wrap'}}>
                    {optionSort.map((item)=><OptionButton key={item.id} styles={styles} 
                    handleChange={handleChange2} 
                    active={'#ffdb28'} 
                    item={item} d ={d} 
                    filterRender = {true}

                    />)}
                    </View> 


                </View>
                <View style = {styles.filterContainer}>
                  <Text style={styles.subtitleText}>Rating</Text>
                <View style = {{flexDirection:'row', flexWrap:'wrap'}}>
                    {rating.map((item)=>{
                        return <TouchableOpacity key={item.id}  onPress={()=>{
                             handleChange3(item);
                             }} activeOpacity={0.7}>
                                            
                            <View style = {{ backgroundColor: item.isActive ? '#ffdb28':'white',
                                             paddingVertical:7,
                                             paddingHorizontal:15,
                                             borderRadius:30,
                                             borderWidth:0.5,
                                             borderColor:'#ffdb28',
                                             marginRight:5,
                                             marginVertical:5,
                                             flexDirection:'row',
                                             alignItems:'center'
                        }}>  
                                <Text style={{fontSize:15, marginRight:5}}>{item.option}</Text>
                                <Image source={starImage} style={{height:15, width:15}}/>
                                
                            </View>
                        </TouchableOpacity> 
                    })}
                </View> 

                </View>
            </ScrollView>


            <View style = {styles.ApplyFilterContainer}>
                <TouchableOpacity style = {[styles.ApplyFilterActive, {flexDirection:'row', alignItems:'center'}]} activeOpacity={0.7} onPress={
                    
                    ()=>{
                    setActiveActivity(true)
                     getEmail().then(async(email)=>{
                        console.log(email)
                        await axios.get(`https://4v6gzz-3001.csb.app/v1/marketData/${email}`)
                        .then((res)=>{
                            if (res.status == 200){
                                handlefilterData(res.data)
                                .then((value)=>{
                                    console.log(value)
                                    setFilteredData(value)
                                    setInitialChange(false)
                                })
                            }
                        })
                        .catch((err)=>{
                            console.log(err)
                        })
                        .finally(()=>{
                            setTimeout(()=>{
                                setActiveActivity(false);
                                navigation.navigate('MarketPlace', {email:email})
                                }, 800)
                        })

                     })
                      }}>
                    <Text style = {styles.applyFilterText}>Apply Filter</Text>
                    {activeActivity && <ActivityIndicator color='black' size={'small'}/>}
                </TouchableOpacity>
                <TouchableOpacity style = {styles.ApplyFilter}>
                    <Text style = {styles.applyFilterText}>Reset Filter</Text>
                </TouchableOpacity>
            </View>
    </View>
}
export default memo(Filter)