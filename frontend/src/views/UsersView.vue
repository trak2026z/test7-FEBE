<template>
  <v-container>
    <v-row class="align-center justify-space-between">
      <v-col cols="auto"><h2 class="text-h5">Użytkownicy</h2></v-col>
      <v-col cols="auto" class="d-flex ga-2">
        <v-btn color="primary" @click="fetchUsers" prepend-icon="mdi-refresh">Odśwież</v-btn>
        <v-btn color="success" @click="createOpen = true" prepend-icon="mdi-account-plus">Dodaj</v-btn>
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="users"
      :loading="loading"
      item-key="id"
      class="mt-2"
      density="comfortable"
      elevation="1"
    />

    <CreateUserDialog v-model="createOpen" @created="onCreated" />

    <v-snackbar v-model="snack.show" :color="snack.color" timeout="2200">
      {{ snack.message }}
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUsers } from '@/api/users'
import type { User } from '@/api/users'
import CreateUserDialog from '@/components/CreateUserDialog.vue'

const users = ref<User[]>([])
const loading = ref(false)

const headers = [
  { title: 'ID', key: 'id', width: 80 },
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Age', key: 'age', width: 100 },
]

const createOpen = ref(false)
const snack = ref({ show: false, message: '', color: 'success' })

const fetchUsers = async () => {
  try {
    loading.value = true
    const { data } = await getUsers()
    users.value = Array.isArray(data) ? data : []
  } finally {
    loading.value = false
  }
}

const onCreated = async () => {
  snack.value = { show: true, message: 'Użytkownik utworzony', color: 'success' }
  await fetchUsers()
}

onMounted(fetchUsers)
</script>