import { Client } from "colyseus";
import { GameActionPayload, GameStatus, GameStatusPayload, RoomEvents } from "../../../common/types";
import { MyRoom } from "./MyRoom";
import { CountDownMan } from '../../../common/utils/time';
import PokerEngine from "./PokerEngine";

export default class GameEngine {
  private room!: MyRoom;

  private countdownMan: CountDownMan;

  private pokerEngine: PokerEngine;

  constructor(room: MyRoom) {
    this.room = room;
  }

  get roomState() {
    return this.room.state;
  }

  get gameStatus() {
    return this.room.state.gameState.gameStatus;
  }

  set gameStatus(status: GameStatus) {
    this.room.state.gameState.gameStatus = status;
  }

  get countdown() {
    return this.room.state.gameState.countdown;
  }

  set countdown(num: number) {
    this.room.state.gameState.countdown = num;
  }

  public actionHandler(client: Client, payload: GameActionPayload) {
    if (this.gameStatus !== GameStatus.RUNNING) return;
    if (!this.pokerEngine) return;
  }

  public start() {
    if (this.gameStatus !== GameStatus.READY) return;
    this.resetRoomUtils();

    this.pokerEngine = new PokerEngine(this.room);

    this.gameStatus = GameStatus.RUNNING;
    // this.broadcastRoomStatus();

    // // MOCK GAME OVER
    // setTimeout(() => {
    //   this.finish();
    // }, 3000);
  }

  public ready() {
    this.resetRoomUtils();
    if (![GameStatus.IDLE, GameStatus.FINISH].includes(this.gameStatus)) return;
    this.gameStatus = GameStatus.READY;

    this.countdownMan = new CountDownMan(3, (num: number) => {
      this.countdown = num;
      if (num === 0) {
        this.start();
      }
    })
  }

  public finish() {
    this.resetRoomUtils();
    if (this.gameStatus !== GameStatus.RUNNING) return;
    this.gameStatus = GameStatus.FINISH;
    this.countdownMan = new CountDownMan(5, (num: number) => {
      this.countdown = num;
      if (num === 0) {
        this.ready();
      }
    })
  }

  public destroy() {
    this.resetRoomUtils();
    this.gameStatus = GameStatus.IDLE;
    // this.broadcastRoomStatus();
  }

  private resetRoomUtils() {
    if (this.countdownMan) {
      this.countdownMan.stop();
      this.countdownMan = null;
    }
    if (this.pokerEngine) {
      this.pokerEngine.destroy();
      this.pokerEngine = null;
    }
  }

  // public broadcastRoomStatus(countdown = 0) {
  //   const payload: GameStatusPayload = {
  //     status: this.gameStatus,
  //     countdown,
  //   }
  //   this.room.broadcast(RoomEvents.GameStatus, payload);
  // }
}