/* eslint-disable */
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

export enum RoomEvents {
  Players = 'Players',
  Message = 'ChatMessage',
  SendMessage = 'SendMessage',
}
