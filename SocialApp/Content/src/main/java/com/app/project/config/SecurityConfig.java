package com.app.project.config;
import com.app.project.authentication.ApiJsonWebTokenFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SecurityConfig {
    @Bean
    public FilterRegistrationBean<ApiJsonWebTokenFilter> apiJsonWebTokenFilterRegistrationBean() {
        FilterRegistrationBean<ApiJsonWebTokenFilter> registrationBean = new FilterRegistrationBean<>();
        ApiJsonWebTokenFilter apiJsonWebTokenFilter = new ApiJsonWebTokenFilter();
        registrationBean.setFilter(apiJsonWebTokenFilter);
        registrationBean.addUrlPatterns("");
        registrationBean.addInitParameter("excludedPaths", "/api/content/getFeedPosts/*,/api/content/getSections");

        return registrationBean;
    }
}
