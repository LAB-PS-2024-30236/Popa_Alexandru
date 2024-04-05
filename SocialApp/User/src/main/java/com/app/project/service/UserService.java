package com.app.project.service;

import com.app.project.controller.UserRegisterRequest;
import com.app.project.model.User;
import com.app.project.repository.UserRepository;
import com.mailgun.api.v3.MailgunMessagesApi;
import com.mailgun.client.MailgunClient;
import com.mailgun.model.message.Message;
import com.mailgun.model.message.MessageResponse;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.time.Duration;
import java.util.Base64;
import java.util.Optional;
import java.util.function.Predicate;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    private static final String SECRET_KEY = "ssdjfjfjfjrfffffssdjfjfjfjrfffffssdjfjfjff3422";

    @CachePut(value = "userCache", key = "#result.userId")
    public User saveUserRegister(@NonNull UserRegisterRequest registerRequest) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String[] nameParts = registerRequest.getFullName().split(" ");

        checkIfValueInUse(registerRequest.getUsername(), "Username already in use", this::isUsernameInUse);
        checkIfValueInUse(registerRequest.getPhoneNumber(), "Phone number is already in use", this::isPhoneNumberInUse);
        checkIfValueInUse(registerRequest.getEmail(), "Email already in use", this::isEmailInUse);
        registerRequest.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setBirthdate(registerRequest.getBirthdate());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setPhoneNumber(registerRequest.getPhoneNumber());
        user.setRole("user");
        if (nameParts.length == 2) {
            user.setFirstName(nameParts[0]);
            user.setLastName(nameParts[nameParts.length - 1]);

        } else {
            throw new RuntimeException("Invalid name format");
        }
        return userRepository.save(user);
    }

    public User saveUser(@NonNull User user) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        checkIfValueInUse(user.getUsername(), "Username already in use", this::isUsernameInUse);
        checkIfValueInUse(user.getPhoneNumber(), "Phone number is already in use", this::isPhoneNumberInUse);
        checkIfValueInUse(user.getEmail(), "Email already in use", this::isEmailInUse);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public void changePasswordChange(Long userId, String oldPassword, String newPassword) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (passwordEncoder.matches( oldPassword, user.getPassword())) {
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
        }
    }

    public void changePassword(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        sendEmailForForgottenPassword(user.get(), false);
    }

    private void checkIfValueInUse(String value, String errorMessage, Predicate<String> checkFunction) {
        if (value != null && checkFunction.test(value)) {
            throw new IllegalStateException(errorMessage);
        }
    }

    @Cacheable(value = "userCache", key = "#id")
    public Mono<User> getUser(Long id) {
        return Mono.just(userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found")));
    }

    public Flux<User> getAllUsers() {
        return Flux.defer(() -> Flux.fromIterable(userRepository.findAll()))
                .subscribeOn(Schedulers.boundedElastic())
                .delayElements(Duration.ofSeconds(1));
    }

    public static Claims decodeJWT(String jwt) {
        byte[] apiKeySecretBytes = Base64.getDecoder().decode(SECRET_KEY);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, SignatureAlgorithm.HS256.getJcaName());

        Jws<io.jsonwebtoken.Claims> jws = Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(jwt);
        // Return the body containing the claims
        return (Claims) jws.getBody();
    }

    private boolean isEmailInUse(String email) {
        return findByEmail(email) != null;
    }

    private boolean isUsernameInUse(String username) {
        return findByUsername(username) != null;
    }

    private boolean isPhoneNumberInUse(String phoneNumber) {
        return findByPhoneNumber(phoneNumber) != null;
    }

    @Cacheable(value = "userCache", key = "#email")
    public User findByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.orElse(null);
    }

    @Cacheable(value = "userCache", key = "#username")
    public User findByUsername(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        return user.orElse(null);
    }

    @Cacheable(value = "userCache", key = "#phoneNumber")
    public User findByPhoneNumber(String phoneNumber) {
        Optional<User> user = userRepository.findByPhoneNumber(phoneNumber);
        return user.orElse(null);
    }

    public String getUserBio(Long userId){
        return userRepository.findByUserId(userId).get().getBio();
    }

    public void forgotPassword(Long userId, String email) {
        Optional<User> user = userRepository.findById(userId);
        sendEmailForForgottenPassword(user.get(), true);
    }

    public void forgotPasswordChange(Long userId, String newPassword) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        var user = userRepository.findById(userId);

        user.get().setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user.get());
    }

    private void sendEmailForForgottenPassword(User user, boolean forgotOrChange) {
        if (forgotOrChange == true) {
            String forgettenPasswordLink = "http://localhost:8080/api/user/forgot-password/" + user.getUserId();


            String subject = " Forgot password yolo";
            String body = "<p>Hi " + user.getFirstName() + " " + user.getLastName() + ",</p>" + "</br>" +
                    "<p>We got a request to reset your yolo password" + ".</p>" +
                    "<p><a href=\"" + forgettenPasswordLink + "\" style=\"padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none;\">Change Password</a></p>" +
                    "<h6 \"style=\"color: #808080;\">If you ignore this message nothing will happen. If you didn't request this password restart please contact us at alex24popa@gmail.com";

            Message message = Message.builder()
                    .from("hrubanandrada@gmail.com")
                    .to(user.getEmail())
                    .subject(subject)
                    .html(body)
                    .build();

            MailgunMessagesApi mailgunMessagesApi = MailgunClient.config("513eec4c933709bb149ce43a6e2e9d6c-8c9e82ec-7fd20ff7")
                    .createApi(MailgunMessagesApi.class);

            MessageResponse response = mailgunMessagesApi.sendMessage("sandboxc88fb7eb763145139b7e312a51af007a.mailgun.org", message);
        } else {
            String forgettenPasswordLink = "http://localhost:8080/api/user/change-password/" + user.getUserId();


            String subject = " Forgot password yolo";
            String body = "<p>Hi " + user.getFirstName() + " " + user.getLastName() + ",</p>" + "</br>" +
                    "<p>We got a request to reset your yolo password" + ".</p>" +
                    "<p><a href=\"" + forgettenPasswordLink + " \"style=\"padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border: none; border-radius: 5px; font-size: 16px; text-align: center; display: inline-block; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.2);\">Change Password</a></p>" +
                    "<h6 \"style=\"color: #808080;\">If you ignore this message nothing will happen. If you didn't request this password restart please contact us at alex24popa@gmail.com";

            Message message = Message.builder()
                    .from("hrubanandrada@gmail.com")
                    .to(user.getEmail())
                    .subject(subject)
                    .html(body)
                    .build();

            MailgunMessagesApi mailgunMessagesApi = MailgunClient.config("513eec4c933709bb149ce43a6e2e9d6c-8c9e82ec-7fd20ff7")
                    .createApi(MailgunMessagesApi.class);

            MessageResponse response = mailgunMessagesApi.sendMessage("sandboxc88fb7eb763145139b7e312a51af007a.mailgun.org", message);
        }


    }

    @CachePut(value = "userCache", key = "#result.userId")
    public User updateUser(User user) {
        if (!userRepository.existsById(user.getUserId())) {
            throw new RuntimeException("User not found with id: " + user.getUserId());
        }
        return userRepository.save(user);
    }

    @CacheEvict(value = "userCache", key = "#userId")
    public void deleteUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found with id: " + userId);
        }
        userRepository.deleteById(userId);
    }


    public Mono<User> findById(Long id) {
        return Mono.just(userRepository.findById(id).get());
    }

}