<!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>Roof Visualizer</title> 
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	<script type="text/javascript" src="js/jquery-1.7.1.min.js"></script>
	<script type="text/javascript" src="js/jquery.ease.js"></script>
	<script type="text/javascript" src="js/jquery_tipsy.js"></script>
	<script type="text/javascript" src="js/base.js"></script>
	<script type="text/javascript" src="js/clearbox.js"></script>
	<link rel="stylesheet" href="css/site.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="css/jquery_tipsy.css" type="text/css" media="screen" />
</head>
<body>
<div id="home"></div>
<div id="wrapper">
	<div style="position: relative; width: 997px; height: 494px;">
		<script>
			actHouse = "H1";
			actRoofName = "Adamante";
			actRoof = "Adamante";
			actRoofId = "9";
			actRoofColor = "RR11";
			actRoofColorName = "Verde molid";
			actRWS = "rannitRR23";
			actRWSName = "Gri închis";
			actWall = "WWhite";
			actAccess = "Accessories4824";
			rwslink = "http://www.ruukkiacoperis.ro/sistem-de-jgheaburi-si-burlane";
			rooflinks[2] = "http://www.ruukkiacoperis.ro/finnera";
			rooflinks[1] = "http://www.ruukkiacoperis.ro/monterrey-premium";
			rooflinks[6] = "http://www.ruukkiacoperis.ro/decorrey-roof";
			rooflinks[3] = "";
			rooflinks[7] = "http://www.ruukkiacoperis.ro/classic-premium";
			rooflinks[8] = "http://www.ruukkiacoperis.ro/classic-d";
			rooflinks[9] = "http://www.ruukkiacoperis.ro/adamante";
			rooflinks[5] = "http://www.ruukkiacoperis.ro/t20-premium";
			rooftitle = "Acoperiş";
		</script>
		<div onclick="closeChooser();" style="cursor: pointer;">
			<div id="house_main_div">
            	<img src="container/houses/house1pohja.png" id="house_main" />
            </div>
			<div id="roof_div">
            	<img src="cache/H1AdamanteRR11.png" id="roof" />
            </div>
			<div id="access_div">
            	<img src="cache/H1Accessories4824.png" id="access" />
            </div>
			<div id="wall_div">
            	<img src="cache/H1WWhite.png" id="wall" />
            </div>
			<div id="rws_div">
            	<img src="cache/H1rannitRR23.png" id="rws" />
            </div>
		</div>
		<div>
		<div id="chooser_menu">
			<div id="menu_inner">
				<div id="houses" class="chooser_inner">
				<script>
                    housestep = 804;
                    allhouse = 804;
                </script>
				<img src="container/houses/tn_house1pohja.png" onclick="changeHouse('H1', 'container/houses/house1pohja.png', 7, 21);" id="house_name_7" />
				<script>
                    $('#house_name_7').tipsy(
                         { 
                            fallback: '1', live: true, gravity: 's'
                         } 
                    );
                </script>
                <img src="container/houses/tn_house2pohja.png" onclick="changeHouse('H2', 'container/houses/house2pohja.png', 10, 21);" id="house_name_10" />
                <script>
                    $('#house_name_10').tipsy(
                         { 
                            fallback: '2', live: true, gravity: 's'
                         } 
                    );
                </script>
                <img src="container/houses/tn_house3pohja.png" onclick="changeHouse('H3', 'container/houses/house3pohja.png', 11, 21);" id="house_name_11" />
                <script>
                    $('#house_name_11').tipsy(
                         { 
                            fallback: '3', live: true, gravity: 's'
                         } 
                    );
                </script>
                <img src="container/houses/tn_house4pohja.jpg" onclick="changeHouse('H4', 'container/houses/house4pohja.jpg', 12, 21);" id="house_name_12" />
                <script>
                    $('#house_name_12').tipsy(
                         { 
                            fallback: '4', live: true, gravity: 's'
                         } 
                    );
                </script>
				</div>
				<div id="roof_profiles" class="chooser_inner">
				<script>
                    roofstep = 766;
                    allroof = 928;
                </script>
                <img src="container/houses/adamante.png" onclick="changeRoof('Adamante', 9, '', 21);" id="roof_name_9" />
				<script>
                    $('#roof_name_9').tipsy(
                         { 
                            fallback: 'Adamante', live: true, gravity: 's'
                         } 
                    );
                </script>
                <img src="container/houses/classicd.png" onclick="changeRoof('ClassicD', 8, '', 21);" id="roof_name_8" />
                <script>
                    $('#roof_name_8').tipsy(
                         { 
                            fallback: 'Classic D', live: true, gravity: 's'
                         } 
                    );
                </script>
                <img src="container/houses/decorrey.png" onclick="changeRoof('Decorrey', 6, '', 21);" id="roof_name_6" />
                <script>
                    $('#roof_name_6').tipsy(
                         { 
                            fallback: 'Decorrey', live: true, gravity: 's'
                         } 
                    );
                </script>
                <img src="container/houses/finnera.png" onclick="changeRoof('Finnera', 2, '', 21);" id="roof_name_2" />
                <script>
                    $('#roof_name_2').tipsy(
                         { 
                            fallback: 'Finnera', live: true, gravity: 's'
                         } 
                    );
                </script>
                <img src="container/houses/monterrey.png" onclick="changeRoof('Monterrey', 1, '', 21);" id="roof_name_1" />
                <script>
                    $('#roof_name_1').tipsy(
                         { 
                            fallback: 'Monterrey', live: true, gravity: 's'
                         } 
                    );
                </script>
                <img src="container/houses/t20.png" onclick="changeRoof('T20', 5, '', 21);" id="roof_name_5" />
                <script>
                    $('#roof_name_5').tipsy(
                         { 
                            fallback: 'T20', live: true, gravity: 's'
                         } 
                    );
                </script>
                </div>
				<div id="roof_colors" class="chooser_inner"></div>
				<div id="rws_list" class="chooser_inner">
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #33211f;" onclick="changeColor('RR887', 'rws');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #000000;" onclick="changeColor('RR33', 'rws');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #392723;" onclick="changeColor('RR32', 'rws');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #3f423d;" onclick="changeColor('RR23', 'rws');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #630503;" onclick="changeColor('RR29', 'rws');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #14360e;" onclick="changeColor('RR11', 'rws');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #7d2e0c;" onclick="changeColor('RR750', 'rws');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #FFFFFF;" onclick="changeColor('RR20', 'rws');">&nbsp;</div>
                </div>
                <div id="wall_list" class="chooser_inner">						
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #d9a660;" onclick="changeColor('4822', 'wall');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #f7ead4;" onclick="changeColor('4824', 'wall');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #f1ca9e;" onclick="changeColor('4831', 'wall');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #a67359;" onclick="changeColor('4847', 'wall');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #ceb0a2;" onclick="changeColor('4850', 'wall');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #9C6D5C;" onclick="changeColor('4853', 'wall');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #D6ADA1;" onclick="changeColor('4855', 'wall');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #905341;" onclick="changeColor('4859', 'wall');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #ADB4A0;" onclick="changeColor('4929', 'wall');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #98937F;" onclick="changeColor('4942', 'wall');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #E2DBCB;" onclick="changeColor('4945', 'wall');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #C7B9A2;" onclick="changeColor('4947', 'wall');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #D2C4B8;" onclick="changeColor('4957', 'wall');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #AB9889;" onclick="changeColor('4959', 'wall');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #928D83;" onclick="changeColor('4977', 'wall');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #E2E2DE;" onclick="changeColor('4980', 'wall');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #B7B6B6;" onclick="changeColor('4982', 'wall');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #888889;" onclick="changeColor('4984', 'wall');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #656364;" onclick="changeColor('4985', 'wall');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #647D8A;" onclick="changeColor('R4901', 'wall');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #778F62;" onclick="changeColor('R4925', 'wall');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #A48353;" onclick="changeColor('R4955', 'wall');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #ff0000;" onclick="changeColor('Red', 'wall');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #FFFFFF;" onclick="changeColor('White', 'wall');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #ffff00;" onclick="changeColor('Yellow', 'wall');">&nbsp;</div>
                    </div>
					<div id="access_list" class="chooser_inner">
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #928D83;" onclick="changeColor('4977', 'access');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #888889;" onclick="changeColor('4984', 'access');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #F1CA9E;" onclick="changeColor('4831', 'access');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #656364;" onclick="changeColor('4985', 'access');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #A67359;" onclick="changeColor('4847', 'access');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #778F62;" onclick="changeColor('R4925', 'access');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #CEB0A2;" onclick="changeColor('4850', 'access');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #A48353;" onclick="changeColor('R4955', 'access');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #9C6D5C;" onclick="changeColor('4853', 'access');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #FF0000;" onclick="changeColor('Red', 'access');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #D6ADA1;" onclick="changeColor('4855', 'access');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #FFFFFF;" onclick="changeColor('White', 'access');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #905341;" onclick="changeColor('4859', 'access');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #FFFF00;" onclick="changeColor('Yellow', 'access');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #ADB4A0;" onclick="changeColor('4929', 'access');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #647D8A;" onclick="changeColor('R4901', 'access');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #E2DBCB;" onclick="changeColor('4945', 'access');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #d9a660;" onclick="changeColor('4822', 'access');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #C7B9A2;" onclick="changeColor('4947', 'access');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #B7B6B6;" onclick="changeColor('4982', 'access');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #D2C4B8;" onclick="changeColor('4957', 'access');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #AB9889;" onclick="changeColor('4959', 'access');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #f7ead4;" onclick="changeColor('4824', 'access');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #98937f;" onclick="changeColor('4942', 'access');">&nbsp;</div>
                        <div style="margin-right: 10px; float: left; width: 40px; height: 95px; background: #e2e2de;" onclick="changeColor('4980', 'access');">&nbsp;</div>
                    </div>
				</div>
			</div>
			<script>
				$('#arrow_left').tipsy( {fallback: 'Precedenta', live: true, gravity: 'w'} );
				$('#arrow_right').tipsy( {fallback: 'Următoarea', live: true, gravity: 'e'} );
				$('#close_btn').tipsy( {fallback: 'Ascunde bara', live: true, gravity: 'e'} );
			</script>
			<div class="arrow" style="left: 5px;"><img src="images/arrow_left_disabled.gif" id="arrow_left" onclick="moveList('left');" /></div>
			<div class="arrow" style="left: 916px;"><img src="images/arrow_right.gif" id="arrow_right" onclick="moveList('right');" /></div>
			<div class="closeBtn" style="left: 967px;"><img src="images/close.png" onclick="closeChooser();" id="close_btn"></div>
			<div id="chooser_loader">
            	<img src="images/sys/ajax-loader2.gif" alt="loader">
            </div>
		</div>
	</div>
	<div class="house_menu">
		<div class="house_menu_item" onclick="showChooser('houses');">
			<div class="menu_left" id="houses_left"></div>
			<div class="menu_center" id="houses_center">Modelul casei</div>
			<div class="menu_right" id="houses_right"></div>
		</div>
		<div class="house_menu_item" onclick="showChooser('roof_profiles');">
			<div class="menu_left" id="roof_profiles_left"></div>
			<div class="menu_center" id="roof_profiles_center">Profilul de acoperiş</div>
			<div class="menu_right" id="roof_profiles_right"></div>
		</div>
		<div class="house_menu_item" onclick="loadRoofColors(actRoofId, 21);">
			<div class="menu_left" id="roof_colors_left"></div>
			<div class="menu_center" id="roof_colors_center">Culoarea acoperişului</div>
			<div class="menu_right" id="roof_colors_right"></div>
		</div>
		<div class="house_menu_item" onclick="loadColors('rws', 21);">
			<div class="menu_left" id="rws_list_left"></div>
			<div class="menu_center" id="rws_list_center">Culoarea sistemului pluvial</div>
			<div class="menu_right" id="rws_list_right"></div>
		</div>
		<div class="house_menu_item" onclick="loadColors('wall', 21);">
			<div class="menu_left" id="wall_list_left"></div>
			<div class="menu_center" id="wall_list_center">Culoarea faţadei</div>
			<div class="menu_right" id="wall_list_right"></div>
		</div>
		<div class="house_menu_item" onclick="loadColors('access', 21);">
			<div class="menu_left" id="access_list_left"></div>
			<div class="menu_center" id="access_list_center">Culoarea tâmplăriei</div>
			<div class="menu_right" id="access_list_right"></div>
		</div>
	</div>
	<div id="cover">
		<div id="loader" style="display: none; text-align: center; width: 100%; line-height: 494px;">
			<img src="images/sys/ajax-loader.gif" alt="loader"/>
		</div>
	</div>
</div>
</body>
</html>