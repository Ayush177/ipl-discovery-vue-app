<template>
    <div>
        <div class="page">
            <b-row class="mx-3 my-4 text-center">
                <b-col cols="12" md="3" lg="3" class="pb-2">
                    <b-input-group>
                        <b-input-group-prepend is-text class="shadow">
                            <b-icon icon="search"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input v-model="team" placeholder="Who's your favorite Team" class="shadow   p-3 bg-white rounded"></b-form-input>
                    </b-input-group>
                </b-col>
                <b-col cols="12" md="3" lg="3" class="pb-2">
                    <b-input-group>
                        <b-input-group-prepend is-text class="shadow">
                            <b-icon icon="search"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input v-model="home_wins" placeholder="Home Wins" class="shadow p-3 bg-white rounded"></b-form-input>
                    </b-input-group>
                </b-col>
                <b-col cols="12" md="3" lg="3" class="pb-2">
                    <b-input-group>
                        <b-input-group-prepend is-text class="shadow">
                            <b-icon icon="search"></b-icon>
                        </b-input-group-prepend>
                        <b-form-input v-model="away_wins" placeholder="Away Wins" class="shadow p-3 bg-white rounded"></b-form-input>
                    </b-input-group>
                </b-col>
                <b-col col="3">
                    <b-button class="shadow rounded" @click="filter_list" variant="info">{{ filtered_list ? 'Remove Filter' : 'Click to Filter List'}}</b-button>
                </b-col>
            </b-row>
        </div>
        <div  class="text-center p-0 m-0">
            <h1>Home and Away Wins</h1>
        </div>
        <b-card class="text-center shadow-lg mx-3 mb-4 mt-2 bg-white rounded" no-body>
            <b-table
                :items="teamwise_home_away_wins"
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
                <template #cell(away_win_percentage)="data">
                    {{ data.value.toFixed(2) }}
                </template>
                <template #cell(home_win_percentage)="data">
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
            sortBy: 'home_win_percentage',
            sortDesc: false,
            fields: [
            { key: 'team', sortable: false },
            { key: 'away_matches', sortable: false },
            { key: 'away_win_percentage', sortable: true },
            { key: 'away_wins', sortable: false },
            { key: 'home_matches', sortable: false },
            { key: 'home_win_percentage', sortable: true },
            { key: 'home_wins', sortable: false },
            ],
            teamwise_home_away_wins: [],
            team: '',
            home_wins: '',
            away_wins: '',
            currentPage: 1,
            perPage: 10,
            filtered_list: this.$route.fullPath.split('/').pop()=='filter'
        }
    },
    mounted () {
        this.get_entries();
    },
    methods: {
        get_entries(){
            axios
            .get('https://ipl-project-360e3-default-rtdb.firebaseio.com/teamwise_home_and_away.json?orderBy="$key"&limitToFirst=20')
            .then(res => (this.teamwise_home_away_wins = res.data))
        },
        filter_list(){
            if(!this.filtered_list){
                this.filtered_list=true;
                this.team= 'Rajasthan Royals'
                this.home_wins= 29
                this.away_wins= 46
                this.teamwise_home_away_wins=[{
                    team: 'Rajasthan Royals',
                    away_matches: 80,
                    away_win_percentage: 57.49999999999999,
                    away_wins: 46,
                    home_matches: 67,
                    home_win_percentage: 43.28358208955223,
                    home_wins: 29,
                }]
            }
            else{
                this.filtered_list=false;
                this.team= ''
                this.home_wins= ''
                this.away_wins= ''
                this.get_entries();
            }
        }
    }
}
</script>