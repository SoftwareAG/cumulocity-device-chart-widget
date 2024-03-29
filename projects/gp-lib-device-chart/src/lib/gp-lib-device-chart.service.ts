/**
 * Copyright (c) 2020 Software AG, Darmstadt, Germany and/or its licensors
 *
 * SPDX-License-Identifier: Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


import { Injectable } from '@angular/core';
import { IManagedObject, InventoryService } from '@c8y/client';
import { get, has } from 'lodash-es';

 @Injectable()
export class GpLibDeviceChartService {
  constructor(public inventory: InventoryService) { }

  response: any;
  deviceResponse: any;
  devicesAll: any;
  deviceList: any;
  latestFirmwareVersion = 0;

  /** Fetches all child assets */
  async getDeviceData(config) {

    let dataSet = {};
    const group = await this.inventory.detail(config.device.id);
    this.response = group.data;

    if (this.response.hasOwnProperty('c8y_IsDevice')) {
      dataSet = this.getGroupedData(this.response, dataSet, config);
      return dataSet;
    } else {
      const filter: object = {
        pageSize: 2000,
        withTotalPages: true,
      };

      const { data, res, paging } = await this.inventory.childAssetsList(
        config.device.id,
        filter
      );
      this.response = data;
      if (config.groupby === 'versionIssuesName') {
        const firmwareData = await this.inventory.list({
          type: config.inventoryType,
        });
        if (firmwareData.data.length > 0) {
          this.latestFirmwareVersion = firmwareData.data[0].firmware.version;
        }
      }
      const promises = this.response.map(async (device) => {
        dataSet = await this.getGroupedData(device, dataSet, config);
      });
      await Promise.all(promises);
      return dataSet;
    }
  }

  /** It calculates the count for each type of selected Managed object parameter */
  async getGroupedData(it, dataSet, config) {

    let recordValue = get(it, config.groupby);

    if (config.groupby === 'versionIssuesName') {
      let versionIssues = 0;
      if (it.c8y_Firmware) {
        versionIssues = it.c8y_Firmware.version - this.latestFirmwareVersion;
        if (it.c8y_Firmware && versionIssues >= 0) {
          dataSet['No Risk'] = dataSet['No Risk'] + 1 || 1;
        } else if (it.c8y_Firmware && versionIssues === -1) {
          dataSet['Low Risk'] = dataSet['Low Risk'] + 1 || 1;
        } else if (it.c8y_Firmware && versionIssues === -2) {
          dataSet['Medium Risk'] = dataSet['Medium Risk'] + 1 || 1;
        } else if (it.c8y_Firmware && versionIssues <= -3) {
          dataSet['High Risk'] = dataSet['High Risk'] + 1 || 1;
        } else {
          dataSet['Not Available'] = dataSet['Not Available'] + 1 || 1;
        }
        
      }
     
    }
    if (typeof recordValue === 'object') {
      Object.keys(recordValue).map((key) => {
        if (typeof recordValue[key] === 'number') {
          dataSet[key] = dataSet[key] + recordValue[key] || recordValue[key];
        } else {
          if (config.value === undefined || config.value === '') {
            dataSet[key] = dataSet[key] + 1 || 1;
          } else {
            dataSet[key] =
              dataSet[key] + Number(it[config.value]) ||
              Number(it[config.value]);
          }

        }

      });

    } else if (recordValue !== undefined) {
      if (config.value === undefined || config.value === '') {
        dataSet[recordValue] = dataSet[recordValue] + 1 || 1;
      } else {
        dataSet[recordValue] =
          dataSet[recordValue] + Number(it[config.value]) ||
          Number(it[config.value]);
      }
    }
    if (config.innerChild) {
      const data = await this.getChildDevices(it);
      if (!!data) {
        const promises = data.map(async (childDevice) => {
          dataSet = await this.getGroupedData(childDevice, dataSet, config);
        });
        await Promise.all(promises);
      }

      return dataSet;
    } else {
      return dataSet;
    }
  }

  private async getChildDevices(parent: IManagedObject): Promise<IManagedObject[]> {
    if (parent.hasOwnProperty('c8y_IsAsset') && parent.childAssets.references.length > 0) {
      return (await this.inventory.childAssetsList(parent.id)).data
        .filter((childAsset) => childAsset.hasOwnProperty('c8y_IsDevice'));
    }

    if (parent.hasOwnProperty('c8y_IsDevice') && parent.childDevices.references.length > 0) {
      return (await this.inventory.childDevicesList(parent.id)).data;
    }

    return undefined;
  }
}
