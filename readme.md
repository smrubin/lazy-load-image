## lazy-load-image

[![GitHub license](https://img.shields.io/github/license/smrubin/lazy-load-image.svg)](https://github.com/smrubin/lazy-load-image/blob/master/LICENSE)


A module to lazy load images using the Intersection Observer API. Targets images with a specified DOMString selector. Specify distances from viewport at which to actually make the HTTP request to load the image(s).

#### Example

Install:

```
npm i -S @smrubin/lazy-load-image
```

Add `data-lazyload` attribute to img elements to be lazy loaded. Leave src attribute as empty string or use a loading indicator.

```html
<body>
	<img class="targetSelector" src="" data-lazyload="http://placekitten.com/200/200" />
	<img class="targetSelector" src="" data-lazyload="./dog.png" />

    <img class="targetSelector" src="loading.gif" data-lazyload="./big_dog.png" />
</body>
```

Import and invoke the module.

```js
import LazyLoad from 'lazy-load-image';

new LazyLoad('.targetSelector');

```

#### Options

```
new LazyLoad(selector, rooMargin)
```

selector - Required. A DOMString containing one or more selectors to match against.

rootMargin - Optional. Margin around the root (viewport). Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px". The values can be percentages. Defaults to 200px. With respect to lazy loading the image, how much margin between the element and the viewport before the image load is performed.
