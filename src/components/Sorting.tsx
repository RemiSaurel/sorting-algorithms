import SortingButton from "./SortingButton";
import React, {useEffect, useState} from 'react';
import NbSteps from "./NbSteps";
import {generateArray} from "../utils/arrayGenerator";
import GenerateArrayButton from "./GenerateArrayButton";
import SortingSettings from "./SortingSettings";
import {SortingFunction} from "../types/types";

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
    const [nbItems, setNbItems] = useState<number>(100);
    const [array, setArray] = useState<number[]>(generateArray(nbItems));
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [selected, setSelected] = useState<number[]>([]);
    const [moving, setMoving] = useState<number[]>([]);
    const [sorting, setSorting] = useState<boolean>(false);
    const [sorted, setSorted] = useState<number[]>([]);
    const [speed, setSpeed] = useState<number>(300);

    // INSERTION SORT
    const insertionSort: SortingFunction = async (array, speed) => {
        setCurrentStep(0);
        let i, j, temp;
        let selected: number[] = [],
            moving: number[] = [],
            sorted: number[] = [];
        const n = array.length;
        for (i = 1; i < n; i++) {
            j = i - 1;
            selected = [j, i];
            temp = array[i];
            while (j >= 0 && array[j] > temp) {
                moving = [j, j + 1];
                array[j + 1] = array[j];
                j--;
                nextStep(selected, moving, sorted)
                await new Promise((resolve) => setTimeout(resolve, speed));
            }
            moving = [];
            array[j + 1] = temp;
            sorted.push(i);
            setCurrentStep((step) => step + 1);
            setSelected(selected);
            setMoving(moving);
            setArray([...array]);
            setSorted(sorted);
            await new Promise((resolve) => setTimeout(resolve, speed));
        }
        setSorted(array.map((_, index) => index));
        setSorting(false);
    };

    // BUBBLE SORT
    const bubbleSort: SortingFunction = async (array, speed) => {
        setCurrentStep(0);
        let i, j, temp;
        let selected: number[] = [],
            moving: number[] = [],
            sorted: number[] = [];
        const n = array.length;
        for (i = 0; i < n; i++) {
            for (j = 0; j < n - i - 1; j++) {
                selected = [j, j + 1];
                if (array[j] > array[j + 1]) {
                    moving = [j, j + 1];
                    temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
                nextStep(selected, moving, sorted)
                await new Promise((resolve) => setTimeout(resolve, speed));
            }
            moving = [];
            sorted.push(n - i - 1);
            setCurrentStep((step) => step + 1);
            setSelected(selected);
            setMoving(moving);
            setArray([...array]);
            setSorted(sorted);
            await new Promise((resolve) => setTimeout(resolve, speed));
        }
        setSorted(array.map((_, index) => index));
        setSorting(false);
    }

    // SELECTION SORT
    const selectionSort: SortingFunction = async (array, speed) => {
        setCurrentStep(0);
        let i, j, min_idx;
        let selected: number[] = [],
            moving: number[] = [],
            sorted: number[] = [];
        const n = array.length;
        for (i = 0; i < n - 1; i++) {
            min_idx = i;
            for (j = i + 1; j < n; j++) {
                selected = [min_idx, j];
                if (array[j] < array[min_idx]) {
                    min_idx = j;
                }
                nextStep(selected, moving, sorted)
                await new Promise((resolve) => setTimeout(resolve, speed));
            }
            moving = [i, min_idx];
            let temp = array[min_idx];
            array[min_idx] = array[i];
            array[i] = temp;
            moving = [];
            sorted.push(i);
            setCurrentStep((step) => step + 1);
            setSelected(selected);
            setMoving(moving);
            setArray([...array]);
            setSorted(sorted);
            await new Promise((resolve) => setTimeout(resolve, speed));
        }
        setSorted(array.map((_, index) => index));
        setSorting(false);
    }

    // MERGE SORT
    const mergeSort: SortingFunction = async (array, speed) => {
        setCurrentStep(0);
        let selected: number[] = [],
            moving: number[] = [],
            sorted: number[] = [];
        const n = array.length;
        const aux = array.slice();
        await mergeSortHelper(array, aux, 0, n - 1, selected, moving, sorted, speed);
        setSorted(array.map((_, index) => index));
        setSorting(false);
    }

    const mergeSortHelper = async (array: number[], aux: number[], low: number, high: number, selected: number[], moving: number[], sorted: number[], speed: number) => {
        if (low === high) return;
        const mid = Math.floor((low + high) / 2);
        await mergeSortHelper(aux, array, low, mid, selected, moving, sorted, speed);
        await mergeSortHelper(aux, array, mid + 1, high, selected, moving, sorted, speed);
        await merge(array, aux, low, mid, high, selected, moving, sorted, speed);
    }

    const merge = async (array: number[], aux: number[], low: number, mid: number, high: number, selected: number[], moving: number[], sorted: number[], speed: number) => {
        let k = low,
            i = low,
            j = mid + 1;
        while (i <= mid && j <= high) {
            selected = [i, j];
            moving = [k];
            if (aux[i] <= aux[j]) {
                array[k++] = aux[i++];
            } else {
                array[k++] = aux[j++];
            }
            nextStep(selected, moving, sorted);
            await new Promise((resolve) => setTimeout(resolve, speed));
        }
        while (i <= mid) {
            selected = [i];
            moving = [k];
            array[k++] = aux[i++];
            nextStep(selected, moving, sorted);
            await new Promise((resolve) => setTimeout(resolve, speed));
        }
        while (j <= high) {
            selected = [j];
            moving = [k];
            array[k++] = aux[j++];
            nextStep(selected, moving, sorted);
            await new Promise((resolve) => setTimeout(resolve, speed));
        }
    }

    // QUICK SORT
    const quickSort: SortingFunction = async (array, speed) => {
        setCurrentStep(0);
        let selected: number[] = [],
            moving: number[] = [],
            sorted: number[] = [];
        const n = array.length;
        await quickSortHelper(array, 0, n - 1, selected, moving, sorted, speed);
        setSorted(array.map((_, index) => index));
        setSorting(false);
    }

    const quickSortHelper = async (array: number[], low: number, high: number, selected: number[], moving: number[], sorted: number[], speed: number) => {
        if (low < high) {
            const pivot = await partition(array, low, high, selected, moving, sorted, speed);
            await quickSortHelper(array, low, pivot - 1, selected, moving, sorted, speed);
            await quickSortHelper(array, pivot + 1, high, selected, moving, sorted, speed);
        }
    }

    const partition = async (array: number[], low: number, high: number, selected: number[], moving: number[], sorted: number[], speed: number) => {
        let pivot = array[high];
        let i = low - 1;
        for (let j = low; j < high; j++) {
            selected = [j, high];
            if (array[j] < pivot) {
                i++;
                moving = [i, j];
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;
                nextStep(selected, moving, sorted);
                await new Promise((resolve) => setTimeout(resolve, speed));
            }
        }
        moving = [i + 1, high];
        let temp = array[i + 1];
        array[i + 1] = array[high];
        array[high] = temp;
        nextStep(selected, moving, sorted);
        await new Promise((resolve) => setTimeout(resolve, speed));
        return i + 1;
    }

    const nextStep = (selected: number[], moving: number[], sorted: number[]) => {
        setCurrentStep((step) => step + 1);
        setSelected(selected);
        setMoving(moving);
        setSorted(sorted);
    }

    const resetArray = () => {
        setSelected([]);
        setMoving([]);
        setSorted([]);
        setCurrentStep(0);
        setArray(generateArray(nbItems));
    }

    const sort = (algorithm: string) => {
        let sortingFunction: SortingFunction | undefined;
        switch (algorithm) {
            case 'Bubble':
                sortingFunction = bubbleSort;
                break;
            case 'Insertion':
                sortingFunction = insertionSort;
                break;
            case 'Selection':
                sortingFunction = selectionSort;
                break;
            case 'Merge':
                sortingFunction = mergeSort;
                break;
            case 'Quick':
                sortingFunction = quickSort;
                break;
            default:
                break;
        }

        if (sortingFunction) {
            sortingFunction(array, speed)
                .then(() => {
                    setSorting(false);
                })
                .catch((error: any) => {
                    console.error(`Error occurred during sorting: ${error}`);
                    setSorting(false);
                });
            setSorting(true);
        } else {
            console.error(`Unknown sorting algorithm: ${algorithm}`);
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
            setArray(generateArray(nbItems));
        } else if (nbItems > MAX_NB_ITEMS) {
            setNbItems(MAX_NB_ITEMS);
            setArray(generateArray(nbItems));
        } else {
            setArray(generateArray(nbItems));
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
            <div className="flex gap-0.5 justify-center items-end"
            style={{width: `800px`}}>
                {array.map((item, index) => (
                    <div
                        key={index}
                        className={`bg-gray-700 text-white font-bold rounded
                            ${sorted.includes(index) ? 'bg-green-600' : ''}
                            ${selected.includes(index) ? 'bg-red-400' : ''} 
                            ${moving.includes(index) ? 'bg-yellow-500' : ''}
                        `}
                        style={{height: `${item * 4 + 32}px`, width: `${80 / array.length}%`, minWidth: '1px'}}
                    >
                    </div>
                ))}
            </div>
            <NbSteps nbSteps={currentStep}/>
        </div>
    )
}

