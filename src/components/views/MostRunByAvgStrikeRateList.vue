<template>
    <div>
    <div>
        <b-row class="mx-5 my-4 text-center">
            <b-col cols="12" md="5" lg="5" class="pb-2">
                <b-input-group>
                    <b-input-group-prepend is-text class="shadow">
                        <b-icon icon="search"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input v-model="batsman" placeholder="Who's your favorite Batsman" class="shadow p-3 bg-white rounded"></b-form-input>
                </b-input-group>
            </b-col>
            <b-col cols="12" md="5" lg="5"  class="pb-2">
                <b-input-group>
                    <b-input-group-prepend is-text class="shadow">
                        <b-icon icon="search"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input v-model="total_run" placeholder="Total Run" class="shadow p-3 bg-white rounded"></b-form-input>
                </b-input-group>
            </b-col>
            <b-col col="12" md="2" lg="2">
                <b-button class="shadow rounded" to="/most-run-by-avg-strikerate/filter" variant="info">Click to Filter List</b-button>
            </b-col>
        </b-row>
    </div>
    <div  class="text-center p-0 m-0">
        <h1>Strikerate List</h1>
    </div>
    <b-card no-body class="text-center shadow-lg p-0 mx-5 mb-4 bg-white rounded">
        <b-table
            :items="avg_strikerate"
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            responsive="sm"
            head-variant="dark"
            sticky-header="450px"
            no-border-collapse
            striped
            hover
            class="p-0 m-0"
        >
            <template #cell(average)="data">
                {{ data.value.toFixed(2) }}
            </template>
            <template #cell(strikerate)="data">
                {{ data.value.toFixed(2) }}
            </template>
        </b-table>
    </b-card>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            sortBy: 'strikerate',
            sortDesc: false,
            fields: [
            { key: 'batsman', sortable: false },
            { key: 'average', sortable: false },
            { key: 'numberofballs', sortable: false },
            { key: 'out', sortable: false },
            { key: 'strikerate', sortable: true },
            { key: 'total_runs', sortable: true },
            ],
            avg_strikerate: [],
            currentPage: 1,
            perPage: 10,
            batsman: '',
            total_run: '',
            filtered_list: this.$route.fullPath.split('/').pop()=='filter'
        }
    },
    mounted () {
        if(this.filtered_list){
            this.batsman= 'V Kohli'
            this.total_run= 5426
            this.avg_strikerate=[{
                batsman: 'V Kohli',
                average: 35.69736842105263,
                numberofballs: 4111,
                out: 152,
                strikerate: 131.98735100948676,
                total_runs: 5426,
            }]
        }
        else{
            axios
            .get('https://ipl-project-360e3-default-rtdb.firebaseio.com/most_run_avg_stikerate.json?orderBy="$key"&limitToFirst=20')
            .then(res => {
                (this.avg_strikerate = res.data)
            })
        }
    },
    computed: {
      rows() {
        return this.avg_strikerate.length
      }
    }
}
</script>