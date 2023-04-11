<template>
  <!-- / v-container : Görünüm alanı maksimum genişlik boyutu kesme noktalarını kaldırır. -->
  <v-container>
    <!-- headers(Başlıklar) : tablonun sütunlarını tanımlamak için kullanılır. Başlıklar, gövdenin üstündeki (ancak üst kısmın altındaki) bölümün tamamıdır, muhtemelen birden çok satırdır -->
    <!-- items : Alt bileşenleri otomatik olarak oluşturmak için kullanılan bir dizi dizi veya nesne -->
    <!-- sort-by : Sıralama düzeni için hangi öğe özelliğinin (veya özelliklerinin) kullanılması gerektiğini değiştirir. .syncDeğiştirici ile kullanılabilir -->
    <!-- Yardımcı sınıflar, herhangi bir öğeye özel bir z-derinliği (elevation) atamanıza izin verir . -->
    <v-data-table
      :headers="headers"
      :items="customers"
      sort-by="id"
      class="elevation-3"
    >
    <!-- v-slot: Adlandırılmış bir alanı iletmek için, yönergeyle birlikte bir öğe kullanmamız v-slotve ardından yuvanın adını bir argüman olarak iletmemiz gerekir v-slot -->
      <template v-slot:top>
        <!-- Bileşen v-toolbar, genellikle sitede gezinmenin birincil kaynağı olduğundan, herhangi bir grafik kullanıcı arabirimi (GUI) için çok önemlidir. Araç çubuğu bileşeni, aşağıdakilerle birlikte harika çalışır: 
        v-navigation-drawer and v-card -->
        <v-toolbar flat>
          <v-toolbar-title>CUSTOMER LIST</v-toolbar-title>
          <!-- Bileşen v-divider, listelerin veya düzenlerin bölümlerini ayırmak için kullanılır. -->
          <v-divider class="mx-4" insert vertical></v-divider>
          <!-- v-spacer : Kök öğede kullanılan özel bir etiket belirtin -->
          <v-spacer></v-spacer>
          <!-- v-dialog : Bileşen v-dialog, kullanıcıları belirli bir görev hakkında bilgilendirir ve kritik bilgiler içerebilir, kararlar gerektirebilir veya birden çok görev içerebilir. Diyalogları idareli kullanın çünkü bunlar kesintiye uğrar. -->
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
                      <v-date-picker
                      v-model="editedItem.birthday"
                      label="BIRTHDAY">
                      </v-date-picker>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      type="password"
                      v-model="editedItem.password"
                      label="PASSWORD"
                    >
                    </v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                    <v-combobox
                        label="GENDER"
                        v-model="editedItem.gender"
                        :items="['MALE','FEMALE']"
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
      // { text: "Id", value: "id" },
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
        console.log(response);
        this.customers = response.data;
      },
      async getCompanyList() {
        const response = await this.axios.get("http://localhost:8080/company");
        this.companys = response.data;
      },
      async addCustomer() {
        await this.axios.post("http://localhost:8080/customer", this.editedItem);
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
