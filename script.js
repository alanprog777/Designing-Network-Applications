window.onload = function() {
    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null

    const outputElement = document.getElementById("result")
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

function onDigitButtonClicked(digit) {
    if (!selectedOperation) {
        if (a.includes('e')) return;

        if (a === "Infinity" || a === "-Infinity" || a === "NaN") {
            if (digit === '.') {
                a = "0.";
            } else {
                a = digit;
            }
            outputElement.innerHTML = a;
            return;
        }

        if (a === '' && digit === '.') {
            a = "0.";
            outputElement.innerHTML = a;
            return;
        }

        let currentDigits = a.length;

        if (digit !== '.') {
            if (currentDigits >= 8) {
                if (a !== '' && a !== '-') {
                    const num = parseFloat(a);
                    a = num.toExponential(2);
                }
                outputElement.innerHTML = a;
                return;
            }

            a += digit;

            let newDigits = a.length;
            if (newDigits > 8) {
                const num = parseFloat(a);
                a = num.toExponential(2);
            }
        } else {
            if (!a.includes('.')) {
                if (a === '' || a === '-') {
                    a += '0.';
                } else {
                    a += '.';
                }
            }
        }

        outputElement.innerHTML = a;
    } else {
        if (b === "Infinity" || b === "-Infinity" || b === "NaN") {
            if (digit === '.') {
                b = "0.";
            } else {
                b = digit;
            }
            outputElement.innerHTML = b;
            return;
        }

        if (b === '' && digit === '.') {
            b = "0.";
            outputElement.innerHTML = b;
            return;
        }

        let currentDigits = b.length;

        if (digit !== '.') {
            if (currentDigits >= 8) {
                if (b !== '' && b !== '-') {
                    const num = parseFloat(b);
                    b = num.toExponential(2);
                }
                outputElement.innerHTML = b;
                return;
            }

            b += digit;

            let newDigits = b.length;
            if (newDigits > 8) {
                const num = parseFloat(b);
                b = num.toExponential(2);
            }
        } else {
            if (!b.includes('.')) {
                if (b === '' || b === '-') {
                    b += '0.';
                } else {
                    b += '.';
                }
            }
        }

        outputElement.innerHTML = b;
    }
}

digitButtons.forEach(button =>{
    button.onclick = function() {
        const digitValue = button.innerHTML;
        onDigitButtonClicked(digitValue);
    }
});

document.getElementById("btn_op_mult").onclick = function() {
    if (a === '') return;
    selectedOperation = 'x'
}

document.getElementById("btn_op_plus").onclick = function() {
    if (a === '') return;
    selectedOperation = '+';
}

document.getElementById("btn_op_minus").onclick = function() {
    if (a === '')return;
    selectedOperation = '-';
}

document.getElementById("btn_op_div").onclick = function() {
    if (a === '') return;
    selectedOperation = '/';
}

document.getElementById("btn_op_clear").onclick = function() {
    a = ''
    b = ''
    selectedOperation = ''
    expressionResult = ''
    outputElement.innerHTML = 0
}

document.getElementById("btn_op_sign").onclick = function() {
    if (!selectedOperation) {
        if (a != '') {
            a = (parseFloat(a) * -1).toString();
            outputElement.innerHTML = a;
        }
    } else {
        if (b != '') {
            b = (parseFloat(b) * -1).toString();
            outputElement.innerHTML = b;
        }
    }
}

document.getElementById("btn_op_equal").onclick = function() {
    if (a === '' || b === '' || !selectedOperation) return;

    let res = 0;
    switch(selectedOperation) {
        case 'x': res = (+a) * (+b); break;
        case '+': res = (+a) + (+b); break;
        case '-': res = (+a) - (+b); break;
        case '/': res = (+a) / (+b); break;
    }

    let finalResult = res.toString();
    if (finalResult.length > 8) {
        finalResult = res.toPrecision(7).toString();

        if (finalResult.includes('.')) {
            finalResult = parseFloat(finalResult).toString();
        }

        if (finalResult.length > 8) {
            finalResult = finalResult.substring(0, 8);
        }
    }

    a = finalResult;
    b = '';
    selectedOperation = null;
    outputElement.innerHTML = a;
}
};
