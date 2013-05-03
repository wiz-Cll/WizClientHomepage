// 获取 wiz应用对象
var objApp = null;
var objDatabase = null;
wizInit();


// @func 从数据库中读取近期笔记  并渲染出页面  绑定好点击事件(委托)
function showRecentDocs( objDatabase ){
	var recentDocuments = objDatabase.GetRecentDocuments('', 10 );
	var rdCount = recentDocuments.count;

	var rdStr = '';

	for( var i = 0; i < rdCount; i++){
		var doc = recentDocuments.Item(i);

		var dateModified = new Date(doc.DateModified);
	    var dateModifiedString = dateModified.toLocaleDateString();

		rdStr += '<li> <a href="#" data-docguid="' + doc.GUID + '">' + doc.Title + '</a>' + '&nbsp;&nbsp;' + dateModifiedString + '</li>'
	}

	$('#recent-note ul').html( rdStr ).delegate('a','click', function(event){
		var e = event;
		var $target = $(e.target);
		ViewDocument( $target.attr('data-docguid') );
		// return false;
	});
}

function ViewDocument(doc_guid) {
        var doc = objDatabase.DocumentFromGUID(doc_guid);
        if (doc != null) {
            objApp.Window.ViewDocument(doc, true);
        }
    }






$(document).ready(function(){
	showRecentDocs( objDatabase );
});






function wizInit(){
	objApp = window.external;
	if (!objApp || !(objApp.Database)){
		try
		{
			objApp = new ActiveXObject("Wiz.WizExplorerApp");
		}
		catch (err)
		{
		}
	}
	objDatabase = objApp.Database;
	if (!objDatabase)
	{
		try
		{
			objDatabase = new ActiveXObject("WizKMCore.WizDatabase");
			// objDatabase.Open3("", "", "", 0);
		}
		catch (err)
		{
		}
	}
}