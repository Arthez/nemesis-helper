// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export class Shuffler {

    public static multipleShuffle<T>(array: T[], times: number): T[] {
        let resultArray: T[] = [];
        for (let i: number = 0; i < times; i++) {
            resultArray = Shuffler.shuffle(array);
        }
        return resultArray;
    }

    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    public static shuffle<T>(array: T[]): T[] {
        const arrayCopy: T[] = [...array];
        for (let index: number = arrayCopy.length - 1; index > 0; index--) {
            const randomizedIndex: number = Math.floor(Math.random() * (index + 1));
            [arrayCopy[index], arrayCopy[randomizedIndex]] = [arrayCopy[randomizedIndex], arrayCopy[index]];
        }
        return arrayCopy;
    }

    // https://en.wikipedia.org/wiki/Schwartzian_transform
    public static schwartzianShuffle<T>(array: T[]): T[] {
        return array
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    }

}
