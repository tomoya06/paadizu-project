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

export interface GameActionPayload {
  type: GameActionType,
  
}

export enum RoomEvents {
  Players = 'Players',
  Message = 'ChatMessage',
  SendMessage = 'SendMessage',
  // 打牌相关
  GameAction = 'GameAction',
}
