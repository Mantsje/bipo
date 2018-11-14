<template>
  <div class="LandingPage">
    <page-default :showSettings="false" :showHelp="false" header="Welcome to Brief-in-de-pan Online!"/>
    <landing-form/>
  </div>
</template>

<script>
import PageDefault from '../components/PageDefault'
import LandingForm from '../components/LandingForm'

export default {
  name: 'LandingPage',
  components: {
    PageDefault,
    LandingForm
  }
}
</script>
