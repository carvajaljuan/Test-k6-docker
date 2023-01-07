// Simple test modifications by JPCA
import http from "k6/http";
import { check, sleep } from "k6";
import { Counter } from "k6/metrics";

let ErrorCount = new Counter("errors");

export const options = {
  vus: 10,
  duration: "15s",
  thresholds: {
    errors: ["count<10"],
  },
};

export default function () {
  const path = Math.random() < 0.9 ? "200" : "500";
  // Sensitive url has been removed due data protection
  let res = http.get(`www.google.com`);
  //Expected response
  let success = check(res, {
    "status is 500": (r) => r.status === 200,
  });
  if (!success) {
    ErrorCount.add(1);
  }

  sleep(5);
}
