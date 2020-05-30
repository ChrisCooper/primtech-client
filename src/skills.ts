export class SkillLevel {
    private constructor(public value: number) {}
    static of(value: number) {return new SkillLevel(value)}
}
export class Skill {
    constructor(
        public name: string,
        private mean: SkillLevel,
        public hourly_energy_expenditure: number = 1.0) {
        }

    static RESTING = new Skill("resting", SkillLevel.of(10), 1.0)
    static FORAGING = new Skill("foraging", SkillLevel.of(10), 1.0)
    static HUNTING = new Skill("hunting", SkillLevel.of(10), 1.0)
    static STONE_KNIFE_MAKING = new Skill("stone knife making", SkillLevel.of(10), 1.0)
    static TRAPPING = new Skill("trapping", SkillLevel.of(10), 1.0)
}