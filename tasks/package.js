/**
 * @author liuyoyo
 */
module.exports = function(grunt) {

	var log = grunt.log;
	/**
	 * 配置分包目录的名称
	 */
	var filesArr = ['BankInnerTransfer', 'DetailQry'];
	var _files = [], i;
	for ( i = 0; i < filesArr.length; i++) {
		_files.push({
			expand : true,
			cwd : "./build/product",
			flatten : false,
			src : ["index.html", "lib/**", "images/**", "css/**", "htmls/" + filesArr[i] + "/**"],
			dest : "./build/banklist/" + filesArr[i]
		});
	}

	grunt.registerTask('split', 'bank product split ', function() {
		grunt.config('copy.split', {
			files : _files
		});
		grunt.config('clean.split', {
			files : [{
				expand : true,
				cwd : "./build/banklist",
				src : ['**']
			}]
		});

		grunt.task.run(['clean:split','copy:split']);
	});
	
	grunt.registerTask('package', 'build package project', function() {

		grunt.task.run(['default','split']);
	});

};
