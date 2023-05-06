import SortingButton from "./SortingButton";
import React, {useEffect, useState} from 'react';


export default function Sorting({nbItems}: {nbItems: number}) {
    const generateArray = (nbItems: number): number[] => {
        const array = [];
        for (let i = 0; i < nbItems; i++) {
            array.push(Math.floor(Math.random() * 100));
        }
        return array;
    }

    const bubbleSort = async (array: number[], speed: number) => {
        const n = array.length;
        let i, j, temp;
        let selected: number[] = [], moving: number[] = [], sorted: number[] = [];
        for (i = 0; i < n - 1; i++) {
            for (j = 0; j < n - i - 1; j++) {
                selected = [j, j + 1];
                if (array[j] > array[j + 1]) {
                    temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                    moving = [j, j + 1];
                } else {
                    moving = [];
                }
                if (j === n - i - 2) {
                    sorted.push(j + 1)
                }
                setSelected(selected);
                setMoving(moving);
                setArray([...array]);
                setSorted(sorted);
                setCurrentStep(currentStep => currentStep + 1)
                await new Promise(resolve => setTimeout(resolve, speed));
            }
        }
        setSorting(false)
    }

    const [array, setArray] = useState<number[]>(generateArray(nbItems));
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [selected, setSelected] = useState<number[]>([]);
    const [moving, setMoving] = useState<number[]>([]);
    const [sorting, setSorting] = useState<boolean>(false);
    const [sorted, setSorted] = useState<number[]>([]);
    const [speed, setSpeed] = useState<number>(100);

    useEffect(() => {
        if (sorting) {
            bubbleSort(array, speed).then(r => console.log('Finished'))
        }
    }, [sorting]);

    return (
        <div>
            <div className="flex">
                <SortingButton name="Bubble sort" onClick={() => setSorting(true)} disabled={sorting}/>
            </div>
            <div className="flex items-center mb-4 gap-4">
                <button
                    className="bg-red-400 enabled:hover:bg-red-500 py-2 px-4 rounded disabled:opacity-50"
                    onClick={() => setSpeed(speed => speed + 100)}
                    disabled={sorting}
                >🐌</button>
                <span>
                    {speed } ms
                </span>
                <button
                    className="bg-green-400 enabled:hover:bg-green-500 py-2 px-4 rounded disabled:opacity-50"
                    onClick={() => setSpeed(speed => speed - 100 < 0 ? 0 : speed - 100)}
                    disabled={sorting}
                >🐆</button>
            </div>
            <div className="flex gap-2">
                {array.map((item, index) => (
                    <div
                        key={index}
                        className={`bg-blue-800 text-white font-bold py-2 px-4 rounded 
                        ${sorted.includes(index) ? 'bg-gray-400' : ''}
                        ${selected.includes(index) ? 'bg-green-800' : ''} 
                        ${moving.includes(index) ? 'bg-yellow-600' : ''}
                        `}
                        style={{height: `${item * 4 + 32}px`}}
                    >
                        {item}
                    </div>
                ))}
            </div>
            <div className="mt-4">
                Nb étapes : {currentStep}
            </div>
        </div>
    )}
