import { FoodsData } from "../types";

const chocolates: FoodsData = {
	"cocoa_powder": {
		brand: "Hersheys",
		name: "Hershey's cocoa powder",
		label: "cocoa powder",
		ingredients: ["cocoa powder"]
	},
	"unsweetened_chocolate": {
		brand: "Baker's",
		name: "unsweetened chocolate",
		label: "unsweetened chocolate",
		ingredients: ["chocolate"],
	},
	"ghirardelli_bittersweet": {
		brand: "ghirardelli",
		name: "60% bittersweet chocolate",
		label: "bittersweet chocolate",
		ingredients: ["unsweetened chocolate", "cane sugar", "cocoa butter", "milkfat", "soy lecithin", "vanilla extract"],
		allergens: ["milk", "soy"]
	},
	"ghirardelli_dark": {
		brand: "ghirardelli",
		name: "70% dark chocolate",
		label: "dark chocolate",
		ingredients: ["unsweetened chocolate", "cane sugar", "cocoa butter", "vanilla extract", "soy lecithin"],
		allergens: ["milk", "soy"]
	},
	"ghirardelli_semisweet": {
		brand: "ghirardelli",
		name: "semisweet chocolate",
		label: "semisweet chocolate",
		ingredients: ["cane sugar", "unsweetened chocolate", "cocoa butter", "whole milk powder", "soy lecithin", "vanilla extract"],
		allergens: ["milk", "soy"]
	},
	"ghirardelli_milk": {
		brand: "ghirardelli",
		name: "milk chocolate",
		label: "milk chocolate",
		ingredients: ["cane sugar", "unsweetened chocolate", "whole milk powder", "cocoa butter", "soy lecithin", "vanilla extract"],
		allergens: ["milk", "soy"]
	},
	"ghirardelli_white": {
		brand: "ghirardelli",
		name: "white chocolate",
		label: "white chocolate",
		ingredients: ["sugar", "palm kernal oil", "whole milk powder", "nonfat dry milk", "palm oil", "soy lecithin", "vanilla extract"],
		allergens: ["milk", "soy"]
	},
	"guittard_extra_dark": {
		brand: "guittard",
		name: "63% extra dark chocolate",
		label: "dark chocolate",
		ingredients: ["cacao beans", "cane sugar", "sunflower lecithin", "vanilla"]
	},
	"guittard_milk": {
		brand: "guittard",
		name: "31% milk chocolate chips",
		label: "milk chocolate",
		ingredients: ["cane sugar", "milk", "cocoa butter", "cacao beans", "sunflower lecithin", "vanilla"],
		allergens: ["milk"]
	},
	"guittard_semisweet": {
		brand: "guittard",
		name: "46% semisweet chocolate",
		label: "semisweet chocolate",
		ingredients: ["cane sugar", "cacao beans", "cocoa butter", "sunflower lecithin", "vanilla"],
	}
}

export default chocolates;