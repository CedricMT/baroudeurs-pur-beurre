<?php
/**
 * Returns the list of cars.
 */
require 'connect.php';
require 'json_response.php';

$countries = [];
$sql = "SELECT * FROM countries";

if ($result = mysqli_query($con, $sql)) {
  $cr = 0;
  while ($row = mysqli_fetch_assoc($result)) {
    $countries[$cr]['id'] = $row['id'];
    $countries[$cr]['date'] = $row['date'];
    $countries[$cr]['state'] = $row['state'];
    $countries[$cr]['duration'] = $row['duration'];
    $countries[$cr]['country'] = $row['country'];
    $countries[$cr]['text'] = $row['text'];
    $cr++;
  }

  echo json_response(['data' => $countries]);
} else {
  echo json_response(['message' => 'SQL query error'], 404);
}
