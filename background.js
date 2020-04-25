console.log('background running');
chrome.browserAction.setPopup({popup: "popup.html"});

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(){
    console.log('buttonClicked');
    let numIncognitoTabs = 0;
    let incognitoTabsURLs = [];
    chrome.tabs.query({},(tabsArray)=>{
        tabsArray.forEach((tab)=> {
            if(tab.incognito == true){
                incognitoTabsURLs.push(tab.url);
                numIncognitoTabs++;
            }
        });
        console.log(numIncognitoTabs); 
        console.log(incognitoTabsURLs); 
    });

    chrome.windows.getAll({},(windowsArray)=>{
        windowsArray.forEach((window)=>{
            if(window.incognito == true){
                chrome.windows.remove(window.id);
            }
        });
    });

}