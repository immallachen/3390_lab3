d3.csv('cities.csv', d3.autoType).then(d=>{
	data = d.filter(city => city.eu == true);
	console.log('cities', data);
	renderPlot(data);
});

function renderPlot(data) {
	d3.select('.city-count').text("Number of cities: " + data.length);

	const width = 700;
	const height = 550;
	const svg = d3.select('.population-plot')
		.append('svg')
		.attr('width', width)
		.attr('height', height)
	const circles = svg.selectAll('.pop')
		.data(data)
		.enter()
		.append('circle')
		.attr('class', 'pop')
		.attr('cx', function (d){
			return d.x;
		})
		.attr('cy', function (d){
			return d.y;
		})
		.attr('r', function (d){
			if(d.population < 1000000) {
				return 4;
			}
			else {
				return 8;
			}
		})
		.style('fill', 'skyblue')
		.on("mouseover", function(event, d) {
			let tip = d3.select("#tooltip")
			  .style("left", (d.x+140) + "px")
			  .style("top", (d.y+40) + "px");
			tip.select("#country")
			  .text(d.country);
			tip.select("#city")
			  .text('City: ' + d.city);
			tip.select("#population")
			  .text('Population: ' + d.population);
			  
	  
			//Show the tooltip
			d3.select("#tooltip").classed("hidden", false);
		  })
		  .on("mouseout", function(d) {
			//Hide the tooltip
			d3.select("#tooltip").classed("hidden", true);
		  });
	const labels = svg.selectAll('.name')
		.data(data)
		.enter()
		.append('text')
		.attr('class', 'name')
		.attr('x', function(d) { return d.x; })
		.attr('y', function(d) { return d.y-14; })
		.attr('text-anchor', 'middle')
		.text( function (d) { 
			if(d.population < 1000000) {
				return '';
			}
			else {
				return d.country;
			}
		})
		.attr('font-size', '11px');
}

d3.csv('buildings.csv', d3.autoType).then(d=>{
	data = d.sort((a, b) => b.height_ft - a.height_ft);
	console.log('buildings', data);
	renderChart(data);
});

function renderChart(data) {
	const width = 500;
	const height = 500;
	const svg = d3.select('.buildings-chart')
		.append('svg')
		.attr('width', width)
		.attr('height', height);
	const bars = svg.selectAll('.building')
		.data(data)
		.enter()
		.append('rect')
		.attr('class', 'building')
		.on("click", function(e, d) {
			d3.select('.image').attr("src", './img/'+ d.image);
			d3.select('.building-name').text(d.building);
			d3.select('.height').text(d.height_ft);
			d3.select('.city').text(d.city);
			d3.select('.country').text(d.country);
			d3.select('.floors').text(d.floors);
			d3.select('.completed').text(d.completed);
		})
		.attr('width', function (d){
			return d.height_px;
		})
		.attr('height', function (d){
			return 40;
		})
		.attr('x', function (d, i){
			return 220;
		})
		.attr('y', function (d, i){
			return (i*40)+(5*i);
		})
		.style('fill', 'orange');
	const names = svg.selectAll('.names')
		.data(data)
		.enter()
		.append('text')
		.attr('class', 'names')
		.attr('x', function(d) { return 0; })
		.attr('y', function(d, i) { return (i*40)+(5*i)+25; })
		.text( function (d) { 
			return d.building;
		})
		.attr('font-size', '14px');
	const labels = svg.selectAll('.labels')
		.data(data)
		.enter()
		.append('text')
		.attr('class', 'labels')
		.attr('x', function(d) { return 180+d.height_px; })
		.attr('y', function(d, i) { return (i*40)+(5*i)+25; })
		.text( function (d) { 
			return d.height_ft+' ft';
		})
		.attr('font-size', '12px')
		.attr('fill', 'white');
}