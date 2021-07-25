<template>
    <div class="container mx-auto">
        <div class="d-flex">
            <router-link v-b-tooltip.hover title="Vissza" to="/airline">
                <b-icon icon="arrow-left-circle-fill" class="mt-5 mx-auto backColor"></b-icon>
            </router-link>
            <h1 class="mb-5 mt-5 mx-2 col-9">Légitársaság hozzáadása</h1>
        </div>

        <b-container fluid class="text-right">
            <b-row class="my-1">
                <b-col sm="1" class="mt-3">
                    <label for="name" class="custom-required font-weight-bold">Név:</label>
                </b-col>
                <b-col sm="4" class="my-2">
                    <b-form-input name="name" id="name" v-model="airline.name"></b-form-input>
                </b-col>
            </b-row>

            <b-row class="my-1">
                <b-col sm="1" class="my-5 mr-3">
                    <router-link to="/airline" class="text-decoration-none">
                        <b-button block type="cancel">Mégse</b-button>
                    </router-link>
                </b-col>
                <b-col sm="1" class="my-5">
                    <b-button block variant="success" type="submit" @click="saveAirline(airline)">Mentés</b-button>
                </b-col>
            </b-row>
        </b-container>


        <div v-if="errors.length" class="rounded border border-danger w-30 m-3 p-3">
            <b>Please correct the following error(s):</b>
            <ul>
                <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Api from "../api/Api";

    export default {
        name: "AirlineEdit",
        data() {
            return {
                selected: null,
                teamSelect: [],
                errors: [],
                airline: {
                    id: '',
                    name: ''
                }
            }
        },
        methods: {
            saveAirline(data) {
                if (data.id !== undefined) {
                    Api.updateAirline(data)
                        .then(response => {
                        if (response.status === 200) {
                            this.$toast.open({
                                message: "Sikeres módosítás",
                                type: "success",
                                duration: 5000,
                                dismissible: true
                            });

                        }
                    });
                } else {
                    Api.saveAirline(data).then(response => {
                        if (response.status === 200) {
                            this.$toast.open({
                                message: "Sikeres mentés",
                                type: "success",
                                duration: 5000,
                                dismissible: true
                            });

                        }
                    });
                }
            },
            findById(id) {
                Api.findAirlineById(id).then(resp => {
                    this.airline.id = resp.data.id;
                    this.airline.name = resp.data.name
                });
            }
        },
        created() {
            if (this.$route.params.id !== null) {
                this.findById(this.$route.params.id);
            }
        }
    }
</script>

<style scoped>
    .container {
        margin-left: 70px;
    }

    .w-30 {
        max-width: 30%;
    }

    .backColor {
        color: dodgerblue;
    }

    svg {
        min-width: 50px;
        min-height: 50px;
    }

    svg :hover {
        color: #ffd718;
        box-shadow: 3px 0px 0px 0px #000000 inset !important;
    }
</style>

