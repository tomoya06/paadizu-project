import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";
import { UserOptions } from '../../../common/types';

export class MyRoom extends Room<MyRoomState> {
  maxClients = 4;
  autoDispose = false;

  onCreate (options: UserOptions) {
    this.setState(new MyRoomState());

    this.onMessage("type", (client, message) => {
      //
      // handle "type" message
      //
    });
  }

  onAuth(client: Client, options: UserOptions): boolean {
    if (!options || !options.userId) return false;
    if (this.clients.some((client) => client.userData && client.userData.userId === options.userId)) return false;
    return true;
  }

  onJoin (client: Client, options: UserOptions) {
    console.log(client.sessionId, options.userId, "joined!");
    client.userData = options;
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
