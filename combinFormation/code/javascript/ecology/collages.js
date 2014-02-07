// @package creating.js.ecology
/**
 * Maintains a JavaScript "database" of collage seed sets, and offers
 a function -- namedCollage -- that recalls them by key, generating
 * all appropriate HTML for invocation of CollageMachine.
 * 
 * Copyright 1998-2002 by Andruid Kerne.  All rights reserved.
 */
var collages = new Array();

collages["exploration"]	=
  new Array("<crawler action=&quot;traversable&quot; url=&quot;www.discovery.com&quot;/>",
 "<document url=&quot;http://dsc.discovery.com/guides/planetearth/planetearth.html&quot;/>",
 "<document url=&quot;http://animal.discovery.com/guides/animals/animals.html&quot;/>",
 "<document url=&quot;http://dsc.discovery.com/guides/space/space.html&quot;/>",
 "<document url=&quot;http://dsc.discovery.com/guides/history/history.html&quot;/>",
 "<document url=&quot;http://tlc.discovery.com/guides/planetearth/planetearth.html&quot;/>",
 "<document url=&quot;http://www.nationalgeographic.com&quot;/>",
 "<document justcrawl=&quot;true&quot; url=&quot;http://www.nationalgeographic.com/features/index.html&quot;/>",
 "<document url=&quot;http://heritage.stsci.edu/public/gallery/galindex.html&quot;/>"
);

collages["911"]	= new
Array(
 "<crawler action=&quot;untraversable&quot; url=&quot;http://transcripts.cnn.com/&quot;/>",
 "<crawler action=&quot;traversable&quot; url=&quot;http://www.nytimes.com/images&quot;/>",
 "<crawler action=&quot;traversable&quot; url=&quot;http://www.nytimes.com/library/national/&quot;/>",
 "<crawler action=&quot;traversable&quot; url=&quot;http://www.nytimes.com/slideshow/&quot;/>",
 "<crawler action=&quot;traversable&quot; url=&quot;http://nytimes.com/slideshow/&quot;/>",
 "<document url=&quot;http://www.nytimes.com/slideshow/2001/09/11/nyregion/11people.slideshow_1.html&quot;/>",
 "<document url=&quot;http://www.nytimes.com/slideshow/2001/09/12/nyregion/12RESCUE.slideshow_1.html&quot;/>",
 "<document url=&quot;http://www.cnn.com/interactive/us/0109/terror/content5.ny.html&quot;/>",
 "<document url=&quot;http://www.nytimes.com/slideshow/2001/09/13/nyregion/12RESCUE-SCENE-S_1.html&quot;/>",
 "<document url=&quot;http://nytimes.com/slideshow/2001/09/20/12DEST.9.slideshow_1.html&quot;/>",
 "<document url=&quot;http://www.nytimes.com/slideshow/2001/09/11/national/11CND-dc.slideshow_1.html&quot;/>",

 "<document url=&quot;http://www.thing.net/~humbot/archive/&quot;/>",
 "<document justcrawl=&quot;true&quot; url=&quot;http://www.nytimes.com/2001/09/25/national/25MULTIMEDIA-INDEX.html?pagewanted=print&quot;/>",
 "<document url=&quot;http://www.creativetime.org/towers/&quot;/>",
 "<document url=&quot;http://www.citylore.org/exhibits_misshome.html&quot;/>",
 "<document url=&quot;http://outtacontext.com/ribbon/&quot;/>",
 "<document url=&quot;http://www.euronet.nl/users/shay/halfmast/&quot;/>",
 "<document url=&quot;http://www.cnn.com/SPECIALS/2001/trade.center/gallery/unimaginable.html&quot;/>",
 "<document url=&quot;http://www.cnn.com/interactive/us/0109/terror/content1.ny2.html&quot;/>",
 "<document url=&quot;http://www.cnn.com/interactive/us/0109/terror/content1.dc.html&quot;/>",
 "<document url=&quot;http://www.nytimes.com/images/misc/.1banslideshow2.gif&quot;/>",
 "<document justmedia=&quot;true&quot; url=&quot;http://www.geocities.com/newsgrist/WTC_tv.html&quot;/>",
 "<document justmedia=&quot;true&quot; url=&quot;http://www.geocities.com/newsgrist/WTC_aftermath_eve.html&quot;/>",
 "<document justmedia=&quot;true&quot; url=&quot;http://www.graphpaper.com/&quot;/>",
 "<document justmedia=&quot;true&quot; url=&quot;http://dc.indymedia.org/front.php3?article_id=12755&amp;amp;group=webcast&quot;/>",
 "<document justmedia=&quot;true&quot; url=&quot;http://nyc.indymedia.org/front.php3?article_id=10681&quot;/>",
 "<document justmedia=&quot;true&quot; url=&quot;http://www.demon.co.uk/momus/thought140901.html&quot;/>",
 "<document url=&quot;http://news.mpr.org/features/200109/11_newsroom_terrorist/slideshow/ap_nycslides.html&quot;/>",
//"http://artistsnetwork.org",
 "<document url=&quot;http://www.bethcarey.com/wtc/09-11-01tues/01.html&quot;/>",
 "<document url=&quot;http://www.nytimes.com/slideshow/2001/09/11/nyregion/11tradecenter.slideshow_1.html&quot;/>",
 "<document url=&quot;http://www.mcny.org/virtunsq/virtu1.htm&quot;/>",
"<document justmedia=&quot;true&quot; url=&quot;http://www.lightningfield.com/archive/2001_09_09_archive.html&quot;/>",
 "<document url=&quot;http://911-groundzero.org/wow/gallery/&quot;/>",
 "<document justmedia=&quot;true&quot; url=&quot;http://www.geocities.com/newsgrist/WTC_aftermath.html&quot;/>",
// "http://www.whyproject.org/",
 "<document url=&quot;http://www.herenorthere.org/11.09.01/&quot;/>",
 "<document url=&quot;http://www.nonsensical.com/memorial2.html&quot;/>",
 "<document justmedia=&quot;true&quot; url=&quot;http://www.nonsensical.com/&quot;/>",
 "<document url=&quot;http://www.albany.net/~go/heros/&quot;/>",
 "<document url=&quot;http://www.nytimes.com/library/national/met_MISSING_1005_nav.html&quot;/>",
 "<document justmedia=&quot;true&quot; url=&quot;http://www.geocities.com/newsgrist/Siege.html&quot;/>",
 "<document justmedia=&quot;true&quot; url=&quot;http://www.geocities.com/newsgrist/WTC_sicha.html&quot;/>",
 "<document url=&quot;http://www.nytimes.com/library/national/nat_PORT_011005_01.html&quot;/>"
);

