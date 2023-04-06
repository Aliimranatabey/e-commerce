<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="customers"
      sort-by="id"
      class="elevation-3"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>CUSTOMER LIST</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Customer
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">New Customer</span>
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
                        v-model="editedItem.surname"
                        label="SURNAME"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.email"
                      label="EMAIL"
                    >
                    </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.birthday"
                        label="BIRTHDAY"
                      >
                    </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.password"
                      label="PASSWORD"
                    >
                    </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                    <v-combobox
                        label="GENDER"
                        :items="['MALE', 'FEMALE']"
                    >
                    </v-combobox>
                    </v-col>
                    <v-select
                      v-model="editedItem.company"
                      :items="companys"
                      item-text="name"
                      item-value="id"
                      label="Select"
                      return-object
                      single-line
                    ></v-select>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="clear">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="saveCustomer">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteCustomer(item.id)"> mdi-delete </v-icon>
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
      { text: "Surname", value: "surname" },
      { text: "Email", value: "email" },
      { text: "Password", value: "password" },
      { text: "Gender", value: "gender" },
      { text: "Birthday", value: "birthday" },
      {
        text: "Actions",
        align: "start",
        sortable: false,
        value: "actions",
      },
    ],
    companys: [],
      customers: [],
      customer: {
        id: null,
        name: "",
        surname: "",
        email: "",
        password: "",
        gender: "",
        birthday: "",
        company: "",
      },
      editedItem: {},
    }),
    methods: {
      async getCustomerList() {
        const response = await this.axios.get("http://localhost:8080/customer");
        this.customers = response.data;
      },
      async getCompanyList() {
        const response = await this.axios.get("http://localhost:8080/company");
        this.companys = response.data;
      },
      async addCustomer() {
        await this.axios.post("http://localhost:8080/customer/", this.editedItem);
        this.getCustomerList();
      },
      async updateCustomer() {
        
        await this.axios.put(
          "http://localhost:8080/customer/" + this.editedItem.id,
          this.editedItem
        );
        this.getCustomerList();
      },
      saveCustomer() {
        if (this.editedItem.id == null || this.editedItem.id == "") {
          this.addCustomer();
          this.clear();
        } else {
          this.updateCustomer();
          this.clear();
        }
      },
      editItem(item) {
        this.editedItem = JSON.parse(JSON.stringify(item));
        this.dialog = true;
      },
      async deleteCustomer(id) {
        await this.axios.delete("http://localhost:8080/customer/" + id);
        this.getCustomerList();
      },
      clear() {
        this.editedItem = {};
        this.dialog = false;
      },
    },
    mounted() {
      this.getCustomerList();
      this.getCompanyList();
    },
  };

</script>
<style scoped>
</style>
