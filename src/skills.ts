export class SkillLevel {
    private constructor(public value: number) {}
    static of(value: number) {return new SkillLevel(value)}
}
export class Skill {
    constructor(
        private mean: SkillLevel,
        public hourly_energy_expenditure: number = 1.0) {
        }

    static RESTING = new Skill(SkillLevel.of(10), 1.0)
    static FORAGING = new Skill(SkillLevel.of(10), 1.0)
    static HUNTING = new Skill(SkillLevel.of(10), 1.0)
    static STONE_KNIFE_MAKING = new Skill(SkillLevel.of(10), 1.0)
    static TRAPPING = new Skill(SkillLevel.of(10), 1.0)
}