collages["news"] = new 
Array(
 '<crawler action=&quot;reject&quot; domain=&quot;earth-netone.com&quot;/>',
 '<crawler action=&quot;reject&quot; domain=&quot;ar.atwola.com&quot;/>',
 '<crawler action=&quot;reject&quot; domain=&quot;hitbox.com&quot;/>',
 '<crawler action=&quot;reject&quot; domain=&quot;uwint.org&quot;/>',
'<crawler action=&quot;reject&quot; domain=&quot;unitedway.org&quot;/>',
'<crawler action=&quot;reject&quot; domain=&quot;amazon.com&quot;/>',
'<crawler action=&quot;reject&quot; domain=&quot;avenuea.com&quot;/>',
 "<crawler action=&quot;untraversable&quot; url=&quot;http://transcripts.cnn.com/&quot;/>",
//"<crawler action=&quot;traversable&quot; url=&quot;http://www.bbc.co.uk&quot;/>",
"<crawler action=&quot;traversable&quot; url=&quot;http://news.bbc.co.uk&quot;/>",
"<crawler action=&quot;traversable&quot; url=&quot;http://nytimes.com&quot;/>",
"<crawler action=&quot;traversable&quot; url=&quot;http://cnn.com&quot;/>",
"<crawler action=&quot;traversable&quot; url=&quot;http://www.cnn.com&quot;/>",
"<crawler action=&quot;traversable&quot; url=&quot;http://abcnews.go.com&quot;/>",
 "<document url=&quot;http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml&quot;/>",
 "<document url=&quot;http://rss.cnn.com/rss/cnn_topstories.rss&quot;/>",
 "<document url=&quot;http://news.bbc.co.uk/rss/newsonline_world_edition/front_page/rss.xml&quot;/>",
 "<document url=&quot;http://my.abcnews.go.com/rsspublic/fp_rss20.xml&quot;/>",
 "<document url=&quot;http://www.nytimes.com/services/xml/rss/nyt/Magazine.xml&quot;/>",
 "<document url=&quot;http://rss.cnn.com/rss/cnn_world.rss&quot;/>",
 "<document url=&quot;http://newsrss.bbc.co.uk/rss/newsonline_uk_edition/week_at-a-glance/rss.xml&quot;/>",
 "<document url=&quot;http://www.nytimes.com/services/xml/rss/nyt/Arts.xml&quot;/>",
 "<document url=&quot;http://www.nytimes.com/services/xml/rss/nyt/Movies.xml&quot;/>",
 "<document url=&quot;http://rss.cnn.com/rss/cnn_showbiz.rss&quot;/>",
 "<document url=&quot;http://my.abcnews.go.com/rsspublic/sports_rss20.xml&quot;/>",
 "<document url=&quot;http://my.abcnews.go.com/rsspublic/entertainment_rss20.xml&quot;/>",
 "<document url=&quot;http://www.nytimes.com/services/xml/rss/nyt/Multimedia.xml&quot;/>",
 "<document url=&quot;http://www.nytimes.com/services/xml/rss/nyt/Technology.xml&quot;/>",
 "<document url=&quot;http://www.guardian.co.uk/rss/&quot;/>",
 "<document url=&quot;http://newsrss.bbc.co.uk/rss/newsonline_uk_edition/world/rss.xml&quot;/>",
 "<document url=&quot;http://newsrss.bbc.co.uk/rss/newsonline_uk_edition/sci/tech/rss.xml&quot;/>",
 "<document url=&quot;http://newsrss.bbc.co.uk/rss/newsonline_uk_edition/entertainment/rss.xml&quot;/>"
//"http://english.aljazeera.net/HomePage"
);

