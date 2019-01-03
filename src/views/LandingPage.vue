<template>
  <div class="landingpage">
    <page-default :showSettings="false" :showHelp="false"/>
    <h1 class="main-title">Join a room</h1>
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
