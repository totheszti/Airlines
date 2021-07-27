<template>
    <div>
        <div class="container mx-auto h-auto">
            <div class="d-flex">
            <router-link v-b-tooltip.hover title="Vissza" to="/">
                <b-icon icon="arrow-left-circle-fill" class="mt-5 mx-auto backColor backSvg"></b-icon>
            </router-link>
                <div class="m-5 w-100 mx-auto d-flex justify-content-center">
                    <router-link to="/city" class="text-decoration-none">
                        <b-button variant="secondary"
                                  size="md" class="py-3 mx-1">
                            Városok
                        </b-button>
                    </router-link>
                    <router-link to="/flight" class="text-decoration-none">
                        <b-button variant="secondary"
                                  size="md" class="py-3 mx-1">
                            Repülőjáratok
                        </b-button>
                    </router-link>
                    <router-link to="/" class="text-decoration-none">
                        <b-button variant="secondary"
                                  size="md" class="py-3 mx-1">
                            Útvonaltervezés
                        </b-button>
                    </router-link>
                </div>
            </div>
            <h1 class="mb-5 mt-5">Légitársaságok</h1>
            <div class="w-100">
                <div class="p-0 my-3 justify-content-end">
                    <router-link to="/airline/edit" class="text-decoration-none">
                        <b-button block type="submit" variant="success" class="btn-new"><b-icon icon="plus" class="mr-2"/>Új légitársaság hozzáadása</b-button>
                    </router-link></div>
            </div>
            <b-table striped responsive="sm"
                     id="my-table"
                     :items="items"
                     :fields="fields"
                     :per-page="itemPerPage"
                     :current-page="currentPage"
                     class="text-center"
            >
                <template v-slot:cell(actions)="row">
                    <router-link :to="{name:'airlineEdit', params:{id:row.item.id}}">
                        <b-button v-b-tooltip.hover title="Szerkesztés" variant="primary" size="sm"
                                  class="mx-2 mb-2">
                            <b-icon icon="pencil"></b-icon>
                        </b-button>
                    </router-link>

                    <b-button v-b-tooltip.hover title="Törlés" variant="danger" class="mb-2" size="sm" @click="open(row.item.id)">
                        <b-icon icon="trash" aria-hidden="true"></b-icon>
                    </b-button>

                    <sweet-modal ref="modal" title="Biztos, hogy törölni szeretnéd a légitársaságot?" class="my-auto">
                        A törölt elemet nem lehet visszaállítani!
                        <b-button class="mr-2" @close="close(row.item.id)">Mégse</b-button>
                        <b-button variant="danger" @click="deleteAirline(deleteId)">Törlés</b-button></sweet-modal>

                </template>
            </b-table>

            <b-row align-v="center" class="mb-5">
                <b-col cols="2" md="6" lg="3" order="2" order-md="1" order-lg="1">
                    <b-row align-v="center" class="mb-3 mb-lg-0" v-if="perPageOptions">
                        <b-col>Oldalanként</b-col>
                        <b-col>
                            <b-form-select v-model="itemPerPage"
                                           :options="perPageOptions"/>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col cols="9" order="1" order-md="3" order-lg="2" class="text-center">
                    <b-pagination v-model="currentPage"
                                  :total-rows="items.length"
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
        name: "Airline",
        components: {
            SweetModal
        },
        data() {
            return {
                itemPerPage: 5,
                deleteId: '',
                perPageOptions: [
                    { value: 5, text: '5' },
                    { value: 10, text: '10' },
                    { value: 20, text: '20' },
                ],
                currentPage: 1,
                fields: [{key: 'name', label: 'Város neve', sortable: true},
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
                Api.getAllAirline().then(resp => {
                    for (let i = 0; i < resp.data.length; i++) {
                        this.dataArrays.push({
                            id: resp.data[i].id,
                            name: resp.data[i].name,
                        });
                    }

                });
            },
            open(id) {
                this.deleteId = id;
                this.$refs.modal.open()
            },
            deleteAirline(id) {
                Api.deleteAirline(id).then((response) => {
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
                this.getAllItems();
                this.$refs.modal.close();
                // window.location.reload()
            }

        },
        created() {
            this.getAllItems();
        }
    }
</script>

<style scoped>

    .backColor {
        color: dodgerblue;
    }

    .backSvg {
        min-width: 50px;
        min-height: 50px;
    }

    svg :hover {
        color: #ffd718;
        box-shadow: 3px 0px 0px 0px #000000 inset !important;
    }

</style>
