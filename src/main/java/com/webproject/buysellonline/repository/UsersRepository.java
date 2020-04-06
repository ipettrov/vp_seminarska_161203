package com.webproject.buysellonline.repository;

import com.webproject.buysellonline.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);

    User findByEmail(String email);

    User findById(int id);
}
