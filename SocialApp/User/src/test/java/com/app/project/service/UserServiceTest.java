package com.app.project.service;

import com.app.project.controller.UserRegisterRequest;
import com.app.project.model.User;
import com.app.project.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import org.mockito.Captor;
import org.mockito.ArgumentCaptor;
import reactor.test.StepVerifier;


class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Captor
    private ArgumentCaptor<User> userArgumentCaptor;


    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void saveUserRegister_ValidUser_SavesSuccessfully() {
        UserRegisterRequest registerRequest = new UserRegisterRequest("ioana", "test", "test@example.com", "Test User", LocalDate.of(1990, 1, 1), "1234567890");
        User user = new User();
        when(userRepository.save(any(User.class))).thenReturn(user);

        User savedUser = userService.saveUserRegister(registerRequest);

        assertNotNull(savedUser);
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void changePasswordChange_ValidOldPassword_ChangesPassword() {
        Long userId = 1L;
        String oldPassword = "test";
        String newPassword = "newPassword";
        User user = new User();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        user.setPassword(encoder.encode(oldPassword));

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        doAnswer(invocation -> invocation.getArgument(0)).when(userRepository).save(any(User.class));

        userService.changePasswordChange(userId, oldPassword, newPassword);

        verify(userRepository).save(userArgumentCaptor.capture());
        User savedUser = userArgumentCaptor.getValue();
        assertTrue(encoder.matches(newPassword, savedUser.getPassword()));
    }




    @Test
    void getUser_ValidUserId_ReturnsUser() {
        Long userId = 1L;
        User user = new User();
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));

        Mono<User> result = userService.getUser(userId);

        StepVerifier.create(result)
                .expectNext(user)
                .verifyComplete();
        verify(userRepository, times(1)).findById(userId);
    }

    @Test
    void deleteUser_ExistingUser_DeletesUser() {
        Long userId = 1L;
        when(userRepository.existsById(userId)).thenReturn(true);
        doNothing().when(userRepository).deleteById(userId);

        userService.deleteUser(userId);

        verify(userRepository, times(1)).deleteById(userId);
    }

}
