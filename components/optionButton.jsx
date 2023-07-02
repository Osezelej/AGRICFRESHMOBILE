import { memo } from "react"
import { TouchableOpacity, View, Text } from "react-native"

function OptionButton ({styles, active, item, handleChange, d, filterRender}){
   if(filterRender){
        return<TouchableOpacity style={styles.background} onPress={()=>{
            handleChange(item);
        }} activeOpacity={0.7}>
                                            
        <View style = {{ backgroundColor: item.isActive ? '#ffaf36':'white',
                        paddingVertical:7,
                        paddingHorizontal:15,
                        borderRadius:30,
                        borderWidth:0.5,
                        borderColor:'#ffaf36',
                        marginRight:5,
                        marginVertical:5

                        }}>  
        <Text style={{fontSize:15}}>{item.option}</Text>
        </View>
    </TouchableOpacity> 
   }else{
            return<TouchableOpacity style={styles.background} onPress={()=>{handleChange(item); d =true }} activeOpacity={0.7}>
                                                
            <View style = {{ backgroundColor: item.isActive ? '#ffaf36':'white',
                            paddingVertical:3,
                            paddingHorizontal:15,
                            borderRadius:30,
                            elevation:10
                            }}>  
            <Text style={styles.option}>{item.option}</Text>
            </View>
        </TouchableOpacity> 
   }
   
}
export default OptionButton;