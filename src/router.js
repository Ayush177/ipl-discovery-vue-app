import Vue from 'vue'
import Router from 'vue-router'
// import store from "./store/store"

import MatchList from "./components/views/MatchList.vue"
import TeamList from "./components/views/TeamList.vue"
import MostRunByAvgStrikeRateList from "./components/views/MostRunByAvgStrikeRateList.vue"
import TeamwiseHomeAndAway from "./components/views/TeamwiseHomeAndAway.vue"
import Deliveries from "./components/views/Deliveries.vue"

Vue.use(Router)
const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '',
            redirect: '/match-list'
        },
        {
            path: '/match-list',
            name: 'match-list',
            component: MatchList,
        },
        {
            path: '/team-list',
            name: 'team-list',
            component: TeamList,
        },
        {
            path: '/most-run-by-avg-strikerate',
            name: 'most-run-by-avg-strikerate',
            component: MostRunByAvgStrikeRateList,
        },
        {
            path: '/teamwise-home-and-away',
            name: 'teamwise-home-and-away',
            component: TeamwiseHomeAndAway,
        },
        {
            path: '/delivery-list',
            name: 'delivery',
            component: Deliveries,
        },
        {
            path: '*',
            redirect: '/match-list'
        }
    ]
})

export default router