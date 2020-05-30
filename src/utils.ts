export class Utils {
    static average(array: Array<number>) {
        return array.reduce((a, b) => a + b) / array.length;
    }

    static zeroOneUniformRandom(): number {
        return Math.random()
    }
    
    static zeroOneNormalRandom(): number {
        let u = 0, v = 0;
        while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
        while (v === 0) v = Math.random();

        let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
        num = num / 10.0 + 0.5; // Translate to 0 -> 1

        if (num > 1 || num < 0) {
            return this.zeroOneNormalRandom() // resample between 0 and 1
        }

        return num;
    }

    static skewNormalRangeInclusive(min: number, max: number, skew: number): number {
        let u = 0, v = 0;
        while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
        while(v === 0) v = Math.random();
        let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    
        num = num / 10.0 + 0.5; // Translate to 0 -> 1
        if (num > 1 || num < 0) num = this.skewNormalRangeInclusive(min, max, skew); // resample between 0 and 1 if out of range
        num = Math.pow(num, skew); // Skew
        num *= max - min; // Stretch to fill range
        num += min; // offset to min
        return num;
    }

    static capitalizeFirstLetter(s: string): string {
        return s.charAt(0).toUpperCase() + s.slice(1);
      }
}