collages["art_museums"] = new 
Array(
 '<document url=&quot;http://www.moma.org/&quot;/>',
 '<document url=&quot;http://www.moma.org/docs/exhibitions/current/index.htm&quot;/>',
 '<document url=&quot;http://www.moma.org/menu/collection.htm&quot;/>',
 '<crawler action=&quot;traversable&quot; url=&quot;http://www.metmuseum.org/calendar/images/&quot;/>',
 '<document url=&quot;http://www.metmuseum.org/collections/&quot;/>',
 '<document url=&quot;http://www.metmuseum.org/special/&quot;/>',
 "<crawler action=&quot;traversable&quot; url=&quot;http://www.louvre.fr/img/&quot;/>",
 "<document url=&quot;http://www.louvre.fr/anglais/collec/coll_d.htm&quot;/>",
 "<document url=&quot;http://www.louvre.fr/anglais/expos/expo_d.htm&quot;/>",
 '<crawler action=&quot;traversable&quot; url=&quot;http://www.vangoghmuseum.nl/collection/catalog&quot;/>',
//TODO -- very tricky !! quot the quot amp
 '<document url=&quot;http://www.vangoghmuseum.nl/collection/catalog/alphaMart.asp?LANGID=0&amp;amp;SEL=1&quot;/>',

 "<crawler action=&quot;traversable&quot; url=&quot;http://www.thebritishmuseum.ac.uk/&quot;/>",
 "<document url=&quot;http://www.thebritishmuseum.ac.uk/whatson/exhibitions/index.html&quot;/>",
 "http://www.thebritishmuseum.ac.uk/whatson/index.html",
 '<document url=&quot;http://www.thebritishmuseum.ac.uk/africangalleries&quot;/>',
 '<document url=&quot;http://www.thebritishmuseum.ac.uk/cleopatra/&quot;/>',
 '<document url=&quot;http://www.ancientegypt.co.uk/&quot;/>',
 '<document url=&quot;http://www.mesopotamia.co.uk/&quot;/>',
 '<crawler action=&quot;traversable&quot; url=&quot;http://www.nga.gov/cgi-bin/&quot;/>',
 '<crawler action=&quot;traversable&quot; url=&quot;http://www.nga.gov/image/&quot;/>',
 '<crawler action=&quot;traversable&quot; url=&quot;http://www.nga.gov/thumb-s/&quot;/>',
 '<crawler action=&quot;traversable&quot; url=&quot;http://www.nga.gov/thumb-l/&quot;/>',
 '<document url=&quot;http://www.nga.gov/exhibitions/exhibits.htm&quot;/>',
 '<document url=&quot;http://www.nga.gov/collection/sculpthmb.htm&quot;/>',
 "<document url=&quot;http://www.nga.gov/collection/collect.htm&quot;/>"
);

