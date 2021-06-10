import Arena from "@colyseus/arena";
import { monitor } from "@colyseus/monitor";
import { matchMaker } from 'colyseus';
import { RoomName } from "../../common/types";

import { MyRoom } from "./rooms/MyRoom";
import { MyLobbyRoom } from "./rooms/Lobby";

const ReservedGamingRoom = 3;

export default Arena({
    getId: () => "namwaa_paadizu",

    initializeGameServer: (gameServer) => {
        gameServer.define(RoomName.Lobby, MyLobbyRoom);
        gameServer.define(RoomName.Poker, MyRoom).enableRealtimeListing();

        matchMaker.createRoom(RoomName.Lobby, {autoDispose: false})
            .then((room) => {console.log('lobby created')})
            .catch((error) => {console.log('failed to create lobby', error)});
        
        for (let i=1; i<=ReservedGamingRoom; i+=1) {
            matchMaker.createRoom(RoomName.Poker, {autoDispose: false})
            .then((room) => {console.log(`room ${i}#${room.roomId} created`)})
            .catch((error) => {console.log(`failed to create room${i}`, error)});
        }
    },

    initializeExpress: (app) => {
        /**
         * Bind your custom express routes here:
         */
        app.get("/", (req, res) => {
            res.send("It's time to kick ass and chew bubblegum!");
        });

        /**
         * Bind @colyseus/monitor
         * It is recommended to protect this route with a password.
         * Read more: https://docs.colyseus.io/tools/monitor/
         */
        app.use("/colyseus", monitor());
    },


    beforeListen: () => {
        /**
         * Before before gameServer.listen() is called.
         */
    }
});