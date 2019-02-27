import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
	faChartBar,
	faCheck,
	faClock,
	faColumns,
	faCog,
	faExpand,
	faFilm,
	faPencilAlt,
	faPlusSquare,
	faPowerOff,
	faTrashAlt,
	faTv,
	faVideo,
	faVolumeUp,
	faWindowMaximize
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
	faChartBar,
	faCheck,
	faClock,
	faColumns,
	faCog,
	faFilm,
	faExpand,
	faPencilAlt,
	faPlusSquare,
	faPowerOff,
	faTrashAlt,
	faTv,
	faVideo,
	faVolumeUp,
	faWindowMaximize
)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)
