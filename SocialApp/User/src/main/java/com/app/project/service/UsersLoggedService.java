package com.app.project.service;

import com.app.project.controller.UserLoggedRequestHelper;
import com.app.project.controller.UsersLoggedRequest;
import com.app.project.model.User;
import com.app.project.model.UsersLogged;
import com.app.project.repository.UserRepository;
import com.app.project.repository.UsersLoggedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsersLoggedService {
    @Autowired
    private UsersLoggedRepository usersLoggedRepository;

    @Autowired
    private UserRepository userRepository;

    private int getNumberOfLoggedUsers(){
        return usersLoggedRepository.findAll().stream().distinct().toList().size();
    }

    private List<User> getLoggedUsersProfiles() {
        List<Long> userIds = usersLoggedRepository.findAll().stream()
                .map(UsersLogged::getUserId)
                .distinct()
                .toList();

        return userIds.stream()
                .map(userRepository::findByUserId)
                .filter(Optional::isPresent)
                .map(Optional::get)
                .collect(Collectors.toList());
    }
    public UsersLoggedRequest getLoggedUsers() {
        int totalNumberOfLoggedUsers = getNumberOfLoggedUsers();
        List<User> loggedUsersProfiles = getLoggedUsersProfiles();

        List<UserLoggedRequestHelper> userLoggedRequestHelpers = loggedUsersProfiles.stream()
                .map(this::transformToUserLoggedRequestHelper)
                .collect(Collectors.toList());


        return UsersLoggedRequest.builder()
                .totalNumberOfLoggedUsers(totalNumberOfLoggedUsers)
                .userLoggedRequestHelper(userLoggedRequestHelpers)
                .build();
    }

    private UserLoggedRequestHelper transformToUserLoggedRequestHelper(User user) {
        UsersLogged usersLogged = usersLoggedRepository.findByUserId(user.getUserId()).get();
        return UserLoggedRequestHelper.builder()
                .profilePhoto(user.getProfilePicture())
                .username(user.getUsername())
                .name(user.getLastName()+" "+user.getFirstName())
                .userId(user.getUserId())
                .timeWhenLogged(usersLogged.getTimeWhenLogged())
                .build();
    }
    public void addEntry(UsersLogged usersLogged){
        usersLoggedRepository.save(usersLogged);
    }

    public void deleteEntry(Long userId){
        usersLoggedRepository.deleteByUserId(userId);
    }
}
