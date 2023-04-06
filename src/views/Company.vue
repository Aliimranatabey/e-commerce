<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="companys"
      sort-by="id"
      class="elevation-3"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>COMPANY LIST</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Company
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">New Company</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="NAME"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.url"
                        label="URL"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.image"
                      label="IMAGE"
                    >
                    </v-text-field>
                  </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="clear">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="saveCompany">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteCompany(item.id)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: "Id", value: "id" },
      { text: "Name", value: "name" },
      { text: "Url", value: "url" },
      { text: "Image", value: "image" },
      {
        text: "Actions",
        align: "start",
        sortable: false,
        value: "actions",
      },
    ],

    companys: [],
    company: {
      id: null,
      name: "",
      url: "",
      image: "",
    },
    editedItem: {},
  }),
  methods: {
    async getCompanyList() {
      const response = await this.axios.get("http://localhost:8080/company");
      console.log(this.editedItem.dep.id);
      //burada response içerisinde data olarak verilerin tutuldugunu gördük console da bundan dolayı response.data dedik eğer data içerisinde
      //de embeded olsaydı response.data.embeded olurddu
      this.companys = response.data;
    },
    async addCompany() {
      await this.axios.post("http://localhost:8080/company/", this.editedItem);
      this.getCompanyList();
    },
    async updateCompany() {
      console.log(this.editedItem);
      await this.axios.put(
        "http://localhost:8080/company/" + this.editedItem.id,
        this.editedItem
      );
      this.getCompanyList();
    },
    saveCompany() {
      if (this.editedItem.id == null || this.editedItem.id == "") {
        this.addCompany();
        this.clear();
      } else {
        this.updateCompany();
        this.clear();
      }
    },
    editItem(item) {
      this.editedItem = JSON.parse(JSON.stringify(item));
      this.dialog = true;
    },
    async deleteCompany(id) {
      await this.axios.delete("http://localhost:8080/company/" + id);
      this.getCompanyList();
    },
    clear() {
      this.editedItem = {};
      this.dialog = false;
    },
  },
  mounted() {
    this.getCompanyList();
  },
};

</script>

<style scoped>
</style>
