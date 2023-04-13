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
            <!-- activator : VMenuactivatorkullanıcıların , belirli olaylar (örn. ) üzerine menüyü etkinleştiren/açan bileşen(ler)i içeren, adında slotlı bir şablon belirlemesine olanak tanır click. slota iletilen bir nesne aracılığıylaVMenu bu olaylar için dinleyiciler sağlar :activator -->
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Customer
              </v-btn>
            </template>
            <!-- v-card : v-card bileşeni, başlıklar, metin, resimler, simgeler ve daha fazlası için basit bir arabirim sağlayan v-sheet'in çok yönlü ve geliştirilmiş bir sürümüdür . -->
            <v-card>
              <v-card-title>
                <span class="text-h5">New Customer</span>
              </v-card-title>
              <!-- v-card-text : Kök öğede kullanılan özel bir etiket belirtin -->
              <v-card-text>
                <!-- v-container : v-container, sitenizin içeriğini ortalama ve yatay olarak doldurma yeteneği sağlar . -->
                <v-container>
                  <!-- v-row : v-row, v-col için bir sarıcı bileşendir . İç sütunlarının düzenini ve akışını kontrol etmek için esnek özelliklerden yararlanır. 24 piksellik standart bir cilt payı kullanır. Bu, yoğun pervane ile azaltılabilir veya oluksuz tamamen çıkarılabilir. -->
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <!-- v-text-field : v-text-field bileşeni, hem v-input hem de v-field bileşenlerini tek bir teklifte birleştiren çok yönlü bir <input type="text"> alanıdır . Diğer form girdileri için temel sağlayan yaygın olarak kullanılan bir öğedir; v-select , v-autocomplete , v-combobox gibi. -->
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
                      <!-- v-date-picker : v-date-picker, birçok mevcut Vuetify bileşeninde kullanılabilen bağımsız bir bileşendir . Kullanıcıya tarih/ay seçimi için görsel bir sunum sunar. v-date-picker, ISO 8601 tarih dizilerini (YYYY-AA-GG) kabul eder. -->
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
                    <!-- v-combobox : v-combobox bileşeni, kullanıcının sağlanan öğeler dizisinden değerleri seçmesine veya kendi değerini girmesine izin veren bir v-text alanıdır . -->
                    <v-combobox
                        label="GENDER"
                        v-model="editedItem.gender"
                        :items="['MALE','FEMALE']"
                    >
                    </v-combobox>
                    </v-col>
                    <!-- v-select : Seçimlerin görüntüsünü çip olarak değiştirir -->
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
</template>ü

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
    //JavaScript'te async, işlevin bir söz döndürmesine izin vermek için işlevden önce yerleştirilen bir anahtar kelimedir .,
    //JavaScript eşzamanlı bir dil olduğundan, Async işlevleri, söze dayalı kodu eşzamanlıymış gibi yazmamıza izin verir,
    // ancak kodun eşzamansız çalışmasına izin veren yürütme iş parçacığını engellemez.
    methods: {
      async getCustomerList() {
        //Axios, JavaScript için vaat edilen tabanlı bir HTTP istemcisidir . Tarayıcıdan HTTP istekleri yapma ve istek ve yanıt verilerinin dönüştürülmesini yönetme yeteneğine sahiptir.
        const response = await this.axios.get("http://localhost:8080/customer");
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
        //JSON.parse() statik yöntemi , JavaScript değerini veya
        //dize tarafından açıklanan nesneyi oluşturarak bir JSON
        //dizesini ayrıştırır . Ortaya çıkan nesne üzerinde döndürülmeden 
        //önce bir dönüşüm gerçekleştirmek için isteğe bağlı bir canlandırıcı işlevi sağlanabilir.
        this.editedItem = JSON.parse(JSON.stringify(item));
        //JSON.stringify() statik yöntemi, bir JavaScript değerini bir JSON dizesine dönüştürür , 
        //bir ikame işlevi belirtilirse isteğe bağlı olarak değerleri değiştirir veya bir ikame dizisi
        //belirtilirse isteğe bağlı olarak yalnızca belirtilen özellikleri içerir.
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
