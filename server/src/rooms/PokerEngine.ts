import { Client } from "colyseus";
import { GameActionPayload, RoomEvents } from "../../../common/types";
import { CountDownMan } from "../../../common/utils/time";
import { MyRoom } from "./MyRoom";

export default class PokerEngine {
  private room!: MyRoom;

  private countdownMan: CountDownMan;

  private stacks: string[] = [];

  constructor(room: MyRoom) {
    this.room = room;

    this.registerEvents();
  }

  
  private registerEvents() {
  }

  public destroy() {
  }
}