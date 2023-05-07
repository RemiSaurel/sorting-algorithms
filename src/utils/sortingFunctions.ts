import { Dispatch, SetStateAction } from "react";
import { SortStateDispatch } from "../types/types";

const nextStep = (selected: number[], moving: number[], sorted: number[],
                  setCurrentStep: Dispatch<SetStateAction<number>>,
                  setSelected: Dispatch<SetStateAction<number[]>>,
                  setMoving: Dispatch<SetStateAction<number[]>>,
                  setSorted: Dispatch<SetStateAction<number[]>>
) => {
    setCurrentStep((step) => step + 1);
    setSelected(selected);
    setMoving(moving);
    setSorted(sorted);
}

export const selectionSort: (array: number[],
                             speed: number,
                             ...stateDispatch: SortStateDispatch[]) => Promise<void> = async (
    array: number[],
    speed: number,
    { setCurrentStep, setSelected, setMoving, setArray, setSorted, setSorting }: SortStateDispatch
) => {
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
            nextStep(selected, moving, sorted, setCurrentStep, setSelected, setMoving, setSorted)
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
export const insertionSort: (array: number[],
                             speed: number,
                             ...stateDispatch: SortStateDispatch[]) => Promise<void> = async (
    array: number[],
    speed: number,
    { setCurrentStep, setSelected, setMoving, setArray, setSorted, setSorting }: SortStateDispatch
) => {
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
            nextStep(selected, moving, sorted, setCurrentStep, setSelected, setMoving, setSorted);
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

export const bubbleSort: (array: number[],
                          speed: number,
                          ...stateDispatch: SortStateDispatch[]) => Promise<void> = async (
    array: number[],
    speed: number,
    { setCurrentStep, setSelected, setMoving, setArray, setSorted, setSorting }: SortStateDispatch

) => {
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
            nextStep(selected, moving, sorted, setCurrentStep, setSelected, setMoving, setSorted);
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

export const mergeSort: (array: number[],
                         speed: number,
                         ...stateDispatch: SortStateDispatch[]) => Promise<void> = async (
    array: number[],
    speed: number,
    { setCurrentStep, setSelected, setMoving, setArray, setSorted, setSorting }: SortStateDispatch

) => {
    setCurrentStep(0);
    let selected: number[] = [],
        moving: number[] = [],
        sorted: number[] = [];
    const n = array.length;
    const aux = array.slice();
    await mergeSortHelper(array, aux, 0, n - 1, selected, moving, sorted, speed, setCurrentStep, setSelected, setMoving, setSorted);
    setSorted(array.map((_, index) => index));
    setSorting(false);
}

const mergeSortHelper = async (array: number[], aux: number[], low: number, high: number, selected: number[], moving: number[], sorted: number[], speed: number,
                               setCurrentStep: Dispatch<SetStateAction<number>>,
                               setSelected: Dispatch<SetStateAction<number[]>>,
                               setMoving: Dispatch<SetStateAction<number[]>>,
                               setSorted: Dispatch<SetStateAction<number[]>>) => {
    if (low === high) return;
    const mid = Math.floor((low + high) / 2);
    await mergeSortHelper(aux, array, low, mid, selected, moving, sorted, speed, setCurrentStep, setSelected, setMoving, setSorted);
    await mergeSortHelper(aux, array, mid + 1, high, selected, moving, sorted, speed, setCurrentStep, setSelected, setMoving, setSorted);
    await merge(array, aux, low, mid, high, selected, moving, sorted, speed, setCurrentStep, setSelected, setMoving, setSorted);
}

const merge = async (array: number[], aux: number[], low: number, mid: number, high: number, selected: number[], moving: number[], sorted: number[], speed: number,
                     setCurrentStep: Dispatch<SetStateAction<number>>,
                     setSelected: Dispatch<SetStateAction<number[]>>,
                     setMoving: Dispatch<SetStateAction<number[]>>,
                     setSorted: Dispatch<SetStateAction<number[]>>) => {
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
        nextStep(selected, moving, sorted, setCurrentStep, setSelected, setMoving, setSorted);
        await new Promise((resolve) => setTimeout(resolve, speed));
    }
    while (i <= mid) {
        selected = [i];
        moving = [k];
        array[k++] = aux[i++];
        nextStep(selected, moving, sorted, setCurrentStep, setSelected, setMoving, setSorted);
        await new Promise((resolve) => setTimeout(resolve, speed));
    }
    while (j <= high) {
        selected = [j];
        moving = [k];
        array[k++] = aux[j++];
        nextStep(selected, moving, sorted, setCurrentStep, setSelected, setMoving, setSorted);
        await new Promise((resolve) => setTimeout(resolve, speed));
    }
}

export const quickSort: (array: number[],
                         speed: number,
                         ...stateDispatch: SortStateDispatch[]) => Promise<void> = async (
    array: number[],
    speed: number,
    { setCurrentStep, setSelected, setMoving, setArray, setSorted, setSorting }: SortStateDispatch

) => {
    setCurrentStep(0);
    let selected: number[] = [],
        moving: number[] = [],
        sorted: number[] = [];
    const n = array.length;
    await quickSortHelper(array, 0, n - 1, selected, moving, sorted, speed, setCurrentStep, setSelected, setMoving, setSorted);
    setSorted(array.map((_, index) => index));
    setSorting(false);
}

const quickSortHelper = async (array: number[], low: number, high: number, selected: number[], moving: number[], sorted: number[], speed: number,
                               setCurrentStep: Dispatch<SetStateAction<number>>,
                               setSelected: Dispatch<SetStateAction<number[]>>,
                               setMoving: Dispatch<SetStateAction<number[]>>,
                               setSorted: Dispatch<SetStateAction<number[]>>) => {
    if (low < high) {
        const pivot = await partition(array, low, high, selected, moving, sorted, speed, setCurrentStep, setSelected, setMoving, setSorted);
        await quickSortHelper(array, low, pivot - 1, selected, moving, sorted, speed, setCurrentStep, setSelected, setMoving, setSorted);
        await quickSortHelper(array, pivot + 1, high, selected, moving, sorted, speed, setCurrentStep, setSelected, setMoving, setSorted);
    }
}

const partition = async (array: number[], low: number, high: number, selected: number[], moving: number[], sorted: number[], speed: number,
                         setCurrentStep: Dispatch<SetStateAction<number>>,
                         setSelected: Dispatch<SetStateAction<number[]>>,
                         setMoving: Dispatch<SetStateAction<number[]>>,
                         setSorted: Dispatch<SetStateAction<number[]>>) => {
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
            nextStep(selected, moving, sorted, setCurrentStep, setSelected, setMoving, setSorted);
            await new Promise((resolve) => setTimeout(resolve, speed));
        }
    }
    moving = [i + 1, high];
    let temp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp;
    nextStep(selected, moving, sorted, setCurrentStep, setSelected, setMoving, setSorted);
    await new Promise((resolve) => setTimeout(resolve, speed));
    return i + 1;
}