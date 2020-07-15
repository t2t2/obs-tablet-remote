import Vue from 'vue'
import {library} from '@fortawesome/fontawesome-svg-core'
import {
	faChartBar,
	faCheck,
	faClipboardList,
	faClock,
	faColumns,
	faCog,
	faDotCircle,
	faExpand,
	faLongArrowAltRight,
	faPencilAlt,
	faPlusSquare,
	faPowerOff,
	faRedo,
	faTimes,
	faTrashAlt,
	faTv,
	faVideo,
	faVolumeMute,
	faVolumeUp,
	faWindowMaximize
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(
	faChartBar,
	faCheck,
	faClipboardList,
	faClock,
	faColumns,
	faCog,
	faDotCircle,
	faExpand,
	faLongArrowAltRight,
	faPencilAlt,
	faPlusSquare,
	faPowerOff,
	faRedo,
	faTimes,
	faTrashAlt,
	faTv,
	faVideo,
	faVolumeMute,
	faVolumeUp,
	faWindowMaximize
)

Vue.component('FontAwesomeIcon', FontAwesomeIcon)
