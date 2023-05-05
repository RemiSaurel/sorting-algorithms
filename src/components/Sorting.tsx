import SortingButton from "./SortingButton";
import React, { useState } from 'react';

export default function Sorting({nbItems}: {nbItems: number}) {
    const generateArray = (nbItems: number): number[] => {
        const array = [];
        for (let i = 0; i < nbItems; i++) {
            array.push(Math.floor(Math.random() * 100));
        }
        return array;
    }

    const bubbleSort = async (array: number[]) => {
        setSorting(true)
        const n = array.length;
        let i, j, temp;
        let selected = [], moving: number[] = [];
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
                setArray([...array]);
                setSelected(selected);
                setMoving(moving);
                setCurrentStep(currentStep + 1);
                await new Promise(resolve => setTimeout(resolve, 200));
            }
        }
        setSorting(false)
    }

    const [array, setArray] = useState<number[]>(generateArray(nbItems));
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [selected, setSelected] = useState<number[]>([]);
    const [moving, setMoving] = useState<number[]>([]);
    const [sorting, setSorting] = useState<boolean>(false);

    return (
        <div>
            <div className="flex">
                <SortingButton name="Bubble sort" onClick={() => bubbleSort(array)} disabled={sorting}/>
            </div>
            <div className="flex gap-2">
                {array.map((item, index) => (
                    <div
                        key={index}
                        className={`bg-cyan-700 text-white font-bold py-2 px-4 rounded ${selected.includes(index) ? 'bg-green-600' : ''} ${moving.includes(index) ? 'bg-yellow-400' : ''}`}
                        style={{height: `${item * 4 + 32}px`}}
                    >
                        {item}
                    </div>
                ))}
            </div>
            <div>
                Current Step: {currentStep}
            </div>
        </div>
    );
}
