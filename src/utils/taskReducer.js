export const taskReducer = (state, { type, payload }) => {
	switch (type) {
		case 'TOGGLE_CREATING_TASK':
			return {
				...state,
				creatingTask: !state.creatingTask,
			};

		case 'UPDATE_FROM_STORAGE':
			return {
				...state,
				tasks: payload?.tasks || [],
				speechAlertOn: payload?.speechAlertOn || false,
			};

		case 'IS_EDITING_TASK':
			return {
				...state,
				editingTask: !state.editingTask,
				editingTaskData: Object.entries(payload)?.length ? payload : null,
			};

		case 'UPDATE_TASK':
			return {
				...state,
				editingTask: false,
			};

		case 'TOGGLE_SPEECH_ALARM':
			return {
				...state,
				speechAlertOn: !state.speechAlertOn,
			};

		case 'REORDER_TASK':
			return {
				...state,
				tasks: payload,
			}
		
		default:
			return state;
	}
};
