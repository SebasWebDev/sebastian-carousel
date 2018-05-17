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

| Attribute            | Default           | Possible values                                           |
| -------------------- | ------------------| --------------------------------------------------------- |
| `data-sc-theme`      | fullwidth         | fullwidth, content-dark, content-light, social, editorial |
| `data-sc-interval`   | 3000              | integer                                                   |
| `data-sc-autostart`  | false             | boolean                                                   |
| `data-sc-pagination` | true              | boolean                                                   |
| `data-sc-effect`     | fade              | fade, slide                                               |

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


The editorial theme allows you to add a caption to your pictures:

```html
<div data-sc data-sc-theme="editorial" data-sc-effect="slide">
    <div>
        <div class="caption">Lorem ipsum</div>
        <img src="img/dest1.png">
    </div>
    <div>
        <div class="caption">Lorem ipsum</div>
        <img src="img/dest2.png">
    </div>
    <div>
        <div class="caption">Lorem ipsum</div>
        <img src="img/dest3.png">
    </div>
    <div>
        <div class="caption">Lorem ipsum</div>
        <img src="img/dest4.png">
    </div>
</div>
```

### Author info ###

* Author: Sebastian Lopez
* Website: [http://sebaswebdev.com](http://sebaswebdev.com)

Did you find this plugin useful? Feel free to send donations to [https://www.paypal.me/SebasWebDev](https://www.paypal.me/SebasWebDev)