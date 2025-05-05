'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

type TrainingLog = {
  id: number;
  date: string;
  exercise: string;
  memo: string;
};

export default function ApiTestPage() {
  const [logs, setLogs] = useState<TrainingLog[]>([]);
  const [date, setDate] = useState('');
  const [exercise, setExercise] = useState('');
  const [memo, setMemo] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/trainings/')
    .then((res) => {
      console.log("取得したデータ:", res.data);
      setLogs(res.data);
    })
    .catch((err) => {
      console.error('エラー:', err);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/trainings/', {
        date,
        exercise,
        memo,
      });
      console.log("追加成功:", res.data);
      setLogs([...logs, res.data]);
      setDate('');
      setExercise('');
      setMemo('');
    } catch (err) {
      console.error("POSTエラー:", err);
    }
  };

  return (
    <div className='p-8 max-w-xl mx-auto'>
      <h1 className="text-2xl font-bold mb-6">トレーニングログ一覧</h1>

      {/* 登録フォーム */}
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <input 
              type="date"
              className="w-full p-2 border rounded"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
          />
          <input
              type="text"
              placeholder="種目(例ベンチプレス)"
              className="w-full p-2 border rounded"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              required
          />
          <textarea
              placeholder="メモ(任意)"
              className="w-full p-2 border rounded"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
          />
          <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            登録する
          </button>
      </form>

      {/* 一覧表示 */}
      <h2 className="text-xl font-semibold mb-2">登録済みログ</h2>
      <ul className="space-y-2">
        {logs.map((log) => (
          <li key={log.id} className="border p-2 rounded">
            {log.date} - {log.exercise} {log.memo && `- ${log.memo}`}
          </li>
        ))}
      </ul>
    </div>
  );
}