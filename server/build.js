/**
 * Webpack config for tests
 */
var webpack = require('webpack');
var del = require('del');
var fs = require('fs');
var webpackConfig = require('./webpack.make.js');

/**
 * @param  {[type]}
 * clean then build
 */
del(['./dist/**/*'],{force:true}).then(function(){

	webpack(webpackConfig, function(err, stats){
	    var statsObj = stats.toJson();
	    
	    var assetsObj = {
	    	assetsByChunkName: statsObj.assetsByChunkName,
	    	hash: statsObj.hash
	    }
	    fs.writeFile('dist/stats.json', JSON.stringify(assetsObj), function(error){
	        if (error) {
	            console.error("no stats file");
	            return;
	        }

	    });
	});
	
});

	

