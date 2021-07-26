<template>
    <div class="container mx-auto">
        <div class="d-flex">
            <router-link v-b-tooltip.hover title="Vissza" to="/">
                <b-icon icon="arrow-left-circle-fill" class="mt-5 mx-auto backColor"></b-icon>
            </router-link>
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
        </div>
        <h1 class="mb-5 mt-5 mx-2 col-9">Repülőjárat hozzáadása</h1>
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
                    <label for="from" class="custom-required font-weight-bold">Honnan?</label>
                </b-col>
                <b-col sm="4" class="my-2">
                    <b-form-select name="from" id="from" v-model="flight.from" :options="citySelect"></b-form-select>
                </b-col>
            </b-row>

            <b-row class="my-1">
                <b-col sm="1" class="mt-3">
                    <label for="to" class="custom-required font-weight-bold">Hova?</label>
                </b-col>
                <b-col sm="4" class="my-2">
                    <b-form-select name="to" id="to" v-model="flight.to" :options="citySelect"></b-form-select>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import Api from "../api/Api";

    const {GraphBuilder, DijkstraStrategy} = require('js-shortest-path');

    export default {
        name: "ShortestPath",
        data() {
            return {
                selected: null,
                errors: [],
                graph: [],
                flight: {
                    id: '',
                    airline: '',
                    from: '',
                    to: ''
                },
                highestPopulation: null,
                lowestPopulation: null,
                smallestCity: '',
                biggestCity: '',
                airlineSelect: [],
                citySelect: [],
                flights: []
            }
        },
        methods: {
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
                                id: resp.data[i].id,
                                name: resp.data[i].name,
                                population: resp.data[i].population
                        });

                        let lowest = Number.POSITIVE_INFINITY;
                        let highest = Number.NEGATIVE_INFINITY;
                        let temp;

                        for( let i = resp.data.length - 1; i>=0; i--){
                            temp = resp.data[i].population;
                            if (temp < lowest) lowest = temp;
                            if (temp > highest) highest = temp;
                        }

                        this.lowestPopulation = lowest;
                        this.highestPopulation = highest;

                    }
                    debugger

                    this.smallestCity = this.citySelect.findIndex( item => item.population === this.lowestPopulation).name;
                    this.biggestCity = this.citySelect.findIndex( item => item.population === this.highestPopulation).name;

                    Api.getAllFlight().then(resp => {

                        for(let i =0; i< resp.data.length; i++) {
                            this.flights.push({
                                start: resp.data[i].from.name,
                                end: resp.data[i].to.name,
                                airline: resp.data[i].airline.name,
                                distance: resp.data[i].distance
                            });

                            const graph = GraphBuilder()
                                .edge(resp.data[i].from.name, resp.data[i].to.name, resp.data[i].distance)
                                .build();

                            const dijkstra = DijkstraStrategy(graph);

                            //Prints the shortest path from S to C
                            console.log(dijkstra.shortest(this.smallestCity, this.biggestCity));
                        }
                    });

                });
            },
            findTheShortestWay(){
                Api.getAllFlight().then(resp => {

                    for(let i =0; i< resp.data.length; i++) {
                        this.flights.push({
                            start: resp.data[i].from.name,
                            end: resp.data[i].to.name,
                            airline: resp.data[i].airline.name,
                            distance: resp.data[i].distance
                        });

                        const graph = GraphBuilder()
                            .edge(resp.data[i].from.name, resp.data[i].to.name, resp.data[i].distance)
                            .build();

                        const dijkstra = DijkstraStrategy(graph);

                        //Prints the shortest path from S to C
                        console.log(dijkstra.shortest(this.smallestCity, this.biggestCity));
                    }
                });
            }
        },
        created() {
            this.getAllAirlineAndCityOption();
            // this.findTheShortestWay();
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