collages["ghana_music"] = new 
Array(
 '<document url=&quot;http://cat.nyu.edu/chains&quot;/>',
 '<document url=&quot;http://cat.nyu.edu//chains/performCenter.html&quot;/>',
 '<document url=&quot;http://www.cnmat.berkeley.edu/~ladzekpo/&quot;/>'
);

collages["ein_dj"] = new 
Array(
 '<document url=&quot;http://kultur.aec.at/aecweb/dj/start.html&quot;/>'
);

collages["test"] = new
Array(
 '<document url=&quot;http://localhost/chains&quot;/>', 
 "<document url=&quot;http://localhost/ecology&quot;/>"
);

collages["ecology"] = new 
Array(
 "<crawler action=&quot;traversable&quot; url=&quot;/&quot;/>",
 "<document url=&quot;/ecology/theory/lexicon/index.html&quot;/>",
 "<document url=&quot;/ecology/theory/collageMachine/content.html&quot;/>",
 "<document url=&quot;/ecology/nMachine&quot;/>",
 "<document url=&quot;/cgi-bin/webBlade/webdriver.exe?MIval=allCitations&quot;/>" 
);

collages["netart"] = new
Array(
 "<document url=&quot;http://www.whitney.org/artport/&quot;/>",
 "<document url=&quot;http://www.aec.at/en/index.asp&quot;/>",
 "<document url=&quot;http://on1.zkm.de/zkm/e/&quot;/>",
 "<document url=&quot;http://rhizome.org/&quot;/>",
 "<document url=&quot;http://www.sfmoma.org/collections/collections_mediaarts.html&quot;/>",
 "<document url=&quot;http://artcontext.org/&quot;/>",
 "<document url=&quot;http://www.blinkenlights.de/&quot;/>"
);

collages["open_stacks"] = new
Array("<crawler action=&quot;traversable&quot; url=&quot;/", "/cgi-bin/webBlade/webdriver.exe?MIval=allCitations&quot;/>");

collages["andruid_universities"] = new 
Array("http://www.cs.tamu.edu", "http://www.cs.tamu.edu/department/images",
      "http://www.cs.tamu.edu/people/faculty", "http://mrl.nyu.edu", "http://cat.nyu.edu");

