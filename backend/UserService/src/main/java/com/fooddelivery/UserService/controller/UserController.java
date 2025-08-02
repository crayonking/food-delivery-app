package com.fooddelivery.UserService.controller;

import com.fooddelivery.UserService.entity.AppUser;
import com.fooddelivery.UserService.service.AppUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final AppUserService appUserService;

    public UserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }

    @GetMapping("/me")
    public ResponseEntity<AppUser> getUserProfile(@AuthenticationPrincipal Jwt jwt) {
        AppUser user = appUserService.getOrCreateUserFromJwt(jwt);
        return ResponseEntity.ok(user);
    }
}
