// src/plugins/vuetify.ts
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Ikony MDI
import '@mdi/font/css/materialdesignicons.css'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// DataTable w Vuetify 3.9.x jest w labs – trzeba zarejestrować
import { VDataTable } from 'vuetify/components'

export default createVuetify({
  // rejestrujemy standardowe komponenty + VDataTable (labs)
  components: { ...components, VDataTable },
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
    },
  },
})
