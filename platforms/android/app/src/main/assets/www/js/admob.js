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
            document.getElementById('screen').style.display = 'none';            
        });
        document.addEventListener('onAdLoaded', function (data) {
            AdMob.showInterstitial();
        });
        document.addEventListener('onAdPresent', function (data) { });
        document.addEventListener('onAdLeaveApp', function (data) { });
        document.addEventListener('onAdDismiss', function (data) {
            document.getElementById('screen').style.display = 'none';            
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
        //AdMob.prepareInterstitial({ adId: admobid.interstitial, isTesting: false, autoShow: false });
        document.getElementById('screen').style.display = 'none';
    }

   function checkFirstUse()
    {
            checkPermissions();
            //window.ga.startTrackerWithId('UA-88579601-14', 1, function(msg) {
            //    window.ga.trackView('Home');
            //});
            initApp();
            askRating();
            //document.getElementById('screen').style.display = 'none';
    }

   function notFirstUse()
    {
            document.getElementById('screen').style.display = 'none';
    }

function askRating()
{
  AppRate.preferences = {
  openStoreInApp: true,
  useLanguage:  'fi',
  usesUntilPrompt: 10,
  promptAgainForEachNewVersion: true,
  storeAppURL: {
                android: 'market://details?id=com.tampere.withads'
               }
};
 
AppRate.promptForRating(false);
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
