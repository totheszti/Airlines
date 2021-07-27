<template>
    <div>
        <div class="m-5 w-100 mx-auto d-flex justify-content-center">
            <router-link to="/airline" class="text-decoration-none">
            <b-button variant="secondary"
                      size="md" class="py-3 mx-1">
                Légitársaságok
            </b-button>
            </router-link>
            <router-link to="/flight" class="text-decoration-none">
            <b-button variant="secondary"
                      size="md" class="py-3 mx-1">
                Repülőjáratok
            </b-button>
        </router-link>
            <router-link to="/flight/shortest" class="text-decoration-none">
                <b-button variant="secondary"
                          size="md" class="py-3 mx-1">
                    Útvonaltervezés
                </b-button>
            </router-link>
        </div>
        <div class="container mx-auto h-auto">
            <h1 class="mb-5 mt-5">Városok</h1>
            <div class="w-100">
                <div class="p-0 my-3 float-right">
                    <router-link to="/city/edit" class="text-decoration-none">
                        <b-button block type="submit" variant="success" class="btn-new"><b-icon icon="plus" class="mr-2"/>Új város hozzáadása</b-button>
                    </router-link></div>
            </div>
            <b-table striped responsive="sm"
                     id="my-table"
                     :items="items"
                     :fields="fields"
                     :per-page="perPage"
                     :current-page="currentPage"
                     class="text-center"
            >
                <template v-slot:cell(actions)="row">
                    <router-link :to="{name:'cityEdit', params:{id:row.item.id}}">
                        <b-button v-b-tooltip.hover title="Szerkesztés" variant="primary" size="sm"
                                  class="mx-2 mb-2">
                            <b-icon icon="pencil"></b-icon>
                        </b-button>
                    </router-link>

                    <b-button v-b-tooltip.hover title="Törlés" variant="danger" class="mb-2" size="sm" @click="openModal(row.item.id)">
                        <b-icon icon="trash" aria-hidden="true"></b-icon>
                    </b-button>
                    <sweet-modal ref="modal" title="Biztos, hogy törölni szeretnéd a várost?" class="my-auto">
                        A törölt elemet nem lehet visszaállítani!
                        <b-button class="mr-2" @click="closeModal(row.item.id)">Mégse</b-button>
                        <b-button variant="danger" @click="deleteCity(deleteId)">Törlés</b-button></sweet-modal>

                </template>
            </b-table>

            <b-row align-v="center" class="mb-5">
                <b-col cols="6" md="6" lg="3" order="2" order-md="1" order-lg="1">
                    <b-row align-v="center" class="mb-3 mb-lg-0" v-if="perPageOptions">
                        <b-col>Oldalanként</b-col>
                        <b-col>
                            <b-form-select v-model="itemPerPage"
                                           :options="perPageOptions"
                                           @change="perPageChanged"/>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col order="1" order-md="3" order-lg="2" class="text-center">
                    <b-pagination v-model="currentPage"
                                  :total-rows="rows"
                                  :per-page="itemPerPage"
                                  align="center"/>
                </b-col>
            </b-row>

        </div>
    </div>
</template>

<script>
    import Api from "../api/Api";
    import {SweetModal} from 'sweet-modal-vue';

    export default {
        name: "Home",
        components: {
            SweetModal
        },
        data() {
            return {
                itemPerPage: 0,
                deleteId: '',
                testNumber: 3,
                perPageOptions: [
                    { value: 2, text: '2' },
                    { value: 5, text: '5' },
                    { value: 10, text: '10' },
                ],
                perPage: 5,
                currentPage: 1,
                fields: [{key: 'name', label: 'Város neve', sortable: true},
                    {key: 'population', label: 'Lakosság', sortable: true},
                    {key: 'actions', label: 'Műveletek'},
                ],
                dataArrays: [],
                params: {
                    stripe: true,
                    border: true,
                    header: 'row',
                    enableSearch: true,
                    sort: []

                }

            }
        },
        computed: {
            items() {
                return this.dataArrays
            },
            rows() {
                return this.items.length
            }
        },
        methods: {
            getAllItems() {
                Api.getAllCity().then(resp => {
                    for (let i = 0; i < resp.data.length; i++) {
                        this.dataArrays.push({
                            id: resp.data[i].id,
                            name: resp.data[i].name,
                            population: resp.data[i].population
                        });
                    }

                });
            },
            perPageChanged(perPage) {
                this.itemPerPage = perPage;
                this.getAllItems();
            },
            openModal(id) {
                this.deleteId = id;
                this.$refs.modal.open()
            },
            closeModal(id){
                this.deleteId = id;
                this.$refs.modal.close()
            },
            deleteCity(id) {
                Api.deleteCity(id).then((response) => {
                    if (response.status === 200){
                        this.$toast.open({
                            message: "Sikeres törlés",
                            type: "success",
                            duration: 5000,
                            dismissible: true
                        });
                        this.getAllItems();
                    } else {
                        this.$toast.open({
                            message: "Sikertelen törlés",
                            type: "error",
                            duration: 5000,
                            dismissible: true
                        });
                        this.getAllItems();
                    }
                });
                this.$refs.modal.close();
                this.getAllItems();
                // window.location.reload()
            },
        },
        created() {
            this.getAllItems();
        }
    }
</script>

<style scoped>
</style>
