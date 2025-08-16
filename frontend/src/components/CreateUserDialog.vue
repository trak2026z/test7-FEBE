<template>
  <v-dialog v-model="open" max-width="520" persistent>
    <v-card>
      <v-card-title class="text-h6">Dodaj użytkownika</v-card-title>

      <v-divider />

      <v-card-text>
        <v-form ref="formRef" v-model="isValid">
          <v-text-field
            v-model="model.name"
            label="Name"
            prepend-inner-icon="mdi-account"
            :rules="[req]"
            autofocus
          />
          <v-text-field
            v-model="model.email"
            label="Email"
            prepend-inner-icon="mdi-email"
            :rules="[req, emailRule]"
            type="email"
          />
          <v-text-field
            v-model.number="model.age"
            label="Age"
            prepend-inner-icon="mdi-cake-variant"
            type="number"
            :rules="[req, ageRule]"
          />
        </v-form>
        <v-alert v-if="error" type="error" class="mt-3" variant="tonal" border="start">
          {{ error }}
        </v-alert>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn variant="text" @click="close">Anuluj</v-btn>
        <v-btn color="primary" :loading="saving" @click="save" prepend-icon="mdi-content-save">
          Zapisz
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { createUser, type User } from '@/api/users'

type Emits = {
  (e: 'update:modelValue', value: boolean): void
  (e: 'created', user: User): void
}

const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits<Emits>()

const open = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emit('update:modelValue', val),
})

const model = reactive<{ name: string; email: string; age: number | null }>({
  name: '',
  email: '',
  age: null,
})

const formRef = ref()
const isValid = ref(false)
const saving = ref(false)
const error = ref<string | null>(null)

const req = (v: any) => (v !== null && v !== undefined && v !== '') || 'Pole wymagane'
const emailRule = (v: string) => /.+@.+\..+/.test(v) || 'Niepoprawny email'
const ageRule = (v: number | null) => (v !== null && v >= 0 && v <= 120) || 'Wiek 0–120'

const reset = () => {
  model.name = ''
  model.email = ''
  model.age = null
  error.value = null
  // @ts-ignore
  formRef.value?.resetValidation?.()
}

watch(open, (val) => {
  if (val) reset()
})

const close = () => {
  open.value = false
}

const save = async () => {
  // @ts-ignore – Vuetify expose validate()
  const result = await formRef.value?.validate()
  if (!result?.valid) return

  try {
    saving.value = true
    error.value = null
    const { data } = await createUser({
      name: model.name,
      email: model.email,
      age: model.age ?? undefined,
    })
    emit('created', data)
    close()
  } catch (e: any) {
    error.value = e?.response?.data?.message ?? 'Nie udało się utworzyć użytkownika'
  } finally {
    saving.value = false
  }
}
</script>