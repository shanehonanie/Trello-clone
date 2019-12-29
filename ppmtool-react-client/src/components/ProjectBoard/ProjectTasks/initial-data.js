const data = {
	tasks: [
		{
			id: 7,
			projectSequence: 'REACT-7',
			status: 'TODO',
			projectIdentifier: 'REACT'
		},
		{
			id: 1,
			projectSequence: 'REACT-1',
			status: 'TODO',
			projectIdentifier: 'REACT'
		},
		{
			id: 4,
			projectSequence: 'REACT-4',
			status: 'TODO',
			projectIdentifier: 'REACT'
		}
	],
	columns: {
		TODO: {
			id: 'TODO',
			title: 'To do',
			taskIds: ['REACT-7', 'REACT-1', 'REACT-4']
		},
		IN_PROGRESS: {
			id: 'IN_PROGRESS',
			title: 'In progress',
			taskIds: []
		},
		DONE: {
			id: 'DONE',
			title: 'Done',
			taskIds: []
		}
	},
	columnOrder: ['TODO']
};

export default data;
