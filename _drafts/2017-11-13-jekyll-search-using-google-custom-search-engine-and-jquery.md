---
layout: post
title: "Jekyll search using Google's Custom Search Engine and jQuery."
author: Prashant Shrestha 
date: 2017-11-13 11:54:27 -400 
categories: development
tags: jquery javascript rest-api google free engine jekyll ajax
---

Jekyll is an amazing blogging platform, regarding simplicity, templating and cleanliness. There are drawbacks for simplicity, lack of essential features. To keep my blog clean and minimal, I used Google's Custom Search Engine and forwarded users to Google's custom search's public URL however it just seems too unprofessional. Let's say I want to search for the term `node` in my blog; I would simply forward the user to Google's public search [url](https://cse.google.com/cse/publicurl?cx=010738197107477130202:cnkjahloicw&q=node). I tried searching for alternatives which I could integrate the search feature on my blog however it all required me to install and set up a whole different libraries and such.

There are various alternatives that one can use to integrate search feature in their Jekyll powered blog, some, from top of my head would be [Lunr.js](https://learn.cloudcannon.com/jekyll/jekyll-search-using-lunr-js/), [Simple-Jekyll-Search](https://github.com/christian-fei/Simple-Jekyll-Search) by [christian-fei](https://github.com/christian-fei), [Algolia](https://www.algolia.com/), [Swifttype](https://swiftype.com/) etc.
<!--excerpt-->
Although Google's Custom Search Engine was already used before, I decided to simply use [Google's Search API](https://developers.google.com/custom-search/json-api/v1/using_rest) to extend and display the search results on my blog. It all starts by creating a [custom Google's search](https://cse.google.com/create/new).



{% highlight html %}
<div class="row">
    <input class="u-full-width" type="text" placeholder="Please enter what you wish to search here." id="toSearch">
    <input class="button-primary" class="gcse-trigger" type="submit" value="Search">
</div>
{% endhighlight %}

The jQuery snippet to handle and trigger the search.

{% highlight javascript %}
/* Search trigger - using manual button click.
–––––––––––––––––––––––––––––––––––––––––––––––––– */
var toSearch = "https://cse.google.com/cse/publicurl?cx=010738197107477130202:cnkjahloicw&q=";
$(".gcse-trigger").click(function (e) {
    e.preventDefault();
    var searchKey = $('input#toSearch').val();
    var searchURL = "https://www.googleapis.com/customsearch/v1?q={0}&cx={1}&key={2}"
    var apiKey = "YOUR_API_KEY_HERE!";
    var engineID = "YOUR_GOOGLE_CUSTOM_SEARCH_ENGINE_ID_HERE!";

    // Clear previous search results.
    $(".search-result-container").empty();

    if (searchKey.length > 3) {
        // Start the search.
        $.ajax({
            type: "GET",
            url: searchURL.replace("{0}", searchKey).replace("{1}", engineID).replace("{2}", apiKey),
            success: function (result) {
                if (result.items.length > 0) {
                    $(".search-result-container").append(
                        "<h5 class='totalSearchResults'>" + result.items.length + 
                        " results found for '" + searchKey + "' via. Google Search.</h5>");

                    $.each(result.items, function (key, value) {
                        var initialFormatting = '<div class="row result"><h5><a target="_blank" href="{0}">{1}</a></h5><p>{2}</p></div>';
                        $(".search-result-container").append(
                            initialFormatting.replace("{0}", value.link).replace("{1}", value.title)
                            .replace("{2}", value.htmlSnippet)
                        );
                    });
                } else {
                    console.log("No Results");
                }
            }
        })

    } else {
        // Notify the user regarding the character length requirement.
        console.log("Not enough character length!");
    }

    return false;
});

/* Search trigger - using keydown event.
–––––––––––––––––––––––––––––––––––––––––––––––––– */
$("input#toSearch").keydown(function (e) {
    var keyPressed = e.which || e.keyCode;
    var searchKey = $(this).val();

    if (keyPressed === 13 && searchKey.length > 0) {
        $(".gcse-trigger").trigger('click');
    }
});
{% endhighlight %}

If we wish to simply view the returned result from the `GET` request we made using `Ajax`, we could add `console.log(result)` nested inside our `success: function(result){}`. A test query made for the search key, `server` returned a result as follows.

{% highlight json %}
{
    "kind": "customsearch#search",
    "url": {
        "type": "application/json",
        "template": "https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&relatedSite={relatedSite?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json"
    },
    "queries": {
        "request": [
            {
                "title": "Google Custom Search - server",
                "totalResults": "24",
                "searchTerms": "server",
                "count": 10,
                "startIndex": 1,
                "inputEncoding": "utf8",
                "outputEncoding": "utf8",
                "safe": "off",
                "cx": "010738197107477130202:cnkjahloicw"
            }
        ],
        "nextPage": [
            {
                "title": "Google Custom Search - server",
                "totalResults": "24",
                "searchTerms": "server",
                "count": 10,
                "startIndex": 11,
                "inputEncoding": "utf8",
                "outputEncoding": "utf8",
                "safe": "off",
                "cx": "010738197107477130202:cnkjahloicw"
            }
        ]
    },
    "context": {
        "title": "Prashant.me"
    },
    "searchInformation": {
        "searchTime": 0.201954,
        "formattedSearchTime": "0.20",
        "totalResults": "24",
        "formattedTotalResults": "24"
    },
    "items": [
        {
            "kind": "customsearch#result",
            "title": "Running a local media server using PleX.",
            "htmlTitle": "Running a local media <b>server</b> using PleX.",
            "link": "https://prashant.me/server/2017/02/02/running-a-local-media-server-using-plex.html",
            "displayLink": "prashant.me",
            "snippet": "Feb 2, 2017 ... Many of us tech enthusiasts dream of having their own media server, at least \nonce in their lifetime. Better serving, high speed and most of all, ...",
            "htmlSnippet": "Feb 2, 2017 <b>...</b> Many of us tech enthusiasts dream of having their own media <b>server</b>, at least <br>\nonce in their lifetime. Better serving, high speed and most of all,&nbsp;...",
            "cacheId": "DF_73i5WD1kJ",
            "formattedUrl": "https://prashant.me/server/.../running-a-local-media-server-using-plex.html",
            "htmlFormattedUrl": "https://prashant.me/<b>server</b>/.../running-a-local-media-<b>server</b>-using-plex.html",
            "pagemap": {
                "cse_thumbnail": [
                    {
                        "width": "395",
                        "height": "128",
                        "src": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQVTKuDUaD_VxX3AMDdyGGvs33eFdRKDvf0KTBIYu9Nn9uy60B6Ck-_G52V"
                    }
                ],
                "person": [
                    {
                        "name": "Prashant Shrestha"
                    }
                ],
                "metatags": [
                    {
                        "viewport": "width=device-width, initial-scale=1",
                        "google": "notranslate",
                        "geo.region": "US",
                        "geo.placename": "Virginia"
                    }
                ],
                "cse_image": [
                    {
                        "src": "https://i.imgur.com/oFXuG01.png"
                    }
                ],
                "blogposting": [
                    {
                        "name": "Running a local media server using PleX.",
                        "headline": "Running a local media server using PleX.",
                        "articlebody": "Many of us tech enthusiasts dream of having their own media server, at least once in their lifetime. Better serving, high speed and most of all, customized & organized media server. I love...",
                        "datepublished": "Thu, 02 Feb 2017 14:20:57 -0500",
                        "disqus": "https://prashant.me/server/2017/02/02/running-a-local-media-server-using-plex.html#"
                    }
                ]
            }
        },
        {
            "kind": "customsearch#result",
            "title": "Prashant Shrestha - Explore, Exploit, Secure, Share & Suffice! - page 8",
            "htmlTitle": "Prashant Shrestha - Explore, Exploit, Secure, Share &amp; Suffice! - page 8",
            "link": "https://prashant.me/page/8/",
            "displayLink": "prashant.me",
            "snippet": "traffic, network, redirection, server, administration, management, redir, proxy, \nroute. Normally, a web designer can grasp scrolling effects and the scrollbar \nlooks ...",
            "htmlSnippet": "traffic, network, redirection, <b>server</b>, administration, management, redir, proxy, <br>\nroute. Normally, a web designer can grasp scrolling effects and the scrollbar <br>\nlooks&nbsp;...",
            "cacheId": "Xpe8JsbkC14J",
            "formattedUrl": "https://prashant.me/page/8/",
            "htmlFormattedUrl": "https://prashant.me/page/8/",
            "pagemap": {
                "hcard": [
                    {
                        "fn": "Prashant Shrestha"
                    },
                    {
                        "fn": "Prashant Shrestha"
                    },
                    {
                        "fn": "Prashant Shrestha"
                    }
                ],
                "person": [
                    {
                        "name": "Prashant Shrestha"
                    },
                    {
                        "name": "Prashant Shrestha"
                    },
                    {
                        "name": "Prashant Shrestha"
                    }
                ],
                "metatags": [
                    {
                        "viewport": "width=device-width, initial-scale=1",
                        "google": "notranslate",
                        "geo.region": "US",
                        "geo.placename": "Virginia"
                    }
                ]
            }
        },
        {
            "kind": "customsearch#result",
            "title": "Speed up your site with Varnish Cache!",
            "htmlTitle": "Speed up your site with Varnish Cache!",
            "link": "https://prashant.me/server/2015/06/05/speed-up-your-site-with-varnish.html",
            "displayLink": "prashant.me",
            "snippet": "Jun 5, 2015 ... traffic, network, server, cache, memory, speed, website. Varnish Cache is a \nmodule which I believe is specifically developed for TEXT/HTML ...",
            "htmlSnippet": "Jun 5, 2015 <b>...</b> traffic, network, <b>server</b>, cache, memory, speed, website. Varnish Cache is a <br>\nmodule which I believe is specifically developed for TEXT/HTML&nbsp;...",
            "cacheId": "-YfwzR4kVH8J",
            "formattedUrl": "https://prashant.me/server/.../speed-up-your-site-with-varnish.html",
            "htmlFormattedUrl": "https://prashant.me/<b>server</b>/.../speed-up-your-site-with-varnish.html",
            "pagemap": {
                "cse_thumbnail": [
                    {
                        "width": "200",
                        "height": "200",
                        "src": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRtArFowRO3O6sisqOpVuTKSQQGmdQVMWyrnE1phmreIPMVf22EOUTOk2E"
                    }
                ],
                "person": [
                    {
                        "name": "Prashant Shrestha"
                    }
                ],
                "metatags": [
                    {
                        "viewport": "width=device-width, initial-scale=1",
                        "google": "notranslate",
                        "geo.region": "US",
                        "geo.placename": "Virginia"
                    }
                ],
                "cse_image": [
                    {
                        "src": "https://prashant.me/assets/images/image.png"
                    }
                ],
                "blogposting": [
                    {
                        "name": "Speed up your site with Varnish Cache!",
                        "headline": "Speed up your site with Varnish Cache!",
                        "articlebody": "Varnish Cache is a module which I believe is specifically developed for TEXT/HTML based hosting systems which enhances the performance of the hosted website significantly from either your RAM...",
                        "datepublished": "Fri, 05 Jun 2015 08:55:42 +0300"
                    }
                ]
            }
        },
        {
            "kind": "customsearch#result",
            "title": "Creating a Proxy redirection with Redir",
            "htmlTitle": "Creating a Proxy redirection with Redir",
            "link": "https://prashant.me/server/2015/05/29/creating-a-proxy-redirection-with-redir.html",
            "displayLink": "prashant.me",
            "snippet": "May 29, 2015 ... When you normally launch or host a website through Linux Web Server Software \nsuch as Apache, Lighttpd or Nginx, you will be freely ...",
            "htmlSnippet": "May 29, 2015 <b>...</b> When you normally launch or host a website through Linux Web <b>Server</b> Software <br>\nsuch as Apache, Lighttpd or Nginx, you will be freely&nbsp;...",
            "cacheId": "paLUQNGKm98J",
            "formattedUrl": "https://prashant.me/server/.../creating-a-proxy-redirection-with-redir.html",
            "htmlFormattedUrl": "https://prashant.me/<b>server</b>/.../creating-a-proxy-redirection-with-redir.html",
            "pagemap": {
                "person": [
                    {
                        "name": "Prashant Shrestha"
                    }
                ],
                "metatags": [
                    {
                        "viewport": "width=device-width, initial-scale=1",
                        "google": "notranslate",
                        "geo.region": "US",
                        "geo.placename": "Virginia"
                    }
                ],
                "blogposting": [
                    {
                        "name": "Creating a Proxy redirection with Redir",
                        "headline": "Creating a Proxy redirection with Redir",
                        "articlebody": "When you normally launch or host a website through Linux Web Server Software such as Apache, Lighttpd or Nginx, you will be freely publicizing your server’s IP Address unless you use a 3rd...",
                        "datepublished": "Fri, 29 May 2015 20:40:14 -0400",
                        "disqus": "https://prashant.me/server/2015/05/29/creating-a-proxy-redirection-with-redir.html#"
                    }
                ]
            }
        },
        {
            "kind": "customsearch#result",
            "title": "Prashant Shrestha - Explore, Exploit, Secure, Share & Suffice! - page 3",
            "htmlTitle": "Prashant Shrestha - Explore, Exploit, Secure, Share &amp; Suffice! - page 3",
            "link": "https://prashant.me/page/3/",
            "displayLink": "prashant.me",
            "snippet": "Better serving, high speed and most of all, customized & organized media server. \nI love watching movies during my free time or while stressed, considering I've a ...",
            "htmlSnippet": "Better serving, high speed and most of all, customized &amp; organized media <b>server</b>. <br>\nI love watching movies during my free time or while stressed, considering I&#39;ve a&nbsp;...",
            "cacheId": "rigneU-c1joJ",
            "formattedUrl": "https://prashant.me/page/3/",
            "htmlFormattedUrl": "https://prashant.me/page/3/",
            "pagemap": {
                "hcard": [
                    {
                        "fn": "Prashant Shrestha"
                    },
                    {
                        "fn": "Prashant Shrestha"
                    },
                    {
                        "fn": "Prashant Shrestha"
                    }
                ],
                "cse_thumbnail": [
                    {
                        "width": "225",
                        "height": "225",
                        "src": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRN36gToOJJCSV0Q2Pd5xlIb6Bgbzn85JHMfAQueNL-aWUfN05jKC7Suko"
                    }
                ],
                "person": [
                    {
                        "name": "Prashant Shrestha"
                    },
                    {
                        "name": "Prashant Shrestha"
                    },
                    {
                        "name": "Prashant Shrestha"
                    }
                ],
                "metatags": [
                    {
                        "viewport": "width=device-width, initial-scale=1",
                        "google": "notranslate",
                        "geo.region": "US",
                        "geo.placename": "Virginia"
                    }
                ],
                "cse_image": [
                    {
                        "src": "https://i.imgur.com/tAVUzzQ.png"
                    }
                ]
            }
        },
        {
            "kind": "customsearch#result",
            "title": "Self hosted Cloud 9 IDE, access it anywhere.",
            "htmlTitle": "Self hosted Cloud 9 IDE, access it anywhere.",
            "link": "https://prashant.me/server/2015/10/31/self-hosted-cloud-9-ide-access-it-anywhere.html",
            "displayLink": "prashant.me",
            "snippet": "Oct 31, 2015 ... server, hosted, cloud, ide, advanced, remote, code, program, ... useful if you have \na budget server such as mine and a fair amount of bandwidth.",
            "htmlSnippet": "Oct 31, 2015 <b>...</b> <b>server</b>, hosted, cloud, ide, advanced, remote, code, program, ... useful if you have <br>\na budget <b>server</b> such as mine and a fair amount of bandwidth.",
            "cacheId": "TeyhjUPedegJ",
            "formattedUrl": "https://prashant.me/server/.../self-hosted-cloud-9-ide-access-it-anywhere.html",
            "htmlFormattedUrl": "https://prashant.me/<b>server</b>/.../self-hosted-cloud-9-ide-access-it-anywhere.html",
            "pagemap": {
                "cse_thumbnail": [
                    {
                        "width": "255",
                        "height": "198",
                        "src": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTX-wH-sKY4rAxvmcUmmjCdjBN-TaHumFxlktzWjrcPh9sx7u-R1mTtlWzC"
                    }
                ],
                "person": [
                    {
                        "name": "Prashant Shrestha"
                    }
                ],
                "metatags": [
                    {
                        "viewport": "width=device-width, initial-scale=1",
                        "google": "notranslate",
                        "geo.region": "US",
                        "geo.placename": "Virginia"
                    }
                ],
                "cse_image": [
                    {
                        "src": "https://i.imgur.com/4SZb2Bh.png"
                    }
                ],
                "blogposting": [
                    {
                        "name": "Self hosted Cloud 9 IDE, access it anywhere.",
                        "headline": "Self hosted Cloud 9 IDE, access it anywhere.",
                        "articlebody": "Let’s keep this simple and precise, as a developer, you cannot have your workplace everywhere, with an increase in the cloud project repositories such as Github and Bitbucket which however...",
                        "datepublished": "Sat, 31 Oct 2015 20:38:33 +0300"
                    }
                ]
            }
        },
        {
            "kind": "customsearch#result",
            "title": "Cross-Origin Resource Sharing (CORS) with Ajax and NodeJS.",
            "htmlTitle": "Cross-Origin Resource Sharing (CORS) with Ajax and NodeJS.",
            "link": "https://prashant.me/development/2016/06/18/cross-origin-resource-sharing-cors-with-ajax-and-nodejs.html",
            "displayLink": "prashant.me",
            "snippet": "Jun 18, 2016 ... With the changes with client side and server side security policy regarding the \nHTTP requests and responses between two domains (origins), ...",
            "htmlSnippet": "Jun 18, 2016 <b>...</b> With the changes with client side and <b>server</b> side security policy regarding the <br>\nHTTP requests and responses between two domains (origins),&nbsp;...",
            "cacheId": "wz4y1p39WKgJ",
            "formattedUrl": "https://prashant.me/.../cross-origin-resource-sharing-cors-with-ajax-and- nodejs.html",
            "htmlFormattedUrl": "https://prashant.me/.../cross-origin-resource-sharing-cors-with-ajax-and- nodejs.html",
            "pagemap": {
                "cse_thumbnail": [
                    {
                        "width": "200",
                        "height": "200",
                        "src": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRtArFowRO3O6sisqOpVuTKSQQGmdQVMWyrnE1phmreIPMVf22EOUTOk2E"
                    }
                ],
                "person": [
                    {
                        "name": "Prashant Shrestha"
                    }
                ],
                "metatags": [
                    {
                        "viewport": "width=device-width, initial-scale=1",
                        "google": "notranslate",
                        "geo.region": "US",
                        "geo.placename": "Virginia"
                    }
                ],
                "cse_image": [
                    {
                        "src": "https://prashant.me/assets/images/image.png"
                    }
                ],
                "blogposting": [
                    {
                        "name": "Cross-Origin Resource Sharing (CORS) with Ajax and NodeJS.",
                        "headline": "Cross-Origin Resource Sharing (CORS) with Ajax and NodeJS.",
                        "articlebody": "With the changes with client side and server side security policy regarding the HTTP requests and responses between two domains (origins), new developers who are just getting the feel of the...",
                        "datepublished": "Sat, 18 Jun 2016 21:24:41 +0300"
                    }
                ]
            }
        },
        {
            "kind": "customsearch#result",
            "title": "Brief research about a Seedbox and deploying one.",
            "htmlTitle": "Brief research about a Seedbox and deploying one.",
            "link": "https://prashant.me/server/2017/01/30/brief-research-about-a-seedbox-and-deploying-one.html",
            "displayLink": "prashant.me",
            "snippet": "Jan 30, 2017 ... A seedbox is a remote server hosted in a high-bandwidth data center used for the \nsafely uploading and downloading of digital files.",
            "htmlSnippet": "Jan 30, 2017 <b>...</b> A seedbox is a remote <b>server</b> hosted in a high-bandwidth data center used for the <br>\nsafely uploading and downloading of digital files.",
            "cacheId": "WroZpNFfOEgJ",
            "formattedUrl": "https://prashant.me/server/.../brief-research-about-a-seedbox-and-deploying- one.html",
            "htmlFormattedUrl": "https://prashant.me/<b>server</b>/.../brief-research-about-a-seedbox-and-deploying- one.html",
            "pagemap": {
                "cse_thumbnail": [
                    {
                        "width": "344",
                        "height": "146",
                        "src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrHY4RXNEnc1XS1Hvq4r9l3I8yIbvbJo0GPjFzy8QkENAfqWrJsievR3H9"
                    }
                ],
                "person": [
                    {
                        "name": "Prashant Shrestha"
                    }
                ],
                "metatags": [
                    {
                        "viewport": "width=device-width, initial-scale=1",
                        "google": "notranslate",
                        "geo.region": "US",
                        "geo.placename": "Virginia"
                    }
                ],
                "cse_image": [
                    {
                        "src": "https://i.imgur.com/k28EhRc.jpg"
                    }
                ],
                "blogposting": [
                    {
                        "name": "Brief research about a Seedbox and deploying one.",
                        "headline": "Brief research about a Seedbox and deploying one.",
                        "articlebody": "A seedbox is a remote server hosted in a high-bandwidth data center used for the safely uploading and downloading of digital files. These speeds range from 100Mbps (8MB/s) to 10Gbps (1250MB/s)....",
                        "datepublished": "Mon, 30 Jan 2017 05:32:23 -0500",
                        "disqus": "https://prashant.me/server/2017/01/30/brief-research-about-a-seedbox-and-deploying-one.html#"
                    }
                ]
            }
        },
        {
            "kind": "customsearch#result",
            "title": "Prashant Shrestha - Explore, Exploit, Secure, Share & Suffice! - page 5",
            "htmlTitle": "Prashant Shrestha - Explore, Exploit, Secure, Share &amp; Suffice! - page 5",
            "link": "https://prashant.me/page/5/",
            "displayLink": "prashant.me",
            "snippet": "There are countless free image hosting services out there but having your own, \nseparate image server has different purpose of its own. There are lots of benefits\n ...",
            "htmlSnippet": "There are countless free image hosting services out there but having your own, <br>\nseparate image <b>server</b> has different purpose of its own. There are lots of benefits<br>\n&nbsp;...",
            "cacheId": "4UxmlfM2FxcJ",
            "formattedUrl": "https://prashant.me/page/5/",
            "htmlFormattedUrl": "https://prashant.me/page/5/",
            "pagemap": {
                "hcard": [
                    {
                        "fn": "Prashant Shrestha"
                    },
                    {
                        "fn": "Prashant Shrestha"
                    },
                    {
                        "fn": "Prashant Shrestha"
                    }
                ],
                "cse_thumbnail": [
                    {
                        "width": "339",
                        "height": "149",
                        "src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwfBM8sPWGJz9wqPMwwqdcGag0xzpncHJViQexYVDQn-zT47qAIB1z60kh"
                    }
                ],
                "person": [
                    {
                        "name": "Prashant Shrestha"
                    },
                    {
                        "name": "Prashant Shrestha"
                    },
                    {
                        "name": "Prashant Shrestha"
                    }
                ],
                "metatags": [
                    {
                        "viewport": "width=device-width, initial-scale=1",
                        "google": "notranslate",
                        "geo.region": "US",
                        "geo.placename": "Virginia"
                    }
                ],
                "cse_image": [
                    {
                        "src": "https://i.imgur.com/eFbN8c9.jpg"
                    }
                ]
            }
        },
        {
            "kind": "customsearch#result",
            "title": "Prashant Shrestha - Explore, Exploit, Secure, Share & Suffice! - page 4",
            "htmlTitle": "Prashant Shrestha - Explore, Exploit, Secure, Share &amp; Suffice! - page 4",
            "link": "https://prashant.me/page/4/",
            "displayLink": "prashant.me",
            "snippet": "With the changes with client side and server side security policy regarding the \nHTTP requests and responses between two domains (origins), new developers ...",
            "htmlSnippet": "With the changes with client side and <b>server</b> side security policy regarding the <br>\nHTTP requests and responses between two domains (origins), new developers&nbsp;...",
            "cacheId": "ZM2oKc6F1coJ",
            "formattedUrl": "https://prashant.me/page/4/",
            "htmlFormattedUrl": "https://prashant.me/page/4/",
            "pagemap": {
                "hcard": [
                    {
                        "fn": "Prashant Shrestha"
                    },
                    {
                        "fn": "Prashant Shrestha"
                    },
                    {
                        "fn": "Prashant Shrestha"
                    }
                ],
                "cse_thumbnail": [
                    {
                        "width": "300",
                        "height": "168",
                        "src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0IeEMU_G55VXIQm-OpALSFZtWm_VrIjM1tLJd6cKYjXW3b-ykAwF8HYo"
                    }
                ],
                "person": [
                    {
                        "name": "Prashant Shrestha"
                    },
                    {
                        "name": "Prashant Shrestha"
                    },
                    {
                        "name": "Prashant Shrestha"
                    }
                ],
                "metatags": [
                    {
                        "viewport": "width=device-width, initial-scale=1",
                        "google": "notranslate",
                        "geo.region": "US",
                        "geo.placename": "Virginia"
                    }
                ],
                "cse_image": [
                    {
                        "src": "https://i.imgur.com/CLOpk3A.jpg"
                    }
                ]
            }
        }
    ]
}
{% endhighlight %}

The `result` container to hold each search results are designed to be as simple and minimal as I possibly could.

{% highlight scss %}
/* Search Page styling */
.search-result-container{

    .result{
        border: 1px solid #D1D1D1;
        padding: 15px 20px;
        margin-bottom: 10px;
        border-radius: 3px;

        h5{
            font-size: 2rem;
            text-overflow: ellipsis;
        }
    }
}
{% endhighlight %}