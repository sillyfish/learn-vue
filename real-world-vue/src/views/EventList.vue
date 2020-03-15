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
    <template v-if="page * perPage < event.totalCount">
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

export default {
  name: 'EventList',
  components: {
    EventCard,
  },
  data() {
    return {
      // events: [],
      perPage: 3,
    }
  },
  created() {
    this.$store.dispatch('fetchEvents', {
      perPage: this.perPage,
      page: this.page,
    })
    // console.log(this.user.user)
    /*
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
*/
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    ...mapState(['event', 'user']),
  },
}
</script>

<style scoped></style>
