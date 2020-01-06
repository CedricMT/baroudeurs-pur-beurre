<?php
require 'connect.php';
require 'json_response.php';

$articles = [];

$sql = "SELECT *
        FROM tar_articles 
        LEFT JOIN tco_countries ON tar_articles.tar_country_id=tco_countries.tco_id";

/* Select queries return a resultset */
if ($result = $con->query($sql)) {
  $cr = 0;
  while ($row = $result->fetch_assoc()) {
    $articles[$cr]['id'] = $row['tar_id'];
    $articles[$cr]['title'] = $row['tar_title'];
    $articles[$cr]['text'] = $row['tar_text'];
    $articles[$cr]['imgNb'] = $row['tar_img_nb'];
    $articles[$cr]['imgDirLabel'] = $row['tar_img_dir_label'];
    $articles[$cr]['comments'] = [];

    $articles[$cr]['countryId'] = $row['tco_id'];
    $articles[$cr]['countryName'] = $row['tco_name'];
    $articles[$cr]['date'] = $row['tco_date'];

    $cr++;
  }

  echo json_response(['data' => $articles]);

  /* free result set */
  $result->free();
} else {
  echo json_response(['message' => 'SQL query error: '.$con->error], 404);

  /* free result set */
  $result->free();
}
