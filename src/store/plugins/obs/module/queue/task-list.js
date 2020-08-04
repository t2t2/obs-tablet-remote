export const TASK_LIST = [
	{
		name: 'Switch Scene',
		requestType: 'SetCurrentScene',
		fields: [
			{
				name: 'scene-name',
				required: true,
				type: 'scene',
				hasChoice: true
			}
		]
	},
	{
		name: 'Show Source',
		requestType: 'SetSceneItemRender',
		fields: [
			{
				name: 'scene-name',
				required: true,
				type: 'scene',
				hasChoice: true
			},
			{
				name: 'source',
				required: true,
				type: 'source',
				hasChoice: true,
				depends: '> scene-name'
			}
		],
		presetFields: [
			{
				name: 'render',
				value: true
			}
		]
	},
	{
		name: 'Hide Source',
		requestType: 'SetSceneItemRender',
		fields: [
			{
				name: 'scene-name',
				required: true,
				type: 'scene',
				hasChoice: true
			},
			{
				name: 'source',
				required: true,
				type: 'source',
				hasChoice: true,
				depends: '> scene-name'
			}
		],
		presetFields: [
			{
				name: 'render',
				value: false
			}
		]
	}
]

