import { scaleLinear, scaleBand, scaleSequential, scaleDiverging } from "d3";

export const Scales = {
    linear: (min_value, max_value, start_pos, end_pos) => {
        console.log('the linear scale');
        return scaleLinear()
            .range([start_pos, end_pos])
            .domain([min_value, max_value])
            .nice();
        },
    band: (discreteValue, start_pos, end_pos) => {
        // console.log('the discrete scale');
        // console.log(stations);
        return scaleBand()
        .range([start_pos, end_pos])
        .domain(discreteValue);
    },
    colormapLiner: (domainArry, rangeArrage) => {
        return scaleLinear()
            .domain(domainArry)
            .range(rangeArrage)
    },
    colorSequential:(domainArry, colorScheme) => {
        return scaleSequential(colorScheme)
            .domain(domainArry);
    },
    colorDiverging:(domainArry, colorScheme) => {
        return scaleDiverging(colorScheme)
            .domain(domainArry);
    }
    }