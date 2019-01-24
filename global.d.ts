/// <reference path="index.d.ts" />

import { RPGAtsumaruApi } from "@atsumaru/api-types";

declare global {
  interface Window {
    RPGAtsumaru?: RPGAtsumaruApi
  }
}
