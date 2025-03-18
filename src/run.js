
import satori, { React } from 'satori.js'

let font_result = await slipway_host.font("Arial");

let font_data = new Uint8Array(font_result.data);

let jsx_js = input.jsx_js;
let converted_jsx = eval(jsx_js);

const svg = await satori(
  converted_jsx,
  {
    width: 600,
    height: 400,
    fonts: [
      {
        name: 'sans-serif',
        data: font_data.buffer,
        weight: 400,
        style: 'normal',
      },
    ],
  },
);

slipway_host.log_info(svg);

export let output = {
  svg: svg,
};
