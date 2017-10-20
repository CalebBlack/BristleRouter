# BristleRouter
Create single page applications with BristleJS. The BristleRouter function returns a Bristle object given a map of routes with Bristles as values.

## Example
```
import Bristle from 'bristlejs';
import BristleRouter from 'bristlerouter';

var app = new Bristle({type:div,id:'app'},null,document.body);
var home = new Bristle('p','Welcome to the homepage.');
var help = new Bristle('p','Contact us at support@fakemail.com');
BristleRouter({'/':home,'/help':help}).appendTo(app);
```
