import React from 'react';
import { View, Text, Image } from 'react-native';

const AboutScreen = () => {
  return (
    <View style={{flex: 1, padding: 24}}>
      <Image 
        source={require('../../assets/foto.png')} 
        style={{width: 100, height: 100}}
      />
      <Text>Nama: Ukhti Zahra Isyana</Text>
      <Text>NIM: 2410501130</Text>
      <Text>Kelas: A</Text>
      <Text>Tema: ResepKita</Text>
      <Text>Credit API: TheMealDB (www.themealdb.com)</Text>
    </View>
  );
};

export default AboutScreen;