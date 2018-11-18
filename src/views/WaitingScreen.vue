<template>
  <div class="WaitingScreen">
    <page-default header="The waiting screen"/>
    <waiting-message/>
  </div>
</template>

<script>
import PageDefault from '../components/PageDefault'
import WaitingMessage from '../components/WaitingMessage'

export default {
  name: 'WaitingScreen',
  components: {
    PageDefault,
    WaitingMessage
  }
}
</script>
