var resolution = 1000;

(function main() {
	var originalSettings =  saveSettings();

	applySettings();

	var document = app.documents.add(resolution, resolution, 72, "Planet", NewDocumentMode.RGB, DocumentFill.TRANSPARENT, 1);

	restoreSettings(originalSettings);
})();

function saveSettings() {
	savedSettings = {};

	savedSettings.rulerUnits = app.preferences.rulerUnits;
	savedSettings.typeUnits = app.preferences.typeUnits;
	savedSettings.displayDialogs = app.preferences.displayDialogs;

	return savedSettings;
}

function applySettings() {
	app.preferences.rulerUnits = Units.PIXELS;
	app.preferences.typeUnits = TypeUnits.PIXELS;
	app.displayDialogs = DialogModes.NO;
}

function restoreSettings(savedSettings) {
	app.preferences.rulerUnits = savedSettings.rulerUnits;
	app.preferences.typeUnits = savedSettings.typeUnits;
	app.preferences.displayDialogs = app.preferences.displayDialogs;
}