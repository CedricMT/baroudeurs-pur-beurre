<?php
/**
 * Returns the list of cars.
 */
require 'connect.php';
require 'json_response.php';

/**
 * Return associated comments
 */
function getComments($id)
{
  global $con;
  $sql = "SELECT * FROM comment WHERE article_id = " . $id;
  $comments = [];

  if ($result = mysqli_query($con, $sql)) {
    $cr = 0;
    while ($row = mysqli_fetch_assoc($result)) {
      $comments[$cr]['id'] = $row['id'];
      $comments[$cr]['articleId'] = $row['article_id'];
      $comments[$cr]['text'] = $row['text'];
      $comments[$cr]['author'] = $row['author'];
      $cr++;
    }
  }
  return $comments;
}

$articles = [];
$sql = "SELECT * FROM article";

if ($result = mysqli_query($con, $sql)) {
  $cr = 0;
  while ($row = mysqli_fetch_assoc($result)) {
    $articles[$cr]['id'] = $row['id'];
    $articles[$cr]['title'] = $row['title'];
    $articles[$cr]['text'] = $row['text'];
    $articles[$cr]['images'] = unserialize($row['images']);
    $articles[$cr]['comments'] = getComments($row['id'], $con);
    $cr++;
  }

  echo json_response(['data' => $articles]);
} else {
  echo json_response(['message' => 'SQL query error'], 404);
}
