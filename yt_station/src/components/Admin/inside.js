export default {
  check: function (point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

    var x = point[0]
    var y = point[1]

    var inside = false

    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i][0]
      var yi = vs[i][1]
      var xj = vs[j][0]
      var yj = vs[j][1]

      var intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
      if (intersect) inside = !inside
    }

    return inside
  }
}
