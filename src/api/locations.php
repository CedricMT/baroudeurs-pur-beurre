<?php
require 'connect.php';
require 'json_response.php';

$locations = [];
$sql = "SELECT * FROM tlo_locations";

if ($result = mysqli_query($con, $sql)) {
  $cr = 0;
  while ($row = mysqli_fetch_assoc($result)) {
    $locations[$cr]['id'] = $row['tlo_id'];
    $locations[$cr]['countryId'] = $row['tlo_country_id'];
    $locations[$cr]['label'] = $row['tlo_label'];
    $locations[$cr]['gpsCoordinates'] = $row['tlo_gps_coordinates'];
    $locations[$cr]['flightPoint'] = $row['tlo_flight_point'];
    $locations[$cr]['flightDestinationId'] = $row['tlo_flight_destination_id'];
    $cr++;
  }

  echo json_response(['data' => $locations]);
} else {
  echo json_response(['message' => 'SQL query error'], 404);
}
