<?php

	$pdo = new PDO('mysql:host=localhost;dbname=jansql1', 'jansql1', 'cxe224');

	if(isset($_GET["game"])){
			$getgame = $_GET["game"];
		}else{
			$getgame = 1;
		}
?>

<!doctype html>

<html lang="en">
  
  <head>

    	<title>Auswertung | Jan40</title>
    	<meta charset="utf-8">
    	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    	<!-- Bootstrap CSS -->
    	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">

    	<!-- Auswertung CSS -->
    	<link rel="stylesheet" href="analyse.css">
  
  </head>
  
  <body>
    
    <br>

	<div class="container white">

		<br>

		<h5>Spiel zum Auswerten auswählen:</h5>

		<nav aria-label="Page navigation example">
  			<ul class="pagination">

			<?php

			$arr = array();

			$sqlgames = "SELECT id FROM games ORDER BY id ASC";
			foreach ($pdo->query($sqlgames) as $gameid){
				if (in_array($gameid['id'], $arr)) {
    				
				}else{ ?>

					<li class="page-item <?php
							if($getgame==$gameid['id']){echo "active";}
						?>">
						<a class="page-link " href="analyse.php?game=<?php echo $gameid['id']; ?>">
							<?php echo $gameid['id']; ?>
						</a>
					</li>
				
				<?php 
				}
			}
			
	?>
	
			</ul>
		</nav>
	
	<hr>
	<br>

	<?php
		
		$stmt = $pdo->prepare("SELECT * FROM games WHERE id=$getgame LIMIT 1"); 
		$stmt->execute(); 
		$result = $stmt->fetch();
		
		$gamename = $result['name'];

	?>	
  	
  	<h1>Auswertung für "<?php echo $gamename; ?>" (Spiel <?php echo $getgame; ?>)</h1>
  	<br>
  	
  	<table class="datatable">
  		<tr>
    		<th>Player ID</th>
    		<th>Player Name</th>
    		<th>Score</th>
    		<th></th>
    	</tr>
			<?php
				$sql = "SELECT scores.player_id, scores.value, players.name FROM scores 
						INNER JOIN players ON players.id=scores.player_id
						WHERE scores.game_id = $getgame ORDER BY scores.value DESC";
				foreach ($pdo->query($sql) as $row) {
   			?>
   				<tr>
    				<td><?php echo $row['player_id']; ?></td>
    				<td><?php echo $row['name']; ?></td>
    				<td><?php echo $row['value']; ?></td>
    			</tr>
			<?php

			}

			?>
	
	</table>

	</div>

	<!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
  
  </body>

</html>