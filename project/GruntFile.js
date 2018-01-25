module.exports = function(grunt){
	//Grunt instance
	//Set up Grunt
	grunt.initConfig({
		//set up jshint
		jshint : {
			//which files it should be hinting
			files: ["*.js", "lib/*.js", "test/*.js"],
			//JShint option
			options: {
				esnext: true,
				globals:{
					jQuery: true
				}
			}
		}
	});

	//actually set up our plugin
	grunt.loadNpmTasks("grunt-contrib-jshint");

	grunt.registerTask("default", ["jshint"]);
};