collages["impermanence"] = new 
Array('<document url=&quot;http://www.andreas.com/susan/lastdays.html&quot;/>', '<document url=&quot;http://cvisions.cat.nyu.edu/dwa/gallery.html&quot;/>', '<document url=&quot;http://www.memorialgardens.com/guests/Irving_Keisha_891546966.html&quot;/>', '<document url=&quot;http://www.memorialgardens.com/guests/Sicely_Jessica_886269580.html&quot;/>', '<document url=&quot;http://dir.yahoo.com/Society_and_Culture/Death_and_Dying/End_of_Life_Issues/Memorials/&quot;/>', '<document url=&quot;http://www.afterlife.org/&quot;/>', '<document url=&quot;http://www.archive.org/&quot;/>', '<document url=&quot;http://www.csi.ad.jp/ABOMB/index.html&quot;/>', '<document url=&quot;http://www.cat.nyu.edu/parkbench/parkbench/06_13_96.html&quot;/>', '<document url=&quot;http://www.graveyards.com/foresthome/hmarket.html&quot;/>', '<document url=&quot;http://www2.cdc.gov/mmwr/&quot;/>', '<document url=&quot;http://www.webring.org/cgi-bin/webring?ring=cemphoto&list&quot;/>', '<document url=&quot;http://www.disobey.com/ghostsites/&quot;/>', '<document url=&quot;http://www.condorclub.com/&quot;/>', '<document url=&quot;http://www.plinko.net/404/&quot;/>', '<document url=&quot;http://www.geocities.com/SiliconValley/Station/4122/&quot;/>', '<document url=&quot;http://www.cool404.com/&quot;/>', '<document url=&quot;http://www.sendcoffee.com/minorsage/404error.html&quot;/>', '<document url=&quot;http://catless.ncl.ac.uk/Obituary/&quot;/>', '<document url=&quot;http://www.deathclock.com/&quot;/>', '<document url=&quot;http://www.slipcue.com/obits/obitsmain.html&quot;/>', '<document url=&quot;http://www.lib.virginia.edu/exhibits/dead/otherworld.html#budd&quot;/>', '<document url=&quot;http://www.crossings.net/Inspiration.html&quot;/>', '<document url=&quot;http://eastridgepark.com/404.htm&quot;/>', '<document url=&quot;http://404.jodi.org/&quot;/>', '<document url=&quot;http://www.disobey.com/ghostsites/gs980527.shtml&quot;/>', '<document url=&quot;http://www.geocities.com/Paris/5121/death.htm&quot;/>', '<document url=&quot;http://www.kadampa-center.org/teach1.htm&quot;/>', '<document url=&quot;http://www.geocities.com/Heartland/Plains/1291/mlist.htm&quot;/>', '<document url=&quot;http://www.summum.org/mummification/philexam.htm&quot;/>', '<document url=&quot;http://www.archaeology.org/online/features/chinchorro/index.html&quot;/>', '<document url=&quot;http://www.sirius.com/~dbh/mummies/&quot;/>');

collages["elo2001"] = new 
Array('<document url=&quot;http://cat.nyu.edu/ecology/collageMachine/Images/minotaur/index.html&quot;/>', '<document url=&quot;http://www.ineradicablestain.com/&quot;/>', '<document url=&quot;http://www.idaspoetics.com.au/rice/riceindex.html&quot;/>','<document url=&quot;http://home.dencity.com/buriweb&quot;/>', '<document url=&quot;http://www.nationalphilistine.com/alternumerics/&quot;/>', '<document url=&quot;http://www.yorku.ca/caitlin/waves/kissing2.htm&quot;/>', '<document url=&quot;http://www.yorku.ca/caitlin/waves/school2.htm&quot;/>', '<document url=&quot;http://www.yorku.ca/caitlin/waves/city2.htm&quot;/>','<document url=&quot;http://www.memmott.org/talan/tabRich.html&quot;/>', '<document url=&quot;http://netwurkerz.de/mez/datableed/complete/index.htm&quot;/>', '<document url=&quot;http://www.cat.nyu.edu/agent/&quot;/>');

collages["brave_new_word"] = new 
Array('<document url=&quot;http://www.wordcircuits.com/gallery/sandsoot&quot;/>','<document url=&quot;http://wordcircuits.com/gallery/sandsoot/nav2.html&quot;/>','<document url=&quot;http://www.eastgate.com/TwelveBlue&quot;/>', '<document url=&quot;http://www.eastgate.com/TwelveBlue/Twelve_Blue.html&quot;/>','<document url=&quot;http://www.nyupress.nyu.edu/sisterstories/&quot;/>', '<document url=&quot;http://califia.hispeed.com/Errand/title1a.htm&quot;/>', '<document url=&quot;http://epc.buffalo.edu/authors/glazier/java/costa1/00.html&quot;/>','<document url=&quot;http://epc.buffalo.edu/authors/glazier/java/costa1/02i.html&quot;/>','<document url=&quot;http://supertart.com/sonatas/&quot;/>','<document url=&quot;http://supertart.com/sonatas/banyan.html&quot;/>','<document url=&quot;http://raven.ubalt.edu/staff/moulthrop/hypertexts/&quot;/>', '<document url=&quot;http://www.nyupress.nyu.edu/sisterstories/the.scribe.html&quot;/>','<document url=&quot;http://www.impermanenceagent.com&quot;/>','<document url=&quot;http://raven.ubalt.edu/features/media_ecology/lab/96/cotv/&quot;/>','<document url=&quot;http://cat.nyu.edu/greymatters/collagestart.html&quot;/>','<document url=&quot;http://www.sissyfight.com&quot;/>','<document url=&quot;http://www.eastgate.com/VG/VGStart.html&quot;/>');

