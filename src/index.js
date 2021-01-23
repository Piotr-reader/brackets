module.exports = function check(str, bracketsConfig) {
    let stack = [];
    let result = false;
    for (let i = 0; i < str.length; i++) {
        if (isOpen(str[i], bracketsConfig)) {
            stack.push(str[i]);
        } else if (isClose(str[i], bracketsConfig)) {
            let chearOpen = stack.pop();
            let chearClose = str[i];
            if (isMath(chearOpen, chearClose, bracketsConfig)) {
                result = true;
            } else {
                result = false;
                break;
            }
        } else {
            if (stack.length > 0) {
                if (str[i] === stack[stack.length - 1]) {
                    stack.pop();
                    result = true;
                } else {
                  stack.push(str[i]);
                }
            } else {
                stack.push(str[i]);
            }
        }

    }
    if (stack.length !== 0) {
        result = false;
    }
    return result;
};

function isOpen(char, bracketsConfig) {
    let result = false;

    for (let i = 0; i < bracketsConfig.length; i++) {
        if (char === bracketsConfig[i][0] && char !== bracketsConfig[i][1]) {
            result = true;
        }
    }
    return result;
}

function isClose(char, bracketsConfig) {
    let result = false;

    for (let i = 0; i < bracketsConfig.length; i++) {
        if (char === bracketsConfig[i][1] && char !== bracketsConfig[i][0]) {
            result = true;
        }
    }
    return result;
}

function isMath(chearOpen, chearClose, bracketsConfig) {
    let result = false;

    for (let i = 0; i < bracketsConfig.length; i++) {
        if (chearOpen === bracketsConfig[i][0] && chearClose === bracketsConfig[i][1]) {
            result = true;
            break;
        }
    }
    return result;
}
