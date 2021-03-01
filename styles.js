
import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
container:{
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    flexDirection:'column', 
    backgroundColor:'#ADD8E6'
},
imagepush:{
    flex:0.5,
},
content:{
    flex:0.5,
},
backgroundContainer: {
    position: 'absolute',
    height:200,
    width:200,
    top: 50,
    bottom: 0,
    left: 50,
    right: 0,
},
backdrop: {
    flex:1,
    right:10,
    top:6,
    height:100,
    width:200,
    borderRadius:100
},
overlay: {
    opacity:1,
    right:30,
    top:15,
},
logo: {
    marginTop:62,
    marginLeft:80,
    width: 180,
    height: 180,
    marginBottom:80,
    borderRadius:100,
},
bottomNavigationView: {
    backgroundColor: '#5cd65c',
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
},
btn :{
    flex:1,
    padding:10,
    alignItems:'center',
    alignSelf:'stretch',
    justifyContent:'space-evenly',
    backgroundColor:'black',
    borderRadius:100
},
imgg:{
    width: 200,
    height: 200,
    transform:[{rotate:'45deg'}],
    borderRadius:100
},
intro:{
    fontSize:25,
    marginLeft:30,
   
    // justifyContent: 'center',
    color:'black'
},
prof:{
    fontSize:18,
    // alignContent: 'center',
    // left:15,
    textAlign:'center',
    fontStyle:"italic",
    color:'black'
},
write:{
    flex:0.5,
    marginTop:50,
},
decagon:{
    height:200,
    width:200,
    borderRadius:100,
    transform: [{rotate: '315deg'}],
    overflow: 'hidden',
    alignItems: 'center',
    position: 'relative',
    margin: 10
},
btn :{
    flex:1,
    alignItems:'center',
    alignSelf:'stretch',
    justifyContent:'center'
},
btntext:{
    fontSize:28,
    color:'white'
},
link:{
    position:'absolute',
    marginTop:135,
    marginLeft:155,
    justifyContent:'space-evenly',
    alignItems:'stretch',
},
tt:{
    fontSize:40,
    color:'yellow',
    fontWeight:'bold'
},
loading:{
    fontSize:20,
    textAlign:'center',
    justifyContent:'center',
},
error:{
    fontSize:20,
    textAlign:'center',
    justifyContent:'center',
},
})

module.exports = styles;