<?php
/**
 * Returns the list of cars.
 */
require 'connect.php';
    
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(400, "Invalid request method");
} 

// Get request arguments
$requestArgsJSON = file_get_contents('php://input');
$requestArgs = json_decode($requestArgsJSON, TRUE);

if (!array_key_exists('articleId', $requestArgs)
  || !array_key_exists('text', $requestArgs)
  || !array_key_exists('author', $requestArgs)) {
  http_response_code(400, "Invalid parameters");
} 

$sql = "INSERT INTO `comments`(`article_id`, `text`, `author`) VALUES ("
 . "'" . $requestArgs['articleId'] . "', "
 . "'" . addslashes($requestArgs['text']) . "', "
 . "'" . addslashes($requestArgs['author']) . "');";

if($result = mysqli_query($con,$sql)) {
  echo json_encode(['response' => 'Insert new comment success']);
} else {
  http_response_code(404);
}
