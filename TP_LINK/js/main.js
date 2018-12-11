console.log('引入成功');
require.config({
	paths:{
		"jquery":"jquery-1.11.3",
		"jquery-cookie":"jquery-cookie"

	},
	shim:{
		"jquery-cookie": ['jquery']
	},
	"index": {
		exports: "_"
	}
})
require(['index'],function(index){
	index.index();
})

