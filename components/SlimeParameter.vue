<template>
  <div class="status">
    <p class="label">{{ context.type }}(特訓レベル: {{ context.level }})</p>
    <p>{{ context.value }}</p>
    <button @click="onLevelUpRequest()">
      特訓レベルUP ({{ context.level ** 2 }})
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export const SLIME_PARAMETER_TYPE = {
  ATK: 'こうげき',
  DEF: 'ぼうぎょ',
  HP: 'HP',
  AGL: 'すばやさ'
} as const
export type SlimeParameterType = typeof SLIME_PARAMETER_TYPE[keyof typeof SLIME_PARAMETER_TYPE]

export default Vue.extend({
  props: {
    context: {
      type: Object,
      default: () => {
        return {
          type: SLIME_PARAMETER_TYPE.HP,
          value: 0,
          level: 1
        }
      }
    }
  },
  methods: {
    onLevelUpRequest () {
      console.log('X')
      this.$emit('onLevelUpRequest')
    }
  }
})
</script>

<style scoped>
  .status {
    display: inline-flex;
    flex-flow: column;
    align-items: center;
  }
  .label {
    margin: 0;
    font-size: 10px
  }
</style>
