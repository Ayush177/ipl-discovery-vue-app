<template>
    <div>
        <div class="page">
            <b-row class="mx-3 my-4 text-center">
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
                        <b-form-input v-model="city" placeholder="City" class="shadow p-3 bg-white rounded"></b-form-input>
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
                    <b-button class="shadow rounded" variant="info" @click="filter_list">{{ filtered_list ? 'Remove Filter' : 'Click to Filter List'}}</b-button>
                </b-col>
            </b-row>
        </div>
        <div  class="text-center p-0 m-0">
            <h1>Match List</h1>
        </div>
        <b-card class="text-center shadow-lg mx-3 mb-4 mt-2 bg-white rounded" no-body>
        <b-table-simple hover small caption-top responsive striped sticky-header="450px" no-border-collapse class='p-0 m-0'>
            <b-thead head-variant="dark">
            <b-tr>
                <b-th>Date</b-th>
                <b-th>Player of Match</b-th>
                <b-th>Result</b-th>
                <b-th>Team 1</b-th>
                <b-th>Team 2</b-th>
                <b-th>Toss Decision</b-th>
                <b-th>Toss Winner</b-th>
                <b-th>Umpire 1</b-th>
                <b-th>Umpire 2</b-th>
                <b-th>Venue</b-th>
                <b-th>Win (Runs)</b-th>
                <b-th>Win (Wickets)</b-th>
                <b-th>Winner</b-th>
            </b-tr>
            </b-thead>
            <b-tbody>
            <b-tr v-for="match in matches" :key="match.id">
                <b-td>{{ match.date }}</b-td>
                <b-td>{{ match.player_of_match }}</b-td>
                <b-td>{{ match.result }}</b-td>
                <b-td>{{ match.team1 }}</b-td>
                <b-td>{{ match.team2 }}</b-td>
                <b-td>{{ match.toss_decision }}</b-td>
                <b-td>{{ match.toss_winner }}</b-td>
                <b-td>{{ match.umpire1 }}</b-td>
                <b-td>{{ match.umpire2 }}</b-td>
                <b-td>{{ match.venue }}, {{ match.city }}</b-td>
                <b-td :variant="check_win(match.win_by_runs)">{{ match.win_by_runs }}</b-td>
                <b-td :variant="check_win(match.win_by_wickets)">{{ match.win_by_wickets }}</b-td>
                <b-td>{{ match.winner }}</b-td>
            </b-tr>
            </b-tbody>
        </b-table-simple>
        </b-card>
        <div class="text-center mb-4" v-if="!filtered_list">
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
            matches: [],
            currentPage: 0,
            team: '',
            city: '',
            player: '',
            filtered_list: this.$route.fullPath.split('/').pop()=='filter',
            rightDisabled: false,
            leftDisabled: false,
        }
    },
    mounted () {
        this.get_entries(0);
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
            let url=`https://ipl-project-360e3-default-rtdb.firebaseio.com/matches.json?orderBy="$key"&limitToFirst=10&startAt="${this.currentPage*10}"`;
            if(dir==-1){
                if(this.currentPage<=0){
                    this.leftDisabled=true;
                    return;
                }
                this.currentPage--;
                if(this.currentPage)
                    url=`https://ipl-project-360e3-default-rtdb.firebaseio.com/matches.json?orderBy="$key"&limitToFirst=10&startAt="${this.currentPage*10+1}"`;
                else
                    url=`https://ipl-project-360e3-default-rtdb.firebaseio.com/matches.json?orderBy="$key"&limitToFirst=10&startAt="${this.currentPage*10}"`;
            }
            else if(dir==1){
                this.currentPage++;
                url=`https://ipl-project-360e3-default-rtdb.firebaseio.com/matches.json?orderBy="$key"&limitToFirst=10&startAt="${this.currentPage*10+1}"`;

            }
            axios
            .get(url)
            .then(res => {
                if(res.data==null)
                    this.rightDisabled=true;
                else
                    this.matches = res.data
            })
        },
        filter_list(){
            if(!this.filtered_list){
                this.filtered_list=true;
                this.team='Royal Challengers Bangalore'
                this.city='Delhi'
                this.player='Yuvraj Singh'
                this.matches=[{
                    date: '05-04-2017',
                    player_of_match: 'Yuvraj Singh',
                    result: 'normal',
                    team1: 'Sunrisers Hyderabad',
                    team2: 'Royal Challengers Bangalore',
                    toss_decision: 'field',
                    toss_winner: 'Royal Challengers Bangalore',
                    umpire1: 'AY Dandekar',
                    umpire2: 'NJ Llong',
                    venue: 'Rajiv Gandhi International Stadium, Uppal',
                    city: 'Hyderabad',
                    win_by_runs: 35,
                    win_by_wickets: 0,
                    winner: 'Sunrisers Hyderabad',
                }]
                this.currentPage=0;
            }
            else{
                this.filtered_list=false;
                this.team=''
                this.city=''
                this.player=''
                this.get_entries(0);
            }
        }
    }
}
</script>