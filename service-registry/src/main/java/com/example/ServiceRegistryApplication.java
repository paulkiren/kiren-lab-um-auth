// Service Registry Application (service-registry/src/main/java/com/example/ServiceRegistryApplication.java)
@SpringBootApplication
@EnableEurekaServer
public class ServiceRegistryApplication {
    public static void main(String[] args) {
        SpringApplication.run(ServiceRegistryApplication.class, args);
    }
}

// Service Registry Configuration (service-registry/src/main/resources/application.yml)
server:
  port: 8761

spring:
  application:
    name: service-registry

eureka:
  client:
    registerWithEureka: false
    fetchRegistry: false
  server:
    waitTimeInMsWhenSyncEmpty: 0