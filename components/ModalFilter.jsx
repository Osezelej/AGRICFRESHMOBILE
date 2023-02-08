import { Modal, View, Text, Pressable, StyleSheet, FlatList, Switch } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { memo, useCallback, useState} from "react";
import FilterOptions from "./FilterOptions";

const style = StyleSheet.create({
    titleText:{
        fontSize:17,
        marginBottom:10,
        fontWeight:'600'

    },
    option:{
        fontSize:14,
        fontWeight:'600',
    },
    modalComponent:{
        marginVertical:20,

    }
})


function ModalFilter ({styles, state, setState}){
    let handleState = useCallback(()=>(setState()), [state]);
    
const [data, setData] = useState([
    {"Categories":[{
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
    }
]},

{"Sort By":[
    {
    id:1,
    option:'All',
    isActive:true,
},
{
    id:2,
    option:'Most Recent',
    isActive:false,
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
]},

{"Rating":[1,
     2, 
     3, 
     4, 
     5
    ]}
]);

const [refresh, setRefresh] = useState("Categories")
    let handleChange = useCallback((title, id)=>{
     switch (title){
        case "Categories":
             data[0][title].map((value)=>{
                if(value.id != id){
                    value.isActive = false;
                }else{
                    value.isActive = true;
                }
            })
           refresh == "Categories"? setRefresh("Categories "): setRefresh("Categories");
            break;
        case "Sort By":
             data[1][title].map((value)=>{
                if(value.id != id){
                    value.isActive = false;
                }else{
                    value.isActive = true;
                }
            })
           refresh == "Categories"? setRefresh("Categories "): setRefresh("Categories");
            break;

     }
    })



    return <Modal 
        animationType="slide"
        visible = {state}
        hardwareAccelerated={true}
        statusBarTranslucent={true}
        transparent={true}
    >
    <View style={styles.modalcontainer}>
        <View style={styles.modalbody}>
            <View style={styles.modalheader}>
                <Text style={styles.modaltitle}>Sort & Filter</Text>
                <Pressable onPressIn={handleState}>
                    <MaterialCommunityIcons name="close" color={'black'} size={20}/>
                </Pressable>
            </View>
            <View style={styles.line}></View>
            <View style={styles.modalComponent}>
                <Text style={style.titleText}>{refresh}</Text>
                <FlatList
                    data={data[0].Categories}
                    horizontal={true}
                    renderItem= {({item})=> <FilterOptions  
                                                styles={style}
                                                Title={'Categories'}
                                                item={item}
                                                handleState = {handleChange}
                                                />}
                    keyExtractor= {item => item.id}
                />
            </View>
            <View style={style.modalComponent}>
            <Text style={style.titleText}>{"Sort By"}</Text>
                <FlatList
                    data={data[1]["Sort By"]}
                    horizontal={true}
                    renderItem= {({item})=> <FilterOptions  
                                                styles={style}
                                                Title={'Sort By'}
                                                item={item}
                                                handleState = {handleChange}
                                                />}
                    keyExtractor= {item => item.id}
                />
            </View>
        </View>
    </View>
   
</Modal>

}
export default memo(ModalFilter);