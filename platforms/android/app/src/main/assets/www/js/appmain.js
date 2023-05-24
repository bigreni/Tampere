    function onLoad() {
        if ((/(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent))) {
            document.addEventListener('deviceready', checkFirstUse, false);
        } else {
            notFirstUse();
        }
    }
    var admobid = {};
    if (/(android)/i.test(navigator.userAgent)) {
        admobid = { // for Android
            banner: 'ca-app-pub-1683858134373419/7790106682',
            interstitial:'ca-app-pub-9249695405712287/7186317151'
        };
    }

    function initApp() {
        if (!AdMob) { alert('admob plugin not ready'); return; }
        initAd();
        loadInterstitial();
    }
    function initAd() {
        var defaultOptions = {
            // bannerId: admobid.banner,
            // interstitialId: admobid.interstitial,
            // adSize: 'SMART_BANNER',
            // width: integer, // valid when set adSize 'CUSTOM'
            // height: integer, // valid when set adSize 'CUSTOM'
            position: AdMob.AD_POSITION.BOTTOM_CENTER,
            // offsetTopBar: false, // avoid overlapped by status bar, for iOS7+
            bgColor: 'black', // color name, or '#RRGGBB'
            // x: integer,      // valid when set position to 0 / POS_XY
            // y: integer,      // valid when set position to 0 / POS_XY
            isTesting: false // set to true, to receiving test ad for testing purpose
            // autoShow: true // auto show interstitial ad when loaded, set to false if prepare/show
        };
        AdMob.setOptions(defaultOptions);
        registerAdEvents();
    }

    // optional, in case respond to events or handle error
    function registerAdEvents() {
        // new events, with variable to differentiate: adNetwork, adType, adEvent
        document.addEventListener('onAdFailLoad', function (data) {
            document.getElementById("screen").style.display = 'none';     
        });
        document.addEventListener('onAdLoaded', function (data) {
            document.getElementById("screen").style.display = 'none';     
        });
        document.addEventListener('onAdPresent', function (data) { });
        document.addEventListener('onAdLeaveApp', function (data) { 
            document.getElementById("screen").style.display = 'none';     
        });
        document.addEventListener('onAdDismiss', function (data) {
           document.getElementById("screen").style.display = 'none';     
        });
    }

    function createSelectedBanner() {
        AdMob.createBanner({adId:admobid.banner});
    }

    function successFunction()
    {
    }
 
    function errorFunction(error)
    {
    }

    function loadInterstitial() {
        if ((/(android|windows phone)/i.test(navigator.userAgent))) {
            AdMob.prepareInterstitial({ adId: admobid.interstitial, isTesting: false, autoShow: false });
            //document.getElementById("screen").style.display = 'none';     

        } else if ((/(ipad|iphone|ipod)/i.test(navigator.userAgent))) {
            AdMob.prepareInterstitial({ adId: admobid.interstitial, isTesting: false, autoShow: false });
            //document.getElementById("screen").style.display = 'none';     
        } else
        {
            document.getElementById("screen").style.display = 'none';     
        }
    }

   function checkFirstUse()
    {
            initApp();
            checkPermissions();
            checkTrackingPermissions();
            askRating();
            //document.getElementById('screen').style.display = 'none';
    }

   function notFirstUse()
    {
            document.getElementById('screen').style.display = 'none';
    }

function askRating()
{
    cordova.plugins.AppRate.setPreferences = {
        reviewType: {
            ios: 'AppStoreReview',
            android: 'InAppBrowser'
            },
  useLanguage:  'fi',
  usesUntilPrompt: 10,
  promptAgainForEachNewVersion: true,
  storeAppURL: {
                android: 'market://details?id=com.tampere.withads'
               }
};
 
AppRate.promptForRating(false);
}

function checkTrackingPermissions(){
    const idfaPlugin = cordova.plugins.idfa;

    idfaPlugin.getInfo()
        .then(info => {
            if (!info.trackingLimited) {
                return info.idfa || info.aaid;
            } else if (info.trackingPermission === idfaPlugin.TRACKING_PERMISSION_NOT_DETERMINED) {
                return idfaPlugin.requestPermission().then(result => {
                    if (result === idfaPlugin.TRACKING_PERMISSION_AUTHORIZED) {
                        return idfaPlugin.getInfo().then(info => {
                            return info.idfa || info.aaid;
                        });
                    }
                });
            }
        });
}

function checkPermissions()
{
    cordova.plugins.diagnostic.getLocationAuthorizationStatus(function (status) {
        switch (status) {
            case cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED:
                cordova.plugins.diagnostic.requestLocationAuthorization(function (status) {
                    console.log("success");
                }, function (error) {
                    console.error(error);
                });
                break;
            case cordova.plugins.diagnostic.permissionStatus.GRANTED:
                break;
            case cordova.plugins.diagnostic.permissionStatus.DENIED:
                cordova.plugins.diagnostic.requestLocationAuthorization(function (status) {
                }, function (error) {
                    console.error(error);
                });
                break;
            case cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS:
                break;
            default:
                cordova.plugins.diagnostic.requestLocationAuthorization(function (status) {
                }, function (error) {
                    console.error(error);
                });
        }
    }, function (error) {
        console.error(error);
    });
}

function showAd()
{
    document.getElementById("screen").style.display = 'block';     
    if ((/(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent))) {
        AdMob.isInterstitialReady(function(isready){
            if(isready) 
                AdMob.showInterstitial();
        });
    }
    document.getElementById("screen").style.display = 'none'; 
}