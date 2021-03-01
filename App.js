import 'react-native-gesture-handler';
import React, { Component,useState,useEffect } from 'react';
import { SafeAreaView,View,TextInput, Text,Button,StyleSheet,Image,TouchableOpacity,Alert,ScrollView,StatusBar,Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer,NavigationActions } from 'react-navigation';
import { BottomSheet } from 'react-native-btr';
import styles from './styles';
import Splash from './Splash';
import Profile from './profile';
import ImagePicker from 'react-native-image-picker';
import { ApolloClient, InMemoryCache, HttpLink,gql,ApolloProvider,graphql,useQuery,useMutation } from '@apollo/client';
import fetch from 'cross-fetch';
import DialogInput from 'react-native-dialog-input';
let filePath={},personName = "Shivam Sharma",occup="Competitive Programming Enthusiast";

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://192.168.43.174:4000/graphql', fetch }),
  cache: new InMemoryCache()
});
const GET_USER_DETAILS = gql`
 query {
   getUserDetails(id:"1") {
     id
     name
     bio
     photo
   },
 }
`;
const UPDATE_USER_DP = gql`
  mutation {
    addProfilePicture(id:"1",photo:"Shivam_Sharma"){
      id
      photo
    }
  }
`;
// const GET_USER_DETAILS = gql`
//  query ($userId: String!) {
//    getUserDetails(id: $userId) {
//      name
//      bio
//    }
//  }
// `;


// const UPDATE_USER_DP = gql`
//   mutation addProfilePicture($id:String!,$photo:String!){
//     addProfilePicture(id:$id,photo:$photo){
//       id
//       photo
//     }
//   }
// `;

function HomeScreen({navigation}){
  const [visible, setVisible] = useState(false);
  const [filepath,setFilepath] = useState({});
  const [prompt,setPrompt] = useState(false);
  const [funcval,setFuncval] = useState('1');
  const {loading,error,data} = useQuery( GET_USER_DETAILS,{
    variables:{id:funcval},
  });
  const [changeDP,{loadingdp,errordp}] = useMutation(UPDATE_USER_DP);
  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };
  const multitask =() =>{
    toggleBottomNavigationView();
    navigation.push('splash');
  };
  const removedp = () =>{
    setFilepath({});
    toggleBottomNavigationView();
    filePath=filepath;
  };
  const findbyid= () => {
    setPrompt(true);
    toggleBottomNavigationView();
  };
  const chooseFile = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option'
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log(
          'User tapped custom button: ',
          response.customButton
        );
        alert(response.customButton);
      } else {
        setFilepath(response);
        filePath = response;
      }
    });
    toggleBottomNavigationView();
  };
  if(loadingdp){
    console.log('Mutation loading')
    return <Text style={styles.loading}>Mutation Loading...</Text>
  }
  if(errordp){
    console.log('Mutation error')
    return <Text style={styles.error}>Mutation Error...</Text>
  }
  if (loading)  return <Text style={styles.loading}>Loading...</Text>;
  if (error) return <Text style={styles.error}>Error...</Text>;
  if(data){
    console.log(data);
    if(data.getUserDetails.name != personName){
      personName = data.getUserDetails.name
    }
    if(data.getUserDetails.bio != occup){
      occup = data.getUserDetails.bio
    }
    if(data.getUserDetails.photo != filepath){
      console.log(data.getUserDetails.photo);
      changeDP({variables: {id: data.getUserDetails.id,photo:filepath}}).then(console.log("Img inserted in DB, ",filepath));
      console.log(data.getUserDetails.photo);
    }
    // }
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.imagepush}>
          <View style = {styles.backgroundContainer}>
            <Image source = {require('./images/circle5.png')} resizeMode = 'cover' style = {styles.backdrop} />
          </View>
          <View style={styles.overlay}> 
            <TouchableOpacity onPress={toggleBottomNavigationView} style={styles.btn}>
              <Image style={styles.logo} source={{uri: 'data:image/jpeg;base64,' + filepath.data}} />
            </TouchableOpacity>
            <BottomSheet visible={visible} onBackButtonPress={toggleBottomNavigationView} onBackdropPress={toggleBottomNavigationView} >
              <View style={styles.bottomNavigationView}>
                <View style={{flex:1,flexDirection:'column',justifyContent:'space-between',bottom:10}}>
                  <Text style={{padding:8,fontSize:20,top:15,color:'white',textAlign:'center'}}>------------------------</Text>
                  <Button onPress={multitask} title='Add Story' color='#006600' />
                  <Button onPress={chooseFile} title='Upload profile pic' color='#006600' />
                  <Button onPress={removedp} title='Remove profile pic' color='#006600' />
                  <Button onPress={findbyid} title='Choose-Id' color='#006600' />
                  
                </View>
              </View>
            </BottomSheet>
            <DialogInput isDialogVisible={prompt}
              title={"Enter UserID"}
              hintInput ={"Write 1 or 2 or 3"}
              submitInput={ (inputText) => {setFuncval(inputText),setPrompt(false)} }
              closeDialog={ () => {setPrompt(false)}}>
            </DialogInput>
          </View>
        </View>
        <View style={styles.write}> 
          <Text style={styles.intro}>{personName}</Text>
          <Text style={styles.prof}>{occup}</Text>
        </View>
      </SafeAreaView>
     
    );
  }
}

function ScreenWithStory({route,navigation}){
  const [visible, setVisible] = useState(false);
  const [path,setPath] = useState(filePath);
  const [circle,setCircle] = useState(require('./images/circle2.png'));
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.imagepush}>
          <View style = {styles.backgroundContainer}>
            <Image source = {circle} resizeMode = 'cover' style = {styles.backdrop} />
          </View>
          <View style={styles.overlay}> 
            <TouchableOpacity onPress={() => [navigation.navigate('profile',{paramKey:route.params.paramKey}),setCircle(require('./images/circle4.png'))]} style={styles.btn}>
              <Image style={styles.logo} source={{uri: 'data:image/jpeg;base64,' + path.data}} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.write}> 
          <Text style={styles.intro}>{personName}</Text>
          <Text style={styles.prof}>{occup}</Text>
        </View>
      </SafeAreaView>
    );
  // }
}
const Stack = createStackNavigator();

function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer header="NULL">
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="profile" component={Profile} options={{ headerShown: false }}/>
          <Stack.Screen name="splash" component={Splash} options={{ headerShown: false }}/>
          <Stack.Screen name="story" component={ScreenWithStory} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
export default App;