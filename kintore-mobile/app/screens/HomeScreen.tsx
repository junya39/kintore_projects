import React, { useEffect, useState } from 'react';
import { View, Image, Text as RNText, useColorScheme } from 'react-native';
import * as Font from 'expo-font';
import { Calendar } from 'react-native-calendars';
import { useRouter } from 'expo-router';
import { Button, Text } from 'react-native-paper';

export default function HomeScreen() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  useEffect(() => {
    Font.loadAsync({
      Bungee: require('../../assets/fonts/Bungee/Bungee-Regular.ttf'),
    }).then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) return <Text>Loading...</Text>;

  return (
    <View className="flex-1 bg-white p-4">
      {/* タイトル */}
      <View className="w-full items-center mb-6">
        <Text
          variant="headlineLarge"
          className="text-4xl text-orange-500 text-center"
          style={{ fontFamily: 'Bungee' }}
        >
          Workout App
        </Text>
      </View>

      {/* アバターと名前（横並び） */}
      <View className="flex-row items-center mb-6 bg-white px-2 py-2 rounded-lg">
        <Image
          source={require('../../assets/images/avater.png')}
          style={{ width: 80, height: 80, borderRadius: 40 }}
        />
        <View className="ml-4">
          <RNText style={{
            marginLeft: 16,
            fontSize: 20,
            fontWeight: 'bold',
            color: isDarkMode ? '#FFF':'#000',
            }}
          >
            JUNYA
          </RNText>
        </View>
      </View>

      {/* カレンダー */}
      <Calendar
        current={today}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: '#f97316',
          },
        }}
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
          router.push({
            pathname: '/Record',
            params: { date: day.dateString },
          });
        }}
      />

      {/* ボタン */}
      <Button
        mode="contained"
        onPress={() =>
          router.push({
            pathname: '/Record',
            params: { date: selectedDate },
          })
        }
        className="mt-8 bg-orange-500 rounded-full px-6 py-2"
        labelStyle={{ fontSize: 16 }}
      >
        本日のトレーニングを追加
      </Button>
    </View>
  );
}
