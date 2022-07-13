function load_ads() {
    /*ads_box = document.createElement('div');
    ads_box.id = 'ads_box';
    link_ads = document.createElement('a');
    link_ads.className = 'ads_link';
    link_ads.href = '';
    img_ads = document.createElement('img');
    img_ads.className = 'img-fluid';
    img_ads.src = 'https://article.hieudeeptry.ml/assets/img/smiledog.jpg';
    ads_info = document.createElement('h4');
    ads_info.className = 'lead text-secondary text-center';
    ads_info.innerHTML = '<b>Không có</b>';
    ads_content = document.createElement('p');
    ads_content.className = 'text-muted';
    ads_content.innerHTML = 'Hiện tại không có quảng cáo nào!';
    link_ads.appendChild(img_ads);
    link_ads.appendChild(ads_info);
    link_ads.appendChild(ads_content);
    ads_box.appendChild(link_ads);
    document.body.appendChild(ads_box);
    */
   ads_script = document.createElement('script');
   ads_script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1882436229597341'
   ads_script.async = true;
   ads_script.crossorigin = 'anonymous';
   //insert_ads = document.createElement('ins');
    //insert_ads.style = 'display:block;';
    // set properties data-ad-client, data-ad-slot, data-ad-format, data-full-width-responsive
    //insert_ads.dataset.adClient = 'ca-pub-1882436229597341';
    //insert_ads.dataset.adSlot = '7027513907';
    //insert_ads.dataset.adFormat = 'auto';
    //insert_ads.dataset.fullWidthResponsive = 'true';
    //adsbygoogle = document.createElement('script');
    //adsbygoogle.innerHTML = '(adsbygoogle = window.adsbygoogle || []).push({});';
   // add to first of head
    document.head.insertBefore(ads_script, document.head.firstChild);
    //document.body.appendChild(insert_ads);
    //document.body.appendChild(adsbygoogle);
}
load_ads();