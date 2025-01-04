import { ITemplate } from '@/types/templateType';
import * as yup from 'yup';
interface Component {
  type: string;
  [key: string]: any;
}

export function getComponentByType(type: string, jsonData?: ITemplate): Component | null {
  if (jsonData) {
    const components = jsonData.components;
    for (const component of components) {
      if (component.type === type) {
        return component;
      }
    }
  }
  return null;
}

export function convertArrayToObject(array: string[]): { [key: number]: string } {
  const object: { [key: number]: string } = {};
  for (let i = 0; i < array.length; i++) {
    object[i] = array[i];
  }
  return object;
}

export function filterArrayByIndex(arr: any[], indexesObj: { [key: number]: string }) {
  const filteredArray = [];
  for (const index in indexesObj) {
    if (indexesObj.hasOwnProperty(index) && indexesObj[index]) {
      const numericIndex = parseInt(index, 10);
      if (!isNaN(numericIndex) && numericIndex >= 0 && numericIndex < arr.length) {
        filteredArray.push(arr[numericIndex]);
      }
    }
  }
  return filteredArray;
}

export const urlValidationSchema = yup
  .string()
  .matches(
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    'Enter correct URL!'
  );

export function isWithinLast30Seconds(timestampStr: string): boolean {
  try {
    const timestamp = new Date(timestampStr);
    const currentTime = new Date();

    const timeDifference = currentTime.getTime() - timestamp.getTime();
    const thirtySeconds = 30 * 1000; // 30 seconds in milliseconds

    return timeDifference <= thirtySeconds;
  } catch (error) {
    return false;
  }
}

export function replaceValuesWithArray(text: string, values: string[]): string {
  return text.replace(/\{\{(\d+)\}\}/g, (_, index) => {
    const valueIndex = parseInt(index, 10) - 1;
    let replacement = values[valueIndex] || '';

    if (replacement.startsWith('{{') && replacement.endsWith('}}')) {
      replacement = replacement.slice(2, -2);
    }

    return `{{${replacement}}}`;
  });
}

export function replacePlaceholders(template: string, replacements: string[]) {
  const placeholderRegex = /{{\w+}}/g;

  let result = template;

  const matches = template.match(placeholderRegex);

  if (matches) {
    for (const match of matches) {
      const placeholderName = match.slice(2, -2); // Remove the curly brackets
      const replacement = replacements.shift(); // Get the replacement from the array

      if (replacement !== undefined) {
        result = result.replace(match, `{{${replacement}}}`);
      }
    }
  }

  return result;
}

export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    const newArr = [];
    for (let i = 0; i < obj.length; i++) {
      newArr[i] = deepClone(obj[i]);
    }
    return newArr as any as T; // Type assertion needed here
  }

  const newObj = {} as T; // Type assertion needed here
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[key] = deepClone(obj[key]);
    }
  }
  return newObj;
}
