/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"Proyect_N2/employees/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
