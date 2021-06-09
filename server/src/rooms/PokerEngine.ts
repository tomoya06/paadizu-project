import { CountDownMan } from "../../../common/utils/time";
import { MyRoom } from "./MyRoom";

export default class PockerEngine {
  private room!: MyRoom;

  private countdownMan: CountDownMan;

  private stacks: string[] = [];
}