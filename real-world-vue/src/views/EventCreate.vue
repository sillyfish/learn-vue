<template>
  <div>
    <h1>Create an Event, {{ user.name }}</h1>
    <form @submit.prevent="createEvent">
      <!--
      <label>Select a category</label>
      <select v-model="event.category">
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>
-->
      <BaseSelect
        :options="categories"
        label="Select a category"
        v-model="event.category"
        :class="{ error: $v.event.category.$error }"
        @blur="$v.event.category.$touch()"
      />
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">
          Category is required!
        </p>
      </template>

      <h3>Name & describe your event</h3>
      <!--
      <div class="field">
        <label>Title</label>
        <input
          v-model="event.title"
          type="text"
          placeholder="Add an event title"
        />
      </div>
      <div class="field">
        <label>Description</label>
        <input
          v-model="event.description"
          type="text"
          placeholder="Add a description"
        />
      </div>
      <h3>Where is your event?</h3>
      <div class="field">
        <label>Location</label>
        <input
          v-model="event.location"
          type="text"
          placeholder="Add a location"
        />
      </div>
-->
      <BaseInput
        label="Title"
        v-model="event.title"
        type="text"
        placeholder="Add an event title"
        :class="{ error: $v.event.title.$error }"
        @blur="$v.event.title.$touch()"
      />
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">
          Title is required!
        </p>
      </template>

      <BaseInput
        label="Description"
        v-model="event.description"
        type="text"
        placeholder="Add an event description"
        :class="{ error: $v.event.description.$error }"
        @blur="$v.event.description.$touch()"
      />
      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="errorMessage">
          Description is required!
        </p>
      </template>

      <BaseInput
        label="Location"
        v-model="event.location"
        type="text"
        placeholder="Add an event location"
        :class="{ error: $v.event.location.$error }"
        @blur="$v.event.location.$touch()"
      />
      <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="errorMessage">
          Location is required!
        </p>
      </template>

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>
      <!-- ?? the opened event is useless.
        :input-class="{ error: $v.event.date.$error }"
                  @opened="$v.event.date.$touch()"
      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="errorMessage">
          Date is required!
        </p>
      </template>
-->

      <!--
      <div class="field">
        <label>Select a time</label>
        <select v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>
-->
      <BaseSelect
        :options="times"
        label="Select a time"
        v-model="event.time"
        :class="{ error: $v.event.time.$error }"
        @blur="$v.event.time.$touch()"
      />
      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">
          Time is required!
        </p>
      </template>

      <!--      <input type="submit" class="button -fill-gradient" value="Submit" />-->
      <BaseButton buttonClass="-fill-gradient" :disabled="$v.$anyError"
        >Submit</BaseButton
      >
      <p v-if="$v.$anyError" class="errorMessage">
        Please fill out the required field(s).
      </p>
    </form>
  </div>
</template>
<!--
<p>This event is created by {{ user.id }}</p>
<p>There are {{ catLength }} catego¢ries</p>
-->

<!--<p>There are {{ catLength }} categories</p>-->
<script>
import { mapState /* mapGetters */ } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import NProgress from 'nprogress'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'EventCreate',
  computed: {
    catLength() {
      // return 0
      return this.$store.getters.catLength
    },
    // ...mapGetters(['getTodoById']),
    ...mapState(['user', 'categories']),
  },
  components: {
    Datepicker,
  },
  data() {
    const times = []
    for (let i = 0; i < 24; i++) {
      times.push(`${i}:00`)
    }
    return {
      times,
      // categories: this.$store.state.categories,
      event: this.createFreshEventObject(),
    }
  },
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required },
    },
  },
  methods: {
    createEvent() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        NProgress.start()
        this.$store
          .dispatch('createEvent', this.event)
          .then(() => {
            this.$router.push({
              name: 'event-show',
              params: { id: this.event.id },
            })
            this.event = this.createFreshEventObject()
          })
          .catch(() => {
            console.log('There was a problem creating your event!')
            NProgress.done()
          })
      }
    },
    createFreshEventObject() {
      // console.log(this.user)
      // const { user } = this.$store.state
      const { user } = this.$store.state.user
      // console.log(user)
      const id = Math.floor(Math.random() * 10000000)
      return {
        id,
        user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: [],
      }
    },
  },
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
