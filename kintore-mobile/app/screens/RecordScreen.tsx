import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function RecordScreen() {
  const { date } = useLocalSearchParams<{ date: string }>();
  const [sets, setSets] = useState([{ weight: '', reps: '', memo: '' }]);

  const addSet = () => setSets([...sets, { weight: '', reps: '', memo: '' }]);
  const handleSave = () => console.log('保存データ:', sets);

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 8 }}>{date}</Text>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16 }}>ベンチプレス</Text>

      {sets.map((set, index) => (
        <View key={index} style={{ marginBottom: 16 }}>
          <Text>セット {index + 1}</Text>
          <TextInput
            placeholder="重量 (kg)"
            keyboardType="numeric"
            value={set.weight}
            onChangeText={(text) => {
              const updated = [...sets];
              updated[index].weight = text;
              setSets(updated);
            }}
            style={{ borderWidth: 1, padding: 6, borderRadius: 4, marginBottom: 6 }}
          />
          <TextInput
            placeholder="回数 (reps)"
            keyboardType="numeric"
            value={set.reps}
            onChangeText={(text) => {
              const updated = [...sets];
              updated[index].reps = text;
              setSets(updated);
            }}
            style={{ borderWidth: 1, padding: 6, borderRadius: 4, marginBottom: 6 }}
          />
          <TextInput
            placeholder="メモ"
            value={set.memo}
            onChangeText={(text) => {
              const updated = [...sets];
              updated[index].memo = text;
              setSets(updated);
            }}
            style={{ borderWidth: 1, padding: 6, borderRadius: 4 }}
          />
        </View>
      ))}

      <Button title="セットを追加" onPress={addSet} />
      <View style={{ marginVertical: 12 }} />
      <Button title="保存" onPress={handleSave} color="#f97316" />
    </ScrollView>
  );
}