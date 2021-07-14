
export function requireReloaded(modulePath) {
    delete require.cache[require.resolve(modulePath)];
    return require(modulePath);
}
