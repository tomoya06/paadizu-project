export interface UserOptions {
  userId: string;
  userName: string;
}

export interface RoomMessage {
  msgId: string;
  from: UserOptions;
  msg: string;
}

export enum RoomName {
  Lobby = 'lobby',
  Poker = 'my_room',
}

export enum GameActionType {
  PlayCard,
  Giveup,
}


export enum GameStatus {
  IDLE = "IDLE",
  READY = "READY",
  RUNNING = "RUNNING",
  FINISH = "FINISH",
}

export enum PdzRole {
  CIVILIAN = "CIVILIAN",
  FRANKLIN = "FRANKLIN",
  SQUIRE = "SQUIRE",
}

export interface GameActionPayload {
  type: GameActionType,
  
}


export interface GameStatusPayload {
  status: GameStatus,
  countdown: number,
}

export enum RoomEvents {
  Players = 'Players',
  Message = 'ChatMessage',
  SendMessage = 'SendMessage',
  GameStatus = 'GamingStatus',
  // 打牌相关
  GameAction = 'GameAction',
}
