export class Utils {
    static average(array: Array<number>) {
        return array.reduce((a, b) => a + b) / array.length;
    }
}