<?php
error_reporting(E_ALL);

function getRezervariEmail()
{
	$mailbox = "{imap.gmail.com:993/imap/ssl}INBOX";
	$username = "florika.lupu";
	$password = "Ionel@#3";
	$mailStream = @imap_open($mailbox, $username, $password)
	or
	die('Cannot connect to Gmail:'.print_r(imap_errors()));
	$date = date("d M Y", strToTime("0 days"));//strToTime("0 days") time()
	$criteria = 'SUBJECT "solduri" FROM "adistudio92@mail.ru" SINCE "'.$date.'"';
	/* grab emails */
	$emails = imap_search($mailStream, $criteria, SE_FREE, "UTF-8");
    
	/* if emails are returned, cycle through each... */
	if($emails)
	{
		/* begin output var */
		$output = '';
		/* put the newest emails on top */
		rsort($emails);
		/* for every email... */
		foreach($emails as $email_number)
		{
			/* get information specific to this email */
			$overview = imap_fetch_overview($mailStream,$email_number,0);
			/* get mail message */
			$message = imap_fetchbody($mailStream,$email_number,2);
			/* code for atachements*/
			/* get mail structure */
			$structure = imap_fetchstructure($mailStream, $email_number);

			$attachments = array();
			/* if any attachments found... */
			print "Verify attachement ".isset($structure->parts)." ".count($structure->parts);

			if(isset($structure->parts) && count($structure->parts))
			{
				for($i = 0; $i < count($structure->parts); $i++)
				{
					$attachments[$i] = array(
							'is_attachment' => false,
							'filename' => '',
							'name' => '',
							'attachment' => ''
					);

					if($structure->parts[$i]->ifdparameters)
					{
						foreach($structure->parts[$i]->dparameters as $object)
						{
							if(strtolower($object->attribute) == 'filename')
							{
								$attachments[$i]['is_attachment'] = true;
								$attachments[$i]['filename'] = $object->value;
							}
						}
					}

					if($structure->parts[$i]->ifparameters)
					{
						foreach($structure->parts[$i]->parameters as $object)
						{
							if(strtolower($object->attribute) == 'name')
							{
								$attachments[$i]['is_attachment'] = true;
								$attachments[$i]['name'] = $object->value;
							}
						}
					}

					if($attachments[$i]['is_attachment'])
					{
						$attachments[$i]['attachment'] = imap_fetchbody($mailStream, $email_number, $i+1);
						switch ($structure->parts[$i]->encoding)
						{
							case 0:
								{
									print "<p>7BIT</p>";
									break;
								}
							case 1:
								{
									print "<p>8BIT</p>";
									break;
								}
							case 2:
								{
									print "<p>BINARY</p>";
									break;
								}
								/* 3 = BASE64 encoding */
							case 3:
								{
									print "<p>BASE64</p>";
									$attachments[$i]['attachment'] = base64_decode($attachments[$i]['attachment']);
									break;
								}
								/* 4 = QUOTED-PRINTABLE encoding */
							case 4:
								{
									print "<p>QUOTED-PRINTABLE</p>";
									$attachments[$i]['attachment'] = quoted_printable_decode($attachments[$i]['attachment']);
									break;
								}
							case 5:
								{
									print "<p>OTHER</p>";
									break;
								}
						}
					}
				}
			}
			/* iterate through each attachment and save it */
			foreach($attachments as $attachment)
			{
				print "<p>{$attachment['is_attachment']}</p>";
				if($attachment['is_attachment'] == 1)
				{
					$filename = $attachment['name'];

					if(empty($filename))
					{
						$filename = $attachment['filename'];
					}

					if(empty($filename))
					{
						$filename = time() . ".dat";
					}

					/* prefix the email number to the filename in case two emails
					 * have the attachment with the same file name.
					*/
					//                 $file = new SplFileObject($email_number."-".$filename, 'w+');
					print "<p>Save :".$filename."</p>";
					$file = new SplFileObject($filename, 'w+');

					if ($file->isWritable() == false)
					{
						chmod($filename, 0777);
					}

					$written = $file->fwrite($attachment['attachment']);
					print "<p>Saved ".$email_number . "-" . $filename." bytes:".$written."</p>";
				}
			}
		}
	}
	else
	{
		echo "Email not found at $date";
	}
	/* close the connection */
	imap_close($mailStream);
}

getRezervariEmail();
?>