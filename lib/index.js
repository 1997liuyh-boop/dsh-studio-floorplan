// <define:STUDIO_PROJECT>
var define_STUDIO_PROJECT_default = { schemaVersion: 1, id: "floorplan", name: "\u6237\u578B\u88C5\u4FEE\u8BBE\u8BA1", icon: "\u{1F3E0}", description: "2D \u6237\u578B\u4E0E\u5BB6\u5177\u5E03\u7F6E\u3001\u5899\u4F53\u62C6\u6539\u30013D \u6F2B\u6E38\u3001\u6750\u6599\u4F30\u4EF7\u548C\u65B9\u6848\u5BFC\u5165\u5BFC\u51FA", order: 17, entry: "/studio-projects/floorplan", capabilities: ["floorplan-2d", "floorplan-3d", "local-storage", "import-export"], compatibility: { host: "0.2.2-rc.1", runtime: "^0.5.0", worktable: "^0.6.0" } };

// packages/sdk/entry.ts
import { fileURLToPath } from "node:url";
var name = "dsh-studio-floorplan";
var inject = ["studioProjects"];
function apply(ctx) {
  ctx.effect(() => ctx.studioProjects.register({ id: "floorplan", ...define_STUDIO_PROJECT_default, root: fileURLToPath(new URL("../static/", import.meta.url)) }), "\u5DE5\u4F5C\u5BA4\uFF1Afloorplan");
}
export {
  apply,
  inject,
  name
};
