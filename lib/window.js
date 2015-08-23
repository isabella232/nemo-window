/*-----------------------------------------------------------------------------------------*\
 |  The MIT License (MIT)                                                                    |
 |                                                                                           |
 |  Copyright (c) 2015 PayPal                                                                |
 |                                                                                           |
 |  Permission is hereby granted, free of charge, to any person obtaining a copy             |
 |  of this software and associated documentation files (the "Software"), to deal            |
 |  in the Software without restriction, including without limitation the rights             |
 |  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell                |
 |  copies of the Software, and to permit persons to whom the Software is                    |
 |  furnished to do so, subject to the following conditions:                                 |
 |                                                                                           |
 |      The above copyright notice and this permission notice shall be included in           |
 |  all copies or substantial portions of the Software.                                      |
 |                                                                                           |
 |      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR           |
 |  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,                 |
 |      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE          |
 |  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER                   |
 |  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,            |
 |      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN            |
 |  THE SOFTWARE.                                                                            |
 \*---------------------------------------------------------------------------------------- */

'use strict';
var debug           = require('debug');
var log             = debug('nemo-window:log');

module.exports = function window(driver) {

	var handle = function () {
		log("[nemo-window] retrieve current handle");
		return driver.getWindowHandle();
	};

	var handles = function () {
		log("[nemo-window] retrieve all the window handles");
		return driver.getAllWindowHandles();
	};

	var switchTo = function (window) {
		log("[nemo-window] switch to window:", window);
		return driver.switchTo().window(window);
	};

	var switchTab = function (windowHandle) {

		if (typeof windowHandle !== 'string') {
			throw new Error('nemo-window: window handle should be a string');
		}

		if (windowHandle) {
			return switchTo(windowHandle);
		}

		var currentHandle;

		handle().then(function(handle) {
			currentHandle = handle;
		});

		return handles().then(function (tabIds) {
			if (tabIds && tabIds.length) {
				if(currentHandle === tabIds[0] && tabIds.length >= 2) {
					return switchTab(tabIds[1]);
				} else {
					return switchTab(tabIds[0]);
				}
			}
		});

	};

	var newWindow = function (url, name) {

		name = name || '\'\'';
		url = url || '\'\'';

		if (typeof url !== 'string' || typeof name !== 'string') {
			throw new Error('arguments are invalid to open new window');
		}
		log("[nemo-window] open new window");
		return driver.executeScript('window.open(' + url + ', ' + name + ')')
			.then(function () {
				return handles().then(function (handles) {
						return switchTab(handles.pop());
					}
				)
			});
	};

	var close = function (handle) {

		log("[nemo-window] close current window");
		var newDriver = driver.close();

		if (handle) {
			return switchTab(handle);
		}

		return newDriver;
	};

	var getMainWindowHandle = function () {
		log("[nemo-window] retrieve main window handle");
		return driver.getWindowHandle();
	};

	var switchFrame = function (id) {
		if (typeof id !== 'string') {
			throw new Error('nemo-window: frame id should be a string');
		}
		log("[nemo-window] switch to frame:", id);
		return driver.switchTo.frame(id);
	};

	var closeAll = function () {
		log("[nemo-window] close all windows");
		return driver.quit();
	};

	getMainWindowHandle();

	return {
		switchTab: switchTab,
		switchFrame: switchFrame,
		close: close,
		closeAll: closeAll,
		newWindow: newWindow,
		mainHandle: getMainWindowHandle,
		handles: handles,
		handle: handle
	};
};
