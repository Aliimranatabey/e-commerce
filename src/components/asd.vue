<template>
  <v-container class="mt-5">
    <v-card>
      <v-data-table
        :headers="headers"
        :items="items"
        class="elevation-3"
        :loading="loading"
      >
        <template v-slot:top>
          <v-toolbar color="#FFA000" flat>
            <v-toolbar-title>{{ tableTitle }}</v-toolbar-title>
            <v-divider class="mx-5" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-row>
              <v-col class="mr-5">
                <v-text-field
                  v-model="search.name"
                  placeholder="Search"
                  append-icon="mdi-magnify"
                  hide-details
                  @input="getList()"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-icon @click="$emit('onShow', showForm)">add</v-icon>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="$emit('editData', item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteCompany(item.id)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showForm: false,
      search: { name: "" },
      items: [],
      loading: false,
      options: { size: 15, totalElements: 0, totalPages: 0 },
      page: 0,
    };
  },
  props: [
    "headers",
    "getUrl",
    "deleteUrl",
    "tableTitle",
    "responseKey",
    "getSearch",
  ],
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      this.loading = true;
      await this.axios
        .get(
          this.getUrl +
            "name=" +
            this.search.name +
            this.getSearch +
            "&page=" +
            this.page +
            "&size=" +
            this.options.size
        )
        .then(
          (response) => (
            (this.items = response.data._embedded[this.responseKey]),
            (this.options = response.data.page)
          )
        );
      this.loading = false;
    },
    async deleteCompany(id) {
      await this.axios.delete(this.deleteUrl + id);
      this.getList();
    },
  },
};
</script>