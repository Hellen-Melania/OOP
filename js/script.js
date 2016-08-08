function Casino(numberOFSlotMachine, primaryBankCasino) {
	this.numberOFSlotMachine = numberOFSlotMachine;
	this.slots = [];

	this.SlotMachine = function(slotBank) {
		this.slotBank = (typeof slotBank === "number" && slotBank > 0) ? slotBank : 0;

		this.checkIfNum = function(num) {
			var num = (typeof num === "number" && num > 0) ? num : console.error("You have been written not correct data");
			return false;
		}

		this.allMoney = function() {
			return this.slotBank;
		}

		this.takeSlotMoney = function(money) {
			if(this.checkIfNum(money) === true){
				if (this.slotBank < money ) {
					console.error("We do not have enough money $" + (money - this.slotBank) + "!");
					this.slotBank = 0;
				} else {
					this.slotBank = this.slotBank - money;
				}
			}
			return false;
		}

		this.addSlotMoney = function(money) {
			if(this.checkIfNum(money) === true){
				this.slotBank += money;
			}
			return false;
		}

		this.oneGame = function(bit) {
			if(this.checkIfNum(bit) === true){
				var randomNumber = String(Math.floor(100 + Math.random() * 900)),
					n1 = randomNumber[0],
					n2 = randomNumber[1],
					n3 = randomNumber[2];
				 
				console.log(randomNumber);
				console.log(n1, n2, n3);

				if(randomNumber === 777) {
					return this.allMoney();  
				}

				if (n1 === n3 && n2 === n3 && n1 === n2){
					return 5 * bit;
				}
				else if (n1 === n2 || n1 === n3 || n2 === n3){
					return 2 * bit;
				}
				else {
					console.error("You lose!");
					console.log("Number " + randomNumber + " has not equal numbers");
					return 0;
				}
			}
			return false;
		}

		this.playGame = function(bit) {
			this.addSlotMoney(bit);
			var gameResult = this.oneGame(bit);
			console.log(gameResult);

			if ((this.allMoney() - gameResult) < 0) {
				// not enough money
				console.error("WE do not have not enough money");
				console.info("Your win is $"+ this.allMoney());
				var buf = this.allMoney();

				this.slotBank = 0;
				return buf;
			} else {
				console.info("Your win is $"+ gameResult);

				this.slotBank -= gameResult;
				return gameResult;
			}
		}
	};

	this.primaryBankCasino = (typeof primaryBankCasino === "number" && primaryBankCasino > 0) ? primaryBankCasino : 0; // check money

	for (var i = 0; i < numberOFSlotMachine; i++ ) {
		var sm = new this.SlotMachine(primaryBankCasino / numberOFSlotMachine>>0);
		this.slots.push(sm);
	}
	this.slots[0].slotBank += primaryBankCasino % numberOFSlotMachine;

	this.allBank = function() {
		var res = 0;
		for (var i = 0; i < this.slots.length; i++) {
			res += this.slots[i].slotBank;
		}
		return res;
	}

	this.counterSlots = function() {
		var resCounter = 0;
		return  resCounter += this.numberOFSlotMachine;
	}

	this.addNewSlot = function() {
		var halfOfBank = this.slots[this.getNumberOfRichestSlot()].slotBank / 2;
		// change richest slot
		this.slots[this.getNumberOfRichestSlot()].slotBank /= 2;
		// create new slot
		var newSlot = new this.SlotMachine(halfOfBank);
		this.slots.push(newSlot);
		this.numberOFSlotMachine += 1;
	}

	this.getNumberOfRichestSlot = function() {
		var n = 0;
		for (var i = 0; i < this.slots.length; i++) {
			if (this.slots[n].slotBank < this.slots[i].slotBank) {
				n = i;
			}    
		}
		return n;
	}

	this.deleteSlot = function (n) {
		if (n > this.slots.length -1) {
			console.log('We do not have this slot.');
			return false;
		} 
			
		var bank = this.slots[n].slotBank; // bank of deleted slot
		this.slots.splice(n, 1);
		this.numberOFSlotMachine -= 1;

		for (var i = 0; i < this.slots.length; i++) {
			this.slots[i].slotBank += (bank / this.slots.length >> 0);
		}
	}  

	this.takeMoney = function(sumOfMoney) {
		var copy = sumOfMoney;
		this.slots.sort(function(a, b) {
			return parseFloat(b.slotBank) - parseFloat(a.slotBank);
		});

		for (var i = 0; i < this.slots.length; i++) {
			if (sumOfMoney > this.slots[i].slotBank) {
				sumOfMoney -= this.slots[i].slotBank;
				this.slots[i].slotBank = 0;
			} else {
				this.slots[i].slotBank = this.slots[i].slotBank - sumOfMoney;
				sumOfMoney = 0;
				console.info("The amount of $" + copy + " has been successfully removed!");
				break;
			}
		}

		if (sumOfMoney > 0) {
			console.error("We do not have enough money, we need $" + sumOfMoney + " more!");
		}
	};  
}

var casino = new Casino(9, 394);
console.log("========================BASE============================================");
console.log(casino);
console.log("========================ADD=============================================");
casino.addNewSlot();
console.log(casino);
console.log("========================DELETE=========================================");
casino.deleteSlot(2);
console.log(casino);
console.log("========================TAKE MONEY=====================================");
casino.takeMoney(86);
console.log(casino);
console.log("========================TAKE SLOT BANK=================================");
console.log(casino.slots[2].allMoney());
console.log("========================TAKE SLOT MONEY================================");
casino.slots[2].takeSlotMoney(2);
console.log(casino.slots[2].allMoney());
console.log("========================GIVE SLOT MONEY================================");
casino.slots[2].addSlotMoney(21);
console.log(casino.slots[2].allMoney());
console.log("========================PLAY SLOT MONEY================================");
casino.slots[2].playGame(-0);
console.log(casino.slots[2].allMoney());