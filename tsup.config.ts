import { defineConfig } from "tsup"

export default defineConfig({
  format: ["esm"],
  target: "es2020",
  dts: false,
  clean: true,
  splitting: false,
})
