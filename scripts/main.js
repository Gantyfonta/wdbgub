(function applyCustomSettings() {
    const defaultTitle = "WDBG";
    const defaultFavicon = "https://wowdabug.github.io/wdbg/images/favicon.png";
    const title = localStorage.getItem('customTitle');
    const favicon = localStorage.getItem('customFavicon');

    if (title) {
        document.title = title;
    } else {
        document.title = defaultTitle;
    }

    if (favicon) {
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = favicon;
    } else {
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = defaultFavicon;
    }

  document.addEventListener('keydown', e => {
    const tag = document.activeElement.tagName.toLowerCase();
    if (tag === 'input' || tag === 'textarea') return;

    const panicKey = localStorage.getItem('panicKey');
    const panicUrl = localStorage.getItem('panicUrl');
    if (panicKey && panicUrl && e.key.toLowerCase() === panicKey) {
      window.open(panicUrl, '_blank');
  }
});
})();

function loadCustomScriptFromURL() {
    const urlKey = 'JS';
    const scriptURL = localStorage.getItem(urlKey);
    if (scriptURL && scriptURL.trim().length > 0) {
        const scriptTag = document.createElement('script');
        scriptTag.src = scriptURL;
        scriptTag.id = 'dynamic-custom-script';
        document.body.appendChild(scriptTag);
        scriptTag.onerror = () => {
            console.error(`Failed to load custom script from URL: ${scriptURL}`);
        };
        scriptTag.onload = () => {
            console.log(`Custom script from URL loaded successfully!`);
        };
    } else {
        console.log("No custom script URL found in Local Storage.");
    }
}
document.addEventListener('DOMContentLoaded', loadCustomScriptFromURL);
