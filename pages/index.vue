<template>
  <div>
    <SlimeParameter :context="hpContext" />
    <SlimeParameter :context="atkContext" />
    <SlimeParameter :context="defContext" />
    <SlimeParameter :context="aglContext" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import SlimeParameter from '../components/SlimeParameter.vue'
import { SLIME_PARAMETER_TYPE } from '~/components/SlimeParameter.vue'

export default Vue.extend({
  components: {
    SlimeParameter
  },
  data () {
    return {
      hpContext: {
        type: SLIME_PARAMETER_TYPE.HP,
        value: 255,
        level: 1
      },
      atkContext: {
        type: SLIME_PARAMETER_TYPE.ATK,
        value: 255,
        level: 1
      },
      defContext: {
        type: SLIME_PARAMETER_TYPE.DEF,
        value: 255,
        level: 1
      },
      aglContext: {
        type: SLIME_PARAMETER_TYPE.AGL,
        value: 255,
        level: 1
      }
    }
  }
})
</script>
