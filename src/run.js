import satori, { React } from 'satori.js' // React is required by the `eval` below.

export async function run(input) {
  // This allows the JSX to bind to `data.*`.
  let data = input.data;

  let jsx_js = input.jsx_js;
  let converted_jsx = eval(jsx_js);

  let fonts = [];
  await try_add_font(fonts, input.default_font || "Arial");
  // await try_add_font(fonts, input.default_font || "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", sans-serif");
  // await try_add_font(fonts, input.monospace_font || "Menlo, \"DejaVu Sans Mono\", \"Courier New\", monospace");

  const svg = await satori(
    converted_jsx,
    {
      width: input.width,
      height: input.height,
      embedFont: input.embed_font || false, // Disabled by default because slipwayhq.svg has better font support.
      debug: input.debug,
      fonts,
      loadAdditionalAsset: async (code, segment) => {
        console.log("Load additional asset requested: " + code);
        if (code === 'emoji') {
          return undefined;
        }
  
        let font = await slipway_host.font(code);
        if (font && font.data) {
          return font.data.buffer;
        }
      }
    },
  );

  return {
    svg: svg,
  };
}

async function try_add_font(fonts, query) {
  let font_result = await slipway_host.font(query);
  if (font_result) {
    if (!(font_result.data instanceof Uint8Array)) {
      throw new Error("Expected font data to be a Uint8Array.");
    }

    fonts.push({
      name: font_result.family,
      data: font_result.data.buffer,
      weight: 400,
      style: 'normal',
    })
  }
}