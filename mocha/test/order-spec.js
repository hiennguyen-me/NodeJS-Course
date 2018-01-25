var expect  = require('chai').expect;
var rewire = require('rewire');
var sinon = require('sinon');
var order = rewire('../lib/order');

describe("Ordering Items", function(){
	beforeEach(function(){
		//Create a Mocha object
		this.testData = [
			{sku: "AAA", qty: 10},
			{sku: "BBB", qty: 0},
			{sku: "CCC", qty: 3}
		];
		this.console = {
			log: sinon.spy()
		};
		this.warehouse = {
			packageAndShip : sinon.stub().yields(10987654321)
		};

		//Set data to test
		//inventoryData will be replaced by testData
		order.__set__("inventoryData", this.testData);
		order.__set__("console", this.console);
		order.__set__("warehouse", this.warehouse);
	});

	it("Logs 'item not found", function(){
		order.orderItem("ZZZ", 10);
		expect(this.console.log.calledWith("Item - ZZZ not found")).to.equal(true);
	});
	it("order an item when there are enough in stock", function(done){
		var _this = this;
		order.orderItem("CCC", 3, function(){
			expect(_this.console.log.callCount).to.equal(2);
			done();
		});
	});

	describe("Warehouse interaction", function(){
		beforeEach(function(){
			this.callback = sinon.spy();
			order.orderItem("CCC", 2, this.callback);
		});
		it("receives a tracking number", function(){
			expect(this.callback.calledWith(10987654321)).to.equal(true);
		});
		it ("calls packageAndShip with the correct sku and quantily", function(){
			var _this = this;
			expect(_this.warehouse.packageAndShip.calledWith("CCC", 2)).to.equal(true);
		});
	});
});

