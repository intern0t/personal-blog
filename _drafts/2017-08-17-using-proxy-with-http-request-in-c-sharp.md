---
layout: post
title: "Using Proxies with HTTP Request in C#." 
author: Prashant Shrestha 
date: 2017-08-17 12:57:27 -400 
categories: development
tags: c# csharp develop proxy anonymous request .net visualstudio
---

{% highlight c# %}
HttpWebRequest webRequest = (HttpWebRequest)WebRequest.CreateHttp("http://freegeoip.net/json/");
webRequest.Proxy = new WebProxy("127.0.0.1:8080");
HttpWebResponse webResponse = (HttpWebResponse) webRequest.GetResponse();
{% endhighlight %}