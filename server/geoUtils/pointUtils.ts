export const createFeature = (data: CoordinateObject[]) => {
    const resultingPoints = {latlngs:[] as CoordinateTuple[], "color": "green"}
    console.log(data.length)
    for (const point of data) {
        const waypoint = [point.latitude, point.longitude] as CoordinateTuple

        resultingPoints.latlngs.push(waypoint);
        // const geoFeature = {
        //     "type": "Feature",
        //     "properties" : {
        //         "name": "strava data point"
        //     },
        //     "geometry": {
        //         "type": "Point",
        //         "coordinates": [point.longitude, point.latitude]
        //     }
        // }
        // resultingPoints.push(geoFeature)
    }
    console.log(data[0], data[data.length - 1])
    console.log(resultingPoints.latlngs[0], resultingPoints.latlngs[resultingPoints.latlngs.length - 1])
    return resultingPoints
}