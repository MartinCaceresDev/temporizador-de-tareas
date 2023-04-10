/**
 * 
 * @param {Boolean} isAlertActive - (Boolean) Value indicating if user wants speech alert.
 * @returns {Void} (Void) Depending on isAlertActive it makes the speaker talk or silences it.
 */

export const speechAlert = (isAlertActive) => {
	const alarm = new SpeechSynthesisUtterance();
	const content = 'Task time is finished. Task time is finished.';
	alarm.text = content;
	alarm.lang='en-US';
	
	if (isAlertActive && !speechSynthesis.speaking) {
		speechSynthesis.speak(alarm);
	} else if (!isAlertActive && speechSynthesis.speaking) {
		speechSynthesis.cancel();
	}
};
