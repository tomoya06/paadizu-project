import { Client } from "colyseus";
import { MyRoomState } from "../../../common/schema/MyRoomState";
import { GameActionPayload, RoomEvents } from "../../../common/types";
import { MyRoom } from "./MyRoom";

export default class GameEngine {
  private room!: MyRoom;

  constructor(room: MyRoom) {
    this.room = room;

    this.registerEvents();
  }

  get roomState() {
    return this.room.state;
  }

  public actionHandler() {}

  public start() {

  }

  public ready() {}

  public destroy() {}

  private registerEvents() {
    this.room.onMessage(RoomEvents.GameAction, (client: Client, message: GameActionPayload)=> {
      
    })
  }
}