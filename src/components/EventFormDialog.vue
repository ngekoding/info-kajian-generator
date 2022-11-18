<script setup>
import { computed, reactive, watch } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle
} from '@headlessui/vue'
import { nanoid } from 'nanoid/non-secure'
import BaseInput from './BaseInput.vue'
import { resetForm } from '@/helpers/form'

const props = defineProps({
  show: Boolean,
  oldEvent: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['update:show', 'added', 'updated'])

const isOpen = computed({
  get: () => props.show,
  set: (val) => emit('update:show', val)
})

function closeModal() {
  isOpen.value = false
}

const form = reactive({
  date: '',
  title: '',
  time: '',
  location: '',
  speaker: ''
})

const errors = reactive({
  date: '',
  time: '',
  title: ''
})

const isEdit = computed(() => props.oldEvent !== null)

const dialogTitle = computed(() => {
  if (isEdit.value) return 'Ubah Info Kajian'
  return 'Tambah Info Kajian'
})

watch(isOpen, (val) => {
  if (val && isEdit.value) {
    const oldEvent = { ...props.oldEvent }
    form.date = oldEvent.date
    form.title = oldEvent.title
    form.time = oldEvent.time
    form.location = oldEvent.location
    form.speaker = oldEvent.speaker
  }
})

const validate = () => {
  resetForm(errors)
  let ok = true

  if (!form.date) {
    ok = false
    errors.date = 'Silakan atur tanggal kajian.'
  }

  if (!form.time) {
    ok = false
    errors.time = 'Silakan atur waktu/jam pelaksanaan.'
  }

  if (!form.title) {
    ok = false
    errors.title = 'Silakan atur judul kajian.'
  }

  return ok
}

const save = () => {
  if (!validate()) return

  const event = {
    id: isEdit.value ? props.oldEvent.id : nanoid(),
    ...form
  }

  emit(isEdit.value ? 'updated' : 'added', event)
  resetForm(form)
  closeModal()
}
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="closeModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-30" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <div class="flex items-center justify-between">
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  {{ dialogTitle }}
                </DialogTitle>
                <i-mdi-close-circle-outline
                  class="cursor-pointer text-red-600 hover:text-red-500"
                  @click="closeModal"
                />
              </div>
              <div class="mt-4 grid grid-cols-1 gap-4">
                <base-input
                  v-model="form.date"
                  type="date"
                  label="Tanggal"
                  :error="errors.date"
                />
                <base-input
                  v-model="form.time"
                  label="Waktu"
                  :error="errors.time"
                />
                <base-input
                  v-model="form.location"
                  label="Lokasi"
                  label-hint="Opsional"
                />
                <base-input
                  v-model="form.title"
                  label="Judul"
                  :error="errors.title"
                />
                <base-input
                  v-model="form.speaker"
                  label="Pemateri"
                  label-hint="Opsional"
                />
              </div>
              <button
                type="button"
                class="mt-4 block w-full rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                @click="save"
              >
                Simpan
              </button>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
