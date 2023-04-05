/**
 * 
 * @param {Boolean} isAlertActive - (Boolean) Value indicating if user wants speech alert.
 * @returns {Void} (Void) Depending on isAlertActive it makes the speaker talk or silences it.
 */

export const speechAlert = (isAlertActive) => {
	let content = 'Task time is finished. Task time is finished. Task time is finished.';

	const alarm = new SpeechSynthesisUtterance(content);
	alarm.voice = speechSynthesis.getVoices()[4];

	if (isAlertActive && !speechSynthesis.speaking) {
		speechSynthesis.speak(alarm);
	} else if (!isAlertActive && speechSynthesis.speaking) {
		speechSynthesis.cancel();
	}
};
