<template>
  <div class="StatisticsPage">
    <page-default header="Statistics on the previous round"/>
    <statistics/>
    <ready-up/>
  </div>
</template>

<script>
import PageDefault from '../components/PageDefault'
import Statistics from '../components/Statistics'
import ReadyUp from '../components/ReadyUp'

export default {
  name: 'TurnPage',
  components: {
    PageDefault,
    Statistics,
    ReadyUp
  }
}
</script>
