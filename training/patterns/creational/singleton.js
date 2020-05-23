/*
Порождающие паттерны проектирования - отвечают за удобное и безопасное создание новых объектов или даже целых семейств объектов.
Одиночка — это порождающий паттерн проектирования, который гарантирует, что у класса есть только один экземпляр, и предоставляет к нему глобальную точку доступа.
*/

class Repository {
    constructor() {
        this.db = null;
    }
    async connect() {
        if (this.db) {
            return this.db;
        }
        return new Promise((res) => {
            console.log('connection...');
            setTimeout(() => {
                this.db = [
                    {id: 1, value: 'one'},
                    {id: 2, value: 'two'},
                    {id: 3, value: 'three'},
                    {id: 4, value: 'four'},
                    {id: 5, value: 'five'},
                ];

                res(this.db);
            }, 3 * 1000);
        });
    }

    async getById(id) {
        const db = await this.connect();
        return this.db.find(v => (v.id === id));
    }
}

const worker = async () => {
    const repo = new Repository();
    const r5 = await repo.getById(5);
    console.log(r5);
    const r4 = await repo.getById(4);
    console.log(r4);
    const r3 = await repo.getById(3);
    console.log(r3);
    const r2 = await repo.getById(2);
    console.log(r2);
    const r1 = await repo.getById(1);
    console.log(r1);
}

worker();