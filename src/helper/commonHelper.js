

// todo add default images
export const formatImage = (img) => {
    if (img) {
        return `data:image/png;base64,${img}`
    } else {
        return null
    }
}

export const formatTime = (date) => {

    let hour = date.getHours()
    let minutes = date.getMinutes()
    hour = hour < 10 ? `0${hour}` : hour
    minutes = minutes < 10 ? `0${minutes}` : minutes
    return `${hour}:${minutes}`
}