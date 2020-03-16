<template>
  <div>
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event of event.events" :key="event.id" :event="event" />
    <template v-if="page !== 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
      >
        Prev Page
      </router-link>
      |
    </template>
    <template v-if="hasNextPage /*page * perPage < event.totalCount*/">
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
      >
        Next Page
      </router-link>
    </template>
  </div>
</template>

<script>
import EventCard from '../components/EventCard'
// import axios from 'axios'
// import EventService from '../services/EventService'
import { mapState } from 'vuex'
import store from '@/store/index'

function getEvents(to, next) {
  const page = parseInt(to.query.page) || 1
  store.dispatch('fetchEvents', page).then(() => {
    to.params.page = page
    next()
  })
}

export default {
  name: 'EventList',
  components: {
    EventCard,
  },
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      // events: [],
      // perPage: 3,
    }
  },
  beforeRouteEnter(to, from, next) {
    getEvents(to, next)
  },
  beforeRouteUpdate(to, from, next) {
    getEvents(to, next)
  },
  /*
  created() {
    this.$store.dispatch('fetchEvents', {
      perPage: this.perPage,
      page: this.page,
    })
    // console.log(this.user.user)
    /!*
    EventService.getEvents()
      // axios
      // .get('http://localhost:3000/events')
      .then(response => {
        console.log(response.data)
        this.events = response.data
      })
      .catch(error => {
        console.log(`There is an error: ${error.response}`)
      })
*!/
  },
*/
  computed: {
    /*
    page() {
      return parseInt(this.$route.query.page) || 1
    },
*/
    hasNextPage() {
      return this.event.totalCount > this.event.perPage * this.page
    },
    ...mapState(['event', 'user']),
  },
}
</script>

<style scoped></style>
