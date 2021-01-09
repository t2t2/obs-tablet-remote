import Vue from 'vue'
import {library} from '@fortawesome/fontawesome-svg-core'
import {
	faChartBar,
	faCheck,
	faClock,
	faColumns,
	faCog,
	faDotCircle,
	faExpand,
	faPencilAlt,
	faPlusSquare,
	faPowerOff,
	faTimes,
	faTrashAlt,
	faTv,
	faVideo,
	faVolumeMute,
	faVolumeUp,
	faWindowMaximize,
	faPhotoVideo,
	faFileCode
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(
	faChartBar,
	faCheck,
	faClock,
	faColumns,
	faCog,
	faDotCircle,
	faExpand,
	faPencilAlt,
	faPlusSquare,
	faPowerOff,
	faTimes,
	faTrashAlt,
	faTv,
	faVideo,
	faVolumeMute,
	faVolumeUp,
	faWindowMaximize,
	faPhotoVideo,
	faFileCode
)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)
