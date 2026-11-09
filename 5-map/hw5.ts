class SimpleHashMap<K extends string | number, V> {
    private buckets: Array<Array<[K, V]>>;
    private capacity: number;

    constructor(capacity: number = 42) {
        this.capacity = capacity;
        // Инициализируем массив пустых корзин
        this.buckets = Array.from({ length: this.capacity }, () => []);
    }

    /**
     * Метод хеширования (генерация индекса корзины из ключа)
     */
    private hash(key: K): number {
        const keyStr = String(key);
        let hashValue = 5381; // Стартовое число алгоритма DJB2

        for (let i = 0; i < keyStr.length; i++) {
            const charCode = keyStr.charCodeAt(i);
            // Битовый сдвиг hashValue * 33 + charCode
            hashValue = ((hashValue << 5) + hashValue) + charCode;
        }

        // Возвращаем индекс в пределах размера нашего массива
        return Math.abs(hashValue) % this.capacity;
    }

    /**
     * Метод добавления ключ-значение
     */
    public set(key: K, value: V): void {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        // Если ключ уже есть, обновляем значение (разрешение коллизий)
        for (const pair of bucket) {
            if (pair[0] === key) {
                pair[1] = value;
                return;
            }
        }

        // Если ключа нет, добавляем новую пару
        bucket.push([key, value]);
    }

    /**
     * Метод получения значения по ключу
     */
    public get(key: K): V | undefined {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (const pair of bucket) {
            if (pair[0] === key) {
                return pair[1];
            }
        }
        return undefined; // Ключ не найден
    }

    public delete(key:K): void {
        const index = this.hash(key);
        const bucket = this.buckets[index];
        const deletedIndex:number = bucket.findIndex(element => element[0] === key);
        if (deletedIndex > -1) {
            bucket.splice(deletedIndex, 1);
            this.buckets[index] = [...bucket];
        }
    }

    public clear(): void {
        this.buckets = Array.from({ length: this.capacity }, () => []);
    }
}

// Пример использования:
const map = new SimpleHashMap<string, number>(10);
map.set("user_1", 25);
map.set("user_2", 30);
map.set("user_3", 35);
map.set("user_4", 70);
map.set("user_5", 90);

console.log(map.get("user_1")); // 25
map.delete("user_1");
map.clear()
console.log(map);
map.set("user_55", 55);
console.log(map);
