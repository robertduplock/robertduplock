<?php
    session_start();
    include_once("mail.php");
    $funct = $_POST['funct'];
	
    if ($funct == "mail") {
                $headers .= "Reply-To: robert@robertduplock.name \r\n";
                $headers .= "Return-Path: robert@robertduplock.name \r\n";
                $headers .= "From: \"robertduplock.name\" <robert@robertduplock.name> \r\n";
                $headers .= "Organization: robertduplock.name\r\n";
                $headers .= "MIME-Version: 1.0\r\n";
                $headers .= "Content-type: text/plain; charset=iso-8859-1\r\n";
                $headers .= "Content-Transfer-Encoding: binary";
                $headers .= "X-Priority: 3\r\n";
                $headers .= "X-Mailer: PHP". phpversion() ."\r\n";

		$name = $_POST['name'];
		$email = $_POST['email'];
		$message = $_POST['message'];
		$eBody = "From Name: ". $name . "\n\nFrom Email: " . $email . "\n\nMessage:\n" . $message;
		$m = mail("robertduplock@gmail.com", "New Message From robertduplock.name! ". date('l jS \of F Y h:i:s A'), $eBody, $headers);
		if ($m) {
			echo "mail sent!";
		} else {
			echo "mail not sent";
		}
		
	}
 
?>
