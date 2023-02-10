import { memo} from "react";
import { TouchableOpacity, View, Text, Image} from "react-native";


function FilterOptions ({styles, Title, item, handleState, image}){
 
return<View>
        <TouchableOpacity style={styles.background} onPressIn={()=>handleState(Title, item.id)}>
            <View style = {{ backgroundColor: item.isActive ? '#ffdb28' :'white',
                             paddingVertical:5,
                             paddingHorizontal:15,
                             borderRadius:30,
                             borderStyle:'solid',
                             borderWidth:1,
                             marginHorizontal:5,
                             borderColor:'#ffdb28',
                             flexDirection:'row'
                             }}>
             
                {image && <Image source={image} style={{width:20,height:20, marginRight:10}}/>}
                <Text style={styles.option}>{item.option}</Text>
           

            </View>
        </TouchableOpacity>
</View>
}
export default memo(FilterOptions)