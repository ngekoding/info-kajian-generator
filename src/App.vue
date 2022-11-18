<script setup>
import { ref, computed } from 'vue'
import { groupBy } from './helpers/array'
import EventFormDialog from './components/EventFormDialog.vue'
import dayjs from '@/plugins/dayjs'
import { toBlob } from 'html-to-image'
import { saveAs } from 'file-saver'

const showEventFormDialog = ref(false)

const events = ref([])
const groupedEvents = computed(() => groupBy(events.value, 'date'))
const oldEvent = ref(null)

const createEvent = () => {
  oldEvent.value = null
  showEventFormDialog.value = true
}

const editEvent = (event) => {
  oldEvent.value = event
  showEventFormDialog.value = true
}

const onEventAdded = (event) => {
  events.value.push(event)
}

const onEventUpdated = (event) => {
  const index = events.value.findIndex((e) => e.id == event.id)
  if (index > -1) {
    events.value.splice(index, 1, event)
  }
}

const removeEvent = (id) => {
  const index = events.value.findIndex((e) => e.id == id)
  if (index > -1) {
    events.value.splice(index, 1)
  }
}

const editorRef = ref(null)

const downloadFilter = (node) => {
  const ignoredClasses = ['hide-on-save']
  return !ignoredClasses.some((cls) => node?.classList?.contains(cls))
}

const download = () => {
  const el = editorRef.value
  const filename = 'info-kajian-' + dayjs().valueOf()
  const SCALE = 2.5

  toBlob(el, {
    canvasWidth: el.offsetWidth * SCALE,
    canvasHeight: el.offsetHeight * SCALE,
    style: {
      margin: 0,
      borderRadius: 0
    },
    filter: downloadFilter
  }).then((blob) => {
    saveAs(blob, filename + '.png')
  })
}
</script>

<template>
  <!-- Event Form Dialog -->
  <event-form-dialog
    v-model:show="showEventFormDialog"
    :old-event="oldEvent"
    @added="onEventAdded"
    @updated="onEventUpdated"
  />
  <!-- Download Button -->
  <button
    class="fixed bottom-4 right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white shadow-md"
    @click="download()"
  >
    <i-mdi-download class="text-[18px]" />
  </button>
  <div class="relative min-h-screen bg-gray-700 py-6">
    <!-- Header -->
    <header class="pb-6 text-center text-white">
      <i-mdi-lightning-bolt-circle class="inline-block text-4xl" />
      <h3 class="text-2xl">Info Kajian Generator</h3>
      <p class="text-xs text-gray-300">Powered by ngekoding.github.io</p>
    </header>
    <!-- Editor -->
    <div
      ref="editorRef"
      class="mx-4 overflow-hidden rounded-md bg-primary-dark pb-5 font-philosopher md:mx-auto md:max-w-lg"
    >
      <header
        class="group bg-[url('/img/bg-mosque-3.png')] bg-cover bg-bottom py-14 text-center"
      >
        <p
          class="text-xs tracking-widest text-gray-100 decoration-dotted decoration-1 underline-offset-2 outline-none focus:underline"
          contenteditable="true"
          spellcheck="false"
        >
          Hadir dan Ikutilah
        </p>
        <h3
          class="text-2xl font-bold text-accent decoration-dotted decoration-1 underline-offset-2 outline-none focus:underline"
          contenteditable="true"
          spellcheck="false"
        >
          Judul Info Kajian
        </h3>
        <p
          class="text-white decoration-dotted decoration-1 underline-offset-2 outline-none focus:underline"
          contenteditable="true"
          spellcheck="false"
        >
          Keterangan Tambahan
        </p>
      </header>
      <p v-if="events.length == 0" class="text-center text-white">
        Silakan klik <b>Tambah Jadwal</b> di bawah untuk memulai.
      </p>
      <div v-else class="mx-5 overflow-hidden rounded-md border border-primary">
        <div v-for="(group, date) in groupedEvents" :key="date" class="group">
          <div class="bg-primary py-1 px-3 text-accent">
            {{ dayjs(date).format('dddd, DD MMMM YYYY') }}
          </div>
          <div
            v-for="(event, index) in group"
            :key="index"
            class="relative border-b border-dashed border-b-primary px-3 pt-2 pb-3 last:border-b-0 last:pb-2"
          >
            <h4 class="mb-1 text-xl font-bold text-white">
              {{ event.title }}
            </h4>
            <table class="text-sm leading-4">
              <tr>
                <td class="w-16 py-0.5 align-top text-primary-light">Waktu</td>
                <td class="text-white">{{ event.time }}</td>
              </tr>
              <tr v-if="event.location">
                <td class="py-0.5 align-top text-primary-light">Tempat</td>
                <td class="text-white">{{ event.location }}</td>
              </tr>
              <tr v-if="event.speaker">
                <td class="py-0.5 align-top text-primary-light">Pemateri</td>
                <td class="text-white">{{ event.speaker }}</td>
              </tr>
            </table>
            <!-- Event actions -->
            <div class="hide-on-save absolute top-1/2 right-1 -translate-y-1/2">
              <button
                class="flex h-5 w-5 items-center justify-center rounded-full bg-green-700"
                @click="editEvent(event)"
              >
                <i-mdi-text-box-edit-outline
                  class="align-middle text-[12px] text-white"
                />
              </button>
              <button
                class="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-700"
                @click="removeEvent(event.id)"
              >
                <i-mdi-trash class="align-middle text-[12px] text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Add schedule button -->
      <button
        class="hide-on-save mx-auto mt-5 flex items-center rounded-full bg-gradient-to-br from-primary-light to-primary px-3 py-1 font-mono text-sm text-white"
        @click="createEvent()"
      >
        <i-mdi-plus-circle class="mr-1" />
        <span>Tambah Jadwal</span>
      </button>
      <!-- Footer -->
      <footer class="mx-5 mt-5 text-center font-mono text-xs text-accent">
        <p>Dibuat dengan <b>Info Kajian Generator</b></p>
        <a
          href="https://ngekoding.github.io/info-kajian-generator"
          class="text-white"
        >
          s.id/info-kajian-generator
        </a>
      </footer>
    </div>
  </div>
</template>
