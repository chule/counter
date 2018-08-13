const date = new Date();
export const todaysDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

export const secondsToTime = (time) => {

    const addZero = value => {
        if (value < 10) {
            return "0" + value
        }

        return value
    }

    let hours = Math.floor(time / 3600)
    let minutes = Math.floor((time / 60) % 60)
    let seconds = time % 60

    return addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds)
} 