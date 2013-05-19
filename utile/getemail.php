<?php
error_reporting(E_ALL);

function trace($output)
{
  // print $output; 
}

function getRezervariEmail()
{
    $mailbox = "{imap.gmail.com:993/imap/ssl}INBOX";
	$username = "florika.lupu";
	$password = "Ionel@#3";
	$mailStream = imap_open($mailbox, $username, $password)
	or
	die('Cannot connect to Gmail:'.print_r(imap_errors()));
	$date = date("d M Y", strToTime("-7 days"));//strToTime("0 days") time()
	$criteria = 'SUBJECT "Solduri" FROM "adistudio92@mail.ru" SINCE "'.$date.'"';
	$emails = imap_search($mailStream, $criteria, SE_FREE, "UTF-8");
    
	if($emails)
	{
		rsort($emails);
        $emailCount = 1;//count($emails);
        for ($i=0; $i < $emailCount; $i++)
		{
		    $overview = imap_fetch_overview($mailStream, $emails[$i], 0);
			$structure = imap_fetchstructure($mailStream, $emails[$i]);
			
			trace ("<p>{$overview[0]->date}</p><p>");
			
			if(isset($structure->parts) && count($structure->parts))
			{
				for($j = 0; $j < count($structure->parts); $j++)
				{
				    $attachmentName = null;
					
					if($structure->parts[$j]->ifparameters)
					{
						foreach($structure->parts[$j]->parameters as $object)
						{
							if(strtolower($object->attribute) == 'name')
							{
							    $attachmentName = $object->value;
							}
						}
					}

					if($attachmentName != null)
					{
					    $decodedAttachmentData = null;
						$attachmentData = imap_fetchbody($mailStream, $emails[$i], $j+1);
						trace ("<span>{$attachmentName}</span> [Save, ");
                        $file = new SplFileObject($attachmentName, 'w+');
    
                        if ($file->isWritable() == false)
                        {
                            chmod($attachmentName, 0777);
                        }
                        
						switch ($structure->parts[$i]->encoding)
						{
						    /* 0 = 7BIT encoding */
							case 0:
								{
									$decodedAttachmentData = base64_decode($attachmentData);
                                    break;
								}
							case 1:
								{
									trace ("<p>8BIT</p>");
									break;
								}
							case 2:
								{
									trace ("<p>BINARY</p>");
									break;
								}
								/* 3 = BASE64 encoding */
							case 3:
								{
                                    $decodedAttachmentData = base64_decode($attachmentData);
                                    break;
								}
								/* 4 = QUOTED-PRINTABLE encoding */
							case 4:
								{
									$decodedAttachmentData = quoted_printable_decode($attachmentData);
									break;
								}
							case 5:
								{
									trace ("<p>OTHER</p>");
									break;
								}
						}
                        if ($decodedAttachmentData != null) {
                            $written = $file->fwrite($decodedAttachmentData);
                            trace ("Saved {$written} bytes");
                        }        
                        trace ("] ");
					}
				}
			}
            trace ("</p>");
		}
	}
	else
	{
		trace ("Email not found at $date");
	}
	/* close the connection */
	imap_close($mailStream);
}

getRezervariEmail();
?>