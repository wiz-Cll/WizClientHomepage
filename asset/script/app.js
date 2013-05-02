// 获取 wiz应用对象
var objApp = null;
var objDatabase = null;

try{
	objApp = external;
}
catch( err ){
	objApp = new ActiveXObject('WizExplorer.WizExplorerApp');
}
objDatabase = objApp.Database;

alert( objApp );
alert( objDatabase );

// @func 从数据库中读取近期笔记  并渲染出页面  绑定好点击事件(委托)
function showRecentDocs( objDatabase ){
	var recentDocuments = objDatabase.GetRecentDocuments('', 10 );
	var rdCount = recentDocuments.length;

	var rdStr = '';

	for( var i = 0; i < rdCount, i++){
		var doc = recentDocuments[ i ];

		var dateModified = new Date(doc.DateModified);
	    var dateModifiedString = dateModified.toLocaleDateString();

		rdStr = '<li> <a href="#" data-docguid="' + doc.GUID + '">' + doc.Title + '</a>' + dateModifiedString + '</li>'
	}

	$('#recent-note').html( rdStr ).delegate('a'.'click', function(event){
		var e = event;
		var $target = $(e.target);
		ViewDocument( $target.attr('data-docguid') );
	});
}

function ViewDocument(doc_guid) {
        var doc = objDatabase.DocumentFromGUID(doc_guid);
        if (doc != null) {
            objApp.Window.ViewDocument(doc, true);
        }
    }
