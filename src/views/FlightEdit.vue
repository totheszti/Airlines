<template>
    <div class="container mx-auto">
        <div class="d-flex">
            <router-link v-b-tooltip.hover title="Vissza" to="/flight">
                <b-icon icon="arrow-left-circle-fill" class="mt-5 mx-auto backColor"></b-icon>
            </router-link>
            <h1 class="mb-5 mt-5 mx-2 col-9">Repülőjárat hozzáadása</h1>
        </div>

        <b-container fluid class="text-right">
            <b-row class="my-1">
                <b-col sm="1" class="mt-3">
                    <label for="airline" class="custom-required font-weight-bold">Légitársaság:</label>
                </b-col>
                <b-col sm="4" class="my-2">
                    <b-form-select name="airline" id="airline" v-model="flight.airline" :options="airlineSelect"></b-form-select>
                </b-col>
            </b-row>

            <b-row class="my-1">
                <b-col sm="1" class="mt-3">
                    <label for="from" class="custom-required font-weight-bold">Honnan?:</label>
                </b-col>
                <b-col sm="4" class="my-2">
                    <b-form-select name="from" id="from" v-model="flight.from" :options="citySelect"></b-form-select>
                </b-col>
            </b-row>

            <b-row class="my-1">
                <b-col sm="1" class="mt-3">
                    <label for="to" class="custom-required font-weight-bold">Hova?:</label>
                </b-col>
                <b-col sm="4" class="my-2">
                    <b-form-select name="to" id="to" v-model="flight.to" :options="citySelect"></b-form-select>
                </b-col>
            </b-row>

            <b-row class="my-1">
                <b-col sm="1" class="mt-3">
                    <label for="distance" class="custom-required font-weight-bold">Távolság:</label>
                </b-col>
                <b-col sm="4" class="my-2">
                    <b-form-input type="number" name="distance" id="distance" v-model="flight.distance"></b-form-input>
                </b-col>
            </b-row>

            <b-row class="my-1">
                <b-col sm="1" class="mt-3">
                    <label for="duration" class="custom-required font-weight-bold">Időtartam:</label>
                </b-col>
                <b-col sm="4" class="my-2">
                    <b-form-input type="number" name="duration" id="duration" v-model="flight.duration"></b-form-input>
                </b-col>
            </b-row>

            <b-row class="my-1">
                <b-col sm="1" class="my-5 mr-3">
                    <router-link to="/flight" class="text-decoration-none">
                        <b-button block type="cancel">Mégse</b-button>
                    </router-link>
                </b-col>
                <b-col sm="1" class="my-5">
                    <b-button block variant="success" type="submit" @click="saveFlight(flight)">Mentés</b-button>
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
        name: "FlightEdit",
        data() {
            return {
                selected: null,
                errors: [],
                flight: {
                    id: '',
                    airline: '',
                    from: '',
                    to: '',
                    distance: null,
                    duration: null
                },
                airlineSelect: [],
                citySelect: [],
            }
        },
        methods: {
            saveFlight(data) {
                data.distance = parseInt(this.flight.distance);
                data.duration = parseInt(this.flight.duration);

                if (data.id === "" || data.id === undefined) {
                    Api.saveFlight(data).then(response => {
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
                        this.$router.push({name: 'Flight' })
                    });
                } else {
                    Api.updateFlight(data)
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
                            this.$router.push({name: 'Flight' })
                        });

                }
            },
            getAllAirlineAndCityOption() {
                Api.getAllAirline().then(resp => {
                    for (let i = 0; i < resp.data.length; i++) {
                        this.airlineSelect.push({
                            text: resp.data[i].name,
                            value: {
                                id: resp.data[i].id,
                                name: resp.data[i].name
                            }
                        });
                    }
                });
                Api.getAllCity().then(resp => {
                    for (let i = 0; i < resp.data.length; i++) {
                        this.citySelect.push({
                            text: resp.data[i].name,
                            value: {
                                id: resp.data[i].id,
                                name: resp.data[i].name,
                                population: resp.data[i].population
                            }
                        });
                    }
                });
            },
            findById(id) {
                Api.findFlightById(id).then(resp => {
                    this.flight.id = resp.data.id;
                    this.flight.airline = resp.data.airline;
                    this.flight.from = resp.data.from;
                    this.flight.to = resp.data.to;
                    this.flight.distance = resp.data.distance;
                    this.flight.duration = resp.data.duration;
                });
            }
        },
        created() {
            if (this.$route.params.id !== null) {
                this.findById(this.$route.params.id);
            }
            this.getAllAirlineAndCityOption();
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

