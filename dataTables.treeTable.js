(function ($) {
	"use strict";

	// Private APIs
	var expandedNodes = {},
		getInitOpts = function (oDTSettings) {
			return oDTSettings.oInit.oTreeTable || {};
		},
		initTreeTable = function (dataTable, options) {
			dataTable.treeTable(options).addClass('initialized-treeTable');
			// remove expander
			if (options !== null && options.showExpander === false) {
				dataTable.$('td a.expander').remove();
			}
		};

	// Public APIs as extension of jquery.dataTables
	/**
	 * Returns whether the current dataTable is also a treeTable or not.
	 */
	$.fn.dataTableExt.oApi.isTreeTable = function (oSettings) {
		return $('#' + oSettings.sTableId).hasClass('treeTable');
	};

	function isTreeTableInitialized(oSettings) {
		return $('#' + oSettings.sTableId).hasClass('treeTable initialized-treeTable');
	}

	/**
	 * Explicitly trigger the initialisation of treeTable.
	 */
	$.fn.dataTableExt.oApi.fnInitTreeTable = function (oSettings, options) {
		initTreeTable(oSettings.oInstance, options || {});
	};

	/** 
	 * Save expanded nodes (TRs) before reloading data table.
	 * And after reloading, call restoreExpanded to restore the expand state.
	 */
	function saveExpanded (oSettings) {
		var oTable = oSettings.oInstance, expandedRows;
		if (!oTable.isTreeTable()) {
			return;
		}
		// save expanded row ids
		expandedRows = [];
		oTable.$('tr.parent.expanded').each(function () {
			expandedRows.push($(this).attr('id'));
		});
		expandedNodes[oSettings.sTableId] = expandedRows;
	}

	/**
	 * Expand nodes which are saved before reloading data table to restore the expand state.
	 */
	function restoreExpanded(oSettings) {
		if (!isTreeTableInitialized(oSettings)) {
			setTimeout(function () {
				restoreExpanded(oSettings);
			}, 200);
			return;
		}
		var i, iLen, oTable = oSettings.oInstance, tableId = oSettings.sTableId,
			expandedRows = expandedNodes[tableId] || [];
		for (i = 0, iLen = expandedRows.length; i < iLen; i++) {
			oTable.$('tr#' + expandedRows[i]).expand();
		}
		expandedNodes[tableId] = null;
	}

	$.fn.dataTableExt.oApi.fnReloadAjaxTreeTable = function (oSettings, sNewSource, fnCallback, bStandingRedraw) {
		var oTable = oSettings.oInstance;
		saveExpanded(oSettings);
		oTable.removeClass('initialized-treeTable');
		oTable.fnReloadAjax(sNewSource, fnCallback, bStandingRedraw);
		restoreExpanded(oSettings);
	};

	// Register a plugin to integrate jquery.treeTable
	$.fn.dataTableExt.aoFeatures.push({
		"fnInit": function (oDTSettings) {
			var oTable = oDTSettings.oInstance,
				opts = getInitOpts(oDTSettings);
			if (typeof opts.fnPreInit === 'function') {
				oTable.oApi._fnCallbackReg(oDTSettings, "aoRowCreatedCallback", opts.fnPreInit, "preInitTreeTable");
			}
			oTable.oApi._fnCallbackReg(oDTSettings, "aoDrawCallback", function () {
				oTable.fnInitTreeTable(opts);
			}, "initTreeTable");

			return null; /* No node to insert */
		},
		"cFeature": "T",
		"sFeature": "Integrate jquery.treeTable"
	});
}(jQuery));
