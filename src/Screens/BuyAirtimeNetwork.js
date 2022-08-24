import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { GlobalContext } from '../context/reducers/Provider';

const BuyAirtimeNetwork = ({navigation}) => {

  return (
    <View style={{flex:1, backgroundColor:'#F4F7FD'}}>
        <TouchableOpacity onPress={()=>navigation.navigate("Recharge",{network:'camtel'})} style={{backgroundColor:'white',padding:20, margin:20}}>
            <Text style={{fontSize:25, color:'blue', textAlign:'center'}}>Camtel</Text>
            <Text style={{color:'grey', fontSize:12, textAlign:'center'}}>62X-XXX-XXX</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Recharge",{network:"nextel"})} style={{backgroundColor:'white',padding:20, margin:20}}>
            <Text style={{fontSize:25, color:'red', textAlign:'center'}}>Nextel Cameroon</Text>
            <Text style={{color:'grey', fontSize:12, textAlign:'center'}}>66X-XXX-XXX</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Recharge",{network:'yoomee'})} style={{backgroundColor:'white',padding:20, margin:20}}>
            <Text style={{fontSize:25, color:'green', textAlign:'center'}}>YooMee</Text>
            <Text style={{color:'grey', fontSize:12, textAlign:'center'}}>66X-XXX-XXX</Text>

        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Recharge", {network:'mtn'})} style={{backgroundColor:'white',padding:20, margin:20}}>
            <Text style={{fontSize:25, color:'yellow', textAlign:'center'}}>MTN</Text>
            <Text style={{color:'grey', fontSize:12, textAlign:'center'}}>66X-XXX-XXX</Text>

        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("Recharge", {network:'orange'})} style={{backgroundColor:'white',padding:20, margin:20}}>
            <Text style={{fontSize:25, color:'orange', textAlign:'center'}}>Orange</Text>
            <Text style={{color:'grey', fontSize:12, textAlign:'center'}}>66X-XXX-XXX</Text>

        </TouchableOpacity>
    </View>
  )
}

export default BuyAirtimeNetwork

const styles = StyleSheet.create({})