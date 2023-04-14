<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      dark
      app
      src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
    >
    <!-- V-list bileşeni bilgileri görüntülemek için kullanılır . Bir avatar, içerik, eylemler, alt başlıklar ve çok daha fazlasını içerebilir.
       Listeler, içeriği bir koleksiyondaki belirli bir öğeyi tanımlamayı kolaylaştıracak şekilde sunar. Metin ve görüntü gruplarını düzenlemek için tutarlı bir stil sağlarlar. -->
      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.text"
          router
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      clipped-left
      dark
      prominent
      src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ navTitle }}</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
  data: () => ({
    drawer: true,
    navTitle: "Company and Customer Table",
    items: [
      { icon: "mdi-table", text: "Company Table", route: "/Company" },
      { icon: "mdi-company", text: "Customer Table", route: "/Customer" },
    ],
  }),
};
</script>
