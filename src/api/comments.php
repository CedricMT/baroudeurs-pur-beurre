<?php
require 'connect.php';
    
$comments = [];
$sql = "SELECT * FROM tcm_comments";

if($result = mysqli_query($con,$sql))
{
  $cr = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $comments[$cr]['id'] = $row['tcm_id'];
    $comments[$cr]['articleId'] = $row['tcm_article_id'];
    $comments[$cr]['text'] = $row['tcm_text'];
    $comments[$cr]['author'] = $row['tcm_author'];
    $cr++;
  }
    
  echo json_encode(['data'=>$comments]);
}
else
{
  http_response_code(404);
}