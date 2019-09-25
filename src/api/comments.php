<?php
/**
 * Returns the list of cars.
 */
require 'connect.php';
    
$comments = [];
$sql = "SELECT * FROM comments";

if($result = mysqli_query($con,$sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $comments[$cr]['id']    = $row['id'];
    $comments[$cr]['articleId'] = $row['article_id'];
    $comments[$cr]['text'] = $row['text'];
    $comments[$cr]['author'] = $row['author'];
    $cr++;
  }
    
  echo json_encode(['data'=>$comments]);
}
else
{
  http_response_code(404);
}