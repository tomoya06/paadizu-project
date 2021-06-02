<template>
  <div class="home">
    <div class="rooms">
      <div>LOBBY</div>
      <div class="room" v-for="room in allRooms" :key="room.roomId">
        <span>ROOM #{{ room.roomId }} </span>
        <span>HAS {{ room.clients }}/{{ room.maxClients }}</span>
        <button @click="() => enterRoom(room)">Enter</button>
        <button @click="() => leaveRoom(room)" v-show="myRoom && room.roomId === myRoom.id">
          Leave
        </button>
      </div>
    </div>
    <div class="room-action">
      <button @click="createRoom">Create</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Inject, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import * as Colyseus from 'colyseus.js';
import { RoomAvailable } from 'colyseus.js';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {
  @Inject()
  private client!: Colyseus.Client;

  @Inject()
  private userId!: string;

  private lobby: Colyseus.Room|null = null;

  private myRoom: Colyseus.Room|null = null;

  private allRooms: RoomAvailable[] = [];

  async mounted(): Promise<void> {
    const lobby = await this.client.joinOrCreate('lobby');
    lobby.onMessage('rooms', (rooms) => {
      this.allRooms = rooms;
    });
    lobby.onMessage('+', ([roomId, room]) => {
      const roomIndex = this.allRooms.findIndex((_room) => _room.roomId === roomId);
      if (roomIndex !== -1) {
        this.allRooms.splice(roomIndex, 1, room);
      } else {
        this.allRooms.push(room);
      }
    });
    lobby.onMessage('-', (roomId) => {
      this.allRooms = this.allRooms.filter((room) => room.roomId !== roomId);
    });
    this.lobby = lobby;
  }

  async createRoom(): Promise<void> {
    try {
      this.myRoom = await this.client.joinOrCreate('my_room', { userId: this.userId });
      console.log(this.myRoom);
    } catch (error) {
      console.log(error);
    }
  }

  async enterRoom(room: RoomAvailable): Promise<void> {
    try {
      this.myRoom = await this.client.joinById(room.roomId, { userId: this.userId });
      console.log(this.myRoom);
    } catch (error) {
      console.log('failed to enter', error);
    }
  }

  async leaveRoom(room: RoomAvailable): Promise<void> {
    if (!this.myRoom || this.myRoom.id !== room.roomId) return;
    try {
      await this.myRoom.leave();
    } catch (error) {
      console.log('failed to leave room', error);
    }
  }

  beforeDestroy(): void {
    if (!this.lobby) return;
    this.lobby.leave();
  }
}
</script>
