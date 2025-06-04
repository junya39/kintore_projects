import React , {useEffect, useState} from 'react';
import {View, Text, Button, Image} from 'react-native';
import * as Font from 'expo-font';

export default function HomeScreen() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    Font.loadAsync({
      'Bungee': require('../../assets/fonts/Bungee/Bungee-Regular.ttf')
    }).then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex:1, justifyContent: 'center',
      alignItems: 'center' , padding:16}}>
        <Text style={{
          fontFamily: 'Bungee',
          fontSize: 32,
          color: '#f97316',
          textShadowColor: '#000',
          textShadowOffset: {width:2, height:3},
          textShadowRadius: 1,
          marginBottom: 24
        }}>
          Workout App
        </Text>

        {/* アバター画像 */}
        <Image source={require('../../assets/images/avater.png')}
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          marginBottom:12,
        }}
        />

        {/* ユーザー名 */}
        <Text style={{ fontSize:18, fontWeight: 'bold', marginBottom: 24}}>
          JUNYA
        </Text>

        {/* ボタンとカウント表示を追加 */}
        <Button title={`+１回目`} onPress={() => setCount(count + 1)} />
        <Text style={{ marginTop:16, fontSize: 18}}>現在の回数:{count}</Text>
    </View>
  );
}