collages["elo2000"] = new 
Array('<document url=&quot;http://cat.nyu.edu/greymatters/collagestart.html&quot;/>','<document url=&quot;http://www.tank20.com/fbm/index.html&quot;/>','<document url=&quot;http://www.wordcircuits.com/gallery/sandsoot&quot;/>','<document url=&quot;http://artnetweb.com/projects/ahneed/casatoc.html&quot;/>','<document url=&quot;http://www.heelstone.com/heart/&quot;/>');

collages["unforgiving_memory"] = new 
Array('<document url=&quot;http://www.mw2mw.com&quot;/>','<document url=&quot;http://www.rhizome.org/artbase&quot;/>','<document url=&quot;http://www.codezebra.net&quot;/>','<document url=&quot;http://www.manovich.net&quot;/>','<document url=&quot;http://www.humanusculture.ca&quot;/>','<document url=&quot;http://www.utu.fi/hum/mediatutkimus&quot;/>','<document url=&quot;http://http://colossus.v2.nl/V2_Lab/fmpro?-db=v2_lab.fp3&-format=frames.html&-lay=web&-recid=1&-find&quot;/>','<document url=&quot;http://www.banffcentre.ca/Aboriginal_Arts/default.htm&quot;/>','<document url=&quot;http://www.hervefischer.montreal.qc.ca&quot;/>','<document url=&quot;http://www.sims.berkeley.edu/~sack&quot;/>');

collages["human_genorosity"] = new 
Array('<document url=&quot;http://www.codezebra.net/&quot;/>', '<document url=&quot;http://www.manovich.net&quot;/>','<document url=&quot;http://www.m-cult.org&quot;/>', '<document url=&quot;http://www.mw2mw.com&quot;/>', '<document url=&quot;http://beagle.waag.org/~hwla2/&quot;/>', '<document url=&quot;http://potatoland.org/shredder&quot;/>','<document url=&quot;http://www.mrl.nyu.edu/perlin&quot;/>', '<document url=&quot;http://mrl.nyu.edu/ecology&quot;/>','<document url=&quot;http://www.shirky.com&quot;/>', '<document url=&quot;http://proxy.arts.edu/~nideffer &quot;/>','<document url=&quot;http://www.interlog.com/~metalogo/&quot;/>','<document url=&quot;http://www.impermanenceagent.com/agent/index.html&quot;/>','<document url=&quot;http://www.maryflanagan.com&quot;/>', '<document url=&quot;http://www.givingspace.org&quot;/>','<document url=&quot;http://www.cpandfriends.com&quot;/>', '<document url=&quot;http://www.pxpmedia.org&quot;/>','<document url=&quot;http://www.snibbe.com&quot;/>', '<document url=&quot;http://www.jparker.com&quot;/>');

collages["crossover"] = new Array(
"www.adamfrank.com",
"http://www.killthepresident.org",
"http://www.mrmind.com",
"http://www.madagascarinstitute.com",
"http://vaguepolitix.com",
"http://www.jmsf.org",
"http://www.alanberliner.com",
"http://tonidove.com",
"http://www.czarofbizarre.com",
"http://www.nothingsostrange.com",
"http://www.artnetweb.com/theoricon/anchorage/index.html",
"http://artnetweb.com/theoricon/austria/",
"http://artnetweb.com/theoricon/diorama/",
"http://www.camouflagetown.tv",
"http://denning.net",
"http://mrl.nyu.edu/ecology",
"http://cat.nyu.edu/chains",
"http://www.illclan.com",
"http://www.banffcentre.ca/bnmi/",
"http://www.codezebra.net",
"http://www.noemalab.com/sections/gallery/fischnaller/fischnaller.htm ",
"http://www.evl.uic.edu",
"http://babel.massart.edu/~jgoss",
"http://www.zefrank.com",
"http://www.flamingangelfilms.com",
"http://www.the-loop.com/smarthearts",
"http://www.malepregnancy.com",
"http://www.genochoice.com",
"http://www.paperveins.org",
"http://www.virgilwong.com",
"http://www.rythospital.com",
"http://www.annenberg.edu/labyrinth/blue/blue.html",
"http://www-rohan.sdsu.edu/dept/schlcomm/BLUE.html",
"http://www.meineigenheim.com/hajoe/litemates",
"http://www.nadine.be",
"http://nerve.com/regulars/SecretLife/contents.asp",
"http://nerve.com/regulars/SecretLife/osama",
"http://www.fabricat.com",
'<document url=&quot;http://symphonyofacity.org&quot;/>'
);
collages["siggraph02"] = new 
Array("http://www.siggraph.org/s2002/conference/index.html",
      "http://www.gamasutra.com/",
      "http://cgi.student.nada.kth.se/cgi-bin/d95-aeh/get/baudrillard",
      "http://www.cnn.com",
      "http://www.nytimes.com",
      "<crawler action=&quot;traversable&quot; url=&quot;/", "/ecology/theory/lexicon/index.html&quot;/>",
      "/ecology/theory/collageMachine/content.html",
      "/ecology/nMachine"
      );
