import SortingButton from "./SortingButton";
import React, {useEffect, useState} from 'react';
import NbSteps from "./NbSteps";
import {generateArray} from "../utils/arrayGenerator";
import GenerateArrayButton from "./GenerateArrayButton";
import SortingSettings from "./SortingSettings";
import {bubbleSort, insertionSort, mergeSort, quickSort, selectionSort} from "../utils/sortingFunctions";
import { SortStateDispatch} from "../types/types";

const sortAlgorithm = [
    'Bubble',
    'Insertion',
    'Selection',
    'Merge',
    'Quick',
]

const MIN_NB_ITEMS = 10;
const MAX_NB_ITEMS = 200;

export default function Sorting() {
    const [nbItems, setNbItems] = useState<number>(10);
    const [array, setArray] = useState<number[]>(generateArray(nbItems));
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [selected, setSelected] = useState<number[]>([]);
    const [moving, setMoving] = useState<number[]>([]);
    const [sorting, setSorting] = useState<boolean>(false);
    const [sorted, setSorted] = useState<number[]>([]);
    const [speed, setSpeed] = useState<number>(100);
    const [algorithm, setAlgorithm] = useState<string>('');

    const sortStateDispatch: SortStateDispatch = {
        setCurrentStep,
        setSelected,
        setMoving,
        setArray,
        setSorted,
        setSorting
    }
    // INSERTION SORT
    const handleInsertionSort = async () => {
        setSorting(true);
        await insertionSort(array, speed, sortStateDispatch);
    };

    const handleBubbleSort = async () => {
        setSorting(true);
        await bubbleSort(array, speed, sortStateDispatch);
    }

    // SELECTION SORT
    const handleSelectionSort = async () => {
        setSorting(true);
        await selectionSort(array, speed, sortStateDispatch);
    }

    // MERGE SORT
    const handleMergeSort = async () => {
        setSorting(true);
        await mergeSort(array, speed, sortStateDispatch);
    }

    // QUICK SORT
    const handleQuickSort = async () => {
        setSorting(true);
        await quickSort(array, speed, sortStateDispatch);
    }

    const resetArray = () => {
        setSelected([]);
        setMoving([]);
        setSorted([]);
        setCurrentStep(0);
        setArray(generateArray(nbItems));
        setAlgorithm('');
    }

    const sort = (algorithm: string) => {
        setAlgorithm(algorithm);
        switch (algorithm) {
            case 'Bubble':
                handleBubbleSort();
                break;
            case 'Insertion':
                handleInsertionSort();
                break;
            case 'Selection':
                handleSelectionSort()
                break;
            case 'Merge':
                handleMergeSort();
                break;
            case 'Quick':
                handleQuickSort();
                break;
            default:
                break;
        }
    };

    // CLEAN SELECTED AND MOVING ELEMENTS
    useEffect(() => {
        if (sorted.length === array.length) {
            setSelected([]);
            setMoving([]);
        }
    } , [sorted]);

    // CHANGING NB ITEMS
    useEffect(() => {
        if (nbItems < MIN_NB_ITEMS) {
            setNbItems(MIN_NB_ITEMS);
            resetArray();
        } else if (nbItems > MAX_NB_ITEMS) {
            setNbItems(MAX_NB_ITEMS);
            resetArray();
        } else {
            resetArray();
        }
    }, [nbItems]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-center">
                <GenerateArrayButton resetArray={resetArray} disabled={sorting}/>
            </div>
            <div className="flex gap-4 justify-center">
                {
                    sortAlgorithm.map((item, index) => (
                        <SortingButton
                            key={index}
                            name={item}
                            onClick={() => {
                                sort(item);
                                setSorting(true);
                            }}
                            disabled={sorting}
                        />
                    ))
                }
            </div>
            <div className="flex justify-center">
                <SortingSettings sorting={sorting} setSpeed={setSpeed} speed={speed} nbItems={nbItems} setNbItems={setNbItems}/>
            </div>
            <div className="flex gap-0.5 justify-between items-end border-4 border-dashed rounded-xl border-gray-400 bg-gray-100 pt-4 pb-0.5 px-1"
            style={{width: `800px`, height: `450px`}}>
                {array.map((item, index) => (
                    <div
                        key={index}
                        className={`bg-gray-700 text-white font-bold rounded text-center pt-0.5 transform transition-all duration-400 ease-in-out
                            ${sorted.includes(index) ? 'bg-green-600' : ''}
                            ${selected.includes(index) ? 'bg-red-400' : ''} 
                            ${moving.includes(index) ? 'bg-yellow-500' : ''}
                        `}
                        style={{height: `${item * 4 + 32}px`, width: `${80 / array.length}%`, minWidth: '1px'}}
                    >
                        {nbItems < 25 && item}
                    </div>
                ))}
            </div>
            <div className="flex items-start border-4 border-dashed py-2 text-xl rounded border-gray-400 bg-gray-100 justify-center gap-2">
                {algorithm !== '' &&
                   <div> Algo : {algorithm} sort |</div>
                }
                <NbSteps nbSteps={currentStep}/>
            </div>
        </div>
    )
}

