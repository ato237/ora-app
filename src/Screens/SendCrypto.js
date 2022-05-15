import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'



const SendCrypto = () => {
    const[enteredValue, setEnteredValue] = useState('');
    const validated = enteredValue.match(/^(\d*\.{0,1}\d{0,2}$)/);
/*if (validated) {
  setValues(String(values));
  datas.setValues(values);
}*/
  return (
    <View style={{backgroundColor:'white',flex:1}}>
        <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'#F4F7FD', height:250}}>
            <Text style={{fontSize:enteredValue.length < 8? 70 : enteredValue.length < 12? 50 : enteredValue.length < 20? 30 :20 }}>${enteredValue}</Text>
        </View>
        <View style={{justifyContent:'center',alignItems:'center'}}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <TouchableOpacity onPress={()=>setEnteredValue(enteredValue +"1")} style={{padding:10,paddingHorizontal:50}}>
                <Text style={{fontSize:45}}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setEnteredValue(enteredValue +"2")} style={{padding:10,paddingHorizontal:50}}>
                <Text style={{fontSize:45}}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setEnteredValue(enteredValue +"3")} style={{padding:10,paddingHorizontal:50}}>
                <Text style={{fontSize:45}}>3</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <TouchableOpacity onPress={()=>setEnteredValue(enteredValue +"4")} style={{padding:10,paddingHorizontal:50}}>
                <Text style={{fontSize:45}}>4</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setEnteredValue(enteredValue +"5")} style={{padding:10,paddingHorizontal:50}}>
                <Text style={{fontSize:45}}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setEnteredValue(enteredValue +"6")} style={{padding:10,paddingHorizontal:50}}>
                <Text style={{fontSize:45}}>6</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <TouchableOpacity onPress={()=>setEnteredValue(enteredValue +"7")} style={{padding:10,paddingHorizontal:50}}>
                <Text style={{fontSize:45}}>7</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setEnteredValue(enteredValue +"8")} style={{padding:10,paddingHorizontal:50}}>
                <Text style={{fontSize:45}}>8</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setEnteredValue(enteredValue +"9")} style={{padding:10,paddingHorizontal:50}}>
                <Text style={{fontSize:45}}>9</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between',left:11}}>
                <TouchableOpacity onPress={()=>setEnteredValue(enteredValue +".")} style={{padding:10,paddingHorizontal:50}}>
                <Text style={{fontSize:45}}>.</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setEnteredValue(enteredValue +"0")} style={{padding:10,paddingHorizontal:50}}>
                <Text style={{fontSize:45}}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>setEnteredValue(enteredValue.slice(0, enteredValue.length - 1))} style={{padding:10,paddingHorizontal:50,top:18}}>
                <Ionicons style={{fontSize:35}} name="arrow-back-outline" />
                </TouchableOpacity>
            </View>
        </View>
        <View style={{padding:25, alignItems:'center',marginTop:30}}>
            <TouchableOpacity style={{backgroundColor:'#E6CBD0',justifyContent:'center',padding:20, paddingHorizontal:115,borderRadius:10}}>
            <Text style={{color:'#650108', alignItems:'center', fontSize:16, fontWeight:'bold'}}>Send Crypto</Text>
            </TouchableOpacity>
            
                 </View>

    </View>
  )
}

export default SendCrypto

const styles = StyleSheet.create({})