<html>
	<head>
		<link rel="stylesheet" href="/jujuFrameWork/libraries/css/pageBuilder.css">
		<link rel="stylesheet" href="/jujuFrameWork/libraries/css/grid.css">
		<link rel="stylesheet" href="/jujuFrameWork/libraries/css/gui.css">
		<link rel="stylesheet" href="/jujuFrameWork/libraries/css/accordian.css">
		<link rel="stylesheet" href="/jujuFrameWork/libraries/css/slideOutMenu.css">
	</head>
	<body>
		<div class="menu">
		    <div class="title">MENU</div>
		    <ul class="nav">
			  <li>
			    <input type="checkbox" checked>
			    <i></i>
			    <h2>Conatiners</h2>
			    <p>
					<select id="requestedCols">
					  <option value="12">1 cols</option>
					  <option value="6">2 cols</option>
					  <option value="4">3 cols</option>
					  <option value="3">4 cols</option>
					  <option value="2">6 cols</option>
					  <option value="1">12 cols</option>
					</select>
					<button class="sucess button small" id="addRow">Add Row</button><br>
					<button class="sucess button small" id="combineColumns">Combine Selected Columns</button>
				</p>
			  </li>
			  <li>
			    <input type="checkbox" checked>
			    <i></i>
			    <h2>Widgets</h2>
			    <p></p>
			  </li>
			  <li>
			    <input type="checkbox" checked>
			    <i></i>
			    <h2>Content</h2>
			    <p></p>
			  </li>
			</ul>
		</div>
		<div id="pageBuilderMetaData">
			<input id="pageBuilder-rowNumber" type="hidden" value="0">
		</div>
		<div id="pageBuilder">

		</div>
		<script type="text/javascript" src="/jujuFrameWork/libraries/js/pageBuilderUtilityFunctions.js"></script>
		<script type="text/javascript" src="/jujuFrameWork/libraries/js/pageBuilderAddRows.js"></script>
		<script type="text/javascript" src="/jujuFrameWork/libraries/js/pageBuilderEventHandlers.js"></script>
		<script type="text/javascript" src="/jujuFrameWork/libraries/js/pageBuilderCombineColumns.js"></script>
	</body>
</html>