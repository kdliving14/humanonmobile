import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { TextInput, Switch, StyleSheet, Text, ScrollView, TouchableOpacity, ImageBackground} from 'react-native';
import Humanon from './Humanon';

export default function Extras() {
  const [count, setCount] = React.useState(0);
  const [text, onChangeText] = React.useState("")

  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  let switchColor = isEnabled ? '#FFDD00' : '#000000'

  const image = {uri: "https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000"}

  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <Text style={styles.text}>Click # {count}</Text>
      <TouchableOpacity style={styles.button} onPress={()=>setCount(count+1)}>
        <Text style={styles.text}>CLICK!</Text>
        </TouchableOpacity>
        
        <TextInput 
          editable
          multiline
          numberOfLines={4}
          // maxLength={40}
          label = "Text Input"
          onChangeText={text => onChangeText(text)}
          style={{padding:10, borderWidth:1}}
          value={text}/>
        <Switch
          trackColor={{false: '#000000', true: '#11FF00'}}
          thumbColor={{switchColor}}
          ios_backgroundColor="#FF0000"
          onValueChange={toggleSwitch}
          value={isEnabled}
          />
        <StatusBar style="auto" />
      </ImageBackground>
      <Humanon/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 10,
    margin: 10, 
    borderRadius: 10
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    // letterSpacing: 0.25,
    color: 'white',
  },
  image: {
    flex: 1,
    justifyContent:"center",
    alignItems: 'center'
  },
  // input: {
  //   height: 40,
  //   padding: 10,
  //   margin: 12,
  //   borderWidth: 1,
  // },
  
});

//Alert.alert("Button Clicked!") //! Alerts