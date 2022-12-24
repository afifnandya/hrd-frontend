import { createI18n } from 'vue-i18n'
import id from '@/lang/id.json'
import en from '@/lang/en.json'
import ch from '@/lang/ch.json'

const messages = {
  EN: en,
  ID: id,
  CH: ch
}

const i18n = createI18n({
  legacy: false,
  locale: 'ID',
  messages,
  global: true
})

export default i18n
