function plusMinus(arr) {

    let length = arr.length;
    let positives = 0;
    let negatives = 0;
    let zeros = 0;
    
    for (let i = 0; i < length; i++) {
        if (arr[i] > 0) {
            positives += 1;
        } else if (arr[i] < 0) {
            negatives += 1;
        } else {
            zeros += 1;
        }
    }

    console.log(positives/length);
    console.log(negatives/length);
    console.log(zeros/length);

}