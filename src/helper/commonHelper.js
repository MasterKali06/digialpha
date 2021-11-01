

// todo add default images
export const formatImage = (img) => {
    if (img) {
        return `data:image/png;base64,${img}`
    } else {
        return null
    }
}