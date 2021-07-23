<template>
    <div>
        <div class="m-5 w-100 mx-auto d-flex justify-content-center">
            <router-link to="/city" class="text-decoration-none">
            <b-button variant="secondary"
                      size="md" class="py-3 mx-1">
                Városok
            </b-button>
            </router-link>
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

                    <b-button v-b-tooltip.hover title="Törlés" variant="danger" class="mb-2" size="sm" v-model="row.detailsShowing">
                        <b-icon icon="trash" aria-hidden="true"></b-icon>
                    </b-button>
                </template>
            </b-table>

            <b-pagination
                    id="pagination"
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    class="justify-content-center"
            ></b-pagination>

        </div>
    </div>
</template>

<script>
    import Api from "../api/Api";

    export default {
        name: "Home",
        components: {},
        data() {
            return {
                testNumber: 3,
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
            }
        },
        created() {
            this.getAllItems();
        }
    }
</script>

<style scoped>
</style>
