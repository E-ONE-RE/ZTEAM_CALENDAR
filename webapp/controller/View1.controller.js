sap.ui.define([
	"eone_zteam_calendar/controller/BaseController",
	//	'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel',
		'sap/m/MessageBox',
		
		'sap/ui/unified/CalendarLegendItem',
		'sap/ui/unified/DateTypeRange',
		'sap/m/Button',
		'sap/m/Dialog',
		'sap/m/Label',
	//	'sap/m/MessageToast',
	//	'sap/m/MessageBox',
		"eone_zteam_calendar/model/formatter"
		
	],
	function(BaseController, JSONModel, MessageBox, CalendarLegendItem, DateTypeRange, Button, Dialog, Label, formatter) {
		"use strict";

		return BaseController.extend("eone_zteam_calendar.controller.View1", {	
			formatter: formatter,

			oFormatYyyymmdd: null,
			oFormatDaysShort: null,
			oFormatYear: null,

			onInit: function () {
				
				this._initCntrls();
				
					this.oFormatYyyymmdd = sap.ui.core.format.DateFormat.getInstance({
					pattern: "yyyyMMdd",
					calendarType: sap.ui.core.CalendarType.Gregorian
				});
				
				this.oFormatDaysShort = sap.ui.core.format.DateFormat.getInstance({
					pattern: "E",
					calendarType: sap.ui.core.CalendarType.Gregorian
				});
				
				this.oFormatYear = sap.ui.core.format.DateFormat.getInstance({
					pattern: "Y",
					calendarType: sap.ui.core.CalendarType.Gregorian
				});
				
			//	var oRouter = this.getRouter();
			//	oRouter.getRoute("view1").attachMatched(this._onRouteMatched, this);
				
	
			
			},
			
			     toDate: function(sValue) {
            if (sValue) {
                return new Date(sValue); //
            }
        },
        
			
			_onRouteMatched: function(oEvent) {

				var oView = this.getView();

				oView.bindElement({
					path: "/LeaveRequestPosSet",
					//	parameters : {expand: 'ToLeaveReqPos'}, 

					events: {
						change: this._onBindingChange.bind(this),
						dataRequested: function(oEvent) {
							oView.setBusy(true);
						},
						dataReceived: function(oEvent) {
							oView.setBusy(false);

						}
					}
				});

			},
			
			
			
				_onBindingChange: function() {

				var oView = this.getView();
				var oModel = this.getView().getModel();
				sap.ui.getCore().setModel(oModel);
				
				var oCal1 = oView.byId("PC1");
				var that = this;
			//	var oRefDate = new Date();
						
			//	oCal1.startDate(oRefDate);
				oCal1.destroyRows();
				
		/*		
			 oCal1.addView(
						new sap.m.PlanningCalendarView({
							key: "customView11",
							intervalType: sap.ui.unified.CalendarIntervalType.Day,
							description: "Week4",
							intervalsS: 31,
							intervalsM: 31,
							intervalsL:31,
							showSubIntervals: false
						})
					);    
                   oCal1.setViewKey(oCal1.getViews()[0].getKey());
			
	
                          oCal1.addView(
						new sap.m.PlanningCalendarView({
							key: "customView0",
							intervalType: sap.ui.unified.CalendarIntervalType.Hour,
							description: "Day",
							intervalsS: 8,
							intervalsM: 8,
							intervalsL:8,
							showSubIntervals: true
						})
					);    
                   oCal1.setViewKey(oCal1.getViews()[0].getKey());
                 
                 	 oCal1.addView(
						new sap.m.PlanningCalendarView({
							key: "customView1",
							intervalType: sap.ui.unified.CalendarIntervalType.Day,
							description: "Week",
							intervalsS: 7,
							intervalsM: 7,
							intervalsL:7,
							showSubIntervals: true
						})
					);    
                   oCal1.setViewKey(oCal1.getViews()[0].getKey());
                   
                   
                   
                   
                   
                   
                   	 oCal1.addView(
						new sap.m.PlanningCalendarView({
							key: "customView2",
							intervalType: sap.ui.unified.CalendarIntervalType.Month,
							description: "Month",
							intervalsS: 1,
							intervalsM: 1,
							intervalsL: 1,
							showSubIntervals: true
						})
					);    
                   oCal1.setViewKey(oCal1.getViews()[0].getKey());
                   
                   oCal1.addView(
						new sap.m.PlanningCalendarView({
							key: "customView3",
							intervalType: sap.ui.unified.CalendarIntervalType.Month,
							description: "2 Months",
							intervalsS: 2,
							intervalsM: 2,
							intervalsL: 2,
							showSubIntervals: true
						})
					);    
                   oCal1.setViewKey(oCal1.getViews()[0].getKey());*/
	                     
                var zarea = oView.byId("SLCT_TEAMS").getSelectedKey();
              
                 
	         	var sRead = "/LeaveRequestPosTeamSet";

				oModel.read(sRead, {
					
					filters: [new sap.ui.model.Filter({

						filters: [new sap.ui.model.Filter({
							path: "Area",
							operator: sap.ui.model.FilterOperator.EQ,
							value1: zarea

						})],

						and: true

					})],

					success: fnReadS,

					error: fnReadE
				});

				function fnReadS(oData, response) {
				//	console.log(oData);
				//	console.log(response);

					// controllo che la funzione è andata a buon fine 
					if (response.statusCode == "200") {
						////////////////////////////////				

						var oFormatYYyyymmdd = sap.ui.core.format.DateFormat.getInstance({
							pattern: "yyyyMMdd",
							calendarType: sap.ui.core.CalendarType.Gregorian
						});

				

						var oDateRange;
						var person;
						var abs_type_title;
						var abs_type_type;
						var abs_type_icon;
						var abs_tooltip;
						var abs_text;
						
						var abs_hour;
						var abs_min;
						
						 var viewKey = oView.byId("PC1").getViewKey();
		               

						if (oData.results.length > 0) {
							for (var i = 0; i < oData.results.length; i++) {
								//escludo richieste rifiutate
                            //	if (oData.results[i].ZreqStatus === 'A' || oData.results[i].ZreqStatus === 'I') {
								//						var res = oData.results[i].Zdate.substring(8);
								
									if (oData.results[i].Name + " " + oData.results[i].Surname != person) {
									
									person = oData.results[i].Name + " " + oData.results[i].Surname;
	                               
	  
	                                var oRow = new sap.m.PlanningCalendarRow({
										icon: "sap-icon://employee",
										title: person
									});
									oCal1.addRow(oRow);
								}
								
								
								
									var res = oData.results[i].Zdate;
								
									if (res != '') {
									
									var abs_date_start = oFormatYYyyymmdd.parse(res);
									 var abs_date_end = oFormatYYyyymmdd.parse(res);
										var abs_hour_start = oData.results[i].Ztimestart.substring(0,2);
										
										/*if (abs_hour_start != '') {
									//	if (1 == 2) {
											
										var abs_min_start = oData.results[i].Ztimestart.substring(3);
										var abs_hour_end = oData.results[i].Ztimeend.substring(0,2);
										var abs_min_end = oData.results[i].Ztimeend.substring(3);
										
	                                    abs_date_start.setHours(abs_hour_start,abs_min_start );
	                                    
	                                    abs_date_end.setHours(abs_hour_end,abs_min_end );
	                                    
	                                   
				
				
										} else {*/
										if(oData.results[i].Ztimestart == '' || oData.results[i].Ztimeend == ''){
											abs_text = "Giornata intera";
											abs_tooltip = " per giornata intera"
										}else{
										 abs_text = oData.results[i].Ztimestart + "-" + oData.results[i].Ztimeend;
										 abs_tooltip = " dalle ore "  + oData.results[i].Ztimestart + " alle ore " + oData.results[i].Ztimeend;
										}
	
	                                    abs_date_end.setHours('23','59');
	                                     //		abs_date_end.setDate(abs_date_end.getDate()+1);
	                                     
	    
				
									//	}
					//		
					
					that.sAppointmentTitle = '';
					
	                switch (oData.results[i].ZabsType){
				case "0001":
	                	abs_type_title = "Permesso";
	                	that.sAppointmentTitle = "Permesso ID: " + formatter.formatRequestId(oData.results[i].ZrequestId) + " \nStato: " + formatter.formatStatus(oData.results[i].ZreqStatus) + " \nGiorno: " + formatter.formatDate(oData.results[i].Zdate);
				//		abs_type_type = sap.ui.unified.CalendarDayType.Type08;
						abs_tooltip = "Permesso" + abs_tooltip;
					
						
						abs_type_icon = "sap-icon://customer-history";
	                
	                	break;
	                	case "0002":
	                	abs_type_title= "Ferie";
	                	that.sAppointmentTitle = "Ferie ID: " + formatter.formatRequestId(oData.results[i].ZrequestId) + " \nStato: " + formatter.formatStatus(oData.results[i].ZreqStatus) + " \nGiorno: " + formatter.formatDate(oData.results[i].Zdate);
				//		abs_type_type = sap.ui.unified.CalendarDayType.Type07;
						abs_tooltip ="Ferie" + abs_tooltip;
					
					
						abs_type_icon = "sap-icon://general-leave-request";
				break;
				case "0003":
	                	abs_type_title = "Recupero";	
	                	that.sAppointmentTitle = "Recupero ID: " + formatter.formatRequestId(oData.results[i].ZrequestId) + " \nStato: " + formatter.formatStatus(oData.results[i].ZreqStatus) + " \nGiorno: " + formatter.formatDate(oData.results[i].Zdate);
				//		abs_type_type = sap.ui.unified.CalendarDayType.Type06;
						
						abs_tooltip = "Recupero" + abs_tooltip;
				
					
						abs_type_icon = "sap-icon://cause";
						break;
				case "0004":
	                		abs_type_title = "ROL";	
	                		that.sAppointmentTitle = "ROL ID: " + formatter.formatRequestId(oData.results[i].ZrequestId) + " \nStato: " + formatter.formatStatus(oData.results[i].ZreqStatus) + " \nGiorno: " + formatter.formatDate(oData.results[i].Zdate);
				//		abs_type_type = sap.ui.unified.CalendarDayType.Type05;
					abs_tooltip = "ROL" + abs_tooltip;
					
					abs_type_icon = "sap-icon://customer-history";
				break;
				case "0005":
					abs_type_title = "Lavoro agile";
					that.sAppointmentTitle = "Lavoro agile ID: " + formatter.formatRequestId(oData.results[i].ZrequestId) + " \nStato: " + formatter.formatStatus(oData.results[i].ZreqStatus) + " \nGiorno: " + formatter.formatDate(oData.results[i].Zdate);
					abs_tooltip = "Lavoro agile" + abs_tooltip;
					abs_type_icon = "sap-icon://home";
				break;	
	                }
	                
	                if (oData.results[i].ZreqStatus == "A"){
						abs_type_type = sap.ui.unified.CalendarDayType.Type08;
								
				         }else	{
			              abs_type_type = sap.ui.unified.CalendarDayType.Type05;
			                	
			               }	
			                		
			                		
	                var oAppointment = new sap.ui.unified.CalendarAppointment({
					startDate: abs_date_start,
				//	 nowP.setDate(nowP.getDate()-365);
				//	endDate: oFormatYYyyymmdd.parse(res),
					endDate: abs_date_end,
					type: abs_type_type,
					title: abs_type_title,
					tooltip: abs_tooltip,
					text: abs_text,
					icon: abs_type_icon,
				});
				 oRow.addAppointment(oAppointment);
	
				 
				 
			/*	 	 var oHeaders1 = new sap.ui.unified.CalendarAppointment({
					startDate: abs_date_start,
				//	 nowP.setDate(nowP.getDate()-365);
				//	endDate: oFormatYYyyymmdd.parse(res),
					endDate: abs_date_end,
					type: abs_type_type,
					title: abs_type_title,
					tooltip: abs_tooltip,
					text: abs_text,
					icon: abs_type_icon
				
				});
				 oRow.addIntervalHeader(oHeaders1);
				 */
				 
	
							/*			oCal1.addSpecialDate(new DateTypeRange({
											startDate: oFormatYYyyymmdd.parse(res),
											type: "Type01",
											tooltip: "Permesso Id: " + formatter.formatRequestId(oData.results[i].ZrequestId) + " Stato: " + oData.results[i].ZreqStatus 
	                                           
										}));
									*/
							}
							}

							

						}

					} else {

						//jQuery.sap.require("sap.m.MessageBox");
						sap.m.MessageBox.show(
							"Error: Nessun record recuperato", {
								icon: sap.m.MessageBox.Icon.WARNING,
								title: "Error",
								actions: [sap.m.MessageBox.Action.CLOSE]

							});

					}

				} // END FUNCTION SUCCESS

				function fnReadE(oError) {
				//	console.log(oError);

					alert("Error in read: " + oError.message);
				}

			
	      /*   var oRow = new sap.m.PlanningCalendarRow({
				icon: "sap-icon://employee",
				title: "Sandro Elmo"
			});
			oCal1.addRow(oRow);
	                     
	                     
	                     var oAppointment = new sap.ui.unified.CalendarAppointment({
					startDate: new Date("2018", "5", "01", "00", "00"),
					endDate: new Date("2018", "5", "01", "24", "00"),
					type: sap.ui.unified.CalendarDayType.Type08,
					title: "F",
					tooltip: "Test",
			//		text: "Test",
					icon: "sap-icon://sap-ui5"
				});
				 oRow.addAppointment(oAppointment);
				 
				          var oAppointment2 = new sap.ui.unified.CalendarAppointment({
						startDate: new Date("2018", "5", "02", "00", "00"),
					endDate: new Date("2018", "5", "02", "24", "00"),
					type: sap.ui.unified.CalendarDayType.Type08,
					title: "F",
					tooltip: "Test",
			//		text: "Test",
					icon: "sap-icon://sap-ui5"
				});
				 oRow.addAppointment(oAppointment2);
				 
				          var oAppointment3 = new sap.ui.unified.CalendarAppointment({
						startDate: new Date("2018", "5", "03", "00", "00"),
					endDate: new Date("2018", "5", "03", "24", "00"),
					type: sap.ui.unified.CalendarDayType.Type08,
					title: "F",
					tooltip: "Test",
				//	text: "Test",
					icon: "sap-icon://sap-ui5"
				});
				 oRow.addAppointment(oAppointment3);*/
				 
				 
				 
				/* var oHeaders1 = new sap.ui.unified.CalendarAppointment({
					startDate: new Date("2018", "5", "01", "00", "00"),
					endDate: new Date("2018", "5", "01", "24", "00"),
					type: sap.ui.unified.CalendarDayType.Type05,
					title: "New Appointment Sandro H"
				
				});
				 oRow.addIntervalHeader(oHeaders1);
				 */
			

			},
			
			
			handleViewChange: function (oEvent) {
					this._onBindingChange();
			},
			
			
			handleTeamsSelect: function(oEvent) {
				var oTeams = oEvent.getSource();
				var aTeamsKey = oTeams.getSelectedKey();
				
					this._onBindingChange();
				
			},
			

			handleAppointmentSelect: function (oEvent) {
				var oAppointment = oEvent.getParameter("appointment");
				if (oAppointment) {
					MessageBox.show(this.sAppointmentTitle + " \nDettaglio ore: " +
				oAppointment.getText());
				} else {
					var aAppointments = oEvent.getParameter("appointments");
					var sValue = aAppointments.length + " eventi selezionati, scegliere un intervallo di date minore per visualizzare il dettaglio.";
					MessageBox.show(sValue);
				}
			},

			handleSelectionFinish: function(oEvent) {
				var aSelectedKeys = oEvent.getSource().getSelectedKeys();

				this.getView().byId("PC1").setBuiltInViews(aSelectedKeys);
			}

		});



	});
