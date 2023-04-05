/**
 * 
 * @param {Number} totalSeconds - (Number) Total seconds remaining to complete task.
 * @returns {{hour: number; minute: number; second: number}} Returns totalSeconds converted to hours, minutes and seconds.
 */

export const calculateTime = (totalSeconds) => {
	const hour = parseInt(totalSeconds / 3600);
	const moduleAfterHour = totalSeconds % 3600;
	const minute = parseInt(moduleAfterHour / 60);
	const second = parseInt(moduleAfterHour % 60);

	return { hour, minute, second };
};
