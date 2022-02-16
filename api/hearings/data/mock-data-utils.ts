export function getRandomElement<T>(element: T[]): T {
  return element[Math.floor(Math.random() * element.length)];
}

export function getRandomProperty<T>(element: T): T {
  const keys = Object.keys(element);
  return element[keys[Math.floor(Math.random() * keys.length)]];
}
