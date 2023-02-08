import { memo } from "react"
import { TouchableOpacity, View, Text } from "react-native"

function OptionButton ({styles, active, item, handleChange}){
    return<TouchableOpacity style={styles.background} onPressIn={()=>{handleChange(item)}}>
                                        
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