import { Room, Client } from "colyseus";
import { MyRoomState, PlayerState } from "../../../common/schema/MyRoomState";
import { RoomEvents, UserOptions, RoomMessage, GameActionPayload } from '../../../common/types';
import { v4 as uuidv4 } from 'uuid';
import GameEngine from "./MyRoomGameEngine";

export class MyRoom extends Room<MyRoomState> {
  maxClients = 4;
  autoDispose = false;

  gameEngine: GameEngine;

  onCreate (options: UserOptions) {
    this.setState(new MyRoomState());

    /*
     注意：房间事件应该只有一次注册
     */

    this.onMessage(RoomEvents.SendMessage, (client: Client, message: string) => {
      if (!client.userData) return;
      const userData = client.userData as UserOptions;
      const payload: RoomMessage = {
        msgId: uuidv4(),
        from: userData,
        msg: message,
      }
      this.broadcast(RoomEvents.Message, payload);
    });

    const gameEngine = new GameEngine(this);

    this.onMessage(RoomEvents.GameAction, (client: Client, payload: GameActionPayload) => {
      gameEngine.actionHandler(client, payload);
    })

    this.gameEngine = gameEngine;
  }

  onAuth(client: Client, options: UserOptions): boolean {
    if (!options || !options.userId) return false;
    if (this.clients.some((client) => client.userData && client.userData.userId === options.userId)) return false;
    return true;
  }

  onJoin (client: Client, options: UserOptions) {
    console.log(client.sessionId, options.userName, "joined!");
    client.userData = options;
    const playerState = new PlayerState(client.sessionId, options);
    this.state.players.push(playerState);

    this.handlePlayerChange();
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");

    this.state.players.deleteAt(this.state.players.findIndex((state) => state.sessionId === client.sessionId));
    this.handlePlayerChange();
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

  handlePlayerChange() {
    this.broadcast(RoomEvents.Players, this.state.players);
    this.gameEngine.broadcastRoomStatus();

    if (this.isRoomFull) {
      console.log('ready gameEngine');
      this.gameEngine.ready();
    } else {
      console.log('destroy gameEngine');
      this.gameEngine.destroy();
    }
  }

  get isRoomFull(): boolean {
    return this.clients.length === this.maxClients;
  }

}