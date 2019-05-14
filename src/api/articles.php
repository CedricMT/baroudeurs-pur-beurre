<?php
/**
 * Returns the list of cars.
 */
require 'connect.php';
    
$articles = [];
$sql = "SELECT * FROM article";

if($result = mysqli_query($con,$sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $articles[$cr]['id']    = $row['id'];
    $articles[$cr]['title'] = $row['title'];
    $articles[$cr]['text'] = $row['text'];
    $articles[$cr]['images'] = unserialize($row['images']);
    $cr++;
  }
    
  echo json_encode(['data'=>$articles]);
}
else
{
  http_response_code(404);
}