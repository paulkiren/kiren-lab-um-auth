// Email Service Eureka Client Configuration (email-service/src/config/eureka.js)
import Eureka from "eureka-js-client";

const eureka = new Eureka({
  instance: {
    app: "email-service",
    hostName: "localhost",
    ipAddr: "127.0.0.1",
    port: {
      $: 3000,
      "@enabled": true,
    },
    vipAddress: "email-service",
    dataCenterInfo: {
      "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
      name: "MyOwn",
    },
  },
  eureka: {
    host: "localhost",
    port: 8761,
    servicePath: "/eureka/apps/",
  },
});

export const startEurekaClient = () => {
  eureka.start((error) => {
    console.log(error || "Email service registered with Eureka");
  });
};
// Handle graceful shutdown
process.on("SIGINT", () => {
  eureka.stop((error) => {
    console.log(error || "Email service unregistered from Eureka");
    process.exit();
  });
});
