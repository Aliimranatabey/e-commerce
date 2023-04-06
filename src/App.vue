<template>
  <v-app>
    <NavigationDrawers />
    <Datatable />
  </v-app>
</template>

<script>
import Datatable from "./components/Datatable.vue";
import NavigationDrawers from "./components/NavigationDrawers";
export default {
  name: "App",
  components: {
    NavigationDrawers,
    Datatable,
  },
  data: () => ({
    //
  }),
};
</script>
