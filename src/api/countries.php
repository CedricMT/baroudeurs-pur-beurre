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
    $countries[$cr]['id'] = $row['country_id'];
    $countries[$cr]['date'] = $row['date'];
    $countries[$cr]['duration'] = $row['duration'];
    $countries[$cr]['name'] = $row['name'];
    $countries[$cr]['text'] = $row['text'];
    $countries[$cr]['countryCode'] = $row['country_code'];
    $cr++;
  }

  echo json_response(['data' => $countries]);
} else {
  echo json_response(['message' => 'SQL query error'], 404);
}
