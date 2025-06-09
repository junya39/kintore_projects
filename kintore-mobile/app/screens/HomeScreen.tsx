import React , {useEffect, useState} from 'react';
import {View, Text, Button, Image} from 'react-native';
import * as Font from 'expo-font';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {useRouter } from 'expo-router';


type RootStackParamList = {
  Home: undefined;
  Record: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [fontLoaded, setFontLoaded] = useState(false);
  const [count, setCount] = useState(0);
  const [selectedParts, setSelectedParts] = useState<string[]>([]);

  const bodyParts = ['脚','背中','腕','肩','腹'];
  const today = new Date().toISOString().split('T')[0];
  
  const router = useRouter();

  useEffect(() => {
    Font.loadAsync({
      'Bungee': require('../../assets/fonts/Bungee/Bungee-Regular.ttf')
    }).then(() => setFontLoaded(true));
  }, []);

  const togglePart = (part: string) => {
    if (selectedParts.includes(part)) {
      setSelectedParts(selectedParts.filter(p => p !== part));
    } else {
      setSelectedParts([...selectedParts, part]);
    }
  };

  if (!fontLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' , padding:16 }}>
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

      <Calendar
        current={today}
        markedDates={{
          [today]: { selected: true, selectedColor: '#f97316' },
        }}
        style={{ marginBottom:24, borderRadius:10 }}
      />

      <Image source={require('../../assets/images/avater.png')}
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          marginBottom:12,
        }}
      />

      <Text style={{ fontSize:18, fontWeight: 'bold', marginBottom: 24}}>
        JUNYA
      </Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 24}}>
        {bodyParts.map((part) => (
          <Text
            key={part}
            onPress={() =>togglePart(part)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 16,
              margin: 6,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: selectedParts.includes(part) ? '#f97316' : '#ccc',
              backgroundColor: selectedParts.includes(part) ? '#f97316' : '#fff',
              color: selectedParts.includes(part) ? '#fff' : '#000',
            }}
          >
            {part}
          </Text>
        ))}
      </View>

      <Button
        title="本日のトレーニングを追加"
        onPress={() => router.push('/screens/RecordScreen')}
      />
    </View>
  );
}