collages["dl"] = new 
Array("<crawler action=&quot;reject&quot; domain=&quot;http://www.dli2.nsf.gov&quot;/>",
      "http://www.dli2.nsf.gov/photo.html"
      );

collages["dlv"] = new 
Array(
 "<search engine=&quot;google&quot; query=&quot;digital+libraries+visualizatio&quot;/>n"
      );
				 
collages["a"] = new 
Array("http://www.avril-lavigne.com/index2.html"
      );

collages["war"] = new 
Array(
 "<search engine=&quot;google&quot; query=&quot;antiwar+iraq&quot;/>",
 "<search engine=&quot;google&quot; query=&quot;iraq+war&quot;/>"
);

collages["coe"] = new 
Array(
"http://localhost/ecology/collageMachine",
"http://csdl.tamu.edu",
"http://csdl.tamu.edu/csdl/research/infra.html",
"http://www.cs.tamu.edu/department/images",
"http://www.cs.tamu.edu",
"<document justmedia=&quot;true&quot; url=&quot;http://www.cs.tamu.edu/people/faculty/taylor&quot;/>",
"<document justmedia=&quot;true&quot; url=&quot;http://www.cs.tamu.edu/people/faculty/andruid&quot;/>",
"http://aggieengineer.tamu.edu"
);

collages["informedia"] = new 
Array("http://csdl.tamu.edu/~andruid/courses/informedia03/informedia03ParticipantsContent.html"
      );

collages["sigmm"] = new Array(
"<search engine=&quot;google&quot; query=&quot;multi-modal+interaction+research&quot;/>",
"virtual+environments+research",
"multimedia+analysis,+processing,+and+retrieval+research"
);

collages["dl2"]	=
[
"<document justcrawl=&quot;true&quot; url=&quot;http://www.icdlbooks.org/library/basic/titlelist.html&quot;/>",
"<crawler action=&quot;traversable&quot; url=&quot;http://www.perseus.tufts.edu/cgi-bin/&quot;/>",
"http://www.perseus.tufts.edu/cgi-bin/imbrow?query=a.typekey%20%3D%20%27Relation%27%20and%20a.valueid%3D%27Perseus%3Acoll%3Aim1990.17%27",
"http://www.perseus.tufts.edu/cgi-bin/browser?object=site",
"http://www.perseus.tufts.edu/cgi-bin/browser?object=building",
"http://www.perseus.tufts.edu/cgi-bin/perscoll",
"<document bias=&quot;.5&quot; url=&quot;http://www.csdl.tamu.edu/cervantes/english/images_thumb1.html&quot;/>",
"<document bias=&quot;.5&quot; url=&quot;http://www.csdl.tamu.edu/cervantes/english/image_temp3.html&quot;/>",
];

collages["nsf"] =
[
"<search engine=&quot;google&quot; query=&quot;careers+in+the+sciences&quot;/>",
"<search engine=&quot;google&quot; query=&quot;undegraduate+program+computer+science&quot;/>",
"<search engine=&quot;google&quot; query=&quot;undegraduate+program+biochemistry&quot;/>",
"<search engine=&quot;google&quot; query=&quot;highest+ranked+computer+science+programs&quot;/>",
"<search engine=&quot;google&quot; query=&quot;graduate+program+visualization&quot;/>",
"<search engine=&quot;google&quot; query=&quot;highest+ranked+medicine+programs&quot;/>",
"http://aggieengineer.tamu.edu"
];

