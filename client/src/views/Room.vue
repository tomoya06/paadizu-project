<template>
  <div style="border:1px solid #e9e9e9">
    <template v-if="!myRoom">
      <div>not in any room</div>
    </template>
    <template v-else>
      <div>{{ myRoom.id }} {{ myRoom.name }}</div>
      <div v-for="player in players" :key="player.userId">
        <div>{{player.userId}} {{player.sessionId}}</div>
      </div>

      <div>
        <input type="text" v-model="message">
        <button @click="sendMessage">send</button>
        <div>
          <div v-for="msg in msgList" :key="msg.msgId">
            @{{msg.from.userId}}: {{msg.msg}}
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
import { RoomEvents, RoomMessage } from '../../../common/types';
import { PlayerState } from '../../../common/schema/MyRoomState';

@Component
export default class Room extends Vue {
  @State
  private myRoom!: Colyseus.Room|null;

  private players: PlayerState[] = [];

  private msgList: RoomMessage[] = [];

  private message = '';

  created(): void {
    const { myRoom } = this;
    if (!myRoom) return;
    console.log('handleMyRoomChange');

    myRoom.onMessage(RoomEvents.Players, (players: PlayerState[]) => {
      this.players = players;
    });

    myRoom.onMessage(RoomEvents.Message, (payload: RoomMessage) => {
      this.msgList.push(payload);
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
}
</script>
