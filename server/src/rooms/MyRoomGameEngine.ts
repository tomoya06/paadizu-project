import { Client } from "colyseus";
import { GameActionPayload, GameStatus, GameStatusPayload, RoomEvents } from "../../../common/types";
import { MyRoom } from "./MyRoom";
import { CountDownMan } from '../../../common/utils/time';

export default class GameEngine {
  private room!: MyRoom;

  private countdownMan: CountDownMan;

  private gameStatus = GameStatus.IDLE;

  constructor(room: MyRoom) {
    this.room = room;

    this.registerEvents();
  }

  get roomState() {
    return this.room.state;
  }

  public actionHandler() {}

  public start() {
    if (this.gameStatus !== GameStatus.READY) return;
    this.clearCountdown();
    this.gameStatus = GameStatus.RUNNING;
    this.broadcastRoomStatus();

    // // MOCK GAME OVER
    // setTimeout(() => {
    //   this.finish();
    // }, 3000);
  }

  public ready() {
    this.clearCountdown();
    if (![GameStatus.IDLE, GameStatus.FINISH].includes(this.gameStatus)) return;
    this.gameStatus = GameStatus.READY;

    this.countdownMan = new CountDownMan(3, (num: number) => {
      this.broadcastRoomStatus(num);
      if (num === 0) {
        this.start();
      }
    })
  }

  public finish() {
    this.clearCountdown();
    if (this.gameStatus !== GameStatus.RUNNING) return;
    this.gameStatus = GameStatus.FINISH;
    this.countdownMan = new CountDownMan(5, (num: number) => {
      this.broadcastRoomStatus(num);
      if (num === 0) {
        this.ready();
      }
    })
  }

  public destroy() {
    this.clearCountdown();
    this.gameStatus = GameStatus.IDLE;
    this.broadcastRoomStatus();
  }

  private registerEvents() {
    this.room.onMessage(RoomEvents.GameAction, (client: Client, message: GameActionPayload) => {
      
    })
  }

  private clearCountdown() {
    if (this.countdownMan) {
      this.countdownMan.stop();
      this.countdownMan = null;
    }
  }

  private broadcastRoomStatus(countdown = 0) {
    const payload: GameStatusPayload = {
      status: this.gameStatus,
      countdown,
    }
    this.room.broadcast(RoomEvents.GameStatus, payload);
  }
}