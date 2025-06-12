import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import * as Font from 'expo-font';
import { Calendar } from 'react-native-calendars';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const router = useRouter();

  useEffect(() => {
    Font.loadAsync({
      'Bungee': require('../../assets/fonts/Bungee/Bungee-Regular.ttf')
    }).then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) return <Text>Loading...</Text>;

  const togglePart = (part: string) => {
    setSelectedParts(prev => prev.includes(part)
      ? prev.filter(p => p !== part)
      : [...prev, part]);
  };

  return (
    <View style={{ flex:1, justifyContent: 'center', alignItems: 'center', padding:16 }}>
      <Text style={{ fontFamily: 'Bungee', fontSize: 32, color: '#f97316', textShadowColor: '#000', textShadowOffset: {width:2, height:3}, textShadowRadius: 1, marginBottom: 24 }}>Workout App</Text>

      <Calendar
        current={today}
        markedDates={{ [selectedDate]: { selected: true, selectedColor: '#f97316' } }}
        onDayPress={(day) => setSelectedDate(day.dateString)}
      />

      <Image source={require('../../assets/images/avater.png')} style={{ width: 100, height: 100, borderRadius: 50, marginBottom:12 }} />

      <Text style={{ fontSize:18, fontWeight: 'bold', marginBottom: 24 }}>JUNYA</Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 24 }}>
        {['脚','背中','腕','肩','腹'].map(part => (
          <Text
            key={part}
            onPress={() => togglePart(part)}
            style={{ paddingVertical: 8, paddingHorizontal: 16, margin: 6, borderRadius: 20, borderWidth: 1, borderColor: selectedParts.includes(part) ? '#f97316' : '#ccc', backgroundColor: selectedParts.includes(part) ? '#f97316' : '#fff', color: selectedParts.includes(part) ? '#fff' : '#000' }}
          >
            {part}
          </Text>
        ))}
      </View>

      <Button title="本日のトレーニングを追加" onPress={() => router.push({ pathname: '/Record', params: { date: selectedDate } })} color="#f97316" />
    </View>
  );
}
