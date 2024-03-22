package com.app.project.authentication;

import com.app.project.model.User;
import com.app.project.service.UserService;
import io.jsonwebtoken.*;
import lombok.NonNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Base64;
import java.util.Date;



@RestController
@CrossOrigin(origins = "*")

public class LoginController {

    private final UserService userService;
    private static final String SECRET_KEY = "ssdjfjfjfjrfffffssdjfjfjfjrfffffssdjfjfjff3422";

    public LoginController(@NonNull final UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/api/login")
    public Mono<ResponseEntity<JsonLoginResponse>> login(@RequestBody @NonNull final JsonLoginRequest request) {
        User user = new User();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        if (request.getEmail() != null) {
            user = userService.findByEmail(request.getEmail());
        } else if (request.getUsername() != null) {
            user = userService.findByUsername(request.getUsername());
        } else if (request.getPhoneNumber() != null) {
            user = userService.findByPhoneNumber(request.getPhoneNumber());
        }

        if (user != null && passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            String token = String.valueOf(createJWT(user.getUserId().toString(), user.getEmail(), user.getRole(), 999999999));
            return Mono.just(ResponseEntity.ok(new JsonLoginResponse(token, user)));
        } else {
            return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null));
        }
    }

    public static String createJWT(String id, String subject,String role, long ttlMillis) {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        byte[] apiKeySecretBytes = Base64.getDecoder().decode(SECRET_KEY);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());

        JwtBuilder builder = Jwts.builder()
                .setId(id)
                .setIssuedAt(now)
                .setSubject(subject)
                .setAudience(role)
                .setIssuer("popa&robert")
                .signWith(signingKey, signatureAlgorithm);

        if (ttlMillis >= 0) {
            long expMillis = nowMillis + ttlMillis;
            Date exp = new Date(expMillis);
            builder.setExpiration(exp);
        }

        return builder.compact();
    }

    public static Claims decodeJWT(String jwt) {
        byte[] apiKeySecretBytes = Base64.getDecoder().decode(SECRET_KEY);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, SignatureAlgorithm.HS256.getJcaName());

        Jws<Claims> jws = Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(jwt);

       return jws.getBody();
    }
}
