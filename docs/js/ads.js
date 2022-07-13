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
   document.body.appendChild(ads_script);
}
load_ads();