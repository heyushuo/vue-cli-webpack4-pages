<template>
  <div>
    <div class="home">我是home页面</div>
    <div @click="change">{{name}}</div>
  </div>
</template>

<script>
// import {getUrlParam} from '@/utils'
import requet from '@/libs/request'
export default {
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
@import url(./aaa.less);
.home {
  display: flex;
  font-size: 30px;
}
</style>