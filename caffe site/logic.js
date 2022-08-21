// Buttons in the webpage
const buttons = document.querySelectorAll("button");

let products = [
	{
		name: "Crispy Burger",
		tag: "crispyburger",
		price: 85,
		qty: 0
	},
	{
		name: "Cheese Burger",
		tag: "cheeseburger",
		price: 60,
		qty: 0
	},
	{
		name: "Veg Burger",
		tag: "vegburger",
		price: 75,
		qty: 0
	},
	{
		name: "Chicken Shawarma",
		tag: "chickenshawarma",
		price: 50,
		qty: 0
	},
	{
		name: "Cheese Shawarma",
		tag: "cheeseshawarma",
		price: 70,
		qty: 0
	},
	{
		name: "Paneer Shawarma",
		tag: "paneershawarma",
		price: 60,
		qty: 0
	},
	{
		name: "Chicken Cheese Pizza",
		tag: "chickencheesepizza",
		price: 130,
		qty: 0
	},
	{
		name: "Chicken Royal Pizza",
		tag: "chickenroyalpizza",
		price: 150,
		qty: 0
	},
	{
		name: "Paneer Pizza",
		tag: "paneerpizza",
		price: 130,
		qty: 0
	},
	{
		name: "Veg Pizza",
		tag: "vegpizza",
		price: 110,
		qty: 0
	},
	{
		name: "Crispy Burger",
		tag: "crispyburger",
		price: 85,
		qty: 0
	},
	{
		name: "French Fries",
		tag: "frenchfries",
		price: 50,
		qty: 0
	},
	{
		name: "Peri Peri Fries",
		tag: "periperifries",
		price: 70,
		qty: 0
	},
	{
		name: "Mayo Fries",
		tag: "mayofries",
		price: 60,
		qty: 0
	},
	{
		name: "Cheese Fries",
		tag: "cheesefries",
		price: 70,
		qty: 0
	},
	{
		name: "Chicken Nuggets",
		tag: "chickenuggets",
		price: 150,
		qty: 0
	},
	{
		name: "Chicken Strips",
		tag: "chickenstrips",
		price: 170,
		qty: 0
	},
	{
		name: "Chicken Drum",
		tag: "chickendrum",
		price: 250,
		qty: 0
	},
	{
		name: "Chicken Bucket",
		tag: "chickenbucket",
		price: 380,
		qty: 0
	},
	{
		name: "Chicken Biryani",
		tag: "chickenbiryani",
		price: 100,
		qty: 0
	},
	{
		name: "Chicken Seekh",
		tag: "chickenseekh",
		price: 70,
		qty: 0
	},
	{
		name: "Paratha",
		tag: "paratha",
		price: 38.80,
		qty: 0
	},
	{
		name: "Cold Drinks",
		tag: "coldrinks",
		price: 20,
		qty: 0
	},
	{
		name: "Water",
		tag: "water",
		price: 20,
		qty: 0
	},
]

for( let i=0; i < buttons.length; i++ ) {
	buttons[i].addEventListener('click', () => {
		cartNumbers(products[i]);
		totalCost(products[i]);
	});
}

function onLoadCartNumbers() {
	let productNumbers = localStorage.getItem("Cart Numbers");

	if( productNumbers != undefined ) {
		document.querySelector(".inCartNumber").textContent = productNumbers;
	}
}

function cartNumbers(product) {
	// console.log("Product ",product);
	let productNumbers = localStorage.getItem("Cart Numbers");

	//convert string to integer

	productNumbers = parseInt(productNumbers);

	if(productNumbers) {
		localStorage.setItem("Cart Numbers", productNumbers + 1);
		document.querySelector(".inCartNumber").textContent = productNumbers + 1;
	} else {
		localStorage.setItem("Cart Numbers", 1);
		document.querySelector(".inCartNumber").textContent = 1;
	}

	setItems(product);

	toastr.success('Item added to cart', null);
}

function totalCost(product) {
	let cartCosts = localStorage.getItem("totalCost");

	if(cartCosts != null) {
		cartCosts = parseInt(cartCosts);
		localStorage.setItem("totalCost", cartCosts + product.price);

	} else {
		localStorage.setItem("totalCost", product.price);
	}
}

function displayCart() {
	let cartItems = localStorage.getItem("productsInCart");
	const emptycart = document.querySelector(".emptycart");
	let total = parseInt(localStorage.getItem("totalCost"));
	cartItems = JSON.parse(cartItems);

	let productContainer = document.querySelector(".products ol");

	if(cartItems == null) {
		let b = document.querySelector("#clrcrt");
		if(b) {
			b.style.display = 'none';
		}
		emptycart.innerHTML = `
		<center>
		<img src='./images/emptycart.jpg' alt=''/>
		<h3>Your cart is empty</h3>
		<p>You can go to home page to view items.</p>
		<a href='../caffe site'>See the Menu</a>
		</center>
		`;
	}

	if(cartItems && productContainer) {
		productContainer.innerHTML = '';
		Object.values(cartItems).map(item => {
			productContainer.innerHTML += `
			<li>
				<img src='./images/${item.tag}.jpg' alt='${item.name}'/>
				<div class='item-name'>
					${item.name}
				</div>
				<div class='prices'>
					Price: ${item.price} Rs.
				</div>
				<div class='quantity'>
					Quantity: ${item.qty}
				</div>
			</li>
			`;
		});

		productContainer.innerHTML += `
		<hr><div class='total'> Total Cost : ${total}</div>
		<button id='orderButton' onclick='order()'>Place Order</button>`;
	}
}

function setItems(product) {

	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	
	if(cartItems != null) {

		if(cartItems[product.tag] == undefined) {
			cartItems = {
				...cartItems,
				[product.tag]: product
			}
		}

		cartItems[product.tag].qty += 1;
	} else {
		product.qty = 1;
		cartItems = {
			[product.tag]: product
		}
		
	}

	localStorage.setItem("productsInCart", JSON.stringify(cartItems));

}

function clearCart() {
	localStorage.clear();
	window.location.reload();
}

function order() {
	// toastr.success('Your order has been placed Successfully and it will reach you shortly', 'Thank you');
	// setTimeout(function(){
	// 	localStorage.clear();
	// 	window.location.href = '../caffe site';
	// }, 2500);
	// return true;

	document.location = 'userinfo';
}

onLoadCartNumbers();
displayCart();