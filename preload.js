var cachedTarget
var cachedEvent
var cacheExecuted = false

function promiseHandler(evt, resolve) {
    if (cacheExecuted) {
        cacheExecuted = false
        return
    }
    evt.preventDefault()
    evt.isDefaultPrevented = () => false
    document.removeEventListener('click', promiseHandler)
    cachedTarget = evt.target
    cachedEvent = new MouseEvent('click', evt.nativeEvent)
    console.log("cached!")
    return document.eventResolver({x: evt.x, y: evt.y})
}

function stopAndReturnClickEvent() {
    return new Promise((resolve, _reject) => {
        document.removeEventListener('click', promiseHandler)
        document.eventResolver = resolve
        document.addEventListener('click', promiseHandler)
    })
}

function continueEvent() {
    console.log("retrieved!")
    cacheExecuted = true
    cachedTarget.dispatchEvent(cachedEvent)
}