import { Schema, Context, type, ArraySchema, MapSchema } from "@colyseus/schema";
import { GameStatus, PdzRole, UserOptions } from "../types";

export class PlayerState extends Schema {
  @type("string") userId: string;
  @type("string") userName: string;
  @type("string") sessionId: string;

  constructor(sessionId: string, userOptions: UserOptions) {
    super();
    this.userId = userOptions.userId;
    this.userName = userOptions.userName;
    this.sessionId = sessionId;
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
  @type("string") status: GameStatus = GameStatus.IDLE;
  @type("number") index: number = -1;
  @type([PlayCard]) stacks = new ArraySchema<PlayCard>();
  @type({ map: PdzPlayer }) players = new MapSchema<PdzPlayer>();
}

export class MyRoomState extends Schema {

  @type([PlayerState]) players = new ArraySchema<PlayerState>();

  @type(GameState) game = new GameState();
}
