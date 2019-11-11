<?php
/**
 * Returns the list of cars.
 */
require 'connect.php';
require 'json_response.php';

$locations = [];
$sql = "SELECT * FROM locations";

if ($result = mysqli_query($con, $sql)) {
  $cr = 0;
  while ($row = mysqli_fetch_assoc($result)) {
    $locations[$cr]['id'] = $row['id'];
    $locations[$cr]['countryId'] = $row['country_id'];
    $locations[$cr]['label'] = $row['label'];
    $locations[$cr]['gpsCoordinates'] = $row['gps_coordinates'];
    $locations[$cr]['flightPoint'] = $row['flight_point'];
    $locations[$cr]['flightDestinationId'] = $row['flight_destination_id'];
    $cr++;
  }

  echo json_response(['data' => $locations]);
} else {
  echo json_response(['message' => 'SQL query error'], 404);
}
