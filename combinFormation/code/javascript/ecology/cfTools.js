function installCfTools(aElement)
{
//   alert(aElement+" "+aElement.href);
   var params = {
    "cfTools": { URL: aElement.href,
             IconURL: "http://ecologylab.cs.tamu.edu/images/interfaceEcologyLabLogo81x72.png",
             toString: function () { return this.URL; }
    }
  };
  //alert('calling install');
  InstallTrigger.install(params);
  return false;
}

