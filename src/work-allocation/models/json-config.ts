
export default class JsonConfig {

  /**
   * Turns a JSON object, typically received from an api call,
   * into a strongly-typed Task object.
   */
  public static fromJson<T>(json: object): T {
     // TODO: This possible needs more than simple coercion.
    const value = (json as unknown);
    return (value) as T;
  }
}
