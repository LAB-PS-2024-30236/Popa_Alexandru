package com.app.project.authentication;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.security.Key;
import java.util.Arrays;
import java.util.Base64;
import java.util.HashSet;
import java.util.Set;

public class ApiJsonWebTokenFilter implements Filter {

    private final Set<String> excludedPaths = new HashSet<>();
    private static final String SECRET_KEY = "ssdjfjfjfjrfffffssdjfjfjfjrfffffssdjfjfjff3422";

    @Override
    public void init(FilterConfig filterConfig) {
        String excludedPathConfig = filterConfig.getInitParameter("excludedPaths");
        if (excludedPathConfig != null) {
            excludedPaths.addAll(Arrays.asList(excludedPathConfig.split(",")));
        }
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String requestURI = httpRequest.getRequestURI();

        if (excludedPaths.stream().anyMatch(requestURI::startsWith)) {
            chain.doFilter(request, response);
            return;
        }

        String authHeader = httpRequest.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Missing or invalid Authorization header");
            return;
        }

        String token = authHeader.substring(7);

        try {
            decodeJWT(token);
            chain.doFilter(request, response);
        } catch (Exception e) {
            httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
        }
    }

    @Override
    public void destroy() {
    }

    public static void decodeJWT(String jwt) {
        byte[] apiKeySecretBytes = Base64.getDecoder().decode(SECRET_KEY);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, SignatureAlgorithm.HS256.getJcaName());

        Jws<Claims> jws = Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(jwt);

        jws.getBody();
    }
}