<template>
    <div class="mx-5 my-5">
        <b-card-group columns>
            <div v-for="team in teams" :key="team.id">
            <b-card
            :img-src="team.img_url"
            img-alt="Image"
            img-top
            class="shadow-lg p-3 mb-5 bg-white rounded"
            >
            <b-card-text>
                <h1>{{ team.team1 }}</h1>
            </b-card-text>
            </b-card>
            </div>
        </b-card-group>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            teams: [],
            currentPage: 1,
            perPage: 10,
        }
    },
    mounted () {
        axios
        .get('https://ipl-project-360e3-default-rtdb.firebaseio.com/teams.json')
        .then(res => (this.teams = res.data))
    },
    computed: {
      rows() {
        return this.teams.length
      }
    }
}
</script>