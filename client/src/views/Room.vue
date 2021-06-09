<template>
  <div style="border:1px solid #e9e9e9">
    <template v-if="!myRoom">
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
import {
  RoomEvents, RoomMessage,
} from '../../../common/types';
import { PlayerState, MyRoomState, GameState } from '../../../common/schema/MyRoomState';

@Component
export default class Room extends Vue {
  @State
  private myRoom!: Colyseus.Room<MyRoomState>|null;

  private players: Record<string, PlayerState> = {};

  private msgList: RoomMessage[] = [];

  private message = '';

  private gameState: Record<string, any> = {};

  created(): void {
    const { myRoom } = this;
    if (!myRoom) return;
    console.log('handleMyRoomChange');

    myRoom.onMessage(RoomEvents.Message, (payload: RoomMessage) => {
      this.msgList.push(payload);
    });

    // FIXME: 状态变化不好玩
    // myRoom.onStateChange(this.handleGameStateChange);
    myRoom.state.players.onChange = (player, key) => {
      this.players[key] = player;
    };
    myRoom.state.gameState.onChange = (changes) => {
      changes.forEach((change) => {
        if (!this.gameState) this.gameState = {};
        this.gameState[change.field] = change.value;
      });
    };
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
}
</script>
