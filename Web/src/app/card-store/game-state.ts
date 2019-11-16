export enum GamePhase
{
    default,
    combat
}

export enum GameStatePhase
{
    default,
    target
}

export class GameState
{
    public Mana = 10;
    public SpellMana = 3;
    public Phase = GamePhase.default;
    public InternalPhase = GameStatePhase.default;
    public AttackToken = true;
    public IsChallenging = false;
}

export const gameState = new GameState ( );