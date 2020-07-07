const FizzBuzz = () => {
    for (let i = 1; i < 101; i++) {
        if (i % 15 === 0) {
            console.log('FizzBuzz');
        } else if (i % 3 === 0) {
            console.log('Fizz');
        } else if (i % 5 === 0) {
            console.log('Buzz')
        } else {
            console.log(i);
        }
    }
};

// FizzBuzz();


/*
For pros = ["Jack", "Leon", "Maria"] and

preferences = [
["Computer repair", "Handyman", "House cleaning"],
["Computer lessons", "Computer repair", "Data recovery service"],
["Computer lessons", "House cleaning"]
]

the output should be
[
    [["Computer lessons"], ["Leon", "Maria"]],
    [["Computer repair"], ["Jack", "Leon"]],
    [["Data recovery service"], ["Leon"]],
    [["Handyman"], ["Jack"]],
    [["House cleaning"], ["Jack", "Maria"]]
]

*/

function proCategorization(pros, preferences) {
    const grouped = {};
    for (let i = 0; i < preferences.length; i++) {
        for (let j in preferences[i]) {
            if (! grouped[preferences[i][j]]) {
                grouped[preferences[i][j]] = [];
            }
            grouped[preferences[i][j]].push(pros[i]);
        }
    }
    return Object.keys(grouped).sort().map(k => [[k], grouped[k].sort()]);
}
/*
console.log(
    proCategorization(
        ["First",  "Fourth",  "Second",  "Third"],
        [
            ["One","Three","Two"],
            ["One","One three","One two"],
            ["One two","One two three","Two"],
            ["One","One three","One two","One two three","Three","Two"]
        ]
    )
);
*/

/*
You are given 5 variables: sharkDistance = distance the shark needs to cover to eat you in metres, sharkSpeed = how fast it can move in metres/second, pontoonDistance = how far you need to swim to safety in metres, youSpeed = how fast you can swim in metres/second, dolphin = a boolean, if true, you can half the swimming speed of the shark as the dolphin will attack it.

If you make it, return "Alive!", if not, return "Shark Bait!".
*/

function shark(pontoonDistance, sharkDistance, youSpeed, sharkSpeed, dolphin){
    if (dolphin) {
        sharkSpeed = Math.ceil(sharkSpeed / 2);
    }
    return (pontoonDistance / youSpeed < sharkDistance / sharkSpeed) ? 'Alive!' : 'Shark Bait!';
}

// console.log(shark(12, 50, 4, 8, true)); // "Alive!"
// console.log(shark(7, 55, 4, 16, true)); // "Alive!"
// console.log(shark(24, 0, 4, 8, true)); // "Shark Bait!"


/*

Josephus Permutation
https://www.codewars.com/kata/5550d638a99ddb113e0000a2

[1,2,3,4,5,6,7] - initial sequence
[1,2,4,5,6,7] => 3 is counted out and goes into the result [3]
[1,2,4,5,7] => 6 is counted out and goes into the result [3,6]
[1,4,5,7] => 2 is counted out and goes into the result [3,6,2]
[1,4,5] => 7 is counted out and goes into the result [3,6,2,7]
[1,4] => 5 is counted out and goes into the result [3,6,2,7,5]
[4] => 1 is counted out and goes into the result [3,6,2,7,5,1]
[] => 4 is counted out and goes into the result [3,6,2,7,5,1,4]

Test.assertSimilar(josephus([1,2,3,4,5,6,7,8,9,10],1),[1,2,3,4,5,6,7,8,9,10])
Test.assertSimilar(josephus([1,2,3,4,5,6,7,8,9,10],2),[2, 4, 6, 8, 10, 3, 7, 1, 9, 5])
Test.assertSimilar(josephus(["C","o","d","e","W","a","r","s"],4),['e', 's', 'W', 'o', 'C', 'd', 'r', 'a'])
Test.assertSimilar(josephus([1,2,3,4,5,6,7],3),[3, 6, 2, 7, 5, 1, 4])
Test.assertSimilar(josephus([],3),[])

*/

function josephus(items, k) {
    let i = 1;
    let removed = [];

    while (items.length) {
        const v = items.shift();
        if (i % k === 0) {
            removed.push(v);
        } else {
            items.push(v);
        }
        i++;
    }
    return removed;
}

// [2,4,6,8,10,3,7,1,9,5]
// console.log('josephus', josephus(["C","o","d","e","W","a","r","s"],4));
// console.log('josephus', josephus([1,2,3,4,5,6,7,8,9,10],1));

/*
Convert A Hex String To RGB

#FF9933
parseInt('FF', 16);
parseInt('99', 16);
parseInt('33', 16);

console.log(
    parseInt('FF', 16),
    parseInt('99', 16),
    parseInt('33', 16)
);

hexStringToRGB("#FF9933"), {r:255, g:153, b:51}
*/

function hexStringToRGB(hexString) {
    const result = {r: 0, g: 0, b: 0};

    if (hexString.length === 7) {
        result.r = parseInt(hexString.slice(1, 3), 16);
        result.g = parseInt(hexString.slice(3, 5), 16);
        result.b = parseInt(hexString.slice(5, 7), 16);
    } else {
        result.r = parseInt(hexString.slice(1, 2), 16);
        result.g = parseInt(hexString.slice(2, 3), 16);
        result.b = parseInt(hexString.slice(3, 4), 16);
    }

    return result;
}

console.log('hexStringToRGB', hexStringToRGB("#FF9933"));