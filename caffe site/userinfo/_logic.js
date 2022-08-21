//JavaScript for Delivery Information
const confirmButton = document.querySelector("button"),
formErrorArea = document.querySelector(".formError");
let inputs = document.querySelectorAll("input");
let txtArea = document.querySelector("textarea");
confirmButton.addEventListener("click", e=>{
	e.preventDefault();
	if(e.type == "click") {
		for(let input of inputs) {
			if(!input.value || input.value.length == 0 || input.value.trim() == "") {
				input.style.outline = "2px solid red";
				input.focus();
				formErrorArea.textContent = `Dear Customer, please enter your ${input.getAttribute("id")} to
				proceed.`;
				return;
			} else {
				if(input.style.outline.includes("red") == true) {
					input.style.outline = "1px solid orangered";
				}
			}

			if(input.getAttribute("id") == "number") {
				if(isNaN(parseInt(input.value)) == true) {
					formErrorArea.textContent = `The number you entered in Invalid.`;
					return;
				}
			}

		}
		if(!txtArea.value || txtArea.value.length == 0 || txtArea.value.trim() == "") {
			txtArea.style.outline = "2px solid red";
			txtArea.focus();
			formErrorArea.textContent = `Dear Customer, please enter your ${txtArea.getAttribute("id")} to proceed.`;
			return;
		} else {
			if(txtArea.style.outline.includes("red") == true) {
				txtArea.style.outline = "1px solid orangered";
			}
		}

		let itemsInCart = JSON.parse(localStorage.getItem("productsInCart"));
		let tc = parseInt(localStorage.getItem("totalCost"));

		$.ajax({
			type: "POST",
			data: {
				name: inputs[0].value.trim(),
				number: parseInt(inputs[1].value.trim()),
				address: txtArea.value.trim(),
				items: JSON.stringify(itemsInCart),
				totalCost: tc
			},
			url: "orderPlace.php",
			dataType: "application/x-www-form-urlencoded",
			success: function(response){
				console.log("This function doesn't work :( ");
			},
			error: function(response) {
				if(response.responseText == "Success query") {
					localStorage.clear();
					localStorage.setItem("Order Placed", response.statusText);
					localStorage.setItem("Order Response Code", response.status);
					localStorage.setItem("Order Response", response.statusText);
					localStorage.setItem("Order Info", JSON.stringify({
						name: inputs[0].value.trim(),
						number: inputs[1].value.trim(),
						address: txtArea.value.trim()
					}));

					toastr.success("Your order has been placed and it will reach you shortly", null);
					setTimeout(function() {
						document.location = '../../caffe site';
					}, 2000);
					return true;
				}
			}
		});

	} else {
		return;
	}
})

function checkCart() {
	if(localStorage.getItem("productsInCart") == null 
	|| localStorage.getItem("productsInCart") == ""){
		window.alert("Please add some items to cart!");
	document.location = "../../caffe site";
	return;
	}
}

checkCart();