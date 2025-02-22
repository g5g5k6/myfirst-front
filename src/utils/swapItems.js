export const swapItems = (arr, index1, index2) => {
    const newArr = [...arr];
    [newArr[index1], newArr[index2]] = [newArr[index2], newArr[index1]];
    return newArr;
  };