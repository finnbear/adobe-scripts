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

	innerShadow(-36, 250, 40, colors.black, 50);

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

function innerShadow(angle, distance, choke, color, blur) { 
	var idsetd = charIDToTypeID( "setd" );
	var desc8 = new ActionDescriptor();
	var idnull = charIDToTypeID( "null" );
	var ref4 = new ActionReference();
	var idPrpr = charIDToTypeID( "Prpr" );
	var idLefx = charIDToTypeID( "Lefx" );
	ref4.putProperty( idPrpr, idLefx );
	var idLyr = charIDToTypeID( "Lyr " );
	var idOrdn = charIDToTypeID( "Ordn" );
	var idTrgt = charIDToTypeID( "Trgt" );
	ref4.putEnumerated( idLyr, idOrdn, idTrgt );
	desc8.putReference( idnull, ref4 );
	var idT = charIDToTypeID( "T   " );
	var desc9 = new ActionDescriptor();
	var idgagl = charIDToTypeID( "gagl" );
	var idAng = charIDToTypeID( "#Ang" );
	desc9.putUnitDouble( idgagl, idAng, angle );
	var idScl = charIDToTypeID( "Scl " );
	var idPrc = charIDToTypeID( "#Prc" );
	desc9.putUnitDouble( idScl, idPrc, 50 );
	var idIrSh = charIDToTypeID( "IrSh" );
	var desc10 = new ActionDescriptor();
	var idenab = charIDToTypeID( "enab" );
	desc10.putBoolean( idenab, true );
	var idMd = charIDToTypeID( "Md  " );
	var idBlnM = charIDToTypeID( "BlnM" );
	var idDrkn = charIDToTypeID( "Drkn" );
	desc10.putEnumerated( idMd, idBlnM, idDrkn );
	var idClr = charIDToTypeID( "Clr " );
	var desc11 = new ActionDescriptor();
	var idRd = charIDToTypeID( "Rd  " );
	desc11.putDouble( idRd, color.rgb.red );
	var idGrn = charIDToTypeID( "Grn " );
	desc11.putDouble( idGrn, color.rgb.green );
	var idBl = charIDToTypeID( "Bl  " );
	desc11.putDouble( idBl, color.rgb.blue);
	var idRGBC = charIDToTypeID( "RGBC" );
	desc10.putObject( idClr, idRGBC, desc11 );
	var idOpct = charIDToTypeID( "Opct" );
	var idPrc = charIDToTypeID( "#Prc" );
	desc10.putUnitDouble( idOpct, idPrc, 44.000000 );
	var iduglg = charIDToTypeID( "uglg" );
	desc10.putBoolean( iduglg, true );
	var idlagl = charIDToTypeID( "lagl" );
	var idAng = charIDToTypeID( "#Ang" );
	desc10.putUnitDouble( idlagl, idAng, 120.000000 );
	var idDstn = charIDToTypeID( "Dstn" );
	var idPxl = charIDToTypeID( "#Pxl" );
	desc10.putUnitDouble( idDstn, idPxl, distance );
	var idCkmt = charIDToTypeID( "Ckmt" );
	var idPxl = charIDToTypeID( "#Pxl" );
	desc10.putUnitDouble( idCkmt, idPxl, choke );
	var idblur = charIDToTypeID( "blur" );
	var idPxl = charIDToTypeID( "#Pxl" );
	desc10.putUnitDouble( idblur, idPxl, blur );
	var idNose = charIDToTypeID( "Nose" );
	var idPrc = charIDToTypeID( "#Prc" );
	desc10.putUnitDouble( idNose, idPrc, 0.000000 );
	var idAntA = charIDToTypeID( "AntA" );
	desc10.putBoolean( idAntA, false );
	var idTrnS = charIDToTypeID( "TrnS" );
	var desc12 = new ActionDescriptor();
	var idNm = charIDToTypeID( "Nm  " );
	desc12.putString( idNm, "Linear" );
	var idShpC = charIDToTypeID( "ShpC" );
	desc10.putObject( idTrnS, idShpC, desc12 );
	var idIrSh = charIDToTypeID( "IrSh" );
	desc9.putObject( idIrSh, idIrSh, desc10 );
	var idLefx = charIDToTypeID( "Lefx" );
	desc8.putObject( idT, idLefx, desc9 );
	executeAction( idsetd, desc8, DialogModes.NO );
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