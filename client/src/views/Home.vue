<template>
  <div class="home">
    <div class="rooms">
      <template v-if="lobby">
        <div>{{lobby.name}} #{{lobby.id}}</div>
        <div>USERID: {{userId}}</div>
      </template>
      <div class="room" v-for="room in allRooms" :key="room.roomId">
        <span>ROOM #{{ room.roomId }} </span>
        <span>HAS {{ room.clients }}/{{ room.maxClients }}</span>
        <button @click="() => enterRoomHandler(room)" v-show="!myRoomId">Enter</button>
        <button @click="() => leaveRoomHandler()" v-show="room.roomId === myRoomId">
          Leave
        </button>
      </div>
      <Room v-if="myRoomId"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as Colyseus from 'colyseus.js';
import { RoomAvailable } from 'colyseus.js';
import {
  State, Action, Getter,
} from 'vuex-class';
import types from '@/store/types';
import Room from './Room.vue';

@Component({
  components: {
    Room,
  },
})
export default class Home extends Vue {
  @State('lobby')
  private lobby!: Colyseus.Room|null;

  @State('allRooms')
  private allRooms!: RoomAvailable[];

  @Getter('myRoomId')
  private myRoomId!: string;

  @State
  private userId!: string;

  @Action(types.ENTER_ROOM)
  private enterRoom!: ({ roomId }:{roomId: string}) => void;

  @Action(types.LEAVE_ROOM)
  private leaveRoom!: () => void;

  async enterRoomHandler(room: RoomAvailable): Promise<void> {
    this.enterRoom({ roomId: room.roomId });
  }

  async leaveRoomHandler(): Promise<void> {
    this.leaveRoom();
  }
}
</script>
