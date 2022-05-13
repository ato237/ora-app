import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'


const CurrencyPage = ({navigation,route}) => {
  return (
    <ScrollView style={{backgroundColor:"#F4F7FD", paddingTop:20}}>
        <View style = {{paddingHorizontal:30}}>
        <View style={{justifyContent:'center',alignItems:'center',paddingTop:23}}>
            <View style={{flexDirection:'row', justifyContent:'center'}}>
            <Image style={{width:30,height:30}} source = {route.params.image}/>
            <Text style={{fontSize:15, marginTop: 8,marginHorizontal:10, color:'grey'}}>
                {route.params.symbol}
            </Text>

            </View>
        <Text style={{fontSize:30, fontWeight:'bold', marginTop:15,color:'#14213D'}}>{route.params.wallet}</Text>
      
        <View>
      
        </View>
        </View>
        <View style={{marginTop:20,flexDirection:'row',justifyContent:'space-between', paddingTop:35}}>
            <View style={{flexDirection:'column'}}>
            <TouchableOpacity style={{backgroundColor:'#3D5BD7', borderRadius:50,justifyContent:'center',alignItems:'center',width:55,height:55}}>
                <Ionicons name="add-outline" size = {30} color = "white" />
            </TouchableOpacity>
            <Text style={{textAlign:'center'}}>Buy</Text>

            </View>
            <View  style={{flexDirection:'column'}}>
            <TouchableOpacity style={{backgroundColor:'#3D5BD7', borderRadius:50,justifyContent:'center',alignItems:'center',width:55,height:55}}>
            <Ionicons name="wallet-outline" size = {30} color = "white" />
            </TouchableOpacity>
            <Text style={{textAlign:'center'}}>Sell</Text>

            </View>
            <View  style={{flexDirection:'column'}}>
            <TouchableOpacity style={{backgroundColor:'#3D5BD7', borderRadius:50,justifyContent:'center',alignItems:'center',width:55,height:55}}>
            <Ionicons name="arrow-up-outline" size = {25} color = "white" />
            </TouchableOpacity>
            <Text style={{textAlign:'center'}}>Send</Text>

            </View>
            <View  style={{flexDirection:'column'}}>
            <TouchableOpacity style={{backgroundColor:'#3D5BD7', borderRadius:50,justifyContent:'center',alignItems:'center',width:55,height:55}}>
            <Ionicons name="arrow-down-outline" size = {25} color = "white" />
            </TouchableOpacity>
            <Text style={{textAlign:'center'}}>Recieve</Text>

            </View>
        </View>
        </View>
        <View style={{backgroundColor:'white', height:'150%',marginTop:50,borderTopRightRadius:35, borderTopLeftRadius:35,justifyContent:'center',alignItems:'center'}}>
                <Text>Nothing to show</Text>
        </View>
    </ScrollView>
  )
}

export default CurrencyPage

const styles = StyleSheet.create({})

