<template>
  <div>
    <h3>{{ context.type }}({{ context.level }})</h3>
    <p>{{ context.value }}</p>
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
  }
})
</script>
