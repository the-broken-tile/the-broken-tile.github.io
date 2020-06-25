const validationRegex = /^[\d\w\.\+\-/\*\)\(\s]+$/;
const numberRegex = /^\d|\w|\.$/;
const TYPE_NUMBER = 'number';
const TYPE_VARIABLE = 'variable';
const TYPE_OPERATOR = 'operator';
const OPERATOR_OPENING_BRACKET = '(';
const OPERATOR_CLOSING_BRACKET = ')';

const parse = input => {
    const parts = input.split('');
    const result = [];
    let openingBrackets = 0;
    let closingBrackets = 0;
    let carry;

    const addResult = value => {
        if (/^\d*\.?\d*$/.test(value)) {
            result.push({
                type: TYPE_NUMBER,
                value
            });
            return;
        }
        if (/^\w$/.test(value)) {
            result.push({
                type: TYPE_VARIABLE,
                value
            });
        }
        if (/[\+\-/\*\)\(]/.test(value)) {
            result.push({
                type: TYPE_OPERATOR,
                value,
            });
            openingBrackets += value === OPERATOR_OPENING_BRACKET ? 1 : 0;
            closingBrackets += value === OPERATOR_CLOSING_BRACKET ? 1 : 0;
        }

        throw new Error(`Invalid characters (${value})`);
    };
    parts
        .filter(part => part !== ' ')
        .forEach(part => {
            if (!numberRegex.test(part)) {
                if (carry !== undefined) {
                    addResult(carry);
                    carry = undefined;
                }
                addResult(part);
                return;
            }
            if (carry === undefined) {
                carry = '';
            }
            carry += part;
        });
    if (carry !== undefined) {
        addResult(carry);
    }
    return {
        result,
        valid: openingBrackets === closingBrackets,
    };
};

document.getElementById('input-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const { value } = document.getElementById('input');

    const valid = validationRegex.test(value);
    if (!valid) {
        return;
    }
    console.log(parse(value));
});