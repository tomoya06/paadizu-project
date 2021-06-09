import { Schema, Context, type, ArraySchema, MapSchema } from "@colyseus/schema";
import { GameStatus, PdzRole, UserOptions } from "../types";

export class PlayerState extends Schema {
  @type("string") userId: string;
  @type("string") userName: string;
  @type("string") sessionId: string;
  @type("string") seat: string;

  constructor(sessionId: string, userOptions: UserOptions, seat: string) {
    super();
    this.userId = userOptions.userId;
    this.userName = userOptions.userName;
    this.sessionId = sessionId;
    this.seat = seat;
  }
}

export class PlayCard extends Schema {
  @type("string") userId: string;
  @type(["string"]) cards: string[];

  constructor(userId: string, cards: string[]) {
    super();
    this.userId = userId;
    this.cards = cards;
  }
}

export class PdzPlayer extends Schema {
  @type("string") userId: string;
  @type(["string"]) cards: string[];
  @type("string") role: PdzRole;

  constructor(userId:string, cards:string[]) {
    super();
    this.userId = userId;
    this.cards = cards;
    // FIXME: 判断身份
    this.role = PdzRole.CIVILIAN;
  }
}


export class GameState extends Schema {
  @type("string") gameStatus: GameStatus = GameStatus.IDLE;
  @type("number") countdown: number = 0;
}

export class PokerState extends Schema {
}

export class MyRoomState extends Schema {

  @type({map: PlayerState}) players = new MapSchema<PlayerState>();

  @type(GameState) gameState: GameState = new GameState();
}
