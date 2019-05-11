
function miniMaxArray(arr) {

    const sum = (acc, current) => acc + current;
    let result = arr.reduce(sum)
    let min = Math.min.apply(Math, arr);
    let max = Math.max.apply(Math, arr);
    console.log(result-max, result-min);
    return (result-max, result-min);

}