<template>
    <div>
    <div>
        <b-row class="mx-5 my-4 text-center">
            <b-col cols="12" md="3" lg="3" class="pb-2" pb-5>
                <b-input-group>
                    <b-input-group-prepend is-text class="shadow">
                        <b-icon icon="search"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input v-model="match_id" placeholder="Match ID" class="shadow p-3 bg-white rounded"></b-form-input>
                </b-input-group>
            </b-col>
            <b-col cols="12" md="3" lg="3" class="pb-2">
                <b-input-group>
                    <b-input-group-prepend is-text class="shadow">
                        <b-icon icon="search"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input v-model="team" placeholder="Team" class="shadow p-3 bg-white rounded"></b-form-input>
                </b-input-group>
            </b-col>
            <b-col cols="12" md="3" lg="3" class="pb-2">
                <b-input-group>
                    <b-input-group-prepend is-text class="shadow">
                        <b-icon icon="search"></b-icon>
                    </b-input-group-prepend>
                <b-form-input v-model="player" placeholder="Player" class="shadow p-3 bg-white rounded"></b-form-input>
                </b-input-group>
            </b-col>
            <b-col col="3">
                <b-button class="shadow rounded" to="/delivery-list/filter" variant="info">Click to Filter List</b-button>
            </b-col>
        </b-row>
    </div>
    <div class="text-center p-0 m-0">
        <h1>Delivery List</h1>
    </div>
    <b-card class="text-center shadow-lg mx-5 mb-4 mt-2 bg-white rounded" no-body>
    <b-table-simple hover small caption-top responsive striped sticky-header="450px" no-border-collapse class='p-0 m-0'>
        <b-thead head-variant="dark">
        <b-tr>
            <b-th>Match ID</b-th>
            <b-th>Bating Team</b-th>
            <b-th>Bowling Team</b-th>
            <b-th>Batsman</b-th>
            <b-th>Bowler</b-th>
            <b-th>Inning</b-th>
            <b-th>Over</b-th>
            <b-th>Wide Runs</b-th>
            <b-th>Penalty Runs</b-th>
            <b-th>Noball Runs</b-th>
            <b-th>Legbye Runs</b-th>
            <b-th>Bye Runs</b-th>
            <b-th>Extra Runs</b-th>
            <b-th>Total Runs</b-th>
        </b-tr>
        </b-thead>
        <b-tbody>
        <b-tr v-for="delivery in deliveries" :key="delivery.id">
            <b-td>{{ delivery.match_id }}</b-td>
            <b-td>{{ delivery.batting_team }}</b-td>
            <b-td>{{ delivery.bowling_team }}</b-td>
            <b-td>{{ delivery.batsman }}</b-td>
            <b-td>{{ delivery.bowler }}</b-td>
            <b-td>{{ delivery.inning }}</b-td>
            <b-td>{{ delivery.over }}</b-td>
            <b-td>{{ delivery.wide_runs }}</b-td>
            <b-td>{{ delivery.penalty_runs }}</b-td>
            <b-td>{{ delivery.noball_runs }}</b-td>
            <b-td>{{ delivery.legbye_runs }}</b-td>
            <b-td>{{ delivery.bye_runs }}</b-td>
            <b-td>{{ delivery.extra_runs }}</b-td>
            <b-td>{{ delivery.total_runs }}</b-td>
        </b-tr>
        </b-tbody>
    </b-table-simple>
    </b-card>
    <div class="text-center" v-if="!filtered_list">
        <span>
            <b-button variant="light" class="rounded-circle px-0 py-1" size="sm" :disabled="rightDisabled" @click="get_entries(-1)">
                <b-icon icon="chevron-left" aria-hidden="true" scale=2 class="mr-4"></b-icon>
            </b-button>
            <h5 class="d-inline">{{ currentPage }}</h5>
            <b-button variant="light" class="rounded-circle px-0 py-1" size="sm" :disabled="rightDisabled" @click="get_entries(1)">
                <b-icon icon="chevron-right" aria-hidden="true" scale=2 class="ml-4"></b-icon>
            </b-button>
        </span>
    </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            deliveries: [],
            currentPage: 0,
            team: '',
            match_id: '',
            player: '',
            filtered_list: this.$route.fullPath.split('/').pop()=='filter',
            rightDisabled: false,
            leftDisabled: false,
        }
    },
    mounted () {
        if(this.filtered_list){
            this.team='Rajasthan Royals'
            this.match_id=436
            this.player='AM Rahane'
            this.deliveries=[
                {
                    match_id: 436,
                    batting_team: 'Rajasthan Royals',
                    bowling_team: 'Kings XI Punjab',
                    batsman: 'AM Rahane',
                    bowler: 'MS Gony',
                    inning: 2,
                    over: 9,
                    wide_runs: 0,
                    penalty_runs: 0,
                    noball_runs: 0,
                    legbye_runs: 0,
                    bye_runs: 0,
                    extra_runs: 0,
                    total_runs: 1,
                },
                {
                    match_id: 436,
                    batting_team: 'Rajasthan Royals',
                    bowling_team: 'Kings XI Punjab',
                    batsman: 'AM Rahane',
                    bowler: 'MS Gony',
                    inning: 2,
                    over: 9,
                    wide_runs: 0,
                    penalty_runs: 0,
                    noball_runs: 0,
                    legbye_runs: 0,
                    bye_runs: 0,
                    extra_runs: 0,
                    total_runs: 1,
                },
            ]
        }
        else{
            this.get_entries(0);
        }
    },
    methods: {
        check_win(num){
          if(num>0)
            return 'success';
          return '';
        },
        get_entries(dir){
            if(this.currentPage<0)
                return;
            let url=`https://ipl-project-360e3-default-rtdb.firebaseio.com/deliveries/results.json?orderBy="$key"&limitToFirst=20&startAt="${this.currentPage*20}"`;
            if(dir==-1){
                if(this.currentPage<=0){
                    this.leftDisabled=true;
                    return;
                }
                this.currentPage--;
                if(this.currentPage)
                    url=`https://ipl-project-360e3-default-rtdb.firebaseio.com/deliveries/results.json?orderBy="$key"&limitToFirst=20&startAt="${this.currentPage*20+1}"`;
                else
                    url=`https://ipl-project-360e3-default-rtdb.firebaseio.com/deliveries/results.json?orderBy="$key"&limitToFirst=20&startAt="${this.currentPage*20}"`;
            }
            else if(dir==1){
                this.currentPage++;
                url=`https://ipl-project-360e3-default-rtdb.firebaseio.com/deliveries/results.json?orderBy="$key"&limitToFirst=20&startAt="${this.currentPage*20+1}"`;

            }
            axios
            .get(url)
            .then(res => {
                (res);
                if(res.data==null)
                    this.rightDisabled=true;
                else
                    this.deliveries = res.data
            })
        }
    }
}
</script>