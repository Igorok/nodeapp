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


/*

Граф — абстрактный математический объект, представляющий собой множество вершин графа и набор рёбер, то есть соединений между парами вершин. Например, за множество вершин можно взять множество аэропортов, обслуживаемых некоторой авиакомпанией, а за множество рёбер взять регулярные рейсы этой авиакомпании между городами.

Вершина (иногда её называют узел) - основная часть графа. Может иметь имя, которое называется ключ. Также вершина может обладать дополнительной информацией, которую мы будем называть полезной нагрузкой.

Ребро (или дуга) - другая фундаментальная часть графа. Ребро, соединяющее две вершины, показывает наличие между ними определённых отношений. Рёбра могут быть одно- и двунаправленными. Если все рёбра графа однонаправленные, то мы называем его направленным графом.

Вес - рёбра могут иметь вес, показывающий стоимость перемещения от одной вершины к другой. Например, в графе дорог, связывающих города, вес ребра может отображать расстояние между двумя населёнными пунктами.

Путь в графе - это последовательность вершин, соединённых рёбрами.

Цикл в направленном графе начинается и заканчивается в одной и той же вершине.

Есть две широко известные реализации графа: матрица смежности и список смежности.

Одним из простейших способов реализовать граф является использование двумерной матрицы. Таблица осями которой являются вершины графа, если они связаны то значением являются ребра.

Более пространственно-экономичным способом реализации разреженного графа является использование списка смежности. Список, внутри которого списки содержащие связаные вершины.

*/

// вершина
class Vertex {
    constructor(p) {
        this.id = p.id;
        this.connectedTo = {};
        this.color = 'white';
        this.parent = undefined;
        this.distance = 0;
    }

    addNeighbor(nbr, weight = 0) {
        this.connectedTo[nbr.id] = weight;
    }
}

// граф
class Graph {
    constructor() {
        this.vertices = {};
        this.numVertices = 0;
    }

    // вершина
    addVertex(value) {
        this.numVertices = this.numVertices + 1;
        const nv = new Vertex({
            id: value,
        });
        this.vertices[value] = nv;
        return nv;
    }

    // ребро
    addEdge(from, to, weight = 0) {
        if (from.id === to.id) {
            return;
        }
        from.addNeighbor(to, weight);
        to.addNeighbor(from, weight);
    }

    // breadth first search - проходит по всем дочерним элементам, потом по их потомкам, используется очередь
    bfs(from, to) {
        const queue = [ from ];
        let search = undefined;

        while (queue.length && ! search) {
            const val = queue.shift();
            val.color = 'grey';

            for (const k in val.connectedTo) {
                const v = this.vertices[k];
                if (v.color !== 'white') {
                    continue;
                }
                v.distance = val.distance + 1;
                v.parent = val;

                if (v.id === to.id) {
                    search = v;
                    break;
                }

                queue.push(v);
            }

            val.color = 'black';
        }

        return to;
    }

    // deep first search - проходит по всем потомкам одной вершины, потом переходит к соседям, используется стек
    dfs(from, to) {
        const stack = [ from ];
        let search = undefined;

        while (stack.length && ! search) {
            const val = stack.pop();
            val.color = 'grey';

            for (const k in val.connectedTo) {
                const v = this.vertices[k];
                if (v.color !== 'white') {
                    continue;
                }
                v.distance = val.distance + 1;
                v.parent = val;

                if (v.id === to.id) {
                    search = v;
                    break;
                }

                stack.push(v);
            }

            val.color = 'black';
        }

        return to;
    }


    // traverse
    traverse(from) {
        console.log('from', from.id, from.distance);
        if (from.parent) {
            this.traverse(from.parent);
        }
    }
}

// задача - найти путь от одного слова до другого, меняя 1 букву
let words = [
    "FOOL", "POOL", "POLL", "POLE",
    "PALE", "SALE", "SAGE", "POPE",
    "ROPE", "NOPE", "PIPE", "PAPE",
    "POLE", "PORE", "FAIL", "FALL",
    "PALL", "COOL", "PAGE", "HOPE",
    "FOUL", "FOIL"
];

// группируем слова, создаем ключ меняя одну букву на _ и помещаем в массив все слова подходящие под этот ключ
const groupWords = (words) => {
    const groupedWords = {};
    for (const word of words) {
        for (let i = 0; i < 4; i++) {
            let key = word.substring(0, i) + '_';
            if (i !== 3) {
                key += word.substring(i + 1, 4);
            }

            if (! groupedWords[key]) {
                groupedWords[key] = [];
            }

            groupedWords[key].push(word);
        };
    }

    return groupedWords;
};

// наполняем класс
const buildWordsGraph = () => {
    const graph = new Graph();
    const groupedWords = groupWords(words);

    // добавляем в граф вершины
    for (const word of words) {
        graph.addVertex(word);
    }

    // проходимся по сгруиированным словам и связываем вершины
    for (const k in groupedWords) {
        const arr = groupedWords[k];
        if (arr.length <= 1) {
            continue;
        }

        for (let i = 0; i < arr.length; i++) {
            const v1 =  graph.vertices[arr[i]];
            for (let j = 0; j < arr.length; j++) {
                const v2 =  graph.vertices[arr[j]];
                graph.addEdge(v1, v2);
            }
        }
    }

    return graph;
};

// проходимся в глубину и ширину чтобы найти путь

// console.log('bfs');
// let graph = buildWordsGraph();
// const bfs = graph.bfs(graph.vertices['FOOL'], graph.vertices['FALL']);
// graph.traverse(bfs);

// console.log('dfs');
// graph = buildWordsGraph();
// const dfs = graph.dfs(graph.vertices['FOOL'], graph.vertices['FALL']);
// graph.traverse(dfs);
