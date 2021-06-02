<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Action } from 'vuex-class';
import types from './store/types';

@Component
export default class App extends Vue {
  @Action(types.INIT)
  private init!: () => void;

  @Action(types.DESTROY)
  private destroy!: () => void;

  created(): void {
    this.init();
  }

  beforeDestroy(): void {
    this.destroy();
  }
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
