<?php
$connection = new mysqli("localhost:3306", "root", "", "directions");

if ($connection->connect_error) {
    die("Connection failed: " . $connection->connect_error);
}

if (isset($_POST["text"])) {
    $text = $_POST["text"];

    $sql = "INSERT INTO directionstable (theLastMove) VALUES ('$text')";
    $result = mysqli_query($connection, $sql);

    if ($result) {
        echo "Text saved to the database.";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($connection);
    }
}

mysqli_close($connection);
?>