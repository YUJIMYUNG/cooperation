package com.project.cooperation.config;

import com.project.cooperation.security.handler.APILoginFailHandler;
import com.project.cooperation.security.handler.APILoginSuccessHandler;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.AuthorizeRequestsDsl;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // BCRyptPasswordEncoder : 비밀번호 암호화, 비밀번호 체크 시 사용
    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    //인증/인가 및 로그아웃을 설정
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // 하단에서 정의한 cors를 설정함
                .formLogin(config ->{
                    config.loginPage("/api/auth/login");//로그인페이지
                    config.usernameParameter("id");
                    config.passwordParameter("password");
                    config.successHandler(new APILoginSuccessHandler());//성공하면 동작하게 하는 기능
                    config.failureHandler(new APILoginFailHandler());//로그인 실패하면 동작하게 하는 기능
                })
                //인증, 인가가 필요한 URL 지정
                .authorizeHttpRequests(authorizeReqeust ->
                        authorizeReqeust
                                .requestMatchers( "/api/member/**").authenticated()//인증 된 사용자는 projects, user 에 접근 가능
                                .requestMatchers("/api/projects/**","/api/auth/**").permitAll()//모든 사용자가 접근 가능
                        )
                .headers(
                        headersConfigurer ->
                                headersConfigurer
                                        .frameOptions(
                                                HeadersConfigurer.FrameOptionsConfig::sameOrigin
                                        )
                );

        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer(){
        return (web) ->
                web
                        .ignoring()
                        .requestMatchers(
                                PathRequest.toStaticResources().atCommonLocations()
                        );
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration corsConfiguration = new CorsConfiguration();

        corsConfiguration.setAllowedOriginPatterns(List.of("http://localhost:3000"));// 리액트 주소
        corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")); // 사용할 메서드
        corsConfiguration.setAllowedHeaders(List.of("*")); // 모든 헤더를 허락함
        corsConfiguration.setAllowCredentials(true); // 쿠키 포함 요청 여부 - 허락


        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration); // 모든 경로에 대해서 CORS 설정을 적용

        return source;
    }
}
