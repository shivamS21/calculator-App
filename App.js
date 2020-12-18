import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Platform, Text, View,StyleSheet,TextInput, TouchableOpacity,Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
export default class SwitchExample extends Component{
  constructor(){
    super()
    this.state={
      resultText:"",
      calculationtext:""
    }
    this.oper=['AC','DEL','+','-','*','/']
  }
  Val(text){
    if(this.oper.includes(text.slice(-1))) return true;
    else return false;
  }
  Vali(text){
    if(this.oper.includes(text.slice(-1))) return true;
    else return false;
  }
  calculationresult(){
    let text = this.state.resultText
    if(this.Val(text)){
      text = text.split('');
      text.pop();
      text=text.join('');
    }
    this.setState({
      calculationtext:eval(text) 
    })
    
  }
  buttonPressed(text){
    //console.log(text)
    if(text=='='){
        //console.log(this.state.resultText); 
        this.calculationresult();
    }
    else{
      this.setState({
        resultText: this.state.resultText + text
      })
    }
      
  }
  operate(operation){
      if(operation=='AC'){
        this.setState({
          resultText:'',
          calculationText:''
        })
      }
      else if(operation=='DEL'){
          let text = this.state.resultText.split('');
          text.pop()
          this.setState({
            resultText: text.join('')
          })
      }
      else{
        let text = this.state.resultText
        if(this.Vali(text)){
          text = text.split('');
          text.pop();
          text = text.join('');
        }
        this.setState({ 
          resultText : text + operation
        })
      }
      
    }
  render(){
    let rows=[]
    for(let i=0;i<3;i++){
      let row=[]
      for(let j=0;j<3;j++){
        row.push(
          <TouchableOpacity onPress={()=>this.buttonPressed(3*i+1+j)} style={styles.btn}>
            <Text style={styles.btntext}>{3*i+1+j}</Text>
          </TouchableOpacity>
        );
      }
      rows.push(<View style={styles.row}>{row}</View>);
    }
    let symbrow=[],symb=['.','0','=']
    for(let i=0;i<3;i++){
      symbrow.push(
        <TouchableOpacity onPress={() => this.buttonPressed(symb[i])} style={styles.btn}>
          <Text style={styles.btntext}>{symb[i]}</Text>
        </TouchableOpacity>
      )
    }
    let op=[]
    for(let i=0;i<6;i++){
      op.push(
        <TouchableOpacity onPress={() => this.operate(this.oper[i])} style={styles.btn}>
          <Text style={styles.btntext}>{this.oper[i]}</Text>
        </TouchableOpacity>
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
        <Text style={styles.calculationText}>{this.state.calculationtext}</Text>
        </View>
        <View style={styles.button}>
          <View style={styles.number}>
            {rows}
            <View style={styles.row}>
              {symbrow}
            </View>
          </View>
          <View style={styles.operation}>
              {op}
          </View>
          <View style={styles.blank}></View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({  
  container: {  
      flex: 1
  },
  result: {
    flex: 2,
    backgroundColor:'#F8F8FF',
    alignItems:'flex-end',
    justifyContent:'center'
  },
  resultText:{
    fontSize:30
  },
  calculationText:{
    fontSize:25
  },
  calculation: {  
    flex:1,
    backgroundColor:'#9dd0e1',
    alignItems:'flex-end',
    justifyContent:'center'
  },
  button: {
    flex:6,
    flexDirection:'row'
  },
  number: {
    flex:4,
    backgroundColor:'#262626'
  },
  row:{
    flexDirection:'row',
    flex:1,
    justifyContent:'space-around',
    alignItems:'center'
  },
  operation: {
    flex:1,
    backgroundColor:'#636363',
    justifyContent:'space-around',
    alignItems:'stretch'
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
  optext:{
    fontSize:25,
    color:'white'
  },
  blank:{
    flex:0.3,
    backgroundColor:'green'
  }

});

// const shivam = StyleSheet.create({
//   container: {
//     backgroundColor:'blue',
//     flex:0.3
//   }
// })




