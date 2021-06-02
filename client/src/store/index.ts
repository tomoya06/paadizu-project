import Vue from 'vue';
import Vuex, { Commit, Dispatch } from 'vuex';
import { Client, Room, RoomAvailable } from 'colyseus.js';
import { v4 as uuidv4 } from 'uuid';
import types from './types';
import { RoomName } from '../../../common/types';

Vue.use(Vuex);

interface State {
  client: Client|null;
  lobby: Room|null;
  myRoom: Room|null;
  allRooms: RoomAvailable[];
  userId: string;
}

interface ActionParam {
  commit: Commit,
  state: State,
  dispatch: Dispatch,
}

export default new Vuex.Store({
  state: (): State => ({
    client: null,
    lobby: null,
    myRoom: null,
    allRooms: [],
    userId: uuidv4(),
  }),
  mutations: {
    [types.SET_CLIENT]: (state: State, client: Client) => {
      state.client = client;
    },
    [types.SET_LOBBY]: (state: State, lobby: Room) => {
      state.lobby = lobby;
    },
    [types.SET_MYROOM]: (state: State, room: Room) => {
      state.myRoom = room;
    },
  },
  getters: {
    myRoomId(state: State) {
      if (state.myRoom) return state.myRoom.id;
      return '';
    },
  },
  actions: {
    [types.INIT]: async ({ commit, dispatch }: ActionParam) => {
      const client = new Client('ws://localhost:2567');
      commit(types.SET_CLIENT, client);
      dispatch(types.ENTER_LOBBY);
    },
    [types.ENTER_LOBBY]: async ({ commit, state }: ActionParam) => {
      if (!state.client) throw new Error('no client');
      const lobby = await state.client.join(RoomName.Lobby);
      console.log('joined lobby');
      lobby.onMessage('rooms', (rooms) => {
        state.allRooms = rooms;
      });
      lobby.onMessage('+', ([roomId, room]) => {
        const roomIndex = state.allRooms.findIndex((_room) => _room.roomId === roomId);
        if (roomIndex !== -1) {
          state.allRooms.splice(roomIndex, 1, room);
        } else {
          state.allRooms.push(room);
        }
      });
      lobby.onMessage('-', (roomId) => {
        state.allRooms = state.allRooms.filter((room) => room.roomId !== roomId);
      });
      commit(types.SET_LOBBY, lobby);
    },
    [types.ENTER_ROOM]: async ({ commit, state }: ActionParam, { roomId }: {roomId: string}) => {
      if (!state.client) throw new Error('no client');
      if (state.myRoom) throw new Error('youre in a room. leave it first');

      const myRoom = await state.client.joinById(roomId, { userId: state.userId });
      // myRoom.onMessage(RoomEvents.Players, (args) => {
      //   console.log('players', args);
      // });

      commit(types.SET_MYROOM, myRoom);
    },
    [types.LEAVE_ROOM]: async ({ state }: ActionParam) => {
      if (!state.myRoom) throw new Error('not in any room');
      await state.myRoom.leave();
      state.myRoom = null;
    },
    [types.DESTROY]: async ({ state }: ActionParam) => {
      if (state.myRoom) state.myRoom.leave();
      if (state.lobby) state.lobby.leave();
      if (state.client) state.client = null;
    },
  },
});
