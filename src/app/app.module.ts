import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function isObject(value) {
  return value && typeof value === 'object' && value.constructor === Object;
}

declare global {
  interface Array<T> {
    groupBy(keyField: string): object;
    arrayToObject(keyField: string): object;
    unique(id: string): T[];
    addMoreItemProperty(idKey: string, idValue: string | number, updateData: any): T[];
    mergeArrayByProperty(idKey: string, otherArray: T[]): T[];
    sortByKey(order?: 'asc' | 'desc', keyName?: string): T[];
  }
  interface Number {
    minToTime(): any;
    purePhone(): string;
  }
  interface Object {
    sortValueAsArray(order?: 'asc' | 'desc', keyName?: string): object;
    filterProperty(idKey: string, filterFunction: any): object;
    mergeObject(defaultData: any): object;
    reduceValueAsArrayByKey(idKey: string): object;
    compareValueByFn(compareFunction: any): object;
  }

  interface String {
    capitalizeTxt(): string;
    purePhone(): string;
  }

}

String.prototype.capitalizeTxt = String.prototype.capitalizeTxt || function (lower = false) {
  return (lower ? this.toLowerCase() : this).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
};

String.prototype.purePhone = String.prototype.purePhone || function () {
  return this.toString().replace(/\s/g, '').replace(/\(/g, '').replace(/\)/g, '');
};

Number.prototype.purePhone = Number.prototype.purePhone || function () {
  return this.toString().replace(/\s/g, '').replace(/\(/g, '').replace(/\)/g, '');
};

Object.defineProperty(Object.prototype, 'mergeObject', {
  enumerable: false,
  value(defaultData: any) {
    const result = {};
    for (const [key, value] of Object.entries(defaultData)) {
      result[key] = isObject(value)
        ? this.mergeObject(this[key], defaultData[key])
        : this[key] ?? defaultData[key];
    }
    return result;
  }
});

Object.defineProperty(Object.prototype, 'compareValueByFn', {
  enumerable: false,
  value(compareFunction) {
    const result = {};
    for (const [key, value] of Object.entries(this)) {
      result[key] = compareFunction(value);
    }
    return result;
  }
});

Object.defineProperty(Object.prototype, 'reduceValueAsArrayByKey', {
  enumerable: false,
  value(idKey: string) {
    const result = {};
    for (const [key, list] of Object.entries(this)) {
      result[key] = (list as any[]).reduce((total, item) => total + (item[idKey] ?? 0), 0);
    }
    return result;
  }
});

Object.defineProperty(Object.prototype, 'filterProperty', {
  enumerable: false,
  value(idKey: string, filterFunction) {
    const result = {};
    const filtered = Object.values(this).filter(filterFunction);
    for (const item of filtered) {
      result[(item as any)[idKey]] = item;
    }
    return result;
  }
});

Object.defineProperty(Object.prototype, 'sortValueAsArray', {
  enumerable: false,
  value(order: 'asc' | 'desc' = 'asc', keyName?: string) {
    const result = {};
    for (const [key, valueAsArray] of Object.entries(this)) {
      const items = valueAsArray as any[] ?? [];
      result[key] = items.sortByKey(order, keyName);
    }
    return result;
  }
});

Object.defineProperty(Array.prototype, 'groupBy', {
  enumerable: false,
  value(prop) {
    return this.reduce((groups, item) => {
      const val = item[prop];
      groups[val] = groups[val] || [];
      groups[val].push(item);
      return groups;
    }, {});
  }
});

// new

Object.defineProperty(Array.prototype, 'addMoreItemProperty', {
  enumerable: false,
  value(idKey: string, idValue: string, updateData: any) {
    const target = this.find(item => item[idKey] === idValue);
    if (!target) {
      return [...this.filter(item => item[idKey] === idValue), updateData];
    }
    const newTarget = {};
    for (const [key, value] of Object.entries(target)) {
      newTarget[key] = value ? value + updateData[key] : updateData[key];
    }
    return [...this.filter(item => item[idKey] === idValue), newTarget];
  }
});

Object.defineProperty(Array.prototype, 'mergeArrayByProperty', {
  enumerable: false,
  value(idKey: string, otherArray: any[]) {
    return this.map(item => {
      const otherItem = otherArray.find(child => child[idKey] === item[idKey]);
      const newItem = {};
      for (const [key, value] of Object.entries(item)) {
        newItem[key] = value + otherItem[key];
      }
      return newItem;
    });
  }
});


Object.defineProperty(Array.prototype, 'unique', {
  enumerable: false,
  value(prop) {
    const result: any[] = [];
    const map = new Map();
    for (const item of this) {
      if (!map.has(item[prop])) {
        map.set(item[prop], true);    // set any value to Map
        if (item) { result.push(item); }
      }
    }
    return result;
  }
});


Object.defineProperty(Array.prototype, 'arrayToObject', {
  enumerable: false,
  value(keyField) {
    return this.reduce((obj, item) => {
      obj[item[keyField]] = item;
      return obj;
    }, {});
  }
});


Object.defineProperty(Array.prototype, 'sortByKey', {
  enumerable: false,
  value(order: 'asc' | 'desc' = 'asc', keyName?: string) {
    return this.sort((a, b) => {
      const aValue = keyName ? a[keyName] ?? 0 : a;
      const bValue = keyName ? b[keyName] ?? 0 : b;
      if (order === 'asc') {
        return aValue > bValue ? 1 : aValue === bValue ? 0 : -1;
      } else {
        return aValue > bValue ? -1 : aValue === bValue ? 0 : 1;
      }
    });
  }
});



Number.prototype.minToTime = function (): string {
  const hour = this / 60;
  const roundHour12 = hour >= 13 ? Math.floor(hour - 12) : Math.floor(hour);
  const minuteFull = ('0' + Math.round(this % 60)).slice(-2);
  const inText12Full = `${hour === 24 ? '00' : roundHour12}:${this % 60 === 0 ? '00' : minuteFull} ${hour >= 12 ? hour === 24 ? 'am' : 'pm' : 'am'}`;
  return inText12Full;
};
