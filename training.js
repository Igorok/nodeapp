// fibonacci
const fibonacci = (arr, n) => {
    for (let i = 1; i <= n; i++) {
        arr[i + 1] = arr[i - 1] + arr[i];
    }
    return arr;
};
// fibonacci([0,1], 5);

const sortArray = [54,26,93,17,77,31,44,55,20, 94, 94];

// bubble sort
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
