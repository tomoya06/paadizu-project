<template>
  <div class="home">
    <div class="rooms">
      <template v-if="lobby">
        <div>{{lobby.name}} #{{lobby.id}}</div>
      </template>
      <div class="room" v-for="room in allRooms" :key="room.roomId">
        <span>ROOM #{{ room.roomId }} </span>
        <span>HAS {{ room.clients }}/{{ room.maxClients }}</span>
        <button @click="() => enterRoomHandler(room)" v-show="!myRoomId">Enter</button>
        <button @click="() => leaveRoomHandler(room)" v-show="room.roomId === myRoomId">
          Leave
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import * as Colyseus from 'colyseus.js';
import { RoomAvailable } from 'colyseus.js';
import {
  State, Action, Mutation, Getter,
} from 'vuex-class';
import types from '@/store/types';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  @State('lobby')
  private lobby!: Colyseus.Room|null;

  @State('allRooms')
  private allRooms!: RoomAvailable[];

  @Getter('myRoomId')
  private myRoomId!: string;

  @Action(types.ENTER_ROOM)
  private enterRoom!: ({ roomId }:{roomId: string}) => void;

  @Action(types.LEAVE_ROOM)
  private leaveRoom!: () => void;

  async enterRoomHandler(room: RoomAvailable): Promise<void> {
    this.enterRoom({ roomId: room.roomId });
  }

  async leaveRoomHandler(room: RoomAvailable): Promise<void> {
    this.leaveRoom();
  }
}
</script>
