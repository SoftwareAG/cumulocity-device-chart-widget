# Cumulocity Widget - Device Chart   [<img width="35" src="https://user-images.githubusercontent.com/67993842/97668428-f360cc80-1aa7-11eb-8801-da578bda4334.png"/>](https://github.com/SoftwareAG/cumulocity-device-chart-widget/releases/download/1.0.1/device-chart-runtime-widget-1.0.0.zip)


##  Overview

This is an Angular 8 widget, which is designed to display the chart based on the device specific inventory data. Runtime Installation supported.
  
By Default the chart displays the count based on the input in the group by field of configuration. But if the input is provided in the value field of the widget configuration it gives the value sum of the provided field from device managed object.

The widget also comes with an inbuilt color picker, which helps one to customize chart/border colors.
 The charts available include
 * Vertical Bar Chart

* Horizontal Bar Chart

* Donut Chart

* Pie Chart

* Radar Chart

* Polar Chart

* Scatter Chart (Data set not ideal for this chart)

* Bubble Chart (Data set not ideal for this chart)

## Use Case

![DeviceChart](https://user-images.githubusercontent.com/67993842/91125981-99ffaa00-e6c0-11ea-80b5-32269311642f.PNG)

## Features

*  **Support single device and group devices:** Depends on Deviceid selected in widget configuration.
*  **Supports Alarm Chart:** It displays the Alarm chart if group by is set to c8y_ActiveAlarmsStatus in configuration.
*  **Supports Firmware Chart:** It displays the Firmware chart if group by is set to versionIssuesName in configuration.
*  **Fetch Inner child Devices:** Fetches Inventory data for chid devices only if Fetch innerchild devices is checked in configuration.
*  **Support multiple charts:** Based on chart type in configuration.

## Supported Cumulocity Environments:**
  
*  **App Builder:** Tested with Cumulocity App Builder version 1.2.1.
  
*  **Cockpit Application:** Tested with Cockpit 1006.3.0 with [Patch Fix](https://www.npmjs.com/package/cumulocity-runtime-widget-loader).

## Installation
  
### Runtime Widget Deployment?

* This widget support runtime deployment. Download [Runtime Binary](https://github.com/SoftwareAG/cumulocity-device-chart-widget/releases/download/1.0.1/device-chart-runtime-widget-1.0.0.zip) and follow runtime deployment instruction from [here](https://github.com/SoftwareAG/cumulocity-runtime-widget-loader).

### Installation of widget through Appbuilder or Cockipt Deployment?
  
**Prerequisites:**
  
* Git
  
* NodeJS (release builds are currently built with `v10.19.0`)
  
* NPM (Included with NodeJS)
  
**External dependencies:**

```

"@angular/cdk": "8.2.3",

"@angular/material": "8.2.3",

"chart.js": "^2.9.3",

"core-js": "^2.6.2",

"ng2-charts": "^2.3.2",

"@c8y/ngx-components": "^1006.3.0",

"@c8y/ng1-modules": "^1006.3.0",

"@c8y/style": "^1006.3.0",

```

**Installation Steps For App Builder:**

**Note:** If you are new to App Builder or not yet downloaded/clone app builder code then please follow [App builder documentation(Build Instructions)](https://github.com/SoftwareAG/cumulocity-app-builder) before proceeding further.

1. Open Your existing App Builder project and install external dependencies by executing below command or install it manually.
  - Angular fontawesome version 4.7.2

    Installation command:  ```npm i @angular/fontawesome@4.7.2 ``` 

  - Angular Material version 8.2.3

     Installation command: ```npm i @angular/material@8.2.3 ``` 

  - Ng2-charts version 2.3.2

    Installation command:  ```npm install ng2-charts@2.3.2 --save``` 

  - Chart.js version 2.9.3

      Installation command :  ```npm i chart.js@2.9.3 ``` 

2. Grab the Device Chart **[Latest Release Binary](https://github.com/SoftwareAG/cumulocity-device-chart-widget/releases/download/1.0.1/gp-lib-device-chart-1.1.0.tgz)**

3. Install the Binary file in app builder.

```
npm i <binary  file  path>/gp-lib-device-chart-1.0.0.tgz
```

4. Open index.less located at /cumulocity-app-builder/ui-assets/

5. Update index.less file with below theme. Import at first line in file/begining of file(Please ignore this step if it already exist).

```
@import '~@angular/material/prebuilt-themes/indigo-pink.css';
@import '~@c8y/style/main.less';
@import '~@c8y/style/extend.less';
```
6. Import GpLibDeviceChartModule in app.module.ts and also place the imported Module under `@NgModule`.

```

import { GpLibDeviceChartModule } from 'gp-lib-device-chart';

@NgModule({

  imports: [

    GpLibDeviceChartModule    

      ]

  })

```

7.  Congratulation! Installation is now completed. Now you can run app builder locally or build and deploy it into your tenant.
  
```
//Start App Builder
npm run start
// Build App
npm run build
// Deploy App
npm run deploy
```

**Installation Steps For Cockpit:**

**Note:** If you are new to Cockpit or not yet created any cockpit application then please follow [Web SDK for Angular](https://cumulocity.com/guides/web/angular/) before proceeding further.

1. Open Your existing Cockpit/Cumulocity project and install external dependencies by executing below command or install it manually.

  - Angular fontawesome version 4.7.2

    Installation command:  ```npm i @angular/cdk@8.2.3 ``` 

  - Angular Material version 8.2.3

     Installation command: ```npm i @angular/material@8.2.3 ``` 

  - Ng2-charts version 2.3.2

    Installation command:  ```npm install ng2-charts@2.3.2 --save``` 

  - Chart.js version 2.9.3

      Installation command :  ```npm i chart.js@2.9.3 ``` 

2. Grab the Device Chart **[Latest Release Binary](https://github.com/SoftwareAG/cumulocity-device-chart-widget/releases/download/1.0.1/gp-lib-device-chart-1.1.0.tgz)**

3. Install the Binary file in app builder.

```
npm i <binary  file  path>/gp-lib-device-chart-1.0.0.tgz
```

**Note:** If you don't find branding folder then please follow [Cumulocity Branding](https://cumulocity.com/guides/web/angular/#branding)

4. Open branding.less located at /cumulocity-app/branding/

5. In `branding.less ` import following design templates. Import at first line/begining of file(Please ignore this step if it already exist).

  ```

  @import '~@angular/material/prebuilt-themes/indigo-pink.css';

  @import '~font-awesome/less/font-awesome.less';

  @import '~@c8y/style/main.less';

  @import '~@c8y/style/extend.less';
  ```
6. Import GpLibDeviceChartModule in app.module.ts and also place the imported Module under `@NgModule`.

  ```

  import { GpLibDeviceChartModule } from 'gp-lib-device-chart';

  @NgModule({

    imports: [

      GpLibDeviceChartModule    

        ]

    })

  ```

7.  Congratulation! Installation is now completed. Now you can run your app locally or build and deploy it into your tenant.
  
```
//Start App Builder
npm run start
// Build App
npm run build
// Deploy App
npm run deploy
```

## Build Instructions
  
**Note:** It is only necessary to follow these instructions if you are modifying/extending this widget, otherwise see the [Installation Guide](#Installation).
  
**Prerequisites:**
  
* Git
  
* NodeJS (release builds are currently built with `v10.19.0`)
  
* NPM (Included with NodeJS)

**Instructions**

1. Clone the repository:
```
git clone https://github.com/SoftwareAG/cumulocity-device-chart-widget.git
```
2. Change directory:

  ```cd gp-device-chart-widget```

3. run npm i command to install all library files specified in source code

  ```npm i ``` 

4. run npm run buildMinor command to create a binary file under dist folder

  ```npm run buildMinor ``` 

5. (Optional) Local development server:
  
  ```npm start```

6. Build the app:

  ```npm run build```

7. Deploy the app:
  ```npm run deploy```

## QuickStart
This guide will teach you how to add widget in your existing or new dashboard.

1. Open the Application Builder from the app switcher (Next to your username in the top right)

2. Click Add application

3. Enter the application details and click Save

4. Select Add dashboard

5. Click Blank Dashboard

6. Enter the dashboard details and click Save

7. Select the dashboard from the navigation

8. Check for your widget and test it out.



Congratulations! Device Chart is configured.
  
## User Guide

1. Target Assets/Devices - deviceid/groupid of interest
2. Group By- provide the field name from the device managed object on which you want to group 
  For eg:-
    * To create Alarm chart set the field to c8y_ActiveAlarmsStatus.
    * To create firmware chart set the field to versionIssuesName.
    * To create chart that displays the device type count set the field to type.
3. Value(Optional) -provide the field name from the device managed object whose value sum you want display  
  For eg. :-
    * If you just want to display the count for each group by type then leave it empty.
    * To display the capacity for each groupby type then set the field to capacity.
    * To display the quantity for each groupby type then set the field to quantity.

4. Chart Type - type of chart that you want to display.
5. Legend - position of legend you want
6. You can toggle the slider if you want the results for child devices also
                
One can also select the custom chart color and Border color to beautify the chart, if not default colors will be picked.


## Troubleshooting

### Report a bug

Create a new issue in the [Issues](https://github.com/SoftwareAG/cumulocity-device-chart-widget/issues) section of this Git project and assign it to *Owner Full Name*. Set the tracker to `Bug` and provide a meaningful title. Make sure to describe the bug as detailed as possible and how the bug can be reproduced.

### Request a feature

Create a new issue in the [Issues](https://github.com/SoftwareAG/cumulocity-device-chart-widget/issues) section of this Git project and assign it to *Owner Full Name*. Set the tracker to `Requirement` and provide a meaningful title. Shortly describe the feature.


------------------------------
  
  
This widget is provided as-is and without warranty or support. They do not constitute part of the Software AG product suite. Users are free to use, fork and modify them, subject to the license agreement. While Software AG welcomes contributions, we cannot guarantee to include every contribution in the master project.
  
_____________________
  
For more information you can Ask a Question in the [TECHcommunity Forums](http://tech.forums.softwareag.com/techjforum/forums/list.page?product=cumulocity).
  
  
You can find additional information in the [Software AG TECHcommunity](http://techcommunity.softwareag.com/home/-/product/name/cumulocity).
