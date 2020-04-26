// fibonacci
const fibonacci = (arr, n) => {
    for (let i = 1; i <= n; i++) {
        arr[i + 1] = arr[i - 1] + arr[i];
    }
    return arr;
};
// fibonacci([0,1], 5);

const sortArray = [54,26,93,17,77,31,44,55,20, 94, 94];

/*
Bubble sort
Алгоритм состоит из повторяющихся проходов по сортируемому массиву. За каждый проход элементы последовательно сравниваются попарно и, если порядок в паре неверный, выполняется обмен элементов.
*/
const sortBubble = (arr) => {
    let change = false;

    for (let i = arr.length - 1; i > 0; i--) {
        change = false;
        for (let j = 0; j < i; j++) {
            console.log('i', i, 'j', j);

            if (arr[j] > arr[j + 1]) {
                const tmp = arr[j + 1];
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
};

// [17, 20, 26, 31, 44, 54, 55, 77, 93, 94, 94]
// sortBubble(sortArray);

/*
Selection sort
Шаги алгоритма:
 - находим номер минимального значения в текущем списке
 - производим обмен этого значения со значением первой неотсортированной позиции (обмен не нужен, если минимальный элемент уже находится на данной позиции)
 - теперь сортируем хвост списка, исключив из рассмотрения уже отсортированные элементы
*/

const sortSelection = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let min = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        const temp = arr[i];
        arr[i] = arr[min];
        arr[min] = temp;
    }

    return arr;
};

// [17, 20, 26, 31, 44, 54, 55, 77, 93, 94, 94]
// sortSelection(sortArray);

/*
Insertion sort
Алгоритм сортировки, в котором элементы входной последовательности просматриваются по одному, и каждый новый поступивший элемент размещается в подходящее место среди ранее упорядоченных элементов
*/

const sortInsertion = (arr) => {
    for (let i = 1; i < arr.length; i++) {
        const temp = arr[i];
        let j = i;
        while (temp < arr[j - 1]) {
            arr[j] = arr[j - 1];
            j = j - 1;
        }
        if (j != i) {
            arr[j] = temp;
        }
    }
    return arr;
};

// [17, 20, 26, 31, 44, 54, 55, 77, 93, 94, 94]
// sortInsertion(sortArray);


/*
merge sort

Сортируемый массив разбивается на две части примерно одинакового размера;
Каждая из получившихся частей сортируется отдельно, например — тем же самым алгоритмом;
Два упорядоченных массива половинного размера соединяются в один.

*/

const sortMerge = (arr) => {
    if (arr.length <= 1) {
        return arr;
    }

    const center = Math.ceil(arr.length / 2);
    const left = sortMerge(arr.slice(0, center));
    const right = sortMerge(arr.slice(center, arr.length));

    let i = 0;
    let j = 0;
    let newArr = [];

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            newArr.push(left[i]);
            i = i + 1;
        } else {
            newArr.push(right[j]);
            j = j + 1;
        }
    }

    if (i != left.length) {
        newArr = newArr.concat(left.slice(i, left.length));
    } else {
        newArr = newArr.concat(right.slice(j, right.length));
    }

    return newArr;
};

// [ 17, 20, 26, 31, 44, 54, 55, 77, 93, 94, 94 ]
// console.log('sortMerge(sortArray)', sortMerge(sortArray));

/*
quick sort

 - Выбрать из массива элемент, называемый опорным. Это может быть любой из элементов массива. От выбора опорного элемента не зависит корректность алгоритма, но в отдельных случаях может сильно зависеть его эффективность (см. ниже).
 - Сравнить все остальные элементы с опорным и переставить их в массиве так, чтобы разбить массив на три непрерывных отрезка, следующих друг за другом: «элементы меньшие опорного», «равные» и «большие»[1].
 - Для отрезков «меньших» и «больших» значений выполнить рекурсивно ту же последовательность операций, если длина отрезка больше единицы.

*/

const sortQuick = (arr) => {
    if (arr.length <= 1) {
        return arr;
    }

    const start = arr[0];
    const left = [];
    const right = [];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < start) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    left.push(start);

    arr = sortQuick(left).concat(sortQuick(right));

    return arr;
};

// [ 17, 20, 26, 31, 44, 54, 55, 77, 93, 94, 94 ]
// console.log('sortQuick(sortArray)', sortQuick(sortArray));

/*

Замыкание – это функция, которая запоминает свои внешние переменные и может получить к ним доступ. В некоторых языках это невозможно, или функция должна быть написана специальным образом, чтобы получилось замыкание. Но, как было описано выше, в JavaScript, все функции изначально являются замыканиями (есть только одно исключение, про которое будет рассказано в Синтаксис "new Function").

То есть, они автоматически запоминают, где были созданы, с помощью скрытого свойства [[Environment]] и все они могут получить доступ к внешним переменным.


Декоратор – это обёртка вокруг функции, которая изменяет поведение последней. Основная работа по-прежнему выполняется функцией.

const abArr = [
    [1,2], [3,4], [5,6], [5,6], [3,4], [1,2]
];

let slowAb = async (a, b) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(a + b);
        }, 3 * 1000);
    });
};

const worker = async () => {
    for (const arr of abArr) {
        console.time();
        console.log('slowAb', ...arr, await slowAb(...arr));
        console.timeEnd();
    }
};

// worker();

const cacheAb = (func) => {
    const cache = {};
    return async (...args) => {
        const a = args[0];
        const b = args[1];
        const k = `${a}_${b}`;

        if (! cache[k]) {
            cache[k] = await func(...args);
        }

        return cache[k];
    };
}

slowAb = cacheAb(slowAb);

worker();

*/



/*
В программировании рекурсия — вызов функции (процедуры) из неё же самой, непосредственно (простая рекурсия) или через другие функции (сложная или косвенная рекурсия),
*/

const reduceObj = {
    a: {
        a1: 'qwe',
        a2: {
            a21: 1,
            a22: {
                a3: 3
            }
        }
    },
    b: {
        b1: 1,
        b2: {
            b3: 3,
            b4: 4
        }
    }
}

const reduceKeys = (obj) => {
    const newObj = {};
    const reduceFn = (key, value) => {
        if (typeof value !== 'object') {
            newObj[key] = value;
            return;
        }

        if (key != '') {
            key += '.';
        }

        for (k in value) {
            reduceFn(key + k, value[k]);
        }
    };

    reduceFn('', obj);

    return newObj;
};

/*
reduceKeys(reduceObj) {
    'a.a1': 'qwe',
    'a.a2.a21': 1,
    'a.a2.a22.a3': 3,
    'b.b1': 1,
    'b.b2.b3': 3,
    'b.b2.b4': 4
}
console.log('reduceKeys(reduceObj)', reduceKeys(reduceObj));
*/