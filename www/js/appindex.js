function showMap()
{
    if(document.getElementById('frmPlanner').src == '')
    {
        document.getElementById('frmPlanner').src = 'Map.html';
        document.getElementById('frmPlanner').setAttribute('allow', 'geolocation *;');
    }
    document.getElementById('divPlanner').style.display = 'none';
    document.getElementById('divMap').style.display = 'block';
    document.getElementById('divPlanner').style.height = '0vh';
    document.getElementById('divMap').style.height = '92vh';
}

function showPlanner()
{
    if ((/(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent))) {
    showAd1();
    }
    if(document.getElementById('frmPlanner').src == '')
    {
        document.getElementById('frmPlanner').src = 'https://tampere.digitransit.fi/';
        document.getElementById('frmPlanner').setAttribute('allow', 'geolocation *;');
    }
    document.getElementById('divPlanner').style.display = 'block';
    document.getElementById('divMap').style.display = 'none';    
    document.getElementById('divMap').style.height = '0vh';
    document.getElementById('divPlanner').style.height = '92vh';
}