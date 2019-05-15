function timeConversion(s) {
    let choppedString;
    let newhour=0;
    if (s.includes('PM')) {
        s = s.replace('PM', '');
        choppedString = s.split(':');
        choppedString[0] = parseInt(choppedString[0]) + 12;
        if (choppedString[0] === 24) {
            choppedString[0] = '12';
        }
        choppedString = choppedString.join(':');
        return choppedString;
    } else if (s.includes(12)) {
        s = s.replace('AM', '');
        choppedString = s.split(':');
        choppedString[0] =  '00';
        choppedString = choppedString.join(':');
        return choppedString;
    } else {
        s = s.replace('AM', '');
        return s;
    }
}