<template>
    <div class="container mx-auto">
        <div class="d-flex">
            <router-link v-b-tooltip.hover title="Vissza" to="/city">
                <b-icon icon="arrow-left-circle-fill" class="mt-5 mx-auto backColor"></b-icon>
            </router-link>
            <h1 class="mb-5 mt-5 mx-2 col-9">Város hozzáadása</h1>
        </div>

        <b-container fluid class="text-right">
            <form @submit="checkForm">
            <b-row class="my-1">
                <b-col sm="1" class="mt-3">
                    <label for="name" class="custom-required font-weight-bold">Név:</label>
                </b-col>
                <b-col sm="4" class="my-2">
                    <b-form-input name="name" id="name" v-model="city.name"></b-form-input>
                </b-col>
            </b-row>

            <b-row class="my-1">
                <b-col sm="1" class="mt-3">
                    <label for="population" class="custom-required font-weight-bold">Lakosság:</label>
                </b-col>
                <b-col sm="4" class="my-2">
                    <b-form-input type="number" name="population" id="population" v-model="city.population"></b-form-input>
                </b-col>
            </b-row>

                <div v-if="errors.length" class="rounded border border-danger w-30 m-3 p-3">
                    <b>Kérlek javítsd ki a hibá(ka)t:</b>
                    <ul>
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                    </ul>
                </div>

            </form>
            <b-row class="my-1">
                <b-col sm="1" class="my-5 mr-3">
                    <router-link to="/city" class="text-decoration-none">
                        <b-button block type="cancel">Mégse</b-button>
                    </router-link>
                </b-col>
                <b-col sm="1" class="my-5">
                    <b-button block variant="success" type="submit" @click="saveCity(city)">Mentés</b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import Api from "../api/Api";

    export default {
        name: "CityEdit",
        data() {
            return {
                selected: null,
                teamSelect: [],
                errors: [],
                city: {
                    id: '',
                    name: '',
                    population: null
                }
            }
        },
        methods: {
            checkForm: function (e) {
                if (this.city.name && this.city.population) return true;
                this.errors = [];
                if (!this.city.name) this.errors.push("Név megadása kötelező.");
                if (!this.city.population) this.errors.push("Lakosság megadása kötelező.");
                e.preventDefault();
            },

            saveCity(data) {

                data.population = parseInt(this.city.population);

                if (data.id !== undefined) {
                    Api.updateCity(data)
                        .then(response => {
                            if (response.status === 200) {
                                this.$toast.open({
                                    message: "Sikeres módosítás",
                                    type: "success",
                                    duration: 5000,
                                    dismissible: true
                                });

                            }
                            else {
                                this.$toast.open({
                                    message: "Módosítás sikertelen",
                                    type: "error",
                                    duration: 5000,
                                    dismissible: true
                                });
                            }
                        });
                } else {
                    Api.saveCity(data).then(response => {
                        if (response.status === 200) {
                            this.$toast.open({
                                message: "Sikeres mentés",
                                type: "success",
                                duration: 5000,
                                dismissible: true
                            });

                        }
                        else {
                            this.$toast.open({
                                message: "Mentés sikertelen",
                                type: "error",
                                duration: 5000,
                                dismissible: true
                            });
                        }
                    });
                }
            },
            findById(id) {
                Api.findCityById(id).then(resp => {
                    this.city.id = resp.data.id;
                    this.city.name = resp.data.name;
                    this.city.population = resp.data.population
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

