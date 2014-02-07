function install (aEvent)
{
   //alert(aEvent);
   var params = {
    "cfTools": { URL: aEvent.target.href,
             IconURL: "http://ecologylab.cs.tamu.edu/images/interfaceEcologyLabLogos7-2004-2WhiteMatte.png",
             toString: function () { return this.URL; }
    }
  };
  //alert('calling install');
  InstallTrigger.install(params);
  //InstallTrigger.install("cftools.xpi");
  return false;
}

<