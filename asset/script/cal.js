var months = new Array("一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二");
var daysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
var days = new Array("日", "一", "二", "三", "四", "五", "六");
var classTemp;
var today = new getToday();
var year = today.year;
var month = today.month;
var newCal;
function getDays(month, year) {
	if (1 == month) return ((0 == year % 4) && (0 != (year % 100))) || (0 == year % 400) ? 29 : 28;
	else return daysInMonth[month];
}
function getToday() {
	this.now = new Date();
	this.year = this.now.getFullYear();
	this.month = this.now.getMonth();
	this.day = this.now.getDate();
}
function Calendar() {
	newCal = new Date(year, month, 1);
	today = new getToday();
	var day = -1;
	var startDay = newCal.getDay();
	var endDay = getDays(newCal.getMonth(), newCal.getFullYear());
	var daily = 0;
	if ((today.year == newCal.getFullYear()) && (today.month == newCal.getMonth())) {
		day = today.day;
	}
	var caltable = document.all.caltable.tBodies.calendar;
	var intDaysInMonth = getDays(newCal.getMonth(), newCal.getFullYear());
	for (var intWeek = 0; intWeek < caltable.rows.length; intWeek++) for (var intDay = 0; intDay < caltable.rows[intWeek].cells.length; intDay++) {
		var cell = caltable.rows[intWeek].cells[intDay];
		var montemp = (newCal.getMonth() + 1) < 10 ? ("0" + (newCal.getMonth() + 1)) : (newCal.getMonth() + 1);
		if ((intDay == startDay) && (0 == daily)) {
			daily = 1;
		}
		var daytemp = daily < 10 ? ("0" + daily) : (daily);
		var d = "<" + newCal.getFullYear() + "-" + montemp + "-" + daytemp + ">";
		cell.className = "Day";
		if (day == daily) cell.style.fontWeight="bold";
		else if (intDay == 6) cell.style.color = "#FF6868";
		else if (intDay == 0) cell.style.color = "#FF6868";
		else {cell.style.fontWeight="normal";}
		if ((daily > 0) && (daily <= intDaysInMonth)) {
			cell.innerText = daily;
			
			var dt = new Date(year, month, daily);
			var dcount=getDocumentCount(dt);
			
			if(dcount>0 && dcount<=5)
				cell.className = "DayLevel1";
			if(dcount>5 && dcount<=10)
				cell.className = "DayLevel2";
			if(dcount>10 && dcount<=20)
				cell.className = "DayLevel3";
			if(dcount>20)
				cell.className = "DayLevel4";
			cell.title = dcount + "个文档";
			cell.value=dt;
			cell.onclick=function(){ListDocuments(this.value)};
			daily++;
		} else {
			cell.className = "CalendarTD";
			cell.innerText = "";
			cell.title = "";
			cell.onclick=null;
			cell.value=null;
		}
	}
	document.all.year.value = year;
	document.all.month.value = month + 1;
}
function subMonth() {
	if ((month - 1) < 0) {
		month = 11;
		year = year - 1;
	} else {
		month = month - 1;
	}
	Calendar();
}
function addMonth() {
	if ((month + 1) > 11) {
		month = 0;
		year = year + 1;
	} else {
		month = month + 1;
	}
	Calendar();
}
function setDate() {
	if (document.all.month.value < 1 || document.all.month.value > 12) {
		alert("月的有效范围在1-12之间!");
		return;
	}
	year = Math.ceil(document.all.year.value);
	month = Math.ceil(document.all.month.value - 1);
	Calendar();
}

function buttonOver(){
 	var obj = window.event.srcElement;
 	obj.runtimeStyle.cssText = "background-color:#C3E3C8; font-weight: bold";
	//obj.className="Hover";
}

function buttonOut(){
	var obj = window.event.srcElement;
	window.setTimeout(function(){obj.runtimeStyle.cssText = "";},300);
}

function getCalendarEvent()
{
	//alert("event");
}


function formatInt(val) {
    if (val < 10)
        return "0" + val;
    else
        return "" + val;
}
        
function getDocumentCount(dt) {
    
    if(typeof(objDatabase)=="undefined")
    	return 0;
    
    var begin_date_string = dt.getFullYear() + "-" + formatInt(dt.getMonth() + 1) + "-" + formatInt(dt.getDate()) + " 00:00:00";
    var end_date_string = dt.getFullYear() + "-" + formatInt(dt.getMonth() + 1) + "-" + formatInt(dt.getDate()) + " 23:59:59";
    //
    var sql = "DT_CREATED >='" + begin_date_string + "' and DT_CREATED <='" + end_date_string + "'";//  and DOCUMENT_TYPE='journal'";
    //
    //alert(sql);
    var documents = objDatabase.DocumentsFromSQL(sql);
    //
    if (documents == null)
        return 0;
    return documents.Count;
}

function ListDocuments(dt) {
	if(typeof(objApp)=="undefined")
	    return 0;
    	
     var begin_date_string = dt.getFullYear() + "-" + formatInt(dt.getMonth() + 1) + "-" + formatInt(dt.getDate()) + " 00:00:00";
     var end_date_string = dt.getFullYear() + "-" + formatInt(dt.getMonth() + 1) + "-" + formatInt(dt.getDate()) + " 23:59:59";
     //
     var sql = "DT_CREATED >='" + begin_date_string + "' and DT_CREATED <='" + end_date_string + "'"; //  and DOCUMENT_TYPE='journal'";
     //
     //alert(sql);
     var documents = objDatabase.DocumentsFromSQL(sql);
     //
     if (documents == null)
         return 0;
     //
     objApp.Window.DocumentsCtrl.SetDocuments(documents);
     //
     return 0;
     //return documents.Count;
}