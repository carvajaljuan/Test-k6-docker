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

  let res = http.get(
    `https://apinp.puntoscolombia.com/auth/oauth/v2/authorize?response_type=code&nonce=none&prompt=none&state=TywyLDcyMzAzNTQ5&client_id=l7c4e0e3ce2e85458980d0437d4df697c2&scope=openid profile &redirect_uri=https://pcoseller-uat.puntoscolombia.com/ReceiveAuthorizationCode`
  );
  //Expected response 
  let success = check(res, {
    "status is 500": (r) => r.status === 500,
  });
  if (!success) {
    ErrorCount.add(1);
  }

  sleep(5);
}
