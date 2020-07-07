/*

Поведенческие паттерны проектирования -  решают задачи эффективного и безопасного взаимодействия между объектами программы.

Цепочка обязанностей — это поведенческий паттерн проектирования, который позволяет передавать запросы последовательно по цепочке обработчиков. Каждый последующий обработчик решает, может ли он обработать запрос сам и стоит ли передавать запрос дальше по цепи.
Цепочка обязанностей базируется на том, чтобы превратить отдельные поведения в объекты. В нашем случае каждая проверка переедет в отдельный класс с единственным методом выполнения.

*/


for (let i = 0; i < 10; i++) {
    console.log('1) i - ', i);
    let j = i + 1;
    console.log('1) j - ', j);
}

for (let i = 0; i < 10; ++i) {
    console.log('2) i - ', i);
    let j = i + 1;
    console.log('2) j - ', j);
}