'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

type TrainingLog = {
  id: number;
  date: string;
  exercise: string;
  memo: string;
};

export default function ApitestPage() {
  const [logs, setLogs] = useState<TrainingLog[]>([]);

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

  return (
    <div className='p-4'>
      <h1 className="text-xl font-bold mb-4">トレーニングログ一覧</h1>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            {log.date} - {log.exercise} - {log.memo}
          </li>
        ))}
      </ul>
    </div>
  );
}