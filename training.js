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

const sortArray = [54,26,93,17,77,31,44,55,20, 94, 94];
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