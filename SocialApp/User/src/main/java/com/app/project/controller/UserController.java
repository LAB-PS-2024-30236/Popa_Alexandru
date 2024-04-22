package com.app.project.controller;


import com.app.project.authentication.JsonLoginResponse;
import com.app.project.model.User;
import com.app.project.model.UsersLogged;
import com.app.project.service.UserService;
import com.app.project.service.UsersLoggedService;
import lombok.NonNull;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

import static com.app.project.authentication.LoginController.createJWT;

@RestController
@RequestMapping("api/user")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;
    private final UsersLoggedService usersLoggedService;

    public UserController(@NonNull UserService userService, UsersLoggedService usersLoggedService) {
        this.userService = userService;
        this.usersLoggedService = usersLoggedService;
    }

    @PostMapping("/register")
    public Mono<ResponseEntity<JsonLoginResponse>> saveUser(@RequestBody @NonNull final UserRegisterRequest request) {
        var user = userService.saveUserRegister(request);
        usersLoggedService.addEntry(UsersLogged.builder()
                .userId(user.getUserId())
                .timeWhenLogged(Timestamp.from(Instant.now()))
                .build());
        String token = String.valueOf(createJWT(user.getUserId().toString(), user.getEmail(), "user", 999999999));
        return Mono.just(ResponseEntity.ok(new JsonLoginResponse(token, user)));
    }

    @GetMapping("/getSession/{userId}")
    public Mono<User> getSession(@PathVariable Long userId) {
        return userService.findById(userId);
    }

    @GetMapping(value = "/getUserWithId:{id}")
    public Mono<User> getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }

    @GetMapping(value = "/allUsers")
    public Flux<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{userId}/change-password")
    public void changePassword(
            @PathVariable Long userId) {
        userService.changePassword(userId);
    }

    @PostMapping("/{userId}/change-password")
    public void changePassword(
            @PathVariable Long userId, @RequestBody PasswordChangeRequest request) {
        userService.changePasswordChange(userId, request.getOldPassword(), request.getNewPassword());
    }

    @GetMapping("/forgot-password/{userId}")
    public void forgotPassword(
            @PathVariable Long userId, @RequestBody PasswordForgottenRequest request) {
        userService.forgotPassword(userId, request.getEmail());
    }

    @PostMapping("/forgot-password/{userId}")
    public void forgotPasswordChange(
            @PathVariable Long userId, @RequestBody PasswordChangeRequest request) {
        userService.forgotPasswordChange(userId, request.getNewPassword());
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        return ResponseEntity.ok(userService.updateUser(user));
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/updateProfilePicture")
    public ResponseEntity<?> updateProfilePicture(@RequestBody UpdateProfilePictureRequest request) {
        var user = userService.findById(request.id).block();
        user.setProfilePicture(request.photoLink);
        userService.saveUser(user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("getUserBio/{userId}")
    public ResponseEntity<String> getUserBio(@PathVariable Long userId){
        return ResponseEntity.ok(userService.getUserBio(userId));
    }

    @GetMapping("/search/{username}")
    public ResponseEntity<List<User>> getUsersByUsernameContaining(@PathVariable String username) {
        List<User> users = userService.getUsersByUsernameContaining(username);
        if (users.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(users);
    }

}