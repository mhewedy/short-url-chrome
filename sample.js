// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var apiUrl = "http://short-url.herokuapp.com/api/shorten?url=";
var urlTitle = "Copy link address";
var imgTitle = "Copy image URL";
  
// A generic onclick callback function.
function onclickLinkfn(info, tab) {
	ajax(info.linkUrl);
}

function onclickImagefn(info, tab) {
	ajax(info.srcUrl);
}

function copyToClipboard( text ){
	var copyDiv = document.createElement('div');
	copyDiv.contentEditable = true;
	document.body.appendChild(copyDiv);
	copyDiv.innerHTML = text;
	copyDiv.unselectable = "off";
	copyDiv.focus();
	document.execCommand('SelectAll');
	document.execCommand("Copy", false, null);
	document.body.removeChild(copyDiv);
}

function ajax(url){
	var xhr = new XMLHttpRequest();
	xhr.open("GET", apiUrl + url, true);
	xhr.onreadystatechange = function() {
	  if (xhr.readyState == 4) {
		var resp = JSON.parse(xhr.responseText);
		copyToClipboard(resp.short_url);
		alert('Copied to clipboard!');
	  }
	}
	xhr.send();
}
chrome.contextMenus.create({"title": urlTitle, "contexts": ["link"], "onclick": onclickLinkfn});
chrome.contextMenus.create({"title": imgTitle, "contexts": ["image"], "onclick": onclickImagefn});