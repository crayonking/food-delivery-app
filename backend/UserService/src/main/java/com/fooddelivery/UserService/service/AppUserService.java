package com.fooddelivery.UserService.service;

import com.fooddelivery.UserService.entity.AppUser;
import com.fooddelivery.UserService.repo.AppUserRepository;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class AppUserService {

    private final AppUserRepository appUserRepository;

    public AppUserService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }


    public AppUser getOrCreateUserFromJwt(Jwt jwt) {
        String keycloakId = jwt.getSubject();
        String email = jwt.getClaim("email");
        String name = jwt.getClaim("preferred_username");
//        List<String> roles = jwt.getClaim("realm_access").get("roles");
        List<String> roles = new ArrayList<>();
        Object realmAccessObj = jwt.getClaim("realm_access");

        if (realmAccessObj instanceof Map<?, ?> map) {
            Object rolesObj = map.get("roles");
            if (rolesObj instanceof List<?> rawList) {
                for (Object role : rawList) {
                    if (role instanceof String) {
                        roles.add((String) role);
                    }
                }
            }
        }

        return appUserRepository.findByKeycloakId(keycloakId)
                .orElseGet(() -> {
                    AppUser user = new AppUser();
                    user.setKeycloakId(keycloakId);
                    user.setEmail(email);
                    user.setName(name);
                    String selectedRole = "UNKNOWN";
                    if (roles.contains("ADMIN")) {
                        selectedRole = "ADMIN";
                    } else if (roles.contains("RESTAURANT_OWNER")) {
                        selectedRole = "RESTAURANT_OWNER";
                    } else if (roles.contains("CUSTOMER")) {
                        selectedRole = "CUSTOMER";
                    }

                    user.setRole(selectedRole);

                    return appUserRepository.save(user);
                });
    }
}
