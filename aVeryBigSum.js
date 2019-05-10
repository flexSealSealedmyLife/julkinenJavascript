function aVeryBigSum(ar) {

    const sum = (acc, current) => acc + current;
    let result = ar.reduce(sum)
    return result;

}