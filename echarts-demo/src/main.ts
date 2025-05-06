import {renderGauge} from "./echarts/gauge.ts";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div id="echarts" style="width: 210px; height: 200px"></div>
`

renderGauge(document.getElementById('echarts')!)