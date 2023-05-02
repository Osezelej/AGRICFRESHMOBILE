import {View, StyleSheet, Text} from 'react-native';
import { memo, useCallback, useState } from 'react';
import OptionButton from '../components/optionButton';
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
    },
    subtitleText:{
        fontSize:18
    },
    body:{
        paddingHorizontal:10
    }
})
function Filter (){
    const [options, setoptions] = useState([{
        id:1,
        option:'All',
        isActive:true,
    },
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
    const [optionSelected, setOptionSelected] = useState('')
    const [d, setD] = ('')

    let handleChange = useCallback((item)=>{
        let item_id = item.id;
        setoptions((prev)=>{
            console.log(prev);
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


    return <View style={styles.container}>
            <View style = {styles.body}>    
                <View >
                  <Text style={styles.subtitleText}>Categories</Text>
                 <View style = {{flexDirection:'row', flexWrap:'wrap'}}>
                    {options.map((item)=><OptionButton styles={styles} handleChange={handleChange} active={'#ffdb28'} item={item} d ={d}/>)}
                 </View> 
                </View>
                <View>
                  <Text style={styles.subtitleText}>PriceRange</Text>
                </View>
                <View>
                  <Text style={styles.subtitleText}>Sort By</Text>
                </View>
                <View>
                  <Text style={styles.subtitleText}>Rating</Text>
                </View>
            </View>
            <View>

            </View>

    </View>
}
export default memo(Filter)