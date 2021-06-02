import { Schema, Context, type, ArraySchema } from "@colyseus/schema";
import { UserOptions } from "../types";

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

export class MyRoomState extends Schema {

  @type([PlayerState]) players = new ArraySchema<PlayerState>();

}
