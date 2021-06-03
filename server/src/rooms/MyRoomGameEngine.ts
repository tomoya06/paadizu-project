import { MyRoomState } from "../../../common/schema/MyRoomState";
import { MyRoom } from "./MyRoom";

export default class GameEngine {
  private room!: MyRoom;

  constructor(room: MyRoom) {
    this.room = room;
  }

  get roomState() {
    return this.room.state;
  }

  public actionHandler() {}

  public gameSudato() {
    
  }

  public destroy() {}
}