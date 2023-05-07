import React from "react";

interface Props {
    sorting: boolean;
    speed: number;
    setSpeed: (speed: number) => void;
    nbItems: number;
    setNbItems: (nbItems: number) => void;
}

export default function SortingSettings({ sorting, speed, setSpeed, nbItems, setNbItems }: Props) {
    return (
        <div className="flex gap-4 items-center">
            <label htmlFor="nbItems">Taille</label>
            <input type="range" min="10" max="200" value={nbItems}
                   onChange={(e) =>
                       setNbItems(parseInt(e.target.value))}
                   disabled={sorting}
                   name="nbItems"
            />
            <button
                className="bg-gray-600 text-white enabled:hover:bg-gray-700 py-1 px-4 rounded disabled:opacity-50"
                onClick={() =>
                    setSpeed(speed - 100 < 0 ? 0 : speed - 100)
                }
                disabled={sorting}
            >
                Accélerer
            </button>
            <span className="text-lg">{speed} ms</span>
            <button
                className="bg-gray-600 text-white enabled:hover:bg-gray-700 py-1 px-4 rounded disabled:opacity-50"
                onClick={() => setSpeed(speed + 100)}
                disabled={sorting}
            >
                Ralentir
            </button>
        </div>
    );
}
