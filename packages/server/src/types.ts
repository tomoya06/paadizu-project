import { Client } from "colyseus";
import { UserOptions } from "../../common/types";

export interface UserClient extends Client {
  userData: UserOptions;
}