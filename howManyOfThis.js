function howManyOfThis(ar) {
    let max = Math.max.apply(Math, ar);
    return ar.filter(function(x){return x===max}).length
   

}