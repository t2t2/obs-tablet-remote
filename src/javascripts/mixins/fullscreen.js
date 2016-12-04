const docElm = document.documentElement
const goFullScreen = docElm.requestFullscreen || docElm.mozRequestFullScreen ||
	docElm.webkitRequestFullScreen || docElm.msRequestFullscreen
const leaveFullScreen = document.exitFullscreen || document.mozCancelFullScreen ||
	document.webkitCancelFullScreen || document.msExitFullscreen

export default {
	methods: {
		toggleFullscreen() {
			const isFullScreen = document.fullscreen || document.mozFullScreen ||
				document.webkitIsFullScreen || document.msFullscreenElement

			if (isFullScreen) {
				leaveFullScreen.apply(document)
			} else {
				goFullScreen.apply(docElm)
			}
		}
	}
}
