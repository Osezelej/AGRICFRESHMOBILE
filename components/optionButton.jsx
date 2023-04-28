import { memo } from "react"
import { TouchableOpacity, View, Text } from "react-native"

function OptionButton ({styles, active, item, handleChange, d}){
    return<TouchableOpacity style={styles.background} onPress={()=>{handleChange(item); d =true }} activeOpacity={0.7}>
                                        
    <View style = {{ backgroundColor: item.item.isActive ? active:'white',
                    paddingVertical:3,
                    paddingHorizontal:15,
                    borderRadius:30,
                    elevation:10
                    }}>  
    <Text style={styles.option}>{item.item.option}</Text>
    </View>
</TouchableOpacity> 
}
export default memo(OptionButton)