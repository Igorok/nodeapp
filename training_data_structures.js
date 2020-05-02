/*
Стек — абстрактный тип данных, представляющий собой список элементов, организованных по принципу LIFO «последним пришёл — первым вышел»
*/

// проверка скобок
const parChecker = (str) => {
    const stack = [];
    const open = '([{';
    const close = ')]}';
    let balanced = true;

    for (let i = 0; i < str.length; i++) {
        if (open.indexOf(str[i]) > -1) {
            stack.push(str[i]);
        } else if (close.indexOf(str[i]) > -1) {
            if ( ! stack.length ) {
                balanced = false;
                break;
            }
            const valClose = str[i];
            const valOpen = stack.pop();
            if (open.indexOf(valOpen) !== close.indexOf(valClose)) {
                balanced = false;
                break;
            }
        }
    }

    return balanced;
};

// console.log(1, 'parChecker', parChecker('func({{([][])}()})'));
// console.log(2, 'parChecker', parChecker('func([{()])'));

// перевод в двоичную систему (формируется список из остатков от деления)
const decimalToBinary = (num) => {
    const stack = [];
    while (num > 0) {
        stack.push(num % 2);
        num = parseInt(num / 2);
    }
    return stack.reverse().join('');
};

// console.log(1, 'decimalToBinary', decimalToBinary(2), parseInt('2').toString(2));
// console.log(2, 'decimalToBinary', decimalToBinary(6), parseInt('6').toString(2));
// console.log(3, 'decimalToBinary', decimalToBinary(15), parseInt('15').toString(2));

/*
Очередь — абстрактный тип данных с дисциплиной доступа к элементам «первый пришёл — первый вышел»

Задача Иосифа Флавия или считалка Джозефуса — математическая задача с историческим подтекстом.
Воины, в составе сорока человек, стали по кругу и договорились, что каждые два воина будут убивать третьего, пока не погибнут все. Иосиф Флавий, командовавший этим отрядом, якобы быстро рассчитал, где нужно встать ему и его товарищу, чтобы остаться последними и сдать крепость римлянам.
*/


const joseph = (arr, k) => {
    const queue = arr;

    let i = 1;
    while (queue.length > 1) {
        const v = arr.shift();
        if (i % k) {
            queue.push(v);
        }
        i++;
    }

    return queue.join(',');
}

// console.log('joseph', joseph([1,2,3,4,5,6,7,8,9,10], 2));

/*
Двои́чное де́рево — иерархическая структура данных, в которой каждый узел имеет не более двух потомков (детей). Как правило, первый называется родительским узлом, а дети называются левым и правым наследниками.
*/

class BinaryNode {
    constructor(key, value) {
        this.value = value;
        this.key = key;
        this.left = null;
        this.right = null;
    }
    // Cost: O(1)
    free() {
        this.left = null;
        this.right = null;
    }
}

class BinaryTreeNode {
    constructor() {
        this.root = null;
    }

    insert(key, value) {
        if (!Number.isInteger(key)) return;
        const newNode = new BinaryNode(key, value);
        if (this.root === null) this.root = newNode;
        else this.insertNode(this.root, newNode);
    }

    insertNode(node, newNode) {
        if (newNode.key < node.key) {
            if (node.left === null) node.left = newNode;
            else this.insertNode(node.left, newNode);
        } else if (newNode.key === node.key) {
            node.value = newNode.value;
        } else {
            if (node.right === null) node.right = newNode;
            else this.insertNode(node.right, newNode);
        }
    }

    remove(key) {
        if (!Number.isInteger(key)) return;
        this.root = this.removeNode(this.root, key);
    }
    removeNode(node, key) {
        if (node === null) return null;
        else if (key < node.key) {
            node.left = this.removeNode(node.left, key);
            return node;
        } else if (key > node.key) {
            node.right = this.removeNode(node.right, key);
            return node;
        } else {
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }

            if (node.left === null) {
                node = node.right;
                return node;
            } else if (node.right === null) {
                node = node.left;
                return node;
            }

            const aux = this.findMinimumNode(node.right);
            node.key = aux.key;

            node.right = this.removeNode(node.right, aux.key);
            return node;
        }
    }

    find(node, key) {
        console.log('find', node, key);

        if (node === null) return null;
        else if (key < node.key) return this.find(node.left, key);
        else if (key > node.key) return this.find(node.right, key);
        else return node;
    }

    inorder(node, fn) {
        if (node !== null) {
            this.inorder(node.left, fn);
            fn(node);
            this.inorder(node.right, fn);
        }
    }

    preorder(node, fn) {
        if (node !== null) {
            fn(node);
            this.preorder(node.left, fn);
            this.preorder(node.right, fn);
        }
    }

    postorder(node, fn) {
        if (node !== null) {
            this.postorder(node.left, fn);
            this.postorder(node.right, fn);
            fn(node);
        }
    }

    levelOrder() {
        if (!this.root) return [];
        var array = [];
        search(this.root, 1, 1);

        function search(node, level, index) {
            if (node) {
                const count = Math.pow(2, level - 1);
                if (array.length < level) {
                    array.push(Array(count).fill(""));
                }
                var arr = array[level - 1];
                arr[index - 1] = node;
                const leftIndex = 2 * index - 1;
                const rightIndex = 2 * index;
                search(node.left, level + 1, leftIndex);
                search(node.right, level + 1, rightIndex);
            } else {
                return;
            }
        }

        return array;
    }
}

