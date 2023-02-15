import React from 'react';
import { StyleSheet, View, ImageBackground} from 'react-native';
import Humanon from './Humanon';

export default function App() {

  const image = {uri: "https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000"}

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Humanon/>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent:"center",
    alignItems: 'center'
  }, 
});