'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

// TrainingLog型
type TrainingLog = {
  id: number;
  date: string;
  exercise: string;
};

type TrainingSet = {
  id: number;
  training_log: number;
  sets: number;
  weight: number;
  reps: number;
  memo: string;
};

export default function ApiTestPage() {
  const [logs, setLogs] = useState<TrainingLog[]>([]);
  const [date, setDate] = useState('');
  const [exercise, setExercise] = useState('');
  const [editId, setEditId] = useState<number | null>(null);
  const [setsMap, setSetsMap] = useState<Record<number, TrainingSet[]>>({});
  const [setWeightMap, setSetWeightMap] = useState<Record<number, number>>({});
  const [setRepsMap, setSetRepsMap] = useState<Record<number, number>>({});
  const [setMemoMap, setSetMemoMap] = useState<Record<number, string>>({});

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/trainings/')
      .then((res) => setLogs(res.data))
      .catch((err) => console.error('ログ取得エラー:', err));
  }, []);

  const fetchAllSets = async () => {
    const newSetsMap: Record<number, TrainingSet[]> = {};
    await Promise.all(
      logs.map(async (log) => {
        try {
          const res = await axios.get(
            `http://127.0.0.1:8000/api/trainingsets/?training_log=${log.id}`
          );
          newSetsMap[log.id] = res.data;
        } catch {
          newSetsMap[log.id] = [];
        }
      })
    );
    setSetsMap(newSetsMap);
  };

  useEffect(() => {
    if (logs.length > 0) fetchAllSets();
  }, [logs]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/trainings/', {
        date,
        exercise,
      });
      setLogs([...logs, res.data]);
      setDate('');
      setExercise('');
    } catch (err) {
      console.error("POSTエラー:", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/trainings/${id}/`);
      setLogs((prev) => prev.filter((log) => log.id !== id));
    } catch (err) {
      console.error('削除エラー:', err);
    }
  };

  const handleEdit = (log: TrainingLog) => {
    console.log("🔧 編集対象ログ:", log);
    setEditId(log.id);
    setDate(log.date);
    setExercise(log.exercise);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🚀 handleUpdate発火! editId:", editId);
    if (editId === null) return;

    try {
      const res = await axios.put(`http://127.0.0.1:8000/api/trainings/${editId}/`, {
        date,
        exercise,
      });

      setLogs((prev) =>
        prev.map((log) => (log.id === editId ? res.data : log))
      );

      setEditId(null);
      setDate('');
      setExercise('');
    } catch (err) {
      console.error("PUTエラー:", err);
    }
  };

  const handleSetSubmit = async (e: React.FormEvent, logId: number) => {
    e.preventDefault();

    const currentSets = setsMap[logId] || [];
    const nextSetNumber = currentSets.length + 1;

    const weight = setWeightMap[logId];
    const reps = setRepsMap[logId];
    const memo = setMemoMap[logId] || '';

    if (!weight || !reps) {
      alert("重量と回数を入力してください！");
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/api/trainingsets/', {
        training_log: logId,
        sets: nextSetNumber,
        weight,
        reps,
        memo,
      });

      await fetchAllSets();

    } catch (err) {
      console.error("セット追加エラー:", err);
    }

    setSetWeightMap((prev) => ({ ...prev, [logId]: 0 }));
    setSetRepsMap((prev) => ({ ...prev, [logId]: 0 }));
    setSetMemoMap((prev) => ({ ...prev, [logId]: '' }));
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">トレーニングログ一覧</h1>

      <div className="mb-8 space-y-4">
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
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log("🧪 フォーム送信発火 editId:", editId);
            if (editId === null) {
              handleSubmit(e);
            } else {
              handleUpdate(e);
            }
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editId === null ? '登録する' : '更新する'}
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">登録済みログ</h2>
      <ul className="space-y-4">
        {logs.map((log) => (
          <li key={log.id} className="border-b pb-4">
            <div className="flex justify-between items-center mb-1">
              <span>{log.date} - {log.exercise}</span>
              <div>
                <button
                  onClick={() => handleDelete(log.id)}
                  className="text-red-500 mr-2 hover:underline"
                >🗑️削除</button>
                <button
                  onClick={() => handleEdit(log)}
                  className="text-green-600 hover:underline"
                >✏️編集</button>
              </div>
            </div>

            {setsMap[log.id]?.length > 0 && (
              <ul className="pl-4 text-sm text-gray-600 list-disc">
                {[...setsMap[log.id]].reverse().map((set) => (
                  <li key={set.id}>
                    {set.weight}kg × {set.reps}回（{set.sets}セット目）
                    {set.memo && <> - {set.memo}</>}
                  </li>
                ))}
              </ul>
            )}

            <form
              key={`form-${log.id}`}
              onSubmit={(e) => handleSetSubmit(e, log.id)}
              className="mt-2 flex flex-wrap gap-2"
            >
              <input
                key={`weight-${log.id}`}
                type="number"
                placeholder="重量"
                className="p-1 border rounded w-24"
                value={setWeightMap[log.id] || ''}
                onChange={(e) =>
                  setSetWeightMap((prev) => ({
                    ...prev,
                    [log.id]: Number(e.target.value),
                  }))
                }
              />
              <input
                key={`reps-${log.id}`}
                type="number"
                placeholder="回数"
                className="p-1 border rounded w-20"
                value={setRepsMap[log.id] || ''}
                onChange={(e) =>
                  setSetRepsMap((prev) => ({
                    ...prev,
                    [log.id]: Number(e.target.value),
                  }))
                }
              />
              <input
                type="text"
                placeholder="メモ（任意）"
                className="p-1 border rounded w-48"
                value={setMemoMap[log.id] || ''}
                onChange={(e) =>
                  setSetMemoMap((prev) => ({
                    ...prev,
                    [log.id]: e.target.value,
                  }))
                }
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-2 py-1 rounded"
              >
                追加
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}