<template>
  <IcBaselineMale v-if="tipe === 'male'" />
  <IcBaselineFemale v-else />
</template>

<script>
import IcBaselineFemale from '~icons/ic/baseline-female'
import IcBaselineMale from '~icons/ic/baseline-male'
export default {
  name: 'GenderIcon',
  components: {
    IcBaselineFemale,
    IcBaselineMale
  },
  props: {
    tipe: {
      type: String,
      default: 'male'
    }
  }
}
</script>
