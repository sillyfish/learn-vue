<template>
  <div>
    <h1>Events Listing</h1>
    <EventCard v-for="event of events" :key="event.id" :event="event" />
  </div>
</template>

<script>
import EventCard from '../components/EventCard'
// import axios from 'axios'
import EventService from '../services/EventService'

export default {
  name: 'EventList',
  components: {
    EventCard,
  },
  data() {
    return {
      events: [],
    }
  },
  created() {
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
  },
}
</script>

<style scoped></style>
