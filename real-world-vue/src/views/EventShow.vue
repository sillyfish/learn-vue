<template>
  <div>
    <div class="event-header">
      <span class="eyebrow">@{{ event.time }} on {{ event.date | date }}</span>
      <h1 class="title">{{ event.title }}</h1>
      <h5>Organized by {{ event.organizer ? event.organizer.name : '' }}</h5>
      <h5>Category: {{ event.category }}</h5>
    </div>
    <BaseIcon name="map"><h2>Location</h2></BaseIcon>
    <address>{{ event.location }}</address>
    <h2>Event details</h2>
    <p>{{ event.description }}</p>
    <h2>
      Attendees
      <span class="badge -fill-gradient">{{
        event.attendees ? event.attendees.length : 0
      }}</span>
    </h2>
    <ul class="list-group">
      <li
        v-for="(attendee, index) in event.attendees"
        :key="index"
        class="list-item"
      >
        <b>{{ attendee.name }}</b>
      </li>
    </ul>
  </div>
</template>

<script>
// import EventService from '../services/EventService'
import { mapState } from 'vuex'
// import NProgress from 'nprogress'
import store from '@/store/index'

export default {
  name: 'EventShow',
  // props: ['id'],
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // event: {},
    }
  },
  /*
  computed: mapState({
    event: state => state.event.event,
  }),
*/
  /*
  beforeRouteEnter(to, from, next) {
    // NProgress.start()
    store.dispatch('fetchEvent', to.params.id).then(() => {
      // NProgress.done()
      next()
    })
  },
*/
  /*
  created() {
    this.$store.dispatch('fetchEvent', this.id)
    // console.log(this.event.organizer)
    /!*
    EventService.getEvent(this.id)
      .then(response => {
        this.event = response.data
      })
      .catch(error => {
        console.log(`This is an error: ${error.response}`)
      })
*!/
  },
*/
}
</script>

<style scoped></style>
