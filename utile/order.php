<?php
include_once "../PHPExcel/Classes/PHPExcel/IOFactory.php";
header("Content-type: text/xml");
date_default_timezone_set("Europe/Helsinki");
showRezervariRal();
function showRezervariRal()
{
	$objReader = PHPExcel_IOFactory::createReader('Excel5');
	$objPHPExcel = $objReader->load("Rezervari RAL.xls");
	$xmlData = <<<XML
<?xml version='1.0' encoding='utf-8' standalone='yes'?>
<stock>
</stock>
XML;
	$xmlResult = new SimpleXMLElement($xmlData);
	$lastColumnIndex = PHPExcel_Cell::columnIndexFromString($objPHPExcel->getSheet()->getHighestDataColumn());
	$maximumEmptyCell = 2;
	$emptyCellCount = 0;

	for ($i=3; $i < $lastColumnIndex; $i++)
	{
		$excelDateValue = $objPHPExcel->getSheet()->getCellByColumnAndRow($i,4)->getValue();
		$excelDate = PHPExcel_Style_NumberFormat::toFormattedString($excelDateValue,"D/M/YYYY");

		if ($excelDate == date("d/m/Y", strToTime("-2 days")))
		{
			for ($j=5; $j < $objPHPExcel->getSheet()->getHighestRow(); $j++)
			{
				$nodcurrent =  $xmlResult->addChild("quantity", "");
				$nodcurrent->addAttribute("type", $objPHPExcel->getSheet()->getCellByColumnAndRow(1,$j)->getFormattedValue());
				$nodcurrent->addAttribute("total", $objPHPExcel->getSheet()->getCellByColumnAndRow($i,$j)->getFormattedValue());
				$nodcurrent->addAttribute("totalavailable", $objPHPExcel->getSheet()->getCellByColumnAndRow($i+1,$j)->getFormattedValue());
			}
			break;
		}

		// if ($excelDate == "")
		// {
		// $emptyCellCount++;
		// if ($emptyCellCount == $maximumEmptyCell)
		// {
		// break;
		// }
		// }
		// else if ($excelDate == date("D/M/YYYY",time()))
		// {
		// //TODO Return price for this column to application
		// $xmlResult->addAttribute("today", $excelDate);
		// }
		// else
		// {
			// $emptyCellCount = 0;
			// $xmlResult->addChild("texture", $excelDate);
		// }
}
echo $xmlResult->asXML();
}
?>