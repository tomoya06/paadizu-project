<template>
  <div style="border:1px solid #e9e9e9">
    <template v-if="!myRoom || !isReady">
      <div>not in any room</div>
    </template>
    <template v-else>
      <div>{{ myRoom.id }} {{ myRoom.name }} [STATUS: {{ gameStatusDisplay }}]</div>
      <div v-for="player in players" :key="player.userId">
        <div>{{player.userName}} {{player.sessionId}}</div>
      </div>

      <div>
        <input type="text" v-model="message">
        <button @click="sendMessage">send</button>
        <div>
          <div v-for="msg in msgList" :key="msg.msgId">
            @{{msg.from.userName}}: {{msg.msg}}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import * as Colyseus from 'colyseus.js';
import { State } from 'vuex-class';
import { MapSchema } from '@colyseus/schema';
import {
  RoomEvents, RoomMessage,
} from '../../../common/types';
import { PlayerState, MyRoomState, GameState } from '../../../common/schema/MyRoomState';

@Component
export default class Room extends Vue {
  @State
  private myRoom!: Colyseus.Room<MyRoomState>;

  private players: MapSchema<PlayerState>|null = null;

  private msgList: RoomMessage[] = [];

  private message = '';

  private gameState: GameState|null = null;

  created(): void {
    const { myRoom } = this;
    if (!myRoom) return;
    console.log('handleMyRoomChange');

    myRoom.onMessage(RoomEvents.Message, (payload: RoomMessage) => {
      this.msgList.push(payload);
    });

    myRoom.onStateChange((state: MyRoomState) => {
      this.players = state.players;
      this.gameState = state.gameState;
      console.log(this.players, this.gameState);
    });
  }

  sendMessage(): void {
    const { message, myRoom } = this;
    if (!message) return;
    if (myRoom) {
      myRoom.send(RoomEvents.SendMessage, message);
      this.message = '';
    }
  }

  get gameStatusDisplay(): string {
    if (!this.gameState) return '';
    return `${this.gameState.gameStatus} - ${this.gameState.countdown}`;
  }

  get isReady(): boolean {
    return !!this.players && !!this.gameState;
  }
}
</script>
