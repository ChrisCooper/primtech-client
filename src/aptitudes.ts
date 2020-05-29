export class AptitudeLevel {
    private constructor(public value: number) {}
    static of(value: number) {return new AptitudeLevel(value)}
}
export class Aptitude {
    constructor(
        private mean: AptitudeLevel,
        public hourly_energy_expenditure: number = 1.0) {
        }

    static DETAIL_WORK = new Aptitude(AptitudeLevel.of(10), 1.0)
    static BRUTE_STRENGTH = new Aptitude(AptitudeLevel.of(10), 1.0)
    static PLANNING = new Aptitude(AptitudeLevel.of(10), 1.0)
    static FOCUS = new Aptitude(AptitudeLevel.of(10), 1.0)
}
