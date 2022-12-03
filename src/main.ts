import 'nprogress/nprogress.css'
import './assets/styles/index.css'
import 'primevue/resources/primevue.min.css'
// import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import './assets/styles/layout.scss'
import './assets/demo/flags/flags.css'
import 'toastify-js/src/toastify.css'
import 'tippy.js/dist/tippy.css'
import { createPinia } from 'pinia'
import { createApp, reactive } from 'vue'
import router from './router'
import i18n from './i18n'

import AppWrapper from './AppWrapper.vue'
import PrimeVue from 'primevue/config'
import AutoComplete from 'primevue/autocomplete'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Avatar from 'primevue/avatar'
import AvatarGroup from 'primevue/avatargroup'
import Badge from 'primevue/badge'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import Card from 'primevue/card'
import Checkbox from 'primevue/checkbox'
import Chip from 'primevue/chip'
import Chips from 'primevue/chips'
import Column from 'primevue/column'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmPopup from 'primevue/confirmpopup'
import ConfirmationService from 'primevue/confirmationservice'
import ContextMenu from 'primevue/contextmenu'
import DataTable from 'primevue/datatable'
import DataView from 'primevue/dataview'
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions'
import Dialog from 'primevue/dialog'
import Divider from 'primevue/divider'
import Dropdown from 'primevue/dropdown'
import Fieldset from 'primevue/fieldset'
import FileUpload from 'primevue/fileupload'
import InlineMessage from 'primevue/inlinemessage'
import Inplace from 'primevue/inplace'
import InputMask from 'primevue/inputmask'
import InputNumber from 'primevue/inputnumber'
import InputSwitch from 'primevue/inputswitch'
import InputText from 'primevue/inputtext'
import MegaMenu from 'primevue/megamenu'
import Menu from 'primevue/menu'
import Menubar from 'primevue/menubar'
import Message from 'primevue/message'
import OverlayPanel from 'primevue/overlaypanel'
import Paginator from 'primevue/paginator'
import Panel from 'primevue/panel'
import PanelMenu from 'primevue/panelmenu'
import Password from 'primevue/password'
import ProgressBar from 'primevue/progressbar'
import RadioButton from 'primevue/radiobutton'
import Ripple from 'primevue/ripple'
import SelectButton from 'primevue/selectbutton'
import ScrollPanel from 'primevue/scrollpanel'
import ScrollTop from 'primevue/scrolltop'
import Slider from 'primevue/slider'
import Sidebar from 'primevue/sidebar'
import Skeleton from 'primevue/skeleton'
import Steps from 'primevue/steps'
import StyleClass from 'primevue/styleclass'
import TabMenu from 'primevue/tabmenu'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import Toolbar from 'primevue/toolbar'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Tooltip from 'primevue/tooltip'
import ToggleButton from 'primevue/togglebutton'
import BlockViewer from './BlockViewer.vue'

router.afterEach(function (to, from, next) {
  window.scrollTo(0, 0)
  // next()
})

const app = createApp(AppWrapper)

app.config.globalProperties.$appState = reactive({
  theme: 'lara-light-indigo',
  darkTheme: false
})

app.use(PrimeVue, { ripple: true, inputStyle: 'outlined' })
app.use(ConfirmationService)
app.use(ToastService)
app.use(router)

app.directive('tooltip', Tooltip)
app.directive('ripple', Ripple)
app.directive('styleclass', StyleClass)

app.component('Accordion', Accordion)
app.component('AccordionTab', AccordionTab)
app.component('AutoComplete', AutoComplete)
app.component('Avatar', Avatar)
app.component('AvatarGroup', AvatarGroup)
app.component('Badge', Badge)
app.component('Button', Button)
app.component('Calendar', Calendar)
app.component('Card', Card)
app.component('Checkbox', Checkbox)
app.component('Chip', Chip)
app.component('Chips', Chips)
app.component('Column', Column)
app.component('ConfirmDialog', ConfirmDialog)
app.component('ConfirmPopup', ConfirmPopup)
app.component('ContextMenu', ContextMenu)
app.component('DataTable', DataTable)
app.component('DataView', DataView)
app.component('DataViewLayoutOptions', DataViewLayoutOptions)
app.component('Dialog', Dialog)
app.component('Divider', Divider)
app.component('Dropdown', Dropdown)
app.component('Fieldset', Fieldset)
app.component('FileUpload', FileUpload)
app.component('InlineMessage', InlineMessage)
app.component('Inplace', Inplace)
app.component('InputMask', InputMask)
app.component('InputNumber', InputNumber)
app.component('InputSwitch', InputSwitch)
app.component('InputText', InputText)
app.component('MegaMenu', MegaMenu)
app.component('Menu', Menu)
app.component('Menubar', Menubar)
app.component('Message', Message)
app.component('OverlayPanel', OverlayPanel)
app.component('Paginator', Paginator)
app.component('Panel', Panel)
app.component('PanelMenu', PanelMenu)
app.component('Password', Password)
app.component('ProgressBar', ProgressBar)
app.component('RadioButton', RadioButton)
app.component('SelectButton', SelectButton)
app.component('ScrollPanel', ScrollPanel)
app.component('ScrollTop', ScrollTop)
app.component('Slider', Slider)
app.component('Sidebar', Sidebar)
app.component('Skeleton', Skeleton)
app.component('Steps', Steps)
app.component('TabMenu', TabMenu)
app.component('TabView', TabView)
app.component('TabPanel', TabPanel)
app.component('Toast', Toast)
app.component('Toolbar', Toolbar)
app.component('ToggleButton', ToggleButton)
app.component('BlockViewer', BlockViewer)
const pinia = createPinia()
app.use(pinia)
app.use(i18n)
app.mount('#app')
