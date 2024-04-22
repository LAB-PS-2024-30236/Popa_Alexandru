package com.app.project.controller;

import com.app.project.service.UsersLoggedService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UsersLoggedController {

    private final UsersLoggedService usersLoggedService;


    public UsersLoggedController(UsersLoggedService usersLoggedService) {
        this.usersLoggedService = usersLoggedService;
    }

    @GetMapping("/getLoggedUsers")
    public UsersLoggedRequest getLoggedUsers(){
       return usersLoggedService.getLoggedUsers();
    }

    @DeleteMapping("/logout/{userId}")
    public void deleteLoggedEntry(@PathVariable Long userId){
        usersLoggedService.deleteEntry(userId);
    }
}