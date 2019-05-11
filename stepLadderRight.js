function staircase(n) {
    let i = 0;
    let ii = 0;
    let u = 0;
    let result = '';
    let risu = 1;
    for (i; i < n; i++) {
         ii = 0;
         u = 0;

        for (ii; ii < nn - 1; ii++) {
            result += ' ';
        }
        for (u; u < risu; u++) {
            result += '#';
        }
            nn--;
            risu++;
            result += '\n';
        }
      
        console.log(result);
    
    }