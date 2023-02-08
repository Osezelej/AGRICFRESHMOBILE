import { memo} from "react";
import { TouchableOpacity, View, Text} from "react-native";


function FilterOptions ({styles, Title, item, handleState}){
 
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
                             }}>

                <Text style={styles.option}>{item.option}</Text>
            </View>
        </TouchableOpacity>
</View>
}
export default memo(FilterOptions)