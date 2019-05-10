function diagonalDifference(arr) {

    let right = 0;
    let left = 0;
    let rows = arr.length;
    let ii = 0;
    
    for (i; i < rows; i++) {
        right += arr[i][i];
    }
    i = rows-1;
    for (ii; ii < rows; ii++) {
        left += arr[ii][i];
        i = i-1;
    }

    let result = 0;
    if (right >= left) {
        result = right - left;
    } else {
        result = left - right;
    }
    
    return result;
}