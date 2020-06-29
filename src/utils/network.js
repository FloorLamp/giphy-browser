export const isSlowConnection = () => {
    const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection
    return connection && connection.effectiveType !== "4g"
}
