import fs from "fs";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import log from "electron-log";

export function patchHostsFile(): void {
  log.info("Patching hosts");

  let hostFilePath = "C:\\windows\\system32\\drivers\\etc\\hosts";
  let hosts = fs.existsSync(hostFilePath)
    ? fs.readFileSync(hostFilePath).toString()
    : "";

  hosts +=
    "\n127.0.0.1 kh.ssl.ak.tiles.virtualearth.net\r\n127.0.0.1 khstorelive.azureedge.net\r\n";
  fs.writeFileSync(hostFilePath, hosts, {
    flag: "w"
  });
  log.info("Hosts patched", hosts);
}

export function unpatchHostsFile(): void {
  log.info("Unpatching hosts");
  let hosts = fs
    .readFileSync("C:\\windows\\system32\\drivers\\etc\\hosts")
    .toString();
  hosts = hosts
    .replaceAll("127.0.0.1 kh.ssl.ak.tiles.virtualearth.net\r\n", "")
    .replaceAll("127.0.0.1 khstorelive.azureedge.net\r\n", "")
    .replace(/^\s*\n/gm, "");

  fs.writeFileSync("C:\\windows\\system32\\drivers\\etc\\hosts", hosts);
  log.info("Hosts unpatched", hosts);
}
