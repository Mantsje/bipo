<template>
  <div class="turnpage">
    <page-default header="It's your turn, good luck!"/>
    <my-turn/>
  </div>
</template>

<script>
import PageDefault from '../components/PageDefault'
import MyTurn from '../components/MyTurn'

export default {
  name: 'TurnPage',
  components: {
    PageDefault,
    MyTurn
  }
}
</script>
