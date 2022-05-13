import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Cards = () => {

  return (
      <>
      <TouchableOpacity>
    <View style={{padding:10, justifyContent:'center'}}>
        
       <View
        style={{
          backgroundColor: "#14213D",
          borderRadius: 15,
          height: 200,
      
          marginTop: 30,
        }}
      >
        <View  style={{
      
          justifyContent: "center",
          alignItems: "center",
        }}>
        <View style={{right:150}}>
                <Image style={{width:60,height:60}} source={require('../../assets/adaptive-icon.png')} />
            </View>
          <Text style={{ color: "white", fontSize: 25,marginTop:18 }}>4534   3539   3555   5352</Text>
          
        </View>
       <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:40,paddingTop:25}}>
     <Text style={{color:'white',fontSize:15}}>Ade Fru-Asoh Tony Bradley</Text>
     <Text style={{color:'white'}}>06/25</Text>
     </View>
      </View>
  
    </View>
    </TouchableOpacity>
     </>
  )
}

export default Cards

const styles = StyleSheet.create({})