# Example

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


To get openlayers. cmd (from \dev level ?)
npm install openlayers
npm install --save-dev @types/openlayers

edit tsconfig.json compiler options  "allowJs":true,

get primeng going npm install primeng --save
need npm install font-awesome
may need npm install @angular/animations --save

Then app.module.ts needs
	import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
	import {ContextMenuModule, MenuItem} from 'primeng/primeng';
	
	
	and
	imports: [
    ....
    ..
    ....
    ContextMenuModule,
    BrowserAnimationsModule
  ],
  
  Global styles file "styles.css" to make menu work well
	.ui-contextmenu { font-size:0.5em  ;padding:0px; margin:0pt}
	.ui-menu-list { font-size:0.5em ;padding:0px; margin:0pt} /* Controlling width of pop out */
	.ui-menu-child { font-size:0.5em ;padding:0px; margin:0pt} /* Controlling ? */
	.ui-menuitem { font-size:2.5em ; padding:0px; margin:0pt}
	.ui-menuitem-text {font-size: 0.5em; padding:0pt; margin:0pt}  /* does do the text */
	.ui-menuitem-icon {font-size: 0.7em} /* does icon */
	.ui-submenu-icon {font-size:0.9em; } /* arrow */

	also in index.html
		<link rel="stylesheet" type="text/css" href="/node_modules/font-awesome/css/font-awesome.min.css" />
		<link rel="stylesheet" type="text/css" href="/node_modules/primeng/resources/themes/darkness/theme.css" />
		<link rel="stylesheet" type="text/css" href="/node_modules/primeng/resources/primeng.min.css" />
	plus	
		<body>
			<style type="text/css" >* {font-size:30px}</style>
			
	Package.json
	"private": true,
	  "dependencies": {
		"@angular/animations": "^4.4.6",
		"font-awesome": "^4.7.0",
		"primeng": "^4.2.2",
		"rxjs": "^5.1.0",
		"zone.js": "^0.8.4"
	  },
 
	Plus in angular-cli.json
	      "styles": [
        "../node_modules/font-awesome/css/font-awesome.min.css",
        "../node_modules/primeng/resources/primeng.min.css",
        "../node_modules/primeng/resources/themes/omega/theme.css",      
        "styles.css"
      ],
