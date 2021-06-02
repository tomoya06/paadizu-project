import Arena from "@colyseus/arena";
import { monitor } from "@colyseus/monitor";
import { LobbyRoom } from 'colyseus';

import { MyRoom } from "./rooms/MyRoom";

export default Arena({
    getId: () => "namwaa_paadizu",

    initializeGameServer: (gameServer) => {
        gameServer.define('lobby', LobbyRoom);
        gameServer.define('my_room', MyRoom).enableRealtimeListing();
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