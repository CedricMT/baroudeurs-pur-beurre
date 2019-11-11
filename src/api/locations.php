<?php
/**
 * Returns the list of cars.
 */
require 'connect.php';
require 'json_response.php';

$places = [];
$sql = "SELECT countries.country_id, countries.date, countries.duration, countries.name, countries.text, countries.country_code, places.id, places.label, places.gps_coordinates, places.flight_point, places.flight_destination_id FROM countries LEFT JOIN places ON countries.country_id=places.country_id;";

if ($result = mysqli_query($con, $sql)) {
  $cr = 0;
  while ($row = mysqli_fetch_assoc($result)) {
    $places[$cr]['id'] = $row['id'];
    $places[$cr]['countryId'] = $row['country_id'];
    $places[$cr]['label'] = $row['label'];
    $places[$cr]['gpsCoordinates'] = $row['gps_coordinates'];
    $places[$cr]['date'] = $row['date'];
    $places[$cr]['duration'] = $row['duration'];
    $places[$cr]['name'] = $row['name'];
    $places[$cr]['countryCode'] = $row['country_code'];
    $places[$cr]['text'] = $row['text'];
    $places[$cr]['flightPoint'] = $row['flight_point'];
    $places[$cr]['flightDestinationId'] = $row['flight_destination_id'];
    $cr++;
  }

  echo json_response(['data' => $places]);
} else {
  echo json_response(['message' => 'SQL query error'], 404);
}
