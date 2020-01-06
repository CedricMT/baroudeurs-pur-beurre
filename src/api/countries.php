<?php
require 'connect.php';
require 'json_response.php';

$countries = [];
$sql = "SELECT * FROM tco_countries";

if ($result = mysqli_query($con, $sql)) {
  $cr = 0;
  while ($row = mysqli_fetch_assoc($result)) {
    $countries[$cr]['id'] = $row['tco_id'];
    $countries[$cr]['date'] = $row['tco_date'];
    $countries[$cr]['duration'] = $row['tco_duration'];
    $countries[$cr]['name'] = $row['tco_name'];
    $countries[$cr]['countryCode'] = $row['tco_country_code'];
    $cr++;
  }

  echo json_response(['data' => $countries]);
} else {
  echo json_response(['message' => 'SQL query error'], 404);
}
