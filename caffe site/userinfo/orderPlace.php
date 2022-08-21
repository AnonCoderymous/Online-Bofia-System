<?php
	if($_SERVER[ 'REQUEST_METHOD' ] === "POST") {
		$name = trim($_POST['name']);
		$number = intval(trim($_POST['number']));
		$address = trim($_POST['address']);
		$items = trim($_POST['items']);
		$total = intval(trim($_POST['totalCost']));

		$con = mysqli_connect("localhost", "root", "", "orders");
		if( $con == TRUE) {
			
			$query = "INSERT INTO `info`(`name`, `number`, `address`, `items`, `total`) VALUES ('{$name}', '{$number}', '{$address}', '{$items}', '{$total}')";

			if(mysqli_query($con, $query)== TRUE) {
				echo "Success query";
			} else {
				die("Failed query");
			}

		} else {
			
		}
	}
?>