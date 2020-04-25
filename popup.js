document.addEventListener('DOMContentLoaded', function() {
    let incognitoTabsURLs = [];
    let onOff = document.getElementById('onOff');
    onOff.addEventListener('click', function() {
        let numIncognitoTabs = 0;
        chrome.tabs.query({},(tabsArray)=>{
            tabsArray.forEach((tab)=> {
                if(tab.incognito == true){
                    incognitoTabsURLs.push(tab.url);
                    numIncognitoTabs++;
                }
            });
        });
        window.localStorage.removeItem('incognitoURLs');
        window.localStorage.setItem('incognitoURLs', JSON.stringify(incognitoTabsURLs));

        chrome.windows.getAll({},(windowsArray)=>{
            windowsArray.forEach((window)=>{
                if(window.incognito == true){
                    chrome.windows.remove(window.id);
                }
            });
        });
    });

    let secrete = document.getElementById('secrete');
    secrete.addEventListener('click', function() {
        let URLsArray = JSON.parse(window.localStorage.getItem('incognitoURLs'));
        let newWindow = chrome.windows.create({incognito: true});
        URLsArray.forEach((url)=>{
            chrome.tabs.create({windowId : newWindow.id,url: url});
        });
    });


});