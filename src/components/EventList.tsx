// イベントリスト表示・編集・削除コンポーネント
import type { Event } from "../types/Event";

/**
 * イベントリスト表示・編集・削除
 * @param events イベント配列
 * @param onEdit 編集ボタン押下時のコールバック
 * @param onDelete 削除ボタン押下時のコールバック
 */
export default function EventList({
    events,
    onEdit,
    onDelete,
}: {
    events: Event[];
    onEdit: (event: Event) => void;
    onDelete: (id: string) => void;
}) {
    // 残り日数計算
    const calcDaysLeft = (targetDate: string) => {
        const today = new Date();
        const target = new Date(targetDate);
        const diff = Math.ceil((target.getTime() - today.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24));
        return diff;
    };

    return (
        <ul className="flex flex-col gap-2 w-full max-w-md">
            {events.length === 0 && <li>イベントがありません</li>}
            {events.map(event => (
                <li key={event.id} className="border rounded p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                        <div className="font-bold">{event.title}</div>
                        <div>目標日: {event.targetDate}（残り{calcDaysLeft(event.targetDate)}日）</div>
                    </div>
                    <div className="flex gap-2">
                        <button className="bg-green-600 text-white px-2 py-1 rounded" onClick={() => onEdit(event)}>
                            編集
                        </button>
                        <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => onDelete(event.id)}>
                            削除
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
