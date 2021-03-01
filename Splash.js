
import 'react-native-gesture-handler';
import React, { Component,useState } from 'react';
import { Animated ,View, Text,TextInput,StyleSheet,Image, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer,NavigationActions } from 'react-navigation';
export default class Splash extends Component {
    state = {
        text: "",
    }
    handletext = (content) => {
        this.setState({ text: content })
    }
    render(){
        return (
            <View style={{flex:1,backgroundColor:'#e6ffff',justifyContent:'center',alignItems:'center'}}>
                <ImageBackground source={require('./images/ff.jpg')} resizeMode = 'cover' style={{width:'100%', height:'100%',flex:1}}>
                    <TextInput style = {styles.input} 
                    underlineColorAndroid = "transparent" 
                    placeholder = "write your views here" 
                    placeholderTextColor = "white" 
                    autoCapitalize = "none" 
                    onChangeText = {this.handletext}
                    onSubmitEditing={()=>this.props.navigation.navigate('story',{paramKey:this.state.text})}/>
                </ImageBackground>
            </View>
          );
    }
}
const styles = StyleSheet.create({
    input: {
        textAlign:'center',
        height: 43,
        width:325,
        borderColor: '#ccf2ff',
        borderWidth: 2,
        bottom:0,
        top:330,
        fontSize:20,
        fontStyle:'italic',
        left:40,
        // backgroundColor:'#d9d9f2',
        color:'white',
        opacity:0.7,
        borderRadius:30
    },
})