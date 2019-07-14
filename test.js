/*
Your task is to construct a building which will be a pile of n cubes. The cube at the bottom will have a volume of n^3, the cube above will have volume of (n-1)^3 and so on until the top which will have a volume of 1^3.

You are given the total volume m of the building. Being given m can you find the number n of cubes you will have to build?

The parameter of the function findNb (find_nb, find-nb, findNb) will be an integer m and you have to return the integer n such as n^3 + (n-1)^3 + ... + 1^3 = m if such a n exists or -1 if there is no such n.

findNb(1071225) --> 45
findNb(91716553919377) --> -1
*/


function findNb(m) {
    const maxValue =  Math.ceil(Math.cbrt(m));
    let sum = 0;
    for (let i = 0; i < maxValue; i++) {
        sum += Math.pow(i, 3);
        if (sum == m) {
            return i;
        } else if (sum > m) {
            return -1;
        }
    }
    return -1;
}

// console.log(findNb(1071225));





/*
Create a simple calculator that given a string of operators (+ - * and /) and numbers separated by spaces returns the value of that expression

Example:

Calculator().evaluate("2 / 2 + 3 * 4 - 6") # => 7
Remember about the order of operations! Multiplications and divisions have a higher priority and should be performed left-to-right. Additions and subtractions have a lower priority and should also be performed left-to-right.


describe('Example', () => {
	it('Tests', () => {
		var calculate = new Calculator()
		Test.assertApproxEquals(calculate.evaluate('127'), 127);
		Test.assertApproxEquals(calculate.evaluate('2 + 3'), 5);
		Test.assertApproxEquals(calculate.evaluate('2 - 3 - 4'), -5);
		Test.assertApproxEquals(calculate.evaluate('10 * 5 / 2'), 25);
	});
});
*/

class Calculator {
    calculation (arr, operators) {
        let newArr = [];
        let i = 0;
        while (i < arr.length) {
            if (! isNaN(arr[i]) || operators.indexOf(arr[i]) === -1) {
                newArr.push(arr[i])
                i = i + 1;
            } else {
                let prev = newArr.pop();
                let val = 0;
                switch (arr[i]) {
                    case '*':
                        val = prev * arr[i + 1];
                        break;
                    case '/':
                        val = prev / arr[i + 1];
                        break;
                    case '+':
                        val = prev + arr[i + 1];
                        break;
                    case '-':
                        val = prev - arr[i + 1];
                        break;
                }
                newArr.push(val);
                i = i + 2;
            }
        }

        return newArr;
    }
    evaluate (str) {
        let arr = str.split(' ').map(v => {
            return /\d/.test(v) ? parseFloat(v) : v;
        });
        if (arr.length == 1) {
            return arr[0];
        }

        // first priority
        let first = this.calculation(arr, '*/');
        if (first.length == 1) {
            return first[0];
        }

        // second priority
        let second = this.calculation(first, '+-');
        return second[0];
    }
}
// const calc = new Calculator();
// console.log('calc', calc.evaluate('10 * 5 / 2 + 5'));



/*
110001 - 49

49 / 2 = 1
24 / 2 = 0
12 / 2 = 0
6 / 2 = 0
3 / 2 = 1
1
*/

var user = {
    name: "Вася",
    hi: function() { console.log(this.name); },
    bye: function() { console.log("Пока"); }
};

// user.hi(); // Вася (простой вызов работает)

// а теперь вызовем user.hi или user.bye в зависимости от имени
// (user.name == "Вася" ? user.hi : user.bye)(); // undefined

Array.prototype.copy = function (num) {
    let a = [];
    for (let i = 0; i < num; i++) {
        a = a.concat(this);
    }
    return a;
}
let a1 = [1,2,3]
// console.log(a1.copy(3));



// binary search
const binArr = [0, 1, 2, 8, 13, 17, 19, 32, 42,];
const binSearch = (arr, num) => {
    let found = null;
    let start = 0;
    let end = arr.length - 1;

    while (start <= end && ! found) {
        let middle = Math.floor((start + end) / 2);
        if (arr[middle] == num) {
            found = middle;
            return found;
        } else if (arr[middle] < num) {
            start = middle + 1;
        } else if (arr[middle] > num) {
            end = middle - 1;
        }
    }

    return found;
};

