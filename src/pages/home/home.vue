<template>
  <div>
    <div class="home">我是home页面</div>
    <div @click="change">{{name}}</div>
    <Commone></Commone>
  </div>
</template>

<script>
  import Commone from './common'
  export default {
    components: {
      Commone
    },
    created() {},
    mounted() {},
    data() {
      return {
        name: "kebi"
      };
    },
    methods: {
      change() {
        this.name = "heyushuo";
      }
    },
    components: {},
    computed: {}
  };
</script>
<style lang="less" scoped>
  @import url(./home.less);

  .home {
    display: flex;
    font-size: 30px;
  }
</style>