var expect = require('chai').expect;
var tools = require('../lib/tools');
var nock = require('nock');

describe ("Tools", function(){

	describe("printName()", function(){
		it("Should print last name first", function(){
			var results = tools.printName({first: "Nguyen", last: "Hien"});
			expect(results).to.equal ("Hien, Nguyen");
		});
	}),

	describe("loadWiki()", function(){
		before(function(){
			nock("https://en.wikipedia.org").get("/wiki/Mark_Zuckerberg")
				.reply(200, "Mock Mark Zuckerberg page");
		})
		it("load Mark Zuckerberg's wikipedia page", function(){
			tools.loadWiki({last: "Mark", first: "Zuckerberg"}, function(html){
				// expect(html).to.be.ok;
				expect(html).to.be.equal("Mock Mark Zuckerberg page");
			});
		});
	})

})

