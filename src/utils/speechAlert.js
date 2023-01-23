export const speechAlert = (isAlertActive) => {
	let content = 'Tarea finalizada. Tarea finalizada. Tarea finalizada.';

	const alarm = new SpeechSynthesisUtterance(content);
	alarm.voice = speechSynthesis.getVoices()[2];

	if (isAlertActive && !speechSynthesis.speaking) {
		speechSynthesis.speak(alarm);
	} else if (!isAlertActive && speechSynthesis.speaking) {
		speechSynthesis.cancel();
	}
};
