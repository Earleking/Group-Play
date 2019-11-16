enum GamePhase
{
    attack,
    defend
}

enum GameStatePhase
{
    default,
    target
}

export class GameState
{
    public Mana = 10;
    public SpellMana = 3;
    public Phase = GamePhase.attack;
    public InternalPhase = GameStatePhase.default;
}

export var gameState = new GameState ( );