function reverseWordOrder(sentence) {
  return sentence.split(' ').reverse().join(' ');
}

function reversesentence(sentence){
  const words = sentence.split(' ');
    return words.reduceRight((acc, word) => acc + ' ' + word, '').trim();
}

console.log(reverseWordOrder("I love JavaScript"));
// JavaScript love I
