<?php
    error_reporting(E_ALL);
    include_once "../PHPExcel/Classes/PHPExcel/IOFactory.php";
    date_default_timezone_set("Europe/Helsinki");
    define("RAL", "Rezervari RAL.xls");
    define("RR", "Rezervari RR.xls");
    define("ZN", "Rezervari ZN.xls");
    $xmlData = <<<XML
<?xml version='1.0' encoding='utf-8' standalone='yes'?>
<stock>
</stock>
XML;
    //phpinfo();

    function trace($output)
    {
        //print $output;
    }

    function getStocksXlsFromEmail()
    {
        $mailbox = "{imap.gmail.com:993/imap/ssl}INBOX";
        $username = "florika.lupu";
        $password = "Ionel@#3";
        $mailStream = imap_open($mailbox, $username, $password) or die('Cannot connect to Gmail:' . print_r(imap_errors()));
        $date = date("d M Y", strToTime("-7 days"));
        $dateOfLastStock = null;
        $criteria = 'SUBJECT "Solduri" FROM "adistudio92@mail.ru" SINCE "' . $date . '"';
        $emails = imap_search($mailStream, $criteria, SE_FREE, "UTF-8");

        if ($emails)
        {
            rsort($emails);
            $emailCount = 1;
            //count($emails);
            for ($i = 0; $i < $emailCount; $i++)
            {
                $overview = imap_fetch_overview($mailStream, $emails[$i], 0);
                $structure = imap_fetchstructure($mailStream, $emails[$i]);
                $dateOfLastStock = $overview[0]->date;

                trace("<p>{$overview[0]->date}</p><p>");

                if (isset($structure->parts) && count($structure->parts))
                {
                    for ($j = 0; $j < count($structure->parts); $j++)
                    {
                        $attachmentName = null;

                        if ($structure->parts[$j]->ifparameters)
                        {
                            foreach ($structure->parts[$j]->parameters as $object)
                            {
                                if (strtolower($object->attribute) == 'name')
                                {
                                    $attachmentName = $object->value;
                                }
                            }
                        }

                        $isNewAttachment = true;

                        if (file_exists($attachmentName))
                        {
                            trace($isNewAttachment);
                            $isNewAttachment = date("d M Y", strToTime("0 days")) != date("d M Y", filemtime($attachmentName));
                        }

                        if ($attachmentName != null && $isNewAttachment == true)
                        {
                            $decodedAttachmentData = null;
                            $attachmentData = imap_fetchbody($mailStream, $emails[$i], $j + 1);
                            trace("<span>{$attachmentName}</span> [Save, ");
                            $file = new SplFileObject($attachmentName, 'w+');

                            if ($file->isWritable() == false)
                            {
                                trace(chmod($attachmentName, 0777));
                            }

                            switch ($structure->parts[$i]->encoding)
                            {
                                /* 0 = 7BIT encoding */
                                case 0 :
                                {
                                    $decodedAttachmentData = base64_decode($attachmentData);
                                    break;
                                }
                                case 1 :
                                {
                                    trace("<p>8BIT</p>");
                                    break;
                                }
                                case 2 :
                                {
                                    trace("<p>BINARY</p>");
                                    break;
                                }
                                /* 3 = BASE64 encoding */
                                case 3 :
                                {
                                    trace("<p>BASE64</p>");
                                    $decodedAttachmentData = base64_decode($attachmentData);
                                    break;
                                }
                                /* 4 = QUOTED-PRINTABLE encoding */
                                case 4 :
                                {
                                    trace("<p>QUOTED-PRINTABLE</p>");
                                    $decodedAttachmentData = quoted_printable_decode($attachmentData);
                                    break;
                                }
                                case 5 :
                                {
                                    trace("<p>OTHER</p>");
                                    break;
                                }
                            }

                            if ($decodedAttachmentData != null)
                            {
                                $written = $file->fwrite($decodedAttachmentData);
                                trace("Saved {$written} bytes");
                            }

                            trace("] ");
                        }
                    }
                }
                trace("</p>");
            }
        }
        else
        {
            trace("Email not found at $date");
        }
        /* close the connection */
        imap_close($mailStream);
        return $dateOfLastStock;
    }

    function getStocks($type = RAL, $asHtml = true)
    {
        $dateOfLastStock = getStocksXlsFromEmail();
        if ($dateOfLastStock && file_exists($type))
        {
            $searchDate = date("d/m/Y", strtotime($dateOfLastStock));
            $htmlData = "";
            $objReader = PHPExcel_IOFactory::createReader('Excel5');
            $objPHPExcel = $objReader->load($type);
            $xmlResult = new SimpleXMLElement($xmlData);
            $lastColumnIndex = PHPExcel_Cell::columnIndexFromString($objPHPExcel->getSheet()->getHighestDataColumn());
            $maximumEmptyCell = 2;
            $emptyCellCount = 0;

            for ($i = 3; $i < $lastColumnIndex; $i++)
            {
                $excelDateValue = $objPHPExcel->getSheet()->getCellByColumnAndRow($i, 4)->getValue();
                $excelDate = PHPExcel_Style_NumberFormat::toFormattedString($excelDateValue, "DD/MM/YYYY");

                if ($excelDate == $searchDate)
                {
                    $htmlData = $htmlData . "<table border='1' style='display: inline-block; margin-left:10px; vertical-align:top;'><caption>$type $searchDate</caption><tr><th>Nume</th><th>Disponibil</th><th>Total</th></tr>";
                    for ($j = 5; $j < $objPHPExcel->getSheet()->getHighestRow(); $j++)
                    {
                        $valueName = $objPHPExcel->getSheet()->getCellByColumnAndRow(1, $j)->getFormattedValue();
                        $valueTotal = $objPHPExcel->getSheet()->getCellByColumnAndRow($i, $j)->getFormattedValue();
                        $valueTotalAvailable = $objPHPExcel->getSheet()->getCellByColumnAndRow($i + 1, $j)->getFormattedValue();
                        if ($valueTotal != 0 || $valueTotalAvailable != 0)
                        {
                            $nodcurrent = $xmlResult->addChild("quantity", "");
                            $nodcurrent->addAttribute("type", $valueName);
                            $nodcurrent->addAttribute("total", $valueTotal);
                            $nodcurrent->addAttribute("totalavailable", $valueTotalAvailable);

                            $htmlData = $htmlData . "<tr><td>{$valueName}</td><td>{$valueTotalAvailable}</td><td>{$valueTotal}</td></tr>";
                        }
                    }
                    $htmlData = $htmlData . "</table>";
                    break;
                }
            }
            echo $htmlData;

            //header("Content-type: text/xml");
            //echo $xmlResult->asXML();
        }
    }

    function getAllStocks()
    {
        echo "<div style='display: block;'>";
        getStocks(RAL);
        getStocks(RR);
        getStocks(ZN);
        echo "</div>";
    }

    getAllStocks();
    //getStocksXlsFromEmail();
?>