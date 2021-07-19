<template>
    <div>
        <h2>Repülőtársaság</h2>
        <b-form-select v-model="airline" :options="airlines" class=""></b-form-select>
    </div>
</template>

<script>
    export default {
        name: "Airlines",
        data() {
            return {
                selected: null,
                options: [
                    { value: null, text: 'Please select an option' },
                    { value: 'a', text: 'This is First option' },
                    { value: 'b', text: 'Selected Option' },
                    { value: { C: '3PO' }, text: 'This is an option with object value' },
                    { value: 'd', text: 'This one is disabled', disabled: true }
                ],
                xmlItems:[]
            }
        },
        created(){
          this.getAllDataFromXML();
        },
        mounted(){
            axios.get('assets/files/airlines.xml')
                .then(response => {
                    this.parseXML(response.data)
                        .then((data) => {
                            this.xmlItems = data;
                        });
                })
        },
        methods: {
            parseXML(data) {
                return  new Promise(resolve => {
                    var k="";
                    var arr = [],
                        parser = new xml2js.Parser(
                            {
                                trim: true,
                                explicitArray: true
                            });
                    parser.parseString(data, function (err, result) {
                        var obj = result.Employee;
                        for (k in obj.emp) {
                            var item = obj.emp[k];
                            arr.push({
                                id: item.id[0],
                                name: item.name[0],
                                email: item.email[0],

                            });
                        }
                        resolve(arr);
                    });
                });
            }
        },
    }
</script>

<style scoped>

</style>