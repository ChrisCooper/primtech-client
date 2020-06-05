export class AptitudeLevel {
    private constructor(public value: number) {}
    static of(value: number) {return new AptitudeLevel(value)}
}
export class Aptitude {
    constructor(
        private mean: AptitudeLevel
    ) {}

    static DETAIL_WORK = new Aptitude(AptitudeLevel.of(10))
    static BRUTE_STRENGTH = new Aptitude(AptitudeLevel.of(10))
    static PLANNING = new Aptitude(AptitudeLevel.of(10))
    static FOCUS = new Aptitude(AptitudeLevel.of(10))
    static OBSERVATION = new Aptitude(AptitudeLevel.of(10))
}
