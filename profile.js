import 'react-native-gesture-handler';
import React, { Component,useState,useEffect,useRef } from 'react';
import { Animated ,View, Text,TextInput,StyleSheet,Image, ImageBackground,Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer,NavigationActions } from 'react-navigation';
function useInterval(callback, delay) {
  const savedCallback = useRef();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function Splash({navigation,route}){
  let animation = useRef(new Animated.Value(0));
  const [progress, setProgress] = useState(0);
  useInterval(() => {
    if(progress < 100) {
      setProgress((progress + 1));
    }
  }, 50);

  useEffect(() => { 
    if(progress >= 100){
      navigation.goBack();
      return;
    }
    Animated.timing(animation.current, {
      toValue: progress,
      duration: 1,
      useNativeDriver: false, // Add This line
    }).start();
  },[navigation,progress])

  const width = animation.current.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp"
  })
  return (
      <View style={{flex:1,backgroundColor:'#e6ffff',justifyContent:'center',alignItems:'center'}}>
          <ImageBackground source={require('./images/ff.jpg')} resizeMode = 'cover' style={{width:'100%', height:'100%',flex:1,flexDirection:'column'}}>
            <View style={styles.progressBar}>
                <Animated.View style={[styles.inner, {width}]}/>
            </View>
            <Text style={styles.input}>{route.params.paramKey}</Text>
          </ImageBackground>
          
      </View>
  );
}
const styles = StyleSheet.create({
    progressBar:{
        height: 5,
        width: '95%',
        left:15,
        backgroundColor: '#437070',
        borderColor: '#000',
        top:30,
        borderRadius: 5
    },inner:{  
      width: "100%",  
      height: 5,  
      borderRadius: 5,  
      backgroundColor:"white",  
    },
    input:{
      fontSize:28,
      fontStyle:'italic',
      bottom:50,
      alignContent:'center',
      color:'#80ffff',
      position:'absolute',
      left:110,
      borderBottomWidth:1,
      borderColor:'#bfbfbf',
      borderRadius:10
    } 
})
export default Splash;