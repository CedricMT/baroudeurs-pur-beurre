<?php
/**
 * Returns the list of cars.
 */
require 'connect.php';
require 'json_response.php';

$articles = [];
$sql = "SELECT * FROM articles";

if ($result = mysqli_query($con, $sql)) {
  $cr = 0;
  while ($row = mysqli_fetch_assoc($result)) {
    $articles[$cr]['id'] = $row['id'];
    $articles[$cr]['title'] = $row['title'];
    $articles[$cr]['text'] = $row['text'];
    $articles[$cr]['imgNb'] = $row['img_nb'];
    $articles[$cr]['imgDirLabel'] = $row['img_dir_label'];
    $articles[$cr]['comments'] = [];
    $cr++;
  }

  echo json_response(['data' => $articles]);
} else {
  echo json_response(['message' => 'SQL query error'], 404);
}
