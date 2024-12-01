function historianHysteriaTS(input: number[]): number {
    let totalDifference = 0;
    let leftList: number[] = [];
    let rightList: number[] = [];
    for (let i=0; i<input.length; i++){
        if (i % 2 === 0) leftList.push(input[i]);
        else rightList.push(input[i]);
    };
    leftList.sort((a,b) => a-b);
    rightList.sort((a,b) => a-b);
    for (let i =0; i<leftList.length; i++) {
        totalDifference += Math.abs(leftList[i] - rightList[i]);
    };
    return totalDifference;
};

// Example usage
const inputTS = [3, 4, 4, 3, 2, 5, 1, 3, 3, 9, 3, 3];
console.log(historianHysteriaTS(inputTS)); // Output: 11
