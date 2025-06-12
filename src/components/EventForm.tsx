// イベント追加・編集フォームコンポーネント
// props: onSubmit, editingEvent, onCancel
import { useState, useEffect } from "react";
import type { Event } from "../types/Event";

/**
 * イベント追加・編集フォーム
 * @param onSubmit 追加・更新時のコールバック
 * @param editingEvent 編集対象イベント（新規時はnull）
 * @param onCancel キャンセル時のコールバック
 */
export default function EventForm({
    onSubmit,
    editingEvent,
    onCancel,
}: {
    onSubmit: (event: Omit<Event, "id">) => void;
    editingEvent?: Event | null;
    onCancel?: () => void;
}) {
    const [title, setTitle] = useState("");
    const [targetDate, setTargetDate] = useState("");

    useEffect(() => {
        if (editingEvent) {
            setTitle(editingEvent.title);
            setTargetDate(editingEvent.targetDate);
        } else {
            setTitle("");
            setTargetDate("");
        }
    }, [editingEvent]);

    return (
        <form
            className="flex flex-col gap-2 w-full max-w-xs"
            onSubmit={e => {
                e.preventDefault();
                if (!title || !targetDate) return;
                onSubmit({ title, targetDate });
                setTitle("");
                setTargetDate("");
            }}
        >
            <label className="font-bold">イベント名</label>
            <input
                className="border rounded px-2 py-1"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
            />
            <label className="font-bold">目標日</label>
            <input
                className="border rounded px-2 py-1"
                type="date"
                value={targetDate}
                onChange={e => setTargetDate(e.target.value)}
                required
            />
            <div className="flex gap-2 mt-2">
                <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">
                    {editingEvent ? "更新" : "追加"}
                </button>
                {editingEvent && onCancel && (
                    <button type="button" className="bg-gray-400 text-white px-3 py-1 rounded" onClick={onCancel}>
                        キャンセル
                    </button>
                )}
            </div>
        </form>
    );
}
