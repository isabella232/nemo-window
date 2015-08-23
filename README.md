## nemo-window

`nemo-window` is a plugin for Nemo automation framework. It provides methods to work with multiple browser-windows.


### Methods
```
	nemo.window.switchTab	: switches focus to other window
	nemo.window.switchFrame	: switches focus to new frame on page
	nemo.window.newWindow	: opens new window
	nemo.window.close		: close current window
	nemo.window.closeAll	: close all windows
	nemo.window.handles		: retrieve all window handles from session
	nemo.window.handle		: retrieve current window handle
	nemo.window.mainHandle	: retrieve parent window handle
```




#### switchTab(windowHandle)

Switches focus to particular Window/Tab in browser.

* If `windowHandle` is not provided, then it switches focus alternatively between two windows.
* If `windowHandle` is provided, then switches focus to particular window handle.

`@argument windowHandle {String} (optional, default switch tabs between two windows)`

`@returns {Web driver Promise}`


###### Usage:
```javascript
1. nemo.window.switchTab(); //switches focus alternatively

   e.g. if two windows, Window A and Window B, are open

        nemo.window.switchTab(); //switch focus to Window B
        nemo.window.switchTab(); //switch focus to Window A
        nemo.window.switchTab(); //switch focus back to Window B

2. nemo.window.switchTab('CD-W-2F3449'); //switches focus to window handle `CD-W-2F3449`
```

Please find the example at the end.

#### switchFrame(id)

Switches focus to another frame on page. `id` is required argument.

Please find the example at the end.

`@argument id {String} (required)`

`@returns {Web driver Promise}`

###### Usage:
```javascript
nemo.window.switchFrame('payPalTarget'); //switch focus to particular frame on page
```

#### close()

Closes current window (and focus on an other window)

Please find the example at the end.

`@returns {Web driver Promise}`

###### Usage:
```javascript
nemo.window.close(); //close the current window
```
#### closeAll()

Closes all the windows.

`@returns {Web driver Promise}`

###### Usage:
```javascript
nemo.window.closeAll(); //close all the windows
```
#### newWindow(url, name)

Opens new window in browser and automatically switches focus to new window.
Navigates to the Url automatically if `url` is provided. It is Optional.
Name the new Window if `name` is provided. It is Optional.

Please find the example at the end.

`@arguments url {String} (optional)`
`@arguments name {String} (optional)`

`@returns {Web driver Promise}`

###### Usage:
```javascript
1. nemo.window.newWindow(); //opens new window in browser, and switches focus to new Window
2. nemo.window.newWindow('www.paypal.com/signin'); //opens new window in browser and automatically navigates to `www.paypal.com/signin`
3. nemo.window.newWindow('www.paypal.com/signin', 'ppWindow'); //In addition to [2], it names the new window as `ppWindow`
```

#### handles()

Retrieve the list of all window handles available to the session.

`@returns {Array of the window handles as a Promise}`

###### Usage:
```javascript
nemo.window.handles().then(callback);
```

#### mainHandle()

Retrieve main/parent window handle

Please find the example at the end.

`@returns {main/parent window handle as a Promise}`

###### Usage:
```javascript
nemo.window.mainHandle().then(callback);
```

#### handle()

Retrieve current window handle

Please find the example at the end.

`@returns {current window handle as a Promise}`

###### Usage:
```bash
nemo.window.handle().then(callback);
```






### Installation

`npm install nemo-window --save-dev`

### Configuration

Add `nemo-window` plugin to your `config/config.json` under `plugins` section.

```javascript

    	"plugins": {
		    "window": {
		        "module": "nemo-window"
		    }
		 ...
	},
	...

```

### Example
```javascript

//this example assumes that window[A] is already launched by nemo

//launch new window[B] and navigate to PayPal.com. Note: it automatically switches focus to new window[B]
nemo.window.newWindow('http://www.paypal.com');

//get new window[B] handle
nemo.window.handle().then(callback);

//get main window[A] handle
nemo.window.mainHandle().then(callback); //returns main window handle

//switch to window[A], no need to provide handle if only two windows are open. it switches alternatively
nemo.window.switchTab(); //focus is on window[A]

//switch to window[B]
nemo.window.switchTab(); //focus is on window[B]

//close window[B] since the current focus is on window[B]. Note: it automatically switches focus to window[A]
nemo.window.close(); //close currently focused window

//this returns window[A] handle
nemo.window.handle().then(callback); //returns window[A] handle

```
