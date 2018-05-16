# Sebastian Carousel JS #

Auto executable carousel plugin based on data attributes.
* No script execution needed.
* Can work only with data attributes.
* Responsive
* Flixible (4 different settings and layout)
* Validates every option and lets you know what's the issue.


## Usage ##

Add the CSS link in the `head` part of the HTML for base styling:

```html
<head>
...
<link href="sebastian-carousel.css" rel="stylesheet" type="text/css" />
</head>
```

Add the script tag at the bottom of the `body` part of the HTML:

```html
...
<script src="sebastian-carousel.js"></script>
</body>
```

### HTML attributes usage ###

To apply the script to an element, add the attribute `data-sc` and that's it.

```html
<div data-sc>
    <div>
        <img src="img/home1.jpg">
    </div>
    <div>
        <img src="img/home2.jpg">
    </div>
    <div>
        <img src="img/home3.jpg">
    </div>
    <div>
        <img src="img/home4.jpg">
    </div>
    <div>
        <img src="img/home5.jpg">
    </div>
</div>
```

### Additional settings ###

Example using configuration for theme and autostart:
```html
<div data-sc data-sc-theme="fullwidth" data-sc-autostart="true">
    <div>
        <img src="img/home1.jpg">
    </div>
    <div>
        <img src="img/home2.jpg">
    </div>
    <div>
        <img src="img/home3.jpg">
    </div>
    <div>
        <img src="img/home4.jpg">
    </div>
    <div>
        <img src="img/home5.jpg">
    </div>
</div>
```

| Attribute            | Default           | Possible values  |
| -------------------- | ------------------| ---------------- |
| `data-sc-theme`      | fullwidth         | fade, slide      |
| `data-sc-interval`   | 3000              | integer          |
| `data-sc-autostart`  | false             | boolean          |
| `data-sc-pagination` | true              | boolean          |
| `data-sc-effect`     | fade              | boolean          |


### Setup for development ###

`npm run setup`

After running that command, open the index.html file in any browser.

## Develop ##

`npm start`

## Run tests ##

`npm test`


### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Author info ###

* Author: Sebastian Lopez
* Website: [http://sebaswebdev.com](http://sebaswebdev.com)
