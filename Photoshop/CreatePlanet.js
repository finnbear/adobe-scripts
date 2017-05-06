var resolution = 512;

(function main() {
	var originalSettings =  saveSettings();

	applySettings();

	var document = app.documents.add(resolution, resolution, 72, "Planet", NewDocumentMode.RGB, DocumentFill.TRANSPARENT, 1);
	
	var colors = getColors();

	var layers = {};

	layers.background = document.activeLayer;
	layers.foreground = document.artLayers.add();

	layers.background.name = "Background";
	layers.foreground.name = "Foreground";

	document.activeLayer = layers.background;

	document.selection.selectAll();
	document.selection.fill(colors.black);

	document.activeLayer = layers.foreground;

	app.foregroundColor = colors.black;
	app.backgroundColor = colors.white;
	layers.foreground.applyClouds();

	for (var i = 0; i < 4; i++) {
		foregroundColor = colors.random();
		backgroundColor = colors.random();
		layers.foreground.applyDifferenceClouds();
	}
	
	var selection = selectCircle(resolution / 10, resolution / 10, resolution - resolution / 10, resolution - resolution / 10);

	selection.invert();
	selection.clear();
	selection.invert();

	layers.foreground.applySpherize(100, SpherizeMode.NORMAL);

	restoreSettings(originalSettings);
})();

function getColors() {
	var colors = {};

	var black = new SolidColor();
	var red = new SolidColor();
	var green = new SolidColor();
	var blue = new SolidColor();
	var white = new SolidColor();

	black.rgb.red = 0;
	black.rgb.green = 0;
	black.rgb.blue = 0;

	red.rgb.red = 255;
	red.rgb.green = 0;
	red.rgb.blue = 0;

	green.rgb.red = 0;
	green.rgb.green = 255;
	green.rgb.blue = 0;

	blue.rgb.red = 0;
	blue.rgb.green = 0;
	blue.rgb.blue = 255;

	white.rgb.red = 255;
	white.rgb.green = 255;
	white.rgb.blue = 255;

	var random = function() {
		var color = new SolidColor();

		color.rgb.red = Math.round(Math.random() * 255);
		color.rgb.green = Math.round(Math.random() * 255);
		color.rgb.blue = Math.round(Math.random() * 255);

		return color;
	}

	colors.black = black;
	colors.red = red;
	colors.green = green;
	colors.blue = blue;
	colors.white = white;
	colors.random = random;

	return colors;
}

function selectCircle(top, left, right, bottom)
{
    var id1 = charIDToTypeID( "setd" );
    var desc1 = new ActionDescriptor();
    var id2 = charIDToTypeID( "null" );
    var ref1 = new ActionReference();
    var id3 = charIDToTypeID( "Chnl" );
    var id4 = charIDToTypeID( "fsel" );
    ref1.putProperty( id3, id4 );
    desc1.putReference( id2, ref1 );
    var id5 = charIDToTypeID( "T   " );
    var desc2 = new ActionDescriptor();
    var id6 = charIDToTypeID( "Top " );
    var id7 = charIDToTypeID( "#Pxl" );
    desc2.putUnitDouble( id6, id7, top ); //top
    var id8 = charIDToTypeID( "Left" );
    var id9 = charIDToTypeID( "#Pxl" );
    desc2.putUnitDouble( id8, id9, left ); //left
    var id10 = charIDToTypeID( "Btom" );
    var id11 = charIDToTypeID( "#Pxl" );
    desc2.putUnitDouble( id10, id11, bottom ); //bottom
    var id12 = charIDToTypeID( "Rght" );
    var id13 = charIDToTypeID( "#Pxl" );
    desc2.putUnitDouble( id12, id13, right ); //right

    var id14 = charIDToTypeID( "Elps" );
    desc1.putObject( id5, id14, desc2 );
    var id15 = charIDToTypeID( "AntA" );
    desc1.putBoolean( id15, true );

    executeAction( id1, desc1, DialogModes.NO );

    var selection = app.activeDocument.selection;

    return selection;
}


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