/*
console.log(
    'binSearch', binSearch(binArr, 10),
    'binSearch', binSearch(binArr, 17)
);
*/

/*
buble sort
сравнивает два соседних элемента, и больший перемещает на право
если за внутренний цикл не произошло ни одного перемещения, можно выходить
*/
const bublArray=[54,26,93,17,77,31,44,55,20, 94, 94];
const bubbleSort = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        let change = false;
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                let tmp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = tmp;

                change = true;
            }
        }

        if (! change) {
            break;
        }
    }
    return arr;
}

// console.log('bubbleSort', bubbleSort(bublArray));
/*
сортировка выбором
находит самый большой элемент и помещает в конец массива
*/
const selectionSort = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        let max = i;
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[max]) {
                max = j;
            }
        }
        let tmp = arr[i];
        arr[i] = arr[max];
        arr[max] = tmp;
    }
    return arr;
};
// console.log('selectionSort', selectionSort([54,26,93,17,77,31,44,55,20, 94, 94]));


/*
сортировка вставками
проходим от начала массива в конец, и проверяем сортировку левой части массива, если элементы слева больше попавшегося значения, то продвигаем их вправо, когда этот процесс заканчивается, вместо большего значения устанавливаем попавшееся
*/
const insertionSort = (arr) => {
    for (let i = 1; i < arr.length; i++) {
        let tmp = arr[i];
        let j = i;
        while (j > 0 && arr[j - 1] > tmp) {
            arr[j] = arr[j - 1];
            j = j - 1;
        }
        arr[j] = tmp;
    }
    return arr;
};

// console.log('insertionSort', insertionSort([54,26,93,17,77,31,44,55,20, 94, 94]));



/*
mergeSort - сортировка слиянием, рекурсивно разбивает массив пополам пока не останется один элемент, потом начинает сравнивать левые элементы с правыми и заполнять отсортированный массив.
*/
const mergeSort = (arr) => {
    if (arr.length > 1) {
        let middle = Math.ceil(arr.length / 2);
        let left = mergeSort(arr.slice(0, middle));
        let right = mergeSort(arr.slice(middle, arr.length));

        let i = 0;
        let j = 0;
        let sorted = [];
        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                sorted.push(left[i]);
                i = i + 1;
            } else {
                sorted.push(right[j]);
                j = j + 1;
            }
        }
        while (i < left.length) {
            sorted.push(left[i]);
            i = i + 1;
        }

        while (j < right.length) {
            sorted.push(right[j]);
            j = j + 1;
        }

        return sorted;
    } else {
        return arr;
    }

}

// console.log('mergeSort', mergeSort([54, 26, 93, 17, 77, 31, 44, 55, 20, 94, 94]));


/*
quickSort - быстрая сортировка, по определенному принципу находит опорный элемент(здесь первый), затем перемещает меньшие значения в лево, а большие в право. Потом рекурсивно проделывает это с левой и правой частью.
*/
const quickSort = (arr) => {
    if (arr.length > 1) {
        let example = arr[0];
        let left = [];
        let right = [];

        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < example) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }

        return quickSort(left).concat(example, quickSort(right));
    } else {
        return arr;
    }

}
// console.log('quickSort', quickSort([54, 26, 93, 17, 77, 31, 44, 55, 20, 94, 94]));

const objConv = {
    "a": {
        "a1": 'qwe',
        "a2": {
            'a21': 1,
            'a22': {
                'a3': 3
            }
        }
    },
    'b': {
        'b1': 1,
        'b2': {
            'b3': 3,
            'b4': 4
        }
    }
}

const convert = (obj) => {
    let newObj = {};

    const reqFn = (key, obj) => {
        console.log('key', key, 'obj', obj);

        Object.keys(obj).forEach(k => {
            let k1 = key;
            if (k.length) {
                if (k1.length) {
                    k1 = k1 + '.' + k;
                } else {
                    k1 = k;
                }
            }
            if (typeof obj[k] == 'object') {
                reqFn(k1, obj[k]);
            }
            else {
                newObj[k1] = obj[k];
            }
        });
    }
    reqFn('', obj);

    return newObj;
}
// console.log('convert', convert(objConv));

