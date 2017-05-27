function showMap()
{
    document.getElementById('divPlanner').style.display = 'none';
    document.getElementById('divMap').style.display = 'block';
    document.getElementById('divPlanner').style.height = '0vh';
    document.getElementById('divMap').style.height = '100vh';
}

function showPlanner()
{
    if(document.getElementById('frmPlanner').src == '')
    {
        document.getElementById('frmPlanner').src = 'http://beta.digitransit.fi/';
    }
    document.getElementById('divPlanner').style.display = 'block';
    document.getElementById('divMap').style.display = 'none';    
    document.getElementById('divMap').style.height = '0vh';
    document.getElementById('divPlanner').style.height = '100vh';
}