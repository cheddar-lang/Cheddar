const fit = (min, max, value) => {
    while(value < min) value += max;
    while(value >= max) value -= max;
    return value;
}

export default fit;
