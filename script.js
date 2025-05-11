let expression = '';

function press(value) {
  expression += value;
  document.getElementById('result').value = expression;
}

function calculate() {
  try {
    let converted = insertMultiplication(expression);
    converted = convertPercentage(converted);
    converted = convertRoots(converted);
    converted = convertPower(converted);
    let result = eval(converted);
    if (result % 1 !== 0) {
      const decimalPart = result.toString().split('.')[1];
      if (decimalPart && decimalPart.length > 4) {
        result = parseFloat(result.toFixed(4));
      }
    }

    expression = result.toString();
    document.getElementById('result').value = formatWithCommas(expression);
  } catch {
    document.getElementById('result').value = 'Error';
    expression = '';
  }
}
function convertPercentage(expr){
  expr = expr.replace(/(\d+(\.\d+)?)%(\d+(\.\d+)?)/g, '$1*($3/100)');
  expr = expr.replace(/(\d+(\.\d+)?)%/g, '($1/100)');
  return expr;
}
function convertRoots(expr){
  return expr.replace(/√(\d+(\.\d+)?|\([^()]*\))/g, 'Math.sqrt($1)');
}
function insertMultiplication(expr){
   expr = expr.replace(/(\d|\))(?=√|\()/g, '$1*')
  return expr
}
function convertPower(expr){
  return expr.replace(/(\d+(\.\d+)?|\([^()]*\))\^(\d+(\.\d+)?|\([^()]*\))/g, 'Math.pow($1, $3)');
}
function formatWithCommas(number){
  return Number(number).toLocaleString('en-US');
}

function remove(){
  expression = expression.slice(0,-1);
  document.getElementById('result').value = expression;
}



function clearResult() {
  expression = '';
  document.getElementById('result').value = '';
}

document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (!isNaN(key)) {
    // If it's a number (0–9)
    press(key);
  } else if (['+', '-', '*', '/', '.', '(', ')', '%', '^'].includes(key)) {
    press(key);
  } else if (key === 'Enter' || key === '=') {
    calculate();
  } else if (key === 'Backspace') {
    remove();
  } else if (key.toLowerCase() === 'c') {
    clearResult();
  } else if (key === 'r') {
    // Custom shortcut for √ (root) — optional
    press('√');
  }
});
