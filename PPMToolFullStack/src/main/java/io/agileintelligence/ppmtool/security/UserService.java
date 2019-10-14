package io.agileintelligence.ppmtool.security;

import io.agileintelligence.ppmtool.domain.User;
import io.agileintelligence.ppmtool.exceptions.UsernameAlreadyExistsException;
import io.agileintelligence.ppmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser(User newUser) {
        try {
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));

            // username has to be unique
            newUser.setUsername(newUser.getUsername());

            // Dont persist or show confirm password
            newUser.setConfirmPassword("");

            return userRepository.save(newUser);
        }catch (Exception e) {
            throw new UsernameAlreadyExistsException("Username " + newUser.getUsername() + " already exists");
        }
    }
}
