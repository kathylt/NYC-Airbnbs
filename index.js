const m = {
    width: 1500,
    height: 1000
}

const svg = d3.select("body").append('svg')
    .attr('width', m.width)
    .attr('height', m.height)

const g = svg.append('g')

// neighborhoods.json taken from rat map example
d3.json('nygeo.json').then(function(data) {

    d3.csv('data.csv').then(function(pointData) {

        const albersProj = d3.geoAlbers()
            .scale(80000)
            .rotate([72, 0])
            .center([0, 42])
            .translate([2800, -1400]);

        // this code shows what albersProj really does
        // let point = pointData[0]
        // let arr = [ point['long'] , point['lat'] ]
        // let scaled = albersProj(arr)
        // console.log(scaled)

        const geoPath = d3.geoPath()
        .projection(albersProj)

        g.selectAll('path')
        .data(data.features)
        .enter()
        .append('path')
            .attr('fill', 'silver')
            .attr('d', geoPath)

        // plots circles on the boston map
         g.selectAll('.circle')
             .data(pointData)
             .enter()
             .append('circle')
                 .attr('cx', function(d) { 
                     let scaledPoints = albersProj([d['longitude'], d['latitude']])
                     return scaledPoints[0]
                 })
                 .attr('cy', function(d) {
                     let scaledPoints = albersProj([d['longitude'], d['latitude']])
                     return scaledPoints[1]
                 })
                 .attr('r', 7)
                 .attr('fill', '#FF5A5F')
                 .on( "click", function(){
                    d3.select(this)
                      .attr("opacity",1)
                      .transition()
                      .duration( 1000 )
                      .attr( "x", m.width * Math.round( Math.random() ) )
                      .attr( "y", m.height * Math.round( Math.random() ) )
                      .attr( "opacity", 0 )
                      .on("end",function(){
                        d3.select(this).remove();
                      })
                  });

        
    })
  
})