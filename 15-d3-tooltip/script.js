const chartContainer = document.getElementById('chart-container')
const tooltip = document.getElementById('tooltip')
const chart  = d3.select('#chart');
const height = 600;
const width  = 600;

chartContainer.style.height = `${height}px`;
chartContainer.style.width  = `${width}px`;

const render = (selection, props) => {
  
  const { "circles": circles } = props;

  selection.selectAll("circle").data(circles)
    .enter().append("circle")
      .attr("cx", d => d.idx * 100 + 100)
      .attr("cy", height / 2)
      .attr("fill", "lightgreen")
      .attr("r", d => d.r)
      .on("mouseover", event => {
        tooltip.style.visibility = 'visible';
      })
      .on("mousemove", event => {
        tooltip.style.top = `${event.pageY + 18}px`;
        tooltip.style.left = `${event.pageX + 10}px`;
        tooltip.innerText = `(${event.pageX}, ${event.pageY})`
      })
      .on("mouseout", d => {
        tooltip.style.visibility = 'hidden';
      });
}

const circles = d3.range(5).map(
    idx => {
        return {idx: idx, r: 20  * Math.random() + 10}
    }
)
render(chart, { "circles": circles });