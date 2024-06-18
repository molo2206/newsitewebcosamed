function center_pupup (url:string, title:string) {
    var popupWidth =  800;
    var popupHeight = 600;
    var left = window.screenLeft || window.screenX;
    var top = window.screenTop || window.screenY;
    var windowWidth = window.innerWidth || document.documentElement.clientWidth;
    var windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
    var popupLeft = left + windowWidth / 2 - popupWidth / 2;
    var popupTop = top + windowHeight / 2 - popupHeight / 2;
    window.open(
        url,
        title,
        "scrollbars=yes, width=" +
            popupWidth +
            ", height=" +
            popupHeight +
            ", top=" +
            popupTop +
            ",left=" +
            popupLeft
    );
};

export const share_facebook = (url:string) => {
    var shareUrl =
        "https://www.facebook.com/sharer/sharer.php?u=" +
        encodeURIComponent(url);
    center_pupup(shareUrl, "Partager sur facebook");
};

export const share_twitter = (url:string) => {
    var title = document.title;
    var shareUrl =
        "https://twitter.com/intent/tweet?text=" +
        encodeURIComponent(title) +
        "&via=wahdi" +
        "&url=" +
        encodeURIComponent(url);
    center_pupup(shareUrl, "Partager sur twitter");
};

// export const share_linkedin = (url:string) => {
//     var title = document.title;
//     var shareUrl =
//         "https://www.linkedin.com/shareArticle?url=" + encodeURIComponent(url);
//     center_pupup(shareUrl, "Partager sur linkedin");
// };

export const share_whatsapp = (url:string) => {
    // var title = document.title;
    var shareUrl = "whatsapp://send?text=" + encodeURIComponent(url);
    center_pupup(shareUrl, "Partager sur whatsapp");
};