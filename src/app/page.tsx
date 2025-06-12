'use client';

import { useState, useEffect } from "react";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import type { Event } from "../types/Event";

/**
 * UUIDを生成する関数（crypto.randomUUIDがあればそれを使い、なければ代替）
 */
function getUUID() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // fallback
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * イベントリストをローカルストレージと同期しつつ管理するカスタムフック
 */
function useEventList() {
  const [events, setEvents] = useState<Event[]>([]);

  // 初回マウント時にローカルストレージから復元
  useEffect(() => {
    const data = localStorage.getItem("events");
    if (data) setEvents(JSON.parse(data));
  }, []);

  // 変更時にローカルストレージへ保存
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  // イベント追加
  const addEvent = (event: Omit<Event, "id">) => {
    setEvents((prev) => [
      ...prev,
      { ...event, id: getUUID() },
    ]);
  };

  // イベント編集
  const updateEvent = (id: string, event: Omit<Event, "id">) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...event, id } : e))
    );
  };

  // イベント削除
  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  return { events, addEvent, updateEvent, deleteEvent };
}

/**
 * Homeコンポーネント: イベント管理のトップページ
 */
export default function Home() {
  const { events, addEvent, updateEvent, deleteEvent } = useEventList();
  const [editing, setEditing] = useState<Event | null>(null);

  return (
    <div className="flex flex-col items-center min-h-screen p-8 gap-8">
      <h1 className="text-2xl font-bold mb-4">イベント残り日数カウント</h1>
      <EventForm
        onSubmit={editing ? (data) => {
          updateEvent(editing.id, data);
          setEditing(null);
        } : addEvent}
        editingEvent={editing}
        onCancel={() => setEditing(null)}
      />
      <EventList
        events={events}
        onEdit={setEditing}
        onDelete={deleteEvent}
      />
    </div>
  );
}
