var docElm = document.documentElement,
	goFullScreen = docElm.requestFullscreen || docElm.mozRequestFullScreen
		|| docElm.webkitRequestFullScreen || docElm.msRequestFullscreen,
	leaveFullScreen = document.exitFullscreen || document.mozCancelFullScreen
		|| document.webkitCancelFullScreen || document.msExitFullscreen;

export default {
	methods: {
		toggleFullscreen: function () {
			var isFullScreen = document.fullscreen || document.mozFullScreen
				|| document.webkitIsFullScreen || document.msFullscreenElement;

			if (!isFullScreen) {
				goFullScreen.apply(docElm)
			} else {
				leaveFullScreen.apply(document)
			}
		}
	}
}