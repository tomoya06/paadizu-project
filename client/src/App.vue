<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Provide } from 'vue-property-decorator';
import * as Colyseus from 'colyseus.js';
import { v4 as uuidv4 } from 'uuid';

@Component
export default class App extends Vue {
  @Provide()
  private client = new Colyseus.Client('ws://localhost:2567');

  @Provide()
  private userId = uuidv4();
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