collages["reseed"] =
[
"reseed|"
];

collages["dl3"]	= new
Array(
"<crawler action=&quot;traversable&quot; url=&quot;http://memory.loc.gov/cgi-bin&quot;/>",
"<document justcrawl=&quot;true&quot; url=&quot;http://memory.loc.gov/ammem/collections/finder.html&quot;/>"
);

collages["mag"] = new
Array(
'<crawler action=&quot;reject&quot; domain=&quot;hitbox.com&quot;/>',
'<crawler action=&quot;reject&quot; domain=&quot;uwint.org&quot;/>',
'<crawler action=&quot;reject&quot; domain=&quot;unitedway.org&quot;/>',
'<crawler action=&quot;reject&quot; domain=&quot;amazon.com&quot;/>',
'<crawler action=&quot;reject&quot; domain=&quot;avenuea.com&quot;/>',
"<crawler action=&quot;traversable&quot; url=&quot;http://www.nytimes.com/imagepages/&quot;/>",
"<crawler action=&quot;traversable&quot; url=&quot;http://www.nytimes.com/2003/&quot;/>",
/* 
"<crawler action=&quot;traversable&quot; url=&quot;http://www.nytimes.com/library/"&quot;/>, 
"<crawler action=&quot;traversable&quot; url=&quot;http://www.nytimes.com/indexes/2003/&quot;/>",
*/
"http://www.nytimes.com/pages/magazine/"
);



collages["c"] = new Array(
"localhost/ecology/test/cnn.html");

collages["criticalmas"] = new Array(
'<document url=&quot;http://www.critical-mas.tv/&quot;/>',
'<document url=&quot;http://www.critical-mas.tv/content3.html&quot;/>',
'<document url=&quot;http://www.critical-mas.tv/content1.html&quot;/>',
'<document url=&quot;http://www.critical-mas.tv/studioAccess.html&quot;/>'
);

collages["dancetech"] = new Array(
"<crawler action=&quot;reject&quot; domain=&quot;bmi-magnetics.com",
"<crawler action=&quot;reject&quot; domain=&quot;queertheory.com",
"<crawler action=&quot;untraversable&quot; url=&quot;http://www.art.net/~dtz/archive/&quot;/>",
"<crawler action=&quot;untraversable&quot; url=&quot;http://www.art.net/dtz/archive/&quot;/>",
"<crawler action=&quot;untraversable&quot; url=&quot;http://www.art.net/Resources/dtz/archive/&quot;/>",
"<search engine=&quot;google&quot; query=&quot;thecla+schiphorst&quot;/>",
"<search engine=&quot;google&quot; query=&quot;bodymaps&quot;/>",
"<search engine=&quot;google&quot; query=&quot;merce+cunningham&quot;/>",
"<search engine=&quot;google&quot; query=&quot;dance+technology&quot;/>",
"<search engine=&quot;google&quot; query=&quot;lifeforms+movement&quot;/>",
"<search engine=&quot;google&quot; query=&quot;stelar&quot;/>"
);



collages["c"] = new Array(
"localhost/ecology/test/cnn.html");

function namedCollage(collageName, collageName2, bgcolor) // void (String,String)
{
//   alert("namedCollage="+collageName+" bgcolor"+bgcolor);
   if (!bgcolor)
      bgcolor		= "000000";
//      bgcolor		= "009933";
   var specs		= collages[collageName];
   var length		= specs.length;
//   var nameSpec		= "<seed type=&quot;name&quot; value=&quot;"+collageName+"&quot;/>"
//   if (specs[length - 1] != nameSpec)
//      specs[length]	= nameSpec;
   var hrefs		= new Array();
   var i		= hrefs.length;
   parseSpecs(specs, hrefs);
   if (collageName2)
   {
      var hrefs2	= collages[collageName2];
      for (var i2=0; i2!=hrefs2.length; i2++)
	 hrefs[i]	= hrefs2[i2];
   }
	
	//alert("that: " + that.document);
   launchCF(hrefs, bgcolor);
}

