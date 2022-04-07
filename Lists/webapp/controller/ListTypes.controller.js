// @ts-nocheck
sap.ui.define([
		"sap/ui/core/mvc/Controller"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller) {
		"use strict";

		return Controller.extend("logaligroup.Lists.controller.ListTypes", {
			onInit: function () {
                var oJsonModel = new sap.ui.model.json.JSONModel();
                oJsonModel.loadData("./localService/mockdata/ListData.json");
                this.getView().setModel(oJsonModel);
			},
            getGroupHeader: function (oGroup) {
                var groupHeaderListItem = new sap.m.GroupHeaderListItem({
                    title : oGroup.key,
                    upperCase : true
                });
                return groupHeaderListItem;
            },
            onShowSelectedRows: function () {
                var standardList = this.getView().byId("stardarList");
                var selectedItems = standardList.getSelectedItems();

                var i18nModel = this.getView().getModel("i18n").getResourceBundle();
                if (selectedItems == 0){
                    sap.m.MessageToast.show(i18nModel.getText("noSelection"));
                } else {
                    var textMessager = i18nModel.getText("selection");
                    for (var item in selectedItems) {
                        var context = selectedItems[item].getBindingContext();
                        var oContext = context.getObject();
                        textMessager = textMessager + " - " + oContext.Material;
                    }
                    sap.m.MessageToast.show(textMessager);
                }
            },
            onDeleteSelectedRows : function () {
                var standardList = this.getView().byId("stardarList");
                var selectedItems = standardList.getSelectedItems();

                var i18nModel = this.getView().getModel("i18n").getResourceBundle();
                if (selectedItems == 0){
                    sap.m.MessageToast.show(i18nModel.getText("noSelection"));
                } else {
                    var model = this.getView().getModel();
                    var products = model.getProperty("/Products");
                    var arrayId = [];

                    for (var i in selectedItems) {
                        var context =  selectedItems[i].getBindingContext();
                        var oContext = context.getObject();

                        arrayId.push(oContext.Id);
                    }
                    products = products.filter(function (p) {
                        return !arrayId.includes(p.Id);
                    });
                    model.setProperty("/Products", products);
                    standardList.removeSelections();
                }
            },
            onDeleteRow : function (oEvent) {
                
                var selectedRow = oEvent.getParameter("listItem");
                var context = selectedRow.getBindingContext();
                var splitPath = context.getPath().split("/");
                var indexSelectedRow = splitPath[splitPath.length-1];
                var model = this.getView().getModel();
                var products = model.getProperty("/Products");
                products.splice(indexSelectedRow,1);
                model.refresh();
            }
		});
	});
