const date = new Date();
export const todaysDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

export const secondsToTime = (time) => {

    const addZero = value => {
        if (value < 10) {
            return "0" + value
        }

        return value
    }

    let hours = 0,
        minutes = 0,
        seconds = 0;

    if (time > 3600) {
        hours = Math.floor(time / 3600)
        time = time % 3600
    }
    if (time > 60) {
        minutes = Math.floor(time / 60)
        seconds = time % 60
    } else {
        seconds = time
    }

    return addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds)
} 