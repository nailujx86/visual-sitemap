var cachedEvent = null

function promiseHandler(evt, resolve) {
    evt.preventDefault()
    evt.stopPropagation()
    document.removeEventListener('click', promiseHandler)
    cachedEvent = evt
    console.log("cached!")
    console.log(evt)
    document.eventResolver({x: evt.x, y: evt.y})
}

function stopAndReturnClickEvent() {
    document.removeEventListener('click', promiseHandler)
    return new Promise((resolve, _reject) => {
        document.eventResolver = resolve
        document.addEventListener('click', promiseHandler)
    })
}

function continueEvent() {
    console.log("retrieved!")
    return cachedEvent.target.dispatchEvent(cachedEvent)
}