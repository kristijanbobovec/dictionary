import { defineConfig } from "vite";
import createSvgSpritePlugin from "vite-plugin-svg-sprite";

export default defineConfig({
  plugins: [
    createSvgSpritePlugin({
      exportType: "vanilla",
      include: "**/assets/icons/*.svg",
      symbolId: "icon-[name]",
    }),
  ],
});
