export const generateArray = (nbItems: number): number[] => {
    const array = [];
    for (let i = 0; i < nbItems; i++) {
        array.push(Math.floor(Math.random() * 100));
    }
    return array;
};
