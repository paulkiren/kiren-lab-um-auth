
package com.kirenlab.userservice.config;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import springfox.documentation.spring.web.plugins.Docket;
import static org.junit.jupiter.api.Assertions.assertNotNull;


@SpringBootTest
public class SwaggerConfigTest {

    @Test
    public void testApiBean() {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(SwaggerConfig.class);
        Docket docket = context.getBean(Docket.class);
        assertNotNull(docket, "Docket bean should not be null");
        context.close();
    }
}