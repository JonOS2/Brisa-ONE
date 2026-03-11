package com.example.brisa.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.brisa.dtos.auth.RegisterDTO;
import com.example.brisa.exceptions.ConflictException;
import com.example.brisa.models.auth.UserModel;
import com.example.brisa.repositories.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserModel registerUser(RegisterDTO data) throws ConflictException {
        // Verificar se o usuário já existe
        if (userRepository.findByLogin(data.login()) != null) {
            throw new ConflictException("User already exists.");
        }
        if (userRepository.findByEmail(data.email()) != null) {
            throw new ConflictException("Email already exists.");
        }
        String encryptedPassword = passwordEncoder.encode(data.password());
        UserModel newUser = new UserModel(data.login(), encryptedPassword, data.email(), data.gender(), data.dateOfBirth());
        userRepository.save(newUser);

        return newUser; 
    }
    
    public String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

}
