export const CalcPage = () => {
    const section = document.createElement('section');
    section.innerHTML = `
        <div class="calculator-background">
            <div id="result" class="result">0</div>
            <div class="row">
                <button id="btn_op_clear" class="my-btn secondary">C</button>
                <button id="btn_op_sign" class="my-btn secondary">+/-</button>
                <button id="btn_op_percent" class="my-btn secondary">%</button>
                <button id="btn_op_div" class="my-btn primary">/</button>
            </div>
            <div class="row">
                <button id="btn_digit_7" class="my-btn">7</button>
                <button id="btn_digit_8" class="my-btn">8</button>
                <button id="btn_digit_9" class="my-btn">9</button>
                <button id="btn_op_mult" class="my-btn primary">x</button>
            </div>
            <div class="row">
                <button id="btn_digit_4" class="my-btn">4</button>
                <button id="btn_digit_5" class="my-btn">5</button>
                <button id="btn_digit_6" class="my-btn">6</button>
                <button id="btn_op_minus" class="my-btn primary">-</button>
            </div>
            <div class="row">
                <button id="btn_digit_1" class="my-btn">1</button>
                <button id="btn_digit_2" class="my-btn">2</button>
                <button id="btn_digit_3" class="my-btn">3</button>
                <button id="btn_op_plus" class="my-btn primary">+</button>
            </div>
            <div class="row">
                <button id="btn_digit_0" class="my-btn">0</button>
                <button id="btn_digit_dot" class="my-btn">.</button>
                <button id="btn_op_equal" class="my-btn execute">=</button>
            </div>
        </div>
    `;

    setTimeout(() => {
        let a = '';
        let b = '';
        let selectedOperation = null;

        const outputElement = section.querySelector("#result");
        const digitButtons = section.querySelectorAll('[id ^= "btn_digit_"]');

        function onDigitButtonClicked(digit) {
            if (!selectedOperation) {
                if (a.includes('e')) return;
                if (a === "Infinity" || a === "-Infinity" || a === "NaN") {
                    a = digit === '.' ? "0." : digit;
                } else if (a === '' && digit === '.') {
                    a = "0.";
                } else {
                    if (digit !== '.') {
                        if (a.length >= 8) {
                            if (a !== '' && a !== '-') {
                                const num = parseFloat(a);
                                a = num.toExponential(2);
                            }
                        } else {
                            a += digit;
                        }
                    } else if (!a.includes('.')) {
                        a += (a === '' || a === '-') ? '0.' : '.';
                    }
                }
                outputElement.innerHTML = a;
            } else {
                if (b === "Infinity" || b === "-Infinity" || b === "NaN") {
                    b = digit === '.' ? "0." : digit;
                } else if (b === '' && digit === '.') {
                    b = "0.";
                } else {
                    if (digit !== '.') {
                        if (b.length >= 8) {
                            if (b !== '' && b !== '-') {
                                const num = parseFloat(b);
                                b = num.toExponential(2);
                            }
                        } else {
                            b += digit;
                        }
                    } else if (!b.includes('.')) {
                        b += (b === '' || b === '-') ? '0.' : '.';
                    }
                }
                outputElement.innerHTML = b;
            }
        }

        digitButtons.forEach(button => {
            button.onclick = function() {
                onDigitButtonClicked(button.innerHTML);
            }
        });

        section.querySelector("#btn_op_mult").onclick = () => { if (a !== '') selectedOperation = 'x'; };
        section.querySelector("#btn_op_plus").onclick = () => { if (a !== '') selectedOperation = '+'; };
        section.querySelector("#btn_op_minus").onclick = () => { if (a !== '') selectedOperation = '-'; };
        section.querySelector("#btn_op_div").onclick = () => { if (a !== '') selectedOperation = '/'; };

        section.querySelector("#btn_op_clear").onclick = () => {
            a = ''; b = ''; selectedOperation = null; outputElement.innerHTML = 0;
        };

        section.querySelector("#btn_op_sign").onclick = () => {
            if (!selectedOperation) {
                if (a != '') { a = (parseFloat(a) * -1).toString(); outputElement.innerHTML = a; }
            } else {
                if (b != '') { b = (parseFloat(b) * -1).toString(); outputElement.innerHTML = b; }
            }
        };

        section.querySelector("#btn_op_equal").onclick = () => {
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
                if (finalResult.includes('.')) finalResult = parseFloat(finalResult).toString();
                if (finalResult.length > 8) finalResult = finalResult.substring(0, 8);
            }
            a = finalResult;
            b = '';
            selectedOperation = null;
            outputElement.innerHTML = a;
        };
    }, 0);

    return section;
};
