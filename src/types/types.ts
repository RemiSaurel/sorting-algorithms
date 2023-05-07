import {Dispatch, SetStateAction} from "react";

export type SortingFunction = (array: number[], speed: number) => Promise<void>;

export interface SortStateDispatch {
    setCurrentStep: Dispatch<SetStateAction<number>>;
    setSelected: Dispatch<SetStateAction<number[]>>;
    setMoving: Dispatch<SetStateAction<number[]>>;
    setArray: Dispatch<SetStateAction<number[]>>;
    setSorted: Dispatch<SetStateAction<number[]>>;
    setSorting: Dispatch<SetStateAction<boolean>>;
}