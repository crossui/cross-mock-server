const mimes = [
    { "label": ".323", "value": "text/h323" },
    { "label": ".3gp", "value": "video/3gpp" },
    { "label": ".aab", "value": "application/x-authoware-bin" },
    { "label": ".aam", "value": "application/x-authoware-map" },
    { "label": ".aas", "value": "application/x-authoware-seg" },
    { "label": ".acx", "value": "application/internet-property-stream" },
    { "label": ".ai", "value": "application/postscript" },
    { "label": ".aif", "value": "audio/x-aiff" },
    { "label": ".aifc", "value": "audio/x-aiff" },
    { "label": ".aiff", "value": "audio/x-aiff" },
    { "label": ".als", "value": "audio/X-Alpha5" },
    { "label": ".amc", "value": "application/x-mpeg" },
    { "label": ".ani", "value": "application/octet-stream" },
    { "label": ".apk", "value": "application/vnd.android.package-archive" },
    { "label": ".asc", "value": "text/plain" },
    { "label": ".asd", "value": "application/astound" },
    { "label": ".asf", "value": "video/x-ms-asf" },
    { "label": ".asn", "value": "application/astound" },
    { "label": ".asp", "value": "application/x-asap" },
    { "label": ".asr", "value": "video/x-ms-asf" },
    { "label": ".asx", "value": "video/x-ms-asf" },
    { "label": ".au", "value": "audio/basic" },
    { "label": ".avb", "value": "application/octet-stream" },
    { "label": ".avi", "value": "video/x-msvideo" },
    { "label": ".awb", "value": "audio/amr-wb" },
    { "label": ".axs", "value": "application/olescript" },
    { "label": ".bas", "value": "text/plain" },
    { "label": ".bcpio", "value": "application/x-bcpio" },
    { "label": ".bin ", "value": "application/octet-stream" },
    { "label": ".bld", "value": "application/bld" },
    { "label": ".bld2", "value": "application/bld2" },
    { "label": ".bmp", "value": "image/bmp" },
    { "label": ".bpk", "value": "application/octet-stream" },
    { "label": ".bz2", "value": "application/x-bzip2" },
    { "label": ".c", "value": "text/plain" },
    { "label": ".cal", "value": "image/x-cals" },
    { "label": ".cat", "value": "application/vnd.ms-pkiseccat" },
    { "label": ".ccn", "value": "application/x-cnc" },
    { "label": ".cco", "value": "application/x-cocoa" },
    { "label": ".cdf", "value": "application/x-cdf" },
    { "label": ".cer", "value": "application/x-x509-ca-cert" },
    { "label": ".cgi", "value": "magnus-internal/cgi" },
    { "label": ".chat", "value": "application/x-chat" },
    { "label": ".class", "value": "application/octet-stream" },
    { "label": ".clp", "value": "application/x-msclip" },
    { "label": ".cmx", "value": "image/x-cmx" },
    { "label": ".co", "value": "application/x-cult3d-object" },
    { "label": ".cod", "value": "image/cis-cod" },
    { "label": ".conf", "value": "text/plain" },
    { "label": ".cpio", "value": "application/x-cpio" },
    { "label": ".cpp", "value": "text/plain" },
    { "label": ".cpt", "value": "application/mac-compactpro" },
    { "label": ".crd", "value": "application/x-mscardfile" },
    { "label": ".crl", "value": "application/pkix-crl" },
    { "label": ".crt", "value": "application/x-x509-ca-cert" },
    { "label": ".csh", "value": "application/x-csh" },
    { "label": ".csm", "value": "chemical/x-csml" },
    { "label": ".csml", "value": "chemical/x-csml" },
    { "label": ".css", "value": "text/css" },
    { "label": ".cur", "value": "application/octet-stream" },
    { "label": ".dcm", "value": "x-lml/x-evm" },
    { "label": ".dcr", "value": "application/x-director" },
    { "label": ".dcx", "value": "image/x-dcx" },
    { "label": ".der", "value": "application/x-x509-ca-cert" },
    { "label": ".dhtml", "value": "text/html" },
    { "label": ".dir", "value": "application/x-director" },
    { "label": ".dll", "value": "application/x-msdownload" },
    { "label": ".dmg", "value": "application/octet-stream" },
    { "label": ".dms", "value": "application/octet-stream" },
    { "label": ".doc", "value": "application/msword" },
    { "label": ".docx", "value": "application/vnd.openxmlformats-officedocument.wordprocessingml.document" },
    { "label": ".dot", "value": "application/msword" },
    { "label": ".dvi", "value": "application/x-dvi" },
    { "label": ".dwf", "value": "drawing/x-dwf" },
    { "label": ".dwg", "value": "application/x-autocad" },
    { "label": ".dxf", "value": "application/x-autocad" },
    { "label": ".dxr", "value": "application/x-director" },
    { "label": ".ebk", "value": "application/x-expandedbook" },
    { "label": ".emb", "value": "chemical/x-embl-dl-nucleotide" },
    { "label": ".embl", "value": "chemical/x-embl-dl-nucleotide" },
    { "label": ".eps", "value": "application/postscript" },
    { "label": ".epub", "value": "application/epub+zip" },
    { "label": ".eri", "value": "image/x-eri" },
    { "label": ".es", "value": "audio/echospeech" },
    { "label": ".esl", "value": "audio/echospeech" },
    { "label": ".etc", "value": "application/x-earthtime" },
    { "label": ".etx", "value": "text/x-setext" },
    { "label": ".evm", "value": "x-lml/x-evm" },
    { "label": ".evy", "value": "application/envoy" },
    { "label": ".exe", "value": "application/octet-stream" },
    { "label": ".fh4", "value": "image/x-freehand" },
    { "label": ".fh5", "value": "image/x-freehand" },
    { "label": ".fhc", "value": "image/x-freehand" },
    { "label": ".fif", "value": "application/fractals" },
    { "label": ".flr", "value": "x-world/x-vrml" },
    { "label": ".flv", "value": "flv-application/octet-stream" },
    { "label": ".fm", "value": "application/x-maker" },
    { "label": ".fpx", "value": "image/x-fpx" },
    { "label": ".fvi", "value": "video/isivideo" },
    { "label": ".gau", "value": "chemical/x-gaussian-input" },
    { "label": ".gca", "value": "application/x-gca-compressed" },
    { "label": ".gdb", "value": "x-lml/x-gdb" },
    { "label": ".gif", "value": "image/gif" },
    { "label": ".gps", "value": "application/x-gps" },
    { "label": ".gtar", "value": "application/x-gtar" },
    { "label": ".gz", "value": "application/x-gzip" },
    { "label": ".h", "value": "text/plain" },
    { "label": ".hdf", "value": "application/x-hdf" },
    { "label": ".hdm", "value": "text/x-hdml" },
    { "label": ".hdml", "value": "text/x-hdml" },
    { "label": ".hlp", "value": "application/winhlp" },
    { "label": ".hqx", "value": "application/mac-binhex40" },
    { "label": ".hta", "value": "application/hta" },
    { "label": ".htc", "value": "text/x-component" },
    { "label": ".htm", "value": "text/html" },
    { "label": ".html", "value": "text/html" },
    { "label": ".hts", "value": "text/html" },
    { "label": ".htt", "value": "text/webviewhtml" },
    { "label": ".ice", "value": "x-conference/x-cooltalk" },
    { "label": ".ico", "value": "image/x-icon" },
    { "label": ".ief", "value": "image/ief" },
    { "label": ".ifm", "value": "image/gif" },
    { "label": ".ifs", "value": "image/ifs" },
    { "label": ".iii", "value": "application/x-iphone" },
    { "label": ".imy", "value": "audio/melody" },
    { "label": ".ins", "value": "application/x-internet-signup" },
    { "label": ".ips", "value": "application/x-ipscript" },
    { "label": ".ipx", "value": "application/x-ipix" },
    { "label": ".isp", "value": "application/x-internet-signup" },
    { "label": ".it", "value": "audio/x-mod" },
    { "label": ".itz", "value": "audio/x-mod" },
    { "label": ".ivr", "value": "i-world/i-vrml" },
    { "label": ".j2k", "value": "image/j2k" },
    { "label": ".jad", "value": "text/vnd.sun.j2me.app-descriptor" },
    { "label": ".jam", "value": "application/x-jam" },
    { "label": ".jar", "value": "application/java-archive" },
    { "label": ".java", "value": "text/plain" },
    { "label": ".jfif", "value": "image/pipeg" },
    { "label": ".jnlp", "value": "application/x-java-jnlp-file" },
    { "label": ".jpe", "value": "image/jpeg" },
    { "label": ".jpeg", "value": "image/jpeg" },
    { "label": ".jpg", "value": "image/jpeg" },
    { "label": ".jpz", "value": "image/jpeg" },
    { "label": ".js", "value": "application/x-javascript" },
    { "label": ".jwc", "value": "application/jwc" },
    { "label": ".kjx", "value": "application/x-kjx" },
    { "label": ".lak", "value": "x-lml/x-lak" },
    { "label": ".latex", "value": "application/x-latex" },
    { "label": ".lcc", "value": "application/fastman" },
    { "label": ".lcl", "value": "application/x-digitalloca" },
    { "label": ".lcr", "value": "application/x-digitalloca" },
    { "label": ".lgh", "value": "application/lgh" },
    { "label": ".lha", "value": "application/octet-stream" },
    { "label": ".lml", "value": "x-lml/x-lml" },
    { "label": ".lmlpack", "value": "x-lml/x-lmlpack" },
    { "label": ".log", "value": "text/plain" },
    { "label": ".lsf", "value": "video/x-la-asf" },
    { "label": ".lsx", "value": "video/x-la-asf" },
    { "label": ".lzh", "value": "application/octet-stream" },
    { "label": ".m13", "value": "application/x-msmediaview" },
    { "label": ".m14", "value": "application/x-msmediaview" },
    { "label": ".m15", "value": "audio/x-mod" },
    { "label": ".m3u", "value": "audio/x-mpegurl" },
    { "label": ".m3url", "value": "audio/x-mpegurl" },
    { "label": ".m4a", "value": "audio/mp4a-latm" },
    { "label": ".m4b", "value": "audio/mp4a-latm" },
    { "label": ".m4p", "value": "audio/mp4a-latm" },
    { "label": ".m4u", "value": "video/vnd.mpegurl" },
    { "label": ".m4v", "value": "video/x-m4v" },
    { "label": ".ma1", "value": "audio/ma1" },
    { "label": ".ma2", "value": "audio/ma2" },
    { "label": ".ma3", "value": "audio/ma3" },
    { "label": ".ma5", "value": "audio/ma5" },
    { "label": ".man", "value": "application/x-troff-man" },
    { "label": ".map", "value": "magnus-internal/imagemap" },
    { "label": ".mbd", "value": "application/mbedlet" },
    { "label": ".mct", "value": "application/x-mascot" },
    { "label": ".mdb", "value": "application/x-msaccess" },
    { "label": ".mdz", "value": "audio/x-mod" },
    { "label": ".me", "value": "application/x-troff-me" },
    { "label": ".mel", "value": "text/x-vmel" },
    { "label": ".mht", "value": "message/rfc822" },
    { "label": ".mhtml", "value": "message/rfc822" },
    { "label": ".mi", "value": "application/x-mif" },
    { "label": ".mid", "value": "audio/mid" },
    { "label": ".midi", "value": "audio/midi" },
    { "label": ".mif", "value": "application/x-mif" },
    { "label": ".mil", "value": "image/x-cals" },
    { "label": ".mio", "value": "audio/x-mio" },
    { "label": ".mmf", "value": "application/x-skt-lbs" },
    { "label": ".mng", "value": "video/x-mng" },
    { "label": ".mny", "value": "application/x-msmoney" },
    { "label": ".moc", "value": "application/x-mocha" },
    { "label": ".mocha", "value": "application/x-mocha" },
    { "label": ".mod", "value": "audio/x-mod" },
    { "label": ".mof", "value": "application/x-yumekara" },
    { "label": ".mol", "value": "chemical/x-mdl-molfile" },
    { "label": ".mop", "value": "chemical/x-mopac-input" },
    { "label": ".mov", "value": "video/quicktime" },
    { "label": ".movie", "value": "video/x-sgi-movie" },
    { "label": ".mp2", "value": "video/mpeg" },
    { "label": ".mp3", "value": "audio/mpeg" },
    { "label": ".mp4", "value": "video/mp4" },
    { "label": ".mpa", "value": "video/mpeg" },
    { "label": ".mpc", "value": "application/vnd.mpohun.certificate" },
    { "label": ".mpe", "value": "video/mpeg" },
    { "label": ".mpeg", "value": "video/mpeg" },
    { "label": ".mpg", "value": "video/mpeg" },
    { "label": ".mpg4", "value": "video/mp4" },
    { "label": ".mpga", "value": "audio/mpeg" },
    { "label": ".mpn", "value": "application/vnd.mophun.application" },
    { "label": ".mpp", "value": "application/vnd.ms-project" },
    { "label": ".mps", "value": "application/x-mapserver" },
    { "label": ".mpv2", "value": "video/mpeg" },
    { "label": ".mrl", "value": "text/x-mrml" },
    { "label": ".mrm", "value": "application/x-mrm" },
    { "label": ".ms", "value": "application/x-troff-ms" },
    { "label": ".msg", "value": "application/vnd.ms-outlook" },
    { "label": ".mts", "value": "application/metastream" },
    { "label": ".mtx", "value": "application/metastream" },
    { "label": ".mtz", "value": "application/metastream" },
    { "label": ".mvb", "value": "application/x-msmediaview" },
    { "label": ".mzv", "value": "application/metastream" },
    { "label": ".nar", "value": "application/zip" },
    { "label": ".nbmp", "value": "image/nbmp" },
    { "label": ".nc", "value": "application/x-netcdf" },
    { "label": ".ndb", "value": "x-lml/x-ndb" },
    { "label": ".ndwn", "value": "application/ndwn" },
    { "label": ".nif", "value": "application/x-nif" },
    { "label": ".nmz", "value": "application/x-scream" },
    { "label": ".nokia-op-logo", "value": "image/vnd.nok-oplogo-color" },
    { "label": ".npx", "value": "application/x-netfpx" },
    { "label": ".nsnd", "value": "audio/nsnd" },
    { "label": ".nva", "value": "application/x-neva1" },
    { "label": ".nws", "value": "message/rfc822" },
    { "label": ".oda", "value": "application/oda" },
    { "label": ".ogg", "value": "audio/ogg" },
    { "label": ".oom", "value": "application/x-AtlasMate-Plugin" },
    { "label": ".p10", "value": "application/pkcs10" },
    { "label": ".p12", "value": "application/x-pkcs12" },
    { "label": ".p7b", "value": "application/x-pkcs7-certificates" },
    { "label": ".p7c", "value": "application/x-pkcs7-mime" },
    { "label": ".p7m", "value": "application/x-pkcs7-mime" },
    { "label": ".p7r", "value": "application/x-pkcs7-certreqresp" },
    { "label": ".p7s", "value": "application/x-pkcs7-signature" },
    { "label": ".pac", "value": "audio/x-pac" },
    { "label": ".pae", "value": "audio/x-epac" },
    { "label": ".pan", "value": "application/x-pan" },
    { "label": ".pbm", "value": "image/x-portable-bitmap" },
    { "label": ".pcx", "value": "image/x-pcx" },
    { "label": ".pda", "value": "image/x-pda" },
    { "label": ".pdb", "value": "chemical/x-pdb" },
    { "label": ".pdf", "value": "application/pdf" },
    { "label": ".pfr", "value": "application/font-tdpfr" },
    { "label": ".pfx", "value": "application/x-pkcs12" },
    { "label": ".pgm", "value": "image/x-portable-graymap" },
    { "label": ".pict", "value": "image/x-pict" },
    { "label": ".pko", "value": "application/ynd.ms-pkipko" },
    { "label": ".pm", "value": "application/x-perl" },
    { "label": ".pma", "value": "application/x-perfmon" },
    { "label": ".pmc", "value": "application/x-perfmon" },
    { "label": ".pmd", "value": "application/x-pmd" },
    { "label": ".pml", "value": "application/x-perfmon" },
    { "label": ".pmr", "value": "application/x-perfmon" },
    { "label": ".pmw", "value": "application/x-perfmon" },
    { "label": ".png", "value": "image/png" },
    { "label": ".pnm", "value": "image/x-portable-anymap" },
    { "label": ".pnz", "value": "image/png" },
    { "label": ".pot},", "value": "application/vnd.ms-powerpoint" },
    { "label": ".ppm", "value": "image/x-portable-pixmap" },
    { "label": ".pps", "value": "application/vnd.ms-powerpoint" },
    { "label": ".ppt", "value": "application/vnd.ms-powerpoint" },
    { "label": ".pptx", "value": "application/vnd.openxmlformats-officedocument.presentationml.presentation" },
    { "label": ".pqf", "value": "application/x-cprplayer" },
    { "label": ".pqi", "value": "application/cprplayer" },
    { "label": ".prc", "value": "application/x-prc" },
    { "label": ".prf", "value": "application/pics-rules" },
    { "label": ".prop", "value": "text/plain" },
    { "label": ".proxy", "value": "application/x-ns-proxy-autoconfig" },
    { "label": ".ps", "value": "application/postscript" },
    { "label": ".ptlk", "value": "application/listenup" },
    { "label": ".pub", "value": "application/x-mspublisher" },
    { "label": ".pvx", "value": "video/x-pv-pvx" },
    { "label": ".qcp", "value": "audio/vnd.qcelp" },
    { "label": ".qt", "value": "video/quicktime" },
    { "label": ".qti", "value": "image/x-quicktime" },
    { "label": ".qtif", "value": "image/x-quicktime" },
    { "label": ".r3t", "value": "text/vnd.rn-realtext3d" },
    { "label": ".ra", "value": "audio/x-pn-realaudio" },
    { "label": ".ram", "value": "audio/x-pn-realaudio" },
    { "label": ".rar", "value": "application/octet-stream" },
    { "label": ".ras", "value": "image/x-cmu-raster" },
    { "label": ".rc", "value": "text/plain" },
    { "label": ".rdf", "value": "application/rdf+xml" },
    { "label": ".rf", "value": "image/vnd.rn-realflash" },
    { "label": ".rgb", "value": "image/x-rgb" },
    { "label": ".rlf", "value": "application/x-richlink" },
    { "label": ".rm", "value": "audio/x-pn-realaudio" },
    { "label": ".rmf", "value": "audio/x-rmf" },
    { "label": ".rmi", "value": "audio/mid" },
    { "label": ".rmm", "value": "audio/x-pn-realaudio" },
    { "label": ".rmvb", "value": "audio/x-pn-realaudio" },
    { "label": ".rnx", "value": "application/vnd.rn-realplayer" },
    { "label": ".roff", "value": "application/x-troff" },
    { "label": ".rp", "value": "image/vnd.rn-realpix" },
    { "label": ".rpm", "value": "audio/x-pn-realaudio-plugin" },
    { "label": ".rt", "value": "text/vnd.rn-realtext" },
    { "label": ".rte", "value": "x-lml/x-gps" },
    { "label": ".rtf", "value": "application/rtf" },
    { "label": ".rtg", "value": "application/metastream" },
    { "label": ".rtx", "value": "text/richtext" },
    { "label": ".rv", "value": "video/vnd.rn-realvideo" },
    { "label": ".rwc", "value": "application/x-rogerwilco" },
    { "label": ".s3m", "value": "audio/x-mod" },
    { "label": ".s3z", "value": "audio/x-mod" },
    { "label": ".sca", "value": "application/x-supercard" },
    { "label": ".scd", "value": "application/x-msschedule" },
    { "label": ".sct", "value": "text/scriptlet" },
    { "label": ".sdf", "value": "application/e-score" },
    { "label": ".sea", "value": "application/x-stuffit" },
    { "label": ".setpay", "value": "application/set-payment-initiation" },
    { "label": ".setreg", "value": "application/set-registration-initiation" },
    { "label": ".sgm", "value": "text/x-sgml" },
    { "label": ".sgml", "value": "text/x-sgml" },
    { "label": ".sh", "value": "application/x-sh" },
    { "label": ".shar", "value": "application/x-shar" },
    { "label": ".shtml", "value": "magnus-internal/parsed-html" },
    { "label": ".shw", "value": "application/presentations" },
    { "label": ".si6", "value": "image/si6" },
    { "label": ".si7", "value": "image/vnd.stiwap.sis" },
    { "label": ".si9", "value": "image/vnd.lgtwap.sis" },
    { "label": ".sis", "value": "application/vnd.symbian.install" },
    { "label": ".sit", "value": "application/x-stuffit" },
    { "label": ".skd", "value": "application/x-Koan" },
    { "label": ".skm", "value": "application/x-Koan" },
    { "label": ".skp", "value": "application/x-Koan" },
    { "label": ".skt", "value": "application/x-Koan" },
    { "label": ".slc", "value": "application/x-salsa" },
    { "label": ".smd", "value": "audio/x-smd" },
    { "label": ".smi", "value": "application/smil" },
    { "label": ".smil", "value": "application/smil" },
    { "label": ".smp", "value": "application/studiom" },
    { "label": ".smz", "value": "audio/x-smd" },
    { "label": ".snd", "value": "audio/basic" },
    { "label": ".spc", "value": "application/x-pkcs7-certificates" },
    { "label": ".spl", "value": "application/futuresplash" },
    { "label": ".spr", "value": "application/x-sprite" },
    { "label": ".sprite", "value": "application/x-sprite" },
    { "label": ".sdp", "value": "application/sdp" },
    { "label": ".spt", "value": "application/x-spt" },
    { "label": ".src", "value": "application/x-wais-source" },
    { "label": ".sst", "value": "application/vnd.ms-pkicertstore" },
    { "label": ".stk", "value": "application/hyperstudio" },
    { "label": ".stl", "value": "application/vnd.ms-pkistl" },
    { "label": ".stm", "value": "text/html" },
    { "label": ".svg", "value": "image/svg+xml" },
    { "label": ".sv4cpio", "value": "application/x-sv4cpio" },
    { "label": ".sv4crc", "value": "application/x-sv4crc" },
    { "label": ".svf", "value": "image/vnd" },
    { "label": ".svh", "value": "image/svh" },
    { "label": ".svr", "value": "x-world/x-svr" },
    { "label": ".swf", "value": "application/x-shockwave-flash" },
    { "label": ".swfl", "value": "application/x-shockwave-flash" },
    { "label": ".t", "value": "application/x-troff" },
    { "label": ".tad", "value": "application/octet-stream" },
    { "label": ".talk", "value": "text/x-speech" },
    { "label": ".tar", "value": "application/x-tar" },
    { "label": ".taz", "value": "application/x-tar" },
    { "label": ".tbp", "value": "application/x-timbuktu" },
    { "label": ".tbt", "value": "application/x-timbuktu" },
    { "label": ".tcl", "value": "application/x-tcl" },
    { "label": ".tex", "value": "application/x-tex" },
    { "label": ".texi", "value": "application/x-texinfo" },
    { "label": ".texinfo", "value": "application/x-texinfo" },
    { "label": ".tgz", "value": "application/x-compressed" },
    { "label": ".thm", "value": "application/vnd.eri.thm" },
    { "label": ".tif", "value": "image/tiff" },
    { "label": ".tiff", "value": "image/tiff" },
    { "label": ".tki", "value": "application/x-tkined" },
    { "label": ".tkined", "value": "application/x-tkined" },
    { "label": ".toc", "value": "application/toc" },
    { "label": ".toy", "value": "image/toy" },
    { "label": ".tr", "value": "application/x-troff" },
    { "label": ".trk", "value": "x-lml/x-gps" },
    { "label": ".trm", "value": "application/x-msterminal" },
    { "label": ".tsi", "value": "audio/tsplayer" },
    { "label": ".tsp", "value": "application/dsptype" },
    { "label": ".tsv", "value": "text/tab-separated-values" },
    { "label": ".ttf", "value": "application/octet-stream" },
    { "label": ".ttz", "value": "application/t-time" },
    { "label": ".txt", "value": "text/plain" },
    { "label": ".uls", "value": "text/iuls" },
    { "label": ".ult", "value": "audio/x-mod" },
    { "label": ".ustar", "value": "application/x-ustar" },
    { "label": ".uu", "value": "application/x-uuencode" },
    { "label": ".uue", "value": "application/x-uuencode" },
    { "label": ".vcd", "value": "application/x-cdlink" },
    { "label": ".vcf", "value": "text/x-vcard" },
    { "label": ".vdo", "value": "video/vdo" },
    { "label": ".vib", "value": "audio/vib" },
    { "label": ".viv", "value": "video/vivo" },
    { "label": ".vivo", "value": "video/vivo" },
    { "label": ".vmd", "value": "application/vocaltec-media-desc" },
    { "label": ".vmf", "value": "application/vocaltec-media-file" },
    { "label": ".vmi", "value": "application/x-dreamcast-vms-info" },
    { "label": ".vms", "value": "application/x-dreamcast-vms" },
    { "label": ".vox", "value": "audio/voxware" },
    { "label": ".vqe", "value": "audio/x-twinvq-plugin" },
    { "label": ".vqf", "value": "audio/x-twinvq" },
    { "label": ".vql", "value": "audio/x-twinvq" },
    { "label": ".vre", "value": "x-world/x-vream" },
    { "label": ".vrml", "value": "x-world/x-vrml" },
    { "label": ".vrt", "value": "x-world/x-vrt" },
    { "label": ".vrw", "value": "x-world/x-vream" },
    { "label": ".vts", "value": "workbook/formulaone" },
    { "label": ".wav", "value": "audio/x-wav" },
    { "label": ".wax", "value": "audio/x-ms-wax" },
    { "label": ".wbmp", "value": "image/vnd.wap.wbmp" },
    { "label": ".wcm", "value": "application/vnd.ms-works" },
    { "label": ".wdb", "value": "application/vnd.ms-works" },
    { "label": ".web", "value": "application/vnd.xara" },
    { "label": ".wi", "value": "image/wavelet" },
    { "label": ".wis", "value": "application/x-InstallShield" },
    { "label": ".wks", "value": "application/vnd.ms-works" },
    { "label": ".wm", "value": "video/x-ms-wm" },
    { "label": ".wma", "value": "audio/x-ms-wma" },
    { "label": ".wmd", "value": "application/x-ms-wmd" },
    { "label": ".wmf", "value": "application/x-msmetafile" },
    { "label": ".wml", "value": "text/vnd.wap.wml" },
    { "label": ".wmlc", "value": "application/vnd.wap.wmlc" },
    { "label": ".wmls", "value": "text/vnd.wap.wmlscript" },
    { "label": ".wmlsc", "value": "application/vnd.wap.wmlscriptc" },
    { "label": ".wmlscript", "value": "text/vnd.wap.wmlscript" },
    { "label": ".wmv", "value": "audio/x-ms-wmv" },
    { "label": ".wmx", "value": "video/x-ms-wmx" },
    { "label": ".wmz", "value": "application/x-ms-wmz" },
    { "label": ".wpng", "value": "image/x-up-wpng" },
    { "label": ".wps", "value": "application/vnd.ms-works" },
    { "label": ".wpt", "value": "x-lml/x-gps" },
    { "label": ".wri", "value": "application/x-mswrite" },
    { "label": ".wrl", "value": "x-world/x-vrml" },
    { "label": ".wrz", "value": "x-world/x-vrml" },
    { "label": ".ws", "value": "text/vnd.wap.wmlscript" },
    { "label": ".wsc", "value": "application/vnd.wap.wmlscriptc" },
    { "label": ".wv", "value": "video/wavelet" },
    { "label": ".wvx", "value": "video/x-ms-wvx" },
    { "label": ".wxl", "value": "application/x-wxl" },
    { "label": ".x-gzip", "value": "application/x-gzip" },
    { "label": ".xaf", "value": "x-world/x-vrml" },
    { "label": ".xar", "value": "application/vnd.xara" },
    { "label": ".xbm", "value": "image/x-xbitmap" },
    { "label": ".xdm", "value": "application/x-xdma" },
    { "label": ".xdma", "value": "application/x-xdma" },
    { "label": ".xdw", "value": "application/vnd.fujixerox.docuworks" },
    { "label": ".xht", "value": "application/xhtml+xml" },
    { "label": ".xhtm", "value": "application/xhtml+xml" },
    { "label": ".xhtml", "value": "application/xhtml+xml" },
    { "label": ".xla", "value": "application/vnd.ms-excel" },
    { "label": ".xlc", "value": "application/vnd.ms-excel" },
    { "label": ".xll", "value": "application/x-excel" },
    { "label": ".xlm", "value": "application/vnd.ms-excel" },
    { "label": ".xls", "value": "application/vnd.ms-excel" },
    { "label": ".xlsx", "value": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
    { "label": ".xlt", "value": "application/vnd.ms-excel" },
    { "label": ".xlw", "value": "application/vnd.ms-excel" },
    { "label": ".xm", "value": "audio/x-mod" },
    { "label": ".xml", "value": "application/xml" },
    { "label": ".xmz", "value": "audio/x-mod" },
    { "label": ".xof", "value": "x-world/x-vrml" },
    { "label": ".xpi", "value": "application/x-xpinstall" },
    { "label": ".xpm", "value": "image/x-xpixmap" },
    { "label": ".xsit", "value": "text/xml" },
    { "label": ".xsl", "value": "text/xml" },
    { "label": ".xul", "value": "text/xul" },
    { "label": ".xwd", "value": "image/x-xwindowdump" },
    { "label": ".xyz", "value": "chemical/x-pdb" },
    { "label": ".yz1", "value": "application/x-yz1" },
    { "label": ".z", "value": "application/x-compress" },
    { "label": ".zac", "value": "application/x-zaurus-zac" },
    { "label": ".zip", "value": "application/zip" },
    {
        "label": ".json",
        "value": "application/json"
    }
]

export default mimes;