<?php
/**
 * Returns the list of cars.
 */
require 'connect.php';
require 'json_response.php';

$location = [];
$sql = "SELECT * FROM location";

if ($result = mysqli_query($con, $sql)) {
  $cr = 0;
  while ($row = mysqli_fetch_assoc($result)) {
    $location[$cr]['id'] = $row['id'];
    $location[$cr]['date'] = $row['date'];
    $location[$cr]['state'] = $row['state'];
    $location[$cr]['duration'] = $row['duration'];
    $location[$cr]['country'] = $row['country'];
    $location[$cr]['flagLabel'] = $row['flagLabel'];
    $location[$cr]['text'] = $row['text'];
    $cr++;
  }

  echo json_response(['data' => $location]);
} else {
  echo json_response(['message' => 'SQL query error'], 